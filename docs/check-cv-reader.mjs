/**
 * Checks the CV reader and the notification email it feeds.
 *
 * Builds its own DOCX fixture in memory, so it needs no sample files:
 *
 *   node --experimental-strip-types docs/check-cv-reader.mjs
 *   node --experimental-strip-types docs/check-cv-reader.mjs path/to/real-cv.pdf
 *
 * Exits non-zero if any check fails.
 */
import { strToU8, zipSync } from "fflate";

import { buildApplicationEmail, escapeHtml } from "../src/lib/application-email.ts";
import { extractCvText } from "../src/lib/cv-text.ts";

const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass, detail });

const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const paragraphs = [
  "Youssef Ahmed",
  "Senior Payroll Specialist",
  "Six years across multi-entity payroll.",
  "الملف الشخصي",
  "خبرة ست سنوات في إدارة دورات الرواتب لعدة كيانات.",
  "المهارات: ضريبة كسب العمل، التأمينات الاجتماعية.",
];

const documentXml =
  `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="${W}"><w:body>` +
  paragraphs.map((line) => `<w:p><w:r><w:t>${line}</w:t></w:r></w:p>`).join("") +
  `</w:body></w:document>`;

const docxBytes = zipSync({
  "[Content_Types].xml": strToU8(
    `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/></Types>`,
  ),
  "word/document.xml": strToU8(documentXml),
});

/* ---------------------------- extraction ---------------------------- */

const docx = await extractCvText(docxBytes, "cv.docx", "");
check("DOCX is read", docx.status === "extracted", `status=${docx.status} chars=${docx.chars}`);
check("English lines survive", docx.text.includes("Senior Payroll Specialist"));
check("Arabic lines survive, unreversed", docx.text.includes("الملف الشخصي"));
check("Arabic phrase stays joined", docx.text.includes("التأمينات الاجتماعية"));
check("paragraph breaks survive", docx.text.split("\n").filter(Boolean).length >= paragraphs.length - 1);

const unsupported = await extractCvText(docxBytes, "cv.doc", "application/msword");
check("legacy .doc reports unsupported, not a crash", unsupported.status === "unsupported");

const broken = await extractCvText(new Uint8Array([1, 2, 3, 4, 5]), "cv.pdf", "application/pdf");
check("corrupt PDF reports failed, not a crash", broken.status === "failed");

const pdfPath = process.argv[2];
if (pdfPath) {
  const { readFileSync } = await import("node:fs");
  const pdf = await extractCvText(new Uint8Array(readFileSync(pdfPath)), pdfPath, "application/pdf");
  check("PDF is read", pdf.status === "extracted", `status=${pdf.status} chars=${pdf.chars}`);
  check("PDF text is not reversed", !pdf.text.includes("يصخشلا فلملا"));
}

/* ------------------------------- email ------------------------------- */

const { subject, html } = buildApplicationEmail({
  data: {
    jobId: "MHR-07",
    jobTitle: "Senior Payroll Specialist",
    fullName: 'Youssef "Ahmed" <script>alert(1)</script>',
    email: "y@example.com",
    phone: "+201000000000",
    location: "Cairo",
    experience: "6",
    portfolioUrl: "",
    coverNote: "First line\nSecond line",
  },
  cv: { name: "cv.docx", sizeKb: 4, status: docx.status, chars: docx.chars, text: docx.text },
});

check("subject names the role and reference", subject.includes("MHR-07") && subject.includes("Payroll"));
check("email embeds the CV text", html.includes("Senior Payroll Specialist"));
check("email embeds the Arabic CV text", html.includes("التأمينات الاجتماعية"));
check("email reports how much was read", html.includes(`${docx.chars} characters read`));
check("CV text is preformatted", html.includes('<pre dir="auto"'));
check("markup from the form is escaped", html.includes("&lt;script&gt;") && !html.includes("<script>"));
check("quotes are escaped", html.includes("&quot;Ahmed&quot;"));
check("cover note keeps its line breaks", html.includes("First line\nSecond line"));
check("escapeHtml handles ampersands", escapeHtml("a & b < c") === "a &amp; b &lt; c");

const noText = buildApplicationEmail({
  data: { jobId: "MHR-01", jobTitle: "Technical Recruiter", fullName: "A", email: "a@b.co", phone: "1", location: "Cairo", experience: "2", portfolioUrl: "", coverNote: "" },
  cv: { name: "cv.doc", sizeKb: 2, status: "unsupported", chars: 0, text: "" },
});
check("no text block when nothing was read", !noText.html.includes('<pre dir="auto"'));
check("reader is told to open the attachment", noText.html.includes("Open the attachment"));

/* ------------------------------- report ------------------------------ */

let passed = 0;
for (const r of results) {
  if (r.pass) passed++;
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `   [${r.detail}]` : ""}`);
}
console.log(`\n${passed}/${results.length} checks passed`);
process.exit(passed === results.length ? 0 : 1);
