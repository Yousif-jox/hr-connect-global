/* Meridian HR — website SRS generator (docx-js)
 * Reads docs/srs-data.json + src/data/jobs.ts so the document always matches the shipped code. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const require = createRequire(import.meta.url);
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, TableOfContents, HeadingLevel,
  BorderStyle, WidthType, TableLayoutType, ShadingType, VerticalAlign,
  PageNumber, PageBreak,
} = require("docx");

const D = JSON.parse(fs.readFileSync(path.join(HERE, "srs-data.json"), "utf8"));
const { jobs, JOB_COUNT } = await import(path.join(ROOT, "src/data/jobs.ts"));
const P = D.project;

/* ---------- brand palette (converted from the site's oklch tokens) ---------- */
const NAVY = "0F2743", NAVY800 = "163A5E", GOLD = "CDA434", GOLD_SOFT = "E7D49A";
const CREAM = "F6F4EE", MIST = "EEF2F8", INK = "14202E", SLATE = "5B6B7E";
const LINE = "D8DEE7";
const FONT = "Arial";

/* ---------- totals ---------- */
const FR = D.frs, NFR = D.nfrs;
const TOTAL = FR.length + NFR.length;
const byPri = (l, v) => l.filter((x) => x.priority === v).length;
const CATS = [...new Set(FR.map((f) => f.category))];

/* ---------- helpers ---------- */
const thin = { style: BorderStyle.SINGLE, size: 1, color: LINE };
const CB = { top: thin, bottom: thin, left: thin, right: thin };
const FILL = (f) => ({ fill: f, type: ShadingType.CLEAR, color: "auto" });
const ar = (t, o = {}) => new TextRun({ text: t, rightToLeft: true, font: FONT, ...o });
const en = (t, o = {}) => new TextRun({ text: t, font: FONT, ...o });
function arP(text, { size = 20, bold = false, color, after = 120, before = 0, italic = false, align = AlignmentType.RIGHT } = {}) {
  return new Paragraph({ bidirectional: true, alignment: align, spacing: { after, before }, children: [ar(text, { size, bold, color, italics: italic })] });
}
function arBullet(text, { size = 20 } = {}) {
  return new Paragraph({ bidirectional: true, numbering: { reference: "bul", level: 0 }, spacing: { after: 60 }, children: [ar(text, { size })] });
}
const h1 = (t, first = false) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: !first, children: [en(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [en(t)] });
const h3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [en(t)] });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

function cell(children, width, { fill, valign = VerticalAlign.CENTER } = {}) {
  const c = { borders: CB, width: { size: width, type: WidthType.DXA }, verticalAlign: valign, children: Array.isArray(children) ? children : [children] };
  if (fill) c.shading = FILL(fill);
  return new TableCell(c);
}
function head(text, width, { ar: isAr = false } = {}) {
  return cell(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [isAr ? ar(text, { size: 18, bold: true, color: "FFFFFF" }) : en(text, { size: 18, bold: true, color: "FFFFFF" })] }), width, { fill: NAVY });
}
function tbl(rows, widths, margins) {
  return new Table({ columnWidths: widths, layout: TableLayoutType.FIXED, margins: margins || { top: 60, bottom: 60, left: 100, right: 100 }, rows });
}
const hasArabic = (s) => /[\u0600-\u06FF]/.test(String(s));
const arCell = (text, size = 18) => new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar(text, { size })] });
const enCell = (text, size = 18, bold = false, color) => new Paragraph({ spacing: { after: 0 }, children: [en(text, { size, bold, color })] });
const ctrCell = (text, size = 18, bold = true, color) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [en(text, { size, bold, color })] });
const band = (i) => (i % 2 ? MIST : "FFFFFF");

const mkHeader = () => new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT, spacing: { after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE } },
    children: [en(`${P.shortName} — ${P.docTypeEn}  |  ${P.code}  |  v${P.version}`, { size: 15, color: "808080" })],
  })],
});
const mkFooter = () => new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE } },
    children: [
      en("Page ", { size: 15, color: "808080" }),
      new TextRun({ children: [PageNumber.CURRENT], size: 15, color: "808080", font: FONT }),
      en(" of ", { size: 15, color: "808080" }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 15, color: "808080", font: FONT }),
    ],
  })],
});

const children = [];

/* ================= COVER ================= */
children.push(
  new Paragraph({ spacing: { before: 1400, after: 260 }, children: [] }),
  tbl([new TableRow({ children: [cell([
    new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, spacing: { after: 100 }, children: [ar(P.nameAr, { size: 46, bold: true, color: CREAM })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [en(P.nameEn, { size: 22, color: GOLD_SOFT })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [en(P.docTypeEn, { size: 20, bold: true, color: "FFFFFF" })] }),
  ], 9700, { fill: NAVY })] })], [9700], { top: 400, bottom: 400, left: 200, right: 200 }),
  new Paragraph({ spacing: { after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: GOLD } }, children: [] }),
  new Paragraph({ spacing: { before: 200, after: 300 }, alignment: AlignmentType.CENTER, bidirectional: true, children: [ar(P.docTypeAr + " — الإصدار " + P.version, { size: 22, bold: true, color: NAVY })] }),
  arP(P.purposeAr, { size: 20, color: INK, after: 400, align: AlignmentType.CENTER })
);
children.push(tbl([
  ...[
    ["كود المشروع / Project Code", P.code],
    ["المستودع / Repository", P.repo],
    ["العميل / Client", P.client],
    ["نوع المستند / Document Type", P.docTypeAr + " — " + P.docTypeEn],
    ["الإصدار / Version", P.version],
    ["التاريخ / Date", P.date],
    ["الحالة / Status", P.statusAr],
    ["إجمالي المتطلبات / Total Requirements", `${FR.length} FR + ${NFR.length} NFR = ${TOTAL}`],
    ["عدد الوظائف في الموقع / Jobs in site", String(JOB_COUNT)],
  ].map(([k, v], i) => new TableRow({
    children: [
      cell(arCell(k, 19), 3000, { fill: i % 2 ? MIST : "FFFFFF" }),
      /* values without Arabic text are laid out left-to-right, otherwise bidi reorders
         mixed number/latin sequences (e.g. "57 FR + 22 NFR = 79") incorrectly */
      cell(new Paragraph({
        bidirectional: hasArabic(v),
        alignment: hasArabic(v) ? AlignmentType.RIGHT : AlignmentType.LEFT,
        spacing: { after: 0 },
        children: [hasArabic(v) ? ar(v, { size: 19 }) : en(v, { size: 19 })],
      }), 6700, { fill: i % 2 ? MIST : "FFFFFF" }),
    ],
  })),
], [3000, 6700]));
children.push(pageBreak());

/* ================= TOC ================= */
children.push(
  new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: false, children: [en("Table of Contents")] }),
  arP("ملاحظة: فهرس المحتويات حقل قابل للتحديث — اضغط بزر الفأرة الأيمن على الفهرس ثم اختر «تحديث الحقل» لعرض العناوين وأرقام الصفحات.", { size: 17, color: SLATE, italic: true, after: 240 }),
  new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
  pageBreak()
);

/* ================= 1. INTRODUCTION ================= */
children.push(h1("1. Introduction", true));
children.push(h2("1.1 Purpose"));
children.push(arP("يوثّق هذا المستند المتطلبات الكاملة للموقع التسويقي لشركة " + P.shortName + " كما هو مبني ومنشور فعلياً، ويصلح كمرجع ملزم لأي تطوير لاحق أو مراجعة أو تسليم لفريق آخر."));
children.push(arP("المستند ليس وصفاً نظرياً: كل متطلب مرتبط بملف في المشروع، وكل رقم في الملاحق مُستخرَج آلياً من نفس ملفات البيانات التي يقرأها الموقع، وبالتالي لا يمكن أن يخالف المستند الكود."));

children.push(h2("1.2 Scope"));
children.push(arP(P.scopeAr));

children.push(h2("1.3 Out of Scope"));
P.outOfScopeAr.forEach((x) => children.push(arBullet(x)));

children.push(h2("1.4 Definitions & Abbreviations"));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Term", 1900), head("المعنى", 7800, { ar: true })] }),
  ...[
    ["FR / NFR", "متطلب وظيفي (Functional Requirement) / متطلب غير وظيفي (Non-Functional Requirement)"],
    ["MoSCoW", "تصنيف الأولوية: Must إلزامي / Should مهم / Could تحسيني"],
    ["RTL / LTR", "اتجاه الكتابة من اليمين لليسار (العربية) ومن اليسار لليمين (الإنجليزية)"],
    ["SSR", "عرض الصفحة من الخادم (Server-Side Rendering) بحيث يصل المحتوى جاهزاً في HTML"],
    ["Design Token", "رمز تصميم مُسمّى يحمل قيمة الهوية (لون، خط، نصف قطر) ويُستخدم بدل القيم المباشرة"],
    ["oklch", "صيغة لون حديثة تُستخدم في ملف أنماط الموقع لتعريف ألوان الهوية"],
    ["Disclosure", "عنصر قابل للطي يُخفي محتوى إضافياً حتى يطلبه المستخدم"],
    ["LCP", "زمن ظهور أكبر عنصر مرئي — مقياس أساسي لسرعة تحميل الصفحة"],
    ["CLS", "مقدار حركة العناصر غير المتوقعة أثناء التحميل — مقياس استقرار التخطيط"],
    ["WCAG 2.1 AA", "معيار دولي لإمكانية الوصول، ومستوى AA هو الحد الأدنى المقبول للمواقع العامة"],
    ["Open Graph / OG", "وسوم تحدد شكل معاينة الرابط عند مشاركته على الشبكات الاجتماعية"],
    ["mailto", "رابط يفتح برنامج البريد لدى الزائر برسالة جاهزة، دون حاجة لخدمة خلفية"],
    ["Lighthouse", "أداة قياس أداء وإمكانية وصول وتحسين محركات البحث من متصفح كروم"],
    ["Noto / Demo content", "محتوى تمثيلي يُستخدم للعرض ويجب استبداله ببيانات موثّقة قبل الإطلاق العام"],
  ].map(([t, a], i) => new TableRow({
    children: [cell(enCell(t, 18, true), 1900, { fill: band(i) }), cell(arCell(a, 18), 7800, { fill: band(i) })],
  })),
], [1900, 7800]));

children.push(h2("1.5 Document Conventions"));
children.push(arBullet("عناوين الأقسام بالإنجليزية، والشرح والتوصيف بالعربية — بما يوافق الطبيعة ثنائية اللغة للموقع نفسه."));
children.push(arBullet("كل متطلب وظيفي يحمل معرّفاً بصيغة FR-NNN، وكل متطلب غير وظيفي بصيغة NFR-NNN، والمعرّفات فريدة داخل المستند."));
children.push(arBullet("لكل متطلب وظيفي: التصنيف، العنوان الإنجليزي، الوصف العربي، الأولوية، معيار قبول قابل للاختبار، والملف المرجعي في المشروع."));
children.push(arBullet("أي بند غير محسوم مسجّل في قسم الأسئلة المفتوحة ولم يُفترض فيه رأي — خصوصاً ما يتعلق بصحة الأرقام والشهادات قبل الإطلاق."));

children.push(h2("1.6 Intended Audience"));
children.push(arBullet("يوسف (مالك المنتج): لمراجعة النطاق واعتماد الجاهزية للنشر."));
children.push(arBullet("فريق التوظيف: لمراجعة دقة الوظائف ومتطلباتها قبل الإعلان."));
children.push(arBullet("فريق التطوير: لتنفيذ أي توسعة بنفس نظام التصميم وبنفس معايير الجودة."));
children.push(arBullet("التسويق: لمراجعة المحتوى والأرقام والشهادات والامتثال في الرسائل."));

/* ================= 2. DESIGN SYSTEM ================= */
children.push(h1("2. Design System Specification"));
children.push(arP("هذا القسم هو المرجع الحاكم لهوية الموقع. أي تطوير لاحق يجب أن يستخدم هذه الرموز فقط، وقد ثُبِّت ملف الأنماط دون تغيير (انظر NFR-009 و NFR-010)."));

children.push(h2("2.1 Colour Tokens"));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Token", 1500), head("Value (oklch)", 2400), head("Hex", 1100), head("الاستخدام", 4700, { ar: true })] }),
  ...D.designTokens.map((t, i) => new TableRow({
    children: [
      cell(enCell(t.token, 17, true, NAVY), 1500, { fill: band(i) }),
      cell(enCell(t.oklch, 16, false, SLATE), 2400, { fill: band(i) }),
      cell(ctrCell(t.hex, 17, true), 1100, { fill: t.hex }),
      cell(arCell(t.usageAr, 17), 4700, { fill: band(i), valign: VerticalAlign.TOP }),
    ],
  })),
], [1500, 2400, 1100, 4700]));
children.push(arP("ملاحظة: خانتا اسم اللون وقيمته مطبوعتان بخلفية اللون نفسه في عمود Hex لتسهيل المراجعة البصرية. الألوان معرّفة بصيغة oklch في ملف الأنماط، وقيم Hex أعلاه محسوبة منها للاستخدام في المستندات.", { size: 17, color: SLATE, before: 120 }));

children.push(h2("2.2 Typography"));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Role", 2100), head("Fonts", 3100), head("الاستخدام", 4500, { ar: true })] }),
  ...D.typography.map((t, i) => new TableRow({
    children: [
      cell(enCell(t.role, 17, true), 2100, { fill: band(i) }),
      cell(enCell(t.fonts, 17, false, NAVY), 3100, { fill: band(i) }),
      cell(arCell(t.usageAr, 17), 4500, { fill: band(i), valign: VerticalAlign.TOP }),
    ],
  })),
], [2100, 3100, 4500]));

children.push(h2("2.3 Component Patterns"));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Pattern", 2400), head("Classes", 3600), head("الاستخدام", 3700, { ar: true })] }),
  ...D.components.map((c, i) => new TableRow({
    children: [
      cell(enCell(c.name, 16, true), 2400, { fill: band(i) }),
      cell(enCell(c.classes, 15, false, NAVY800), 3600, { fill: band(i), valign: VerticalAlign.TOP }),
      cell(arCell(c.usageAr, 17), 3700, { fill: band(i), valign: VerticalAlign.TOP }),
    ],
  })),
], [2400, 3600, 3700]));

children.push(h2("2.4 Design Freeze & Change Control"));
children.push(arP("المطلوب في هذه المرحلة هو إضافة بيانات ومحتوى دون أي تغيير في الشكل. القواعد الملزمة:"));
children.push(arBullet("ملف أنماط الهوية ورموز الألوان والخطوط: ممنوع التعديل (NFR-009)."));
children.push(arBullet("أي عنصر جديد يجب أن يُبنى من الأنماط الموجودة أصلاً في الموقع — لا ألوان ولا خطوط ولا مكتبات أيقونات جديدة (NFR-010)."));
children.push(arBullet("لا تُستخدم خصائص اتجاه فيزيائية في أي مكوّن جديد لضمان سلامة الاتجاهين (FR-016)."));
children.push(arBullet("نطاق التغيير المقبول في هذه المرحلة محصور في: ملف بيانات الوظائف، وملف صفحة الوظائف لعرض التفاصيل، وملفات هذا المستند."));
children.push(arP("التحقق من الالتزام يتم بطريقتين: مقارنة ملفات المشروع بالنسخة الأصلية لإثبات أن الملفات المتغيّرة محدودة، ومقارنة القيم المحسوبة فعلياً في المتصفح بقيم رموز الهوية.", { size: 18, color: SLATE }));

/* ================= 3. SITE MAP & PAGES ================= */
children.push(h1("3. Site Map & Page Specifications"));
children.push(arP(`يتكوّن الموقع من ${D.pages.length} صفحات عامة، بلا صفحات محمية ولا تسجيل دخول. الترويسة والترويسة السفلية مشتركتان بين كل الصفحات.`));
D.pages.forEach((pg, idx) => {
  children.push(h2(`3.${idx + 1} ${pg.route} — ${pg.nameAr}`));
  const W = [2200, 7500];
  children.push(tbl([
    new TableRow({ tableHeader: true, children: [head("Section", 2200), head("المواصفات", 7500, { ar: true })] }),
    ...pg.sections.map((s, i) => new TableRow({
      children: [
        cell(enCell(s.name, 17, true), W[0], { fill: band(i) }),
        cell(arCell(s.detailAr, 17), W[1], { fill: band(i), valign: VerticalAlign.TOP }),
      ],
    })),
  ], W));
});

/* ================= 4. BILINGUAL & RTL ================= */
children.push(h1("4. Bilingual & RTL Requirements"));
children.push(arP("الموقع ثنائي اللغة بحكم التصميم الأصلي، واللغة تُغيَّر من زر واحد في الترويسة يعمل في كل الصفحات. هذا القسم يجمع المتطلبات المتعلقة بالتعريب واتجاه الكتابة، والتفاصيل الكاملة في مجموعة Localization بقسم المتطلبات الوظيفية."));
children.push(h2("4.1 How the switch works"));
children.push(arBullet("اللغة تُحفظ في المتصفح تحت مفتاح ثابت، ويُستعاد الاختيار في الزيارات التالية (FR-011)."));
children.push(arBullet("عند التبديل يُضبط اتجاه المستند ولغته برمجياً: rtl/ar للعربية و ltr/en للإنجليزية (FR-012)."));
children.push(arBullet("ملف الأنماط يعرّف قاعدة تستبدل خطوط العرض والنص بخط Tajawal عند تفعيل وضع RTL، فلا يحتاج أي مكوّن لمعالجة خاصة (FR-013)."));
children.push(h2("4.2 Known limitation"));
children.push(arP("يُرسَل المستند من الخادم بلغة إنجليزية دائماً، ويُضبط الاتجاه في المتصفح بعد التحميل. لذلك قد يرى زائر النسخة العربية وميضاً قصيراً بالاتجاه المعاكس عند أول تحميل. هذا مسجّل كمخاطرة R-06، والحل المقترح نقل ضبط اللغة إلى الخادم.", { size: 19 }));
children.push(h2("4.3 Content parity rules"));
children.push(arBullet("لا يوجد نص مكتوب مباشرة داخل الواجهة بلغة واحدة — كل النصوص من كائنات نسخ لكل لغة (FR-014)."));
children.push(arBullet("بيانات الوظائف لها نسختان متطابقتان في الترتيب وعدد العناصر لكل وظيفة على حدة (FR-017)."));
children.push(arBullet("الأرقام داخل النصوص العربية تُكتب بالأرقام العربية الهندية مع بقاء أرقام الإحصائيات بصيغتها القياسية كما في التصميم (FR-015)."));

/* ================= 5. DATA MODEL ================= */
children.push(h1("5. Data Model & Content Inventory"));
children.push(h2("5.1 Job Record Fields"));
children.push(arP("كل وظيفة سجل واحد بالشكل التالي، ويوجد سجل مقابل بالعربية بنفس الترتيب داخل المصفوفة العربية. هذا التطابق شرط إلزامي (FR-017)."));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Field", 1800), head("النوع", 1300), head("الوصف", 6600, { ar: true })] }),
  ...[
    ["id", "string", "معرّف فريد ثابت للوظيفة (MHR-01 … MHR-24) يُستخدم مفتاحاً للعرض ومنعاً لأخطاء التحديث."],
    ["dept", "string", "القسم الذي تتبعه الوظيفة، ويظهر كوسم صغير أعلى البطاقة."],
    ["type", "string", "نمط الدوام: دوام كامل، دوام جزئي، عقد مؤقت."],
    ["loc", "string", "موقع العمل ومزيج الحضور: من المقر، هجين، عن بُعد — مع المدينة عند الانطباق."],
    ["exp", "string", "سنوات الخبرة المطلوبة بصيغة وصفية (مثال: ٥ سنوات فأكثر)."],
    ["title", "string", "عنوان الوظيفة كما يظهر في البطاقة."],
    ["desc", "string", "وصف مختصر في سطر أو سطرين تحت العنوان."],
    ["requirements", "string[]", "قائمة مؤهلات ومتطلبات الوظيفة (٤ إلى ٥ عناصر) وتظهر بنقاط ذهبية."],
    ["responsibilities", "string[]", "قائمة المهام الأساسية المتوقعة من شاغل الوظيفة (٤ إلى ٥ عناصر) وتظهر بنقاط زرقاء داكنة."],
  ].map(([f, t, d], i) => new TableRow({
    children: [
      cell(enCell(f, 17, true, NAVY), 1800, { fill: band(i) }),
      cell(enCell(t, 16, false, SLATE), 1300, { fill: band(i) }),
      cell(arCell(d, 17), 6600, { fill: band(i), valign: VerticalAlign.TOP }),
    ],
  })),
], [1800, 1300, 6600]));

children.push(h2("5.2 Job Data Inventory"));
children.push(arP(`يحتوي السجل الحالي ${JOB_COUNT} وظيفة موزّعة على ${new Set(jobs.en.map((j) => j.dept)).size} أقسام و${new Set(jobs.en.map((j) => j.loc)).size} مواقع عمل مختلفة. الجدول التفصيلي لكل وظيفة في الملحق ب.`));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Department", 1900), head("عدد الوظائف", 1400), head("Employment types", 2400), head("نماذج المواقع", 4000, { ar: true })] }),
  ...[...new Set(jobs.en.map((j) => j.dept))].map((dep, i) => {
    const list = jobs.en.filter((j) => j.dept === dep);
    const types = [...new Set(list.map((j) => j.type))].join(" · ");
    const locs = [...new Set(list.map((j) => j.loc))].join(" · ");
    return new TableRow({
      children: [
        cell(enCell(dep, 17, true), 1900, { fill: band(i) }),
        cell(ctrCell(String(list.length), 17), 1400, { fill: band(i) }),
        cell(enCell(types, 16, false, SLATE), 2400, { fill: band(i) }),
        cell(arCell(locs, 16), 4000, { fill: band(i), valign: VerticalAlign.TOP }),
      ],
    });
  }),
], [1900, 1400, 2400, 4000]));

children.push(h2("5.3 Content Inventory"));
children.push(arP("المحتوى التالي موجود في الموقع ويجب مراجعته قبل أي إطلاق عام، لأن جزءاً منه تمثيلي (انظر R-01)."));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Area", 2200), head("البند", 2400, { ar: true }), head("المحتوى", 5100, { ar: true })] }),
  ...D.content.map((c, i) => new TableRow({
    children: [
      cell(enCell(c.area, 17, true), 2200, { fill: band(i) }),
      cell(arCell(c.itemAr, 17), 2400, { fill: band(i) }),
      cell(arCell(c.valueAr, 17), 5100, { fill: band(i), valign: VerticalAlign.TOP }),
    ],
  })),
], [2200, 2400, 5100]));

/* ================= 6. FUNCTIONAL REQUIREMENTS ================= */
children.push(h1("6. Functional Requirements"));
children.push(arP(`يضم هذا القسم ${FR.length} متطلباً وظيفياً موزّعة على ${CATS.length} مجموعات. لكل متطلب: معرّف فريد، عنوان إنجليزي، وصف عربي، أولوية، معيار قبول قابل للاختبار، والملف المرجعي في المشروع.`));
children.push(arP("تصنيف الأولوية: Must إلزامي ولا يُقبل النشر بدونه | Should مهم ويجب تنفيذه | Could تحسيني يُنفَّذ إن سمح الوقت.", { size: 18, color: SLATE }));

const F_COLS = [900, 2000, 5250, 1550];
CATS.forEach((cat, ci) => {
  const list = FR.filter((f) => f.category === cat);
  children.push(h2(`6.${ci + 1} ${cat} (${list.length})`));
  children.push(tbl([
    new TableRow({ tableHeader: true, children: [head("Req ID", F_COLS[0]), head("Requirement", F_COLS[1]), head("الوصف ومعيار القبول والمرجع", F_COLS[2], { ar: true }), head("Priority", F_COLS[3])] }),
    ...list.map((f, i) => new TableRow({
      children: [
        cell(ctrCell(f.id, 17, true, NAVY), F_COLS[0], { fill: band(i) }),
        cell(enCell(f.titleEn, 17, true), F_COLS[1], { fill: band(i), valign: VerticalAlign.TOP }),
        cell([
          new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 60 }, children: [ar(f.descAr, { size: 17 })] }),
          new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 40 }, children: [ar("معيار القبول: ", { size: 15, bold: true, color: NAVY }), ar(f.acceptanceAr, { size: 15, color: NAVY })] }),
          new Paragraph({ spacing: { after: 0 }, children: [en("Ref: " + f.evidence, { size: 14, color: SLATE })] }),
        ], F_COLS[2], { fill: band(i), valign: VerticalAlign.TOP }),
        cell(ctrCell(f.priority, 17, true, f.priority === "Must" ? "9C0006" : f.priority === "Should" ? "9C6500" : "595959"), F_COLS[3], { fill: band(i) }),
      ],
    })),
  ], F_COLS));
});

/* ================= 7. NON-FUNCTIONAL REQUIREMENTS ================= */
children.push(h1("7. Non-Functional Requirements"));
children.push(arP(`يضم هذا القسم ${NFR.length} متطلباً غير وظيفي تحدّد جودة الموقع: الأداء، التوافق، جودة الكود، تثبيت التصميم، إمكانية الوصول، والتعريب. كل متطلب مصحوب بمقياس قبول قابل للتحقق.`));
const N_COLS = [800, 1150, 1800, 5050, 900];
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Req ID", N_COLS[0]), head("Category", N_COLS[1]), head("Requirement", N_COLS[2]), head("الوصف ومقياس القبول", N_COLS[3], { ar: true }), head("Priority", N_COLS[4])] }),
  ...NFR.map((n, i) => new TableRow({
    children: [
      cell(ctrCell(n.id, 15, true, NAVY), N_COLS[0], { fill: band(i) }),
      cell(arCell(n.categoryAr, 16), N_COLS[1], { fill: band(i) }),
      cell(enCell(n.titleEn, 16, true), N_COLS[2], { fill: band(i), valign: VerticalAlign.TOP }),
      cell([
        new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 50 }, children: [ar(n.descAr, { size: 16 })] }),
        new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar("مقياس القبول: ", { size: 15, bold: true, color: NAVY }), ar(n.metricAr, { size: 15, color: NAVY })] }),
      ], N_COLS[3], { fill: band(i), valign: VerticalAlign.TOP }),
      cell(ctrCell(n.priority, 16, true, n.priority === "Must" ? "9C0006" : n.priority === "Should" ? "9C6500" : "595959"), N_COLS[4], { fill: band(i) }),
    ],
  })),
], N_COLS));

/* ================= 8. TECHNOLOGY STACK ================= */
children.push(h1("8. Technology Stack & Build"));
children.push(arP("الستاك الحالي مستقر ومُتحقَّق منه: فحص الأنواع يمرّ وبناء الإنتاج يكتمل بنجاح. أي إضافة مستقبلية يجب أن تعتمد هذه المكوّنات بدل استيراد بدائل موازية."));
const T_COLS = [2200, 2900, 4600];
children.push(h2("8.1 Stack"));
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Layer", T_COLS[0]), head("Choice", T_COLS[1]), head("ملاحظات", T_COLS[2], { ar: true })] }),
  ...D.tech.stack.map((s, i) => new TableRow({
    children: [
      cell(arCell(s.layerAr, 17, true), T_COLS[0], { fill: band(i) }),
      cell(enCell(s.choice, 16, true, NAVY), T_COLS[1], { fill: band(i), valign: VerticalAlign.TOP }),
      cell(arCell(s.noteAr, 17), T_COLS[2], { fill: band(i), valign: VerticalAlign.TOP }),
    ],
  })),
], T_COLS));
children.push(h2("8.2 Commands"));
const C_COLS = [3800, 5900];
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Command", C_COLS[0]), head("الوصف", C_COLS[1], { ar: true })] }),
  ...D.tech.commands.map((c, i) => new TableRow({
    children: [
      cell(enCell(c.cmd, 16, true, NAVY800), C_COLS[0], { fill: band(i) }),
      cell(arCell(c.descAr, 17), C_COLS[1], { fill: band(i) }),
    ],
  })),
], C_COLS));

/* ================= 9. ACCEPTANCE ================= */
children.push(h1("9. Acceptance Criteria"));
children.push(arP("لا يُعتبر العمل مكتملاً إلا بتحقق البنود التالية جميعاً على بيئة إنتاجية — وليست بنوداً شكلية بل نقط اختبار فعلية قابلة للقياس."));
D.acceptance.forEach((a) => children.push(arBullet(a, { size: 19 })));
children.push(h2("9.1 Definition of Done per Requirement"));
children.push(arBullet("المتطلب مُنفَّذ فعلياً وقابل للتجربة من المستخدم النهائي على بيئة الاختبار.", { size: 19 }));
children.push(arBullet("معيار القبول المذكور في قسم المتطلبات تم تنفيذه واختباره ونجح.", { size: 19 }));
children.push(arBullet("لا يوجد خطأ حرج مفتوح مرتبط بالمتطلب، ولا تحذيرات في وحدة تحكم المتصفح.", { size: 19 }));
children.push(arBullet("المتطلب يعمل في اللغتين وبالاتجاهين، وعلى أصغر شاشة مدعومة.", { size: 19 }));
children.push(arBullet("لا يوجد أي تغيير في رموز الهوية أو ملف الأنماط نتيجة هذا المتطلب.", { size: 19 }));

/* ================= 10. RISKS ================= */
children.push(h1("10. Risks & Mitigations"));
const R_COLS = [700, 3350, 850, 950, 2900, 950];
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Code", R_COLS[0]), head("الخطر", R_COLS[1], { ar: true }), head("Impact", R_COLS[2]), head("Likelih.", R_COLS[3]), head("إجراء المعالجة", R_COLS[4], { ar: true }), head("Owner", R_COLS[5])] }),
  ...D.risks.map((r, i) => new TableRow({
    children: [
      cell(ctrCell(r.code, 16, true, "9C0006"), R_COLS[0], { fill: band(i) }),
      cell(arCell(r.riskAr, 16), R_COLS[1], { fill: band(i), valign: VerticalAlign.TOP }),
      cell(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [ar(r.impact, { size: 15, bold: true })] }), R_COLS[2], { fill: band(i) }),
      cell(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [ar(r.likelihood, { size: 15 })] }), R_COLS[3], { fill: band(i) }),
      cell(arCell(r.mitigationAr, 16), R_COLS[4], { fill: band(i), valign: VerticalAlign.TOP }),
      cell(arCell(r.ownerAr, 15), R_COLS[5], { fill: band(i) }),
    ],
  })),
], R_COLS));

/* ================= 11. OPEN QUESTIONS ================= */
children.push(h1("11. Open Questions"));
children.push(arP("البنود التالية غير محسومة ولم يُفترض فيها أي رأي. البنود المعلّمة بحاجب «نعم» يجب حسمها قبل الإطلاق العام، وبعضها يمنع إطلاقاً مسؤولاً (مثل صحة الأرقام وأسماء العملاء)."));
const Q_COLS = [700, 4250, 2750, 1000, 1000];
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Code", Q_COLS[0]), head("السؤال", Q_COLS[1], { ar: true }), head("لماذا يهم", Q_COLS[2], { ar: true }), head("المسؤول", Q_COLS[3], { ar: true }), head("حاجب؟", Q_COLS[4], { ar: true })] }),
  ...D.openQuestions.map((q, i) => new TableRow({
    children: [
      cell(ctrCell(q.code, 16, true, NAVY), Q_COLS[0], { fill: band(i) }),
      cell(arCell(q.questionAr, 16), Q_COLS[1], { fill: band(i), valign: VerticalAlign.TOP }),
      cell(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar(q.whyItMattersAr, { size: 15, color: SLATE })] }), Q_COLS[2], { fill: band(i), valign: VerticalAlign.TOP }),
      cell(arCell(q.ownerAr, 15), Q_COLS[3], { fill: band(i) }),
      cell(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar(q.blocking, { size: 15, bold: q.blocking === "نعم" })] }), Q_COLS[4], { fill: band(i) }),
    ],
  })),
], Q_COLS));

/* ================= APPENDIX A (portrait) ================= */
children.push(h1("Appendix A — Requirements Summary"));
const A_COLS = [2900, 1300, 1200, 1300, 1200, 1800];
const sumRow = (label, list, zebra, labelAr) => new TableRow({
  children: [
    cell(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar(label, { size: 17, bold: true })] }), A_COLS[0], { fill: zebra }),
    cell(ctrCell(String(list.length), 17), A_COLS[1], { fill: zebra }),
    cell(ctrCell(String(byPri(list, "Must")), 17, true, "9C0006"), A_COLS[2], { fill: zebra }),
    cell(ctrCell(String(byPri(list, "Should")), 17, true, "9C6500"), A_COLS[3], { fill: zebra }),
    cell(ctrCell(String(byPri(list, "Could")), 17, true, "595959"), A_COLS[4], { fill: zebra }),
    cell(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar(labelAr || "", { size: 15, color: SLATE })] }), A_COLS[5], { fill: zebra }),
  ],
});
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("Group", A_COLS[0]), head("Total", A_COLS[1]), head("Must", A_COLS[2]), head("Should", A_COLS[3]), head("Could", A_COLS[4]), head("مجموعة", A_COLS[5], { ar: true })] }),
  ...CATS.map((cat, i) => sumRow(cat, FR.filter((f) => f.category === cat), band(i), "")),
  sumRow("Non-Functional", NFR, MIST, "الأداء والتوافق والجودة والتعريب"),
  new TableRow({
    children: [
      cell(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar("الإجمالي", { size: 17, bold: true })] }), A_COLS[0], { fill: "DCE3EC" }),
      cell(ctrCell(String(TOTAL), 17, true), A_COLS[1], { fill: "DCE3EC" }),
      cell(ctrCell(String(byPri([...FR, ...NFR], "Must")), 17, true, "9C0006"), A_COLS[2], { fill: "DCE3EC" }),
      cell(ctrCell(String(byPri([...FR, ...NFR], "Should")), 17, true, "9C6500"), A_COLS[3], { fill: "DCE3EC" }),
      cell(ctrCell(String(byPri([...FR, ...NFR], "Could")), 17, true, "595959"), A_COLS[4], { fill: "DCE3EC" }),
      cell(new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [ar(`${FR.length} وظيفي + ${NFR.length} غير وظيفي`, { size: 15, bold: true, color: NAVY })] }), A_COLS[5], { fill: "DCE3EC" }),
    ],
  }),
], A_COLS));
children.push(arP(`الإجمالي الكلي: ${FR.length} متطلب وظيفي + ${NFR.length} متطلب غير وظيفي = ${TOTAL} متطلب.`, { size: 20, bold: true, color: NAVY, before: 140 }));
children.push(arP("أرقام هذا الملخص محسوبة آلياً من نفس ملف البيانات الذي يُنشئ هذا المستند، فإذا أُضيف متطلب في الملف يتغيّر الرقم هنا عند إعادة التوليد.", { size: 17, color: SLATE }));

/* ===== boundary: landscape appendix ===== */
const childrenA = children.splice(0, children.length);

/* ================= APPENDIX B (landscape) ================= */
children.push(h1("Appendix B — Job Data Register", true));
children.push(arP(`سجل بيانات الوظائف كما هو مُعرَّف فعلياً في الكود (${JOB_COUNT} وظيفة). هذا الجدول مُولَّد آلياً من ملف البيانات نفسه، وأي تعديل على مصدر البيانات يظهر هنا عند إعادة توليد المستند.`));
const B_COLS = [900, 2450, 2900, 1350, 1250, 2100, 1350, 1000, 1078];
children.push(tbl([
  new TableRow({ tableHeader: true, children: [head("ID", B_COLS[0]), head("Job title (EN)", B_COLS[1]), head("المسمى الوظيفي", B_COLS[2], { ar: true }), head("Department", B_COLS[3]), head("Type", B_COLS[4]), head("Location", B_COLS[5]), head("Experience", B_COLS[6]), head("Req.", B_COLS[7]), head("Resp.", B_COLS[8])] }),
  ...jobs.en.map((j, i) => {
    const a = jobs.ar[i];
    return new TableRow({
      children: [
        cell(ctrCell(j.id, 15, true, NAVY), B_COLS[0], { fill: band(i) }),
        cell(enCell(j.title, 15, true), B_COLS[1], { fill: band(i) }),
        cell(arCell(a.title, 15), B_COLS[2], { fill: band(i) }),
        cell(enCell(j.dept, 14, false, SLATE), B_COLS[3], { fill: band(i) }),
        cell(enCell(j.type, 14, false, SLATE), B_COLS[4], { fill: band(i) }),
        cell(enCell(j.loc, 14), B_COLS[5], { fill: band(i) }),
        cell(enCell(j.exp, 14, false, SLATE), B_COLS[6], { fill: band(i) }),
        cell(ctrCell(String(j.requirements.length), 14), B_COLS[7], { fill: band(i) }),
        cell(ctrCell(String(j.responsibilities.length), 14), B_COLS[8], { fill: band(i) }),
      ],
    });
  }),
], B_COLS));
const totReq = jobs.en.reduce((n, j) => n + j.requirements.length, 0);
const totResp = jobs.en.reduce((n, j) => n + j.responsibilities.length, 0);
children.push(arP(`الإجمالي: ${JOB_COUNT} وظيفة · ${totReq} بند متطلبات · ${totResp} بند مهام — وكل بند له مقابل عربي مطابق في العدد والترتيب.`, { size: 18, bold: true, color: NAVY, before: 140 }));

const childrenB = children.splice(0, children.length);

/* ---------- closing (portrait) ---------- */
children.push(h2("End of Document"));
children.push(arP(`${P.nameAr} (${P.code}) — ${P.docTypeAr} — الإصدار ${P.version} — ${P.date}`, { size: 18, color: SLATE }));
children.push(arP("هذا المستند مُولَّد آلياً من ملف بيانات المتطلبات وملف بيانات الوظائف في المشروع. لإعادة توليده بعد أي تعديل على البيانات: نفّذ سكربت التوليد من مجلد docs.", { size: 17, color: SLATE }));
const childrenC = children;

/* ================= DOCUMENT ================= */
const PORTRAIT = { width: 11906, height: 16838 };
const LANDSCAPE = { orientation: "landscape", width: 11906, height: 16838 };
const MARGIN = { top: 1080, right: 1080, bottom: 1080, left: 1080 };

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 20 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", run: { size: 48, bold: true, color: NAVY, font: FONT }, paragraph: { spacing: { before: 240, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 30, bold: true, color: NAVY, font: FONT }, paragraph: { spacing: { before: 320, after: 200 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 25, bold: true, color: NAVY800, font: FONT }, paragraph: { spacing: { before: 240, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 22, bold: true, color: "333333", font: FONT }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [{ reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.RIGHT, style: { paragraph: { indent: { left: 420, hanging: 260 } } } }] }] },
  sections: [
    { properties: { page: { size: PORTRAIT, margin: MARGIN } }, headers: { default: mkHeader() }, footers: { default: mkFooter() }, children: childrenA },
    { properties: { page: { size: LANDSCAPE, margin: MARGIN } }, headers: { default: mkHeader() }, footers: { default: mkFooter() }, children: childrenB },
    { properties: { page: { size: PORTRAIT, margin: MARGIN } }, headers: { default: mkHeader() }, footers: { default: mkFooter() }, children: childrenC },
  ],
});

const OUT = path.join(HERE, "Meridian-HR-Website-SRS.docx");
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buf);
console.log("WROTE", OUT);
console.log("FR:", FR.length, "NFR:", NFR.length, "TOTAL:", TOTAL, "| jobs:", JOB_COUNT, "| req bullets:", totReq, "resp bullets:", totResp);
console.log("sections:", childrenA.length, childrenB.length, childrenC.length);
