/**
 * CV text extraction — server side only.
 *
 * Turns an uploaded CV into plain text so the recruiting team receives the
 * content of the document in the notification email instead of having to open
 * the attachment. Runs without a database and without writing to disk.
 *
 * Supported: PDF, DOCX. Legacy .doc is reported as unsupported rather than
 * failing the whole submission.
 *
 * Extraction is best effort: a failure here never blocks an application.
 */
import { strFromU8, unzipSync } from "fflate";
import { extractText, getDocumentProxy } from "unpdf";

export type CvTextStatus = "extracted" | "empty" | "unsupported" | "failed";

export type CvTextResult = {
  status: CvTextStatus;
  /** Full extracted text, capped at MAX_TEXT_CHARS. Empty unless status is "extracted". */
  text: string;
  /** Character count of the full extracted text (before the cap). */
  chars: number;
  /** Short head of the text, for the confirmation shown to the applicant. */
  preview: string;
};

const MAX_TEXT_CHARS = 20_000;
const MAX_PREVIEW_CHARS = 420;

const EMPTY = (status: CvTextStatus): CvTextResult => ({ status, text: "", chars: 0, preview: "" });

/* ------------------------------ PDF ------------------------------ */

async function pdfToText(bytes: Uint8Array): Promise<string> {
  const pdf = await getDocumentProxy(bytes);
  const result = (await extractText(pdf, { mergePages: true })) as {
    text?: string | string[];
  };
  const text = result?.text;
  if (Array.isArray(text)) return text.join("\n");
  return typeof text === "string" ? text : "";
}

/* ------------------------------ DOCX ------------------------------ */

const XML_ENTITIES: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&amp;": "&",
};

function decodeXml(value: string): string {
  return value
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&(?:lt|gt|quot|apos|amp);/g, (entity) => XML_ENTITIES[entity] ?? entity);
}

function docxToText(bytes: Uint8Array): string {
  const entries = unzipSync(bytes);
  const document = entries["word/document.xml"];
  if (!document) return "";

  let xml = strFromU8(document);
  // drop content that is not part of the visible document
  xml = xml.replace(/<w:delText[\s\S]*?<\/w:delText>/g, "");
  xml = xml.replace(/<w:instrText[\s\S]*?<\/w:instrText>/g, "");
  // keep structural whitespace before stripping tags
  xml = xml.replace(/<w:tab\b[^>]*\/>/g, "\t");
  xml = xml.replace(/<w:br\b[^>]*\/>/g, "\n");
  xml = xml.replace(/<\/w:p>/g, "\n");
  // strip every remaining tag, keeping the text between them
  xml = xml.replace(/<[^>]+>/g, "");

  return decodeXml(xml);
}

/* --------------------------- normalisation --------------------------- */

function normalise(raw: string): string {
  return raw
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ------------------------------ entry ------------------------------ */

export async function extractCvText(
  bytes: Uint8Array,
  fileName: string,
  mimeType: string,
): Promise<CvTextResult> {
  const name = (fileName || "").toLowerCase();
  const mime = (mimeType || "").toLowerCase();

  const isPdf = name.endsWith(".pdf") || mime === "application/pdf";
  const isDocx =
    name.endsWith(".docx") ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  if (!isPdf && !isDocx) return EMPTY("unsupported");

  try {
    const raw = isPdf ? await pdfToText(bytes) : docxToText(bytes);
    const clean = normalise(raw);
    if (clean.length < 2) return EMPTY("empty");

    const text = clean.slice(0, MAX_TEXT_CHARS);
    return {
      status: "extracted",
      text,
      chars: clean.length,
      preview: text.slice(0, MAX_PREVIEW_CHARS),
    };
  } catch {
    return EMPTY("failed");
  }
}
