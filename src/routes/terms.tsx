import { createFileRoute } from "@tanstack/react-router";

import { LegalBody, type LegalSection } from "@/components/LegalBody";
import { PageHero } from "@/components/PageHero";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { useLang } from "@/lib/lang";

const copy: Record<
  "en" | "ar",
  { eyebrow: string; title: string; sub: string; updated: string; sections: LegalSection[] }
> = {
  en: {
    eyebrow: "LEGAL",
    title: "Terms of use",
    sub: "The rules that apply when you use this website, browse our open roles or submit an application.",
    updated: "Last updated: 16 September 2026",
    sections: [
      {
        heading: "1. Acceptance of these terms",
        body: [
          "By using this website you agree to these terms. If you do not agree with them, please do not use the site or submit an application.",
          "These terms apply to the website only. If you engage Acwad HR for services, the signed service agreement governs that relationship.",
        ],
      },
      {
        heading: "2. Use of the website",
        body: ["You agree to use this website lawfully and only for its intended purpose."],
        list: [
          "Do not submit false information, someone else's CV, or documents you are not entitled to share.",
          "Do not attempt to gain access to areas of the site that are not public, or to disrupt or overload the service.",
          "Do not scrape, copy or republish listings and content at scale without our written permission.",
        ],
      },
      {
        heading: "3. Accuracy of job listings",
        body: [
          "Roles published here are live mandates we are recruiting for on behalf of client companies. We update the list regularly, but a mandate can be filled or withdrawn at any time without notice.",
          "Job descriptions, locations, working arrangements and experience requirements are provided by the client company. We publish them in good faith and correct errors when we find them.",
        ],
      },
      {
        heading: "4. Applications",
        body: [
          "Submitting an application does not create an employment relationship with Acwad HR or with the client company, and it does not guarantee an interview or an offer.",
          "You confirm that the information and documents you submit are accurate and yours to share, and you consent to us processing them as described in our privacy policy.",
          "We may keep your application for future mandates unless you ask us to delete it.",
        ],
      },
      {
        heading: "5. No fees to candidates",
        body: [
          "Acwad HR is paid by the hiring company. We never charge candidates for applying, for an interview, for preparing or formatting a CV, or for receiving a job offer.",
          "If anyone asks you for payment in our name, do not pay, and report it to hello@acwadhr.com so we can act on it.",
        ],
      },
      {
        heading: "6. Intellectual property",
        body: [
          "The design, text, structure and code of this website belong to Acwad HR, except for client names and marks which belong to their respective owners. You may view, download and print pages for your own reference, but not resell or republish them.",
        ],
      },
      {
        heading: "7. Third-party links and services",
        body: [
          "This website may link to third-party sites, and may use third-party providers for hosting, email and file handling. We are not responsible for the content, availability or privacy practices of websites we do not operate.",
          "Where external job platforms also carry our postings, the terms of those platforms apply to your use of them.",
        ],
      },
      {
        heading: "8. Limitation of liability",
        body: [
          "We keep this website available and accurate to the best of our ability, but we do not promise uninterrupted access or that every listing will still be open when you read it.",
          "To the extent permitted by law, Acwad HR is not liable for indirect or consequential loss arising from your use of this website, including loss of opportunity. Nothing in these terms limits liability that cannot be limited by law.",
        ],
      },
      {
        heading: "9. Governing law",
        body: [
          "These terms are governed by the laws of the Arab Republic of Egypt. Courts in Cairo have jurisdiction over any dispute arising from use of this website, without affecting any mandatory protection you have in your country of residence.",
        ],
      },
      {
        heading: "10. Changes to these terms",
        body: [
          "We may update these terms when the website or the law changes. The date at the top of this page shows the current version, and continued use of the site after a change means you accept the updated terms.",
        ],
      },
      {
        heading: "11. Contact",
        body: [
          "Questions about these terms can be sent to hello@acwadhr.com, or posted to Acwad HR, Cairo, Egypt.",
        ],
      },
    ],
  },
  ar: {
    eyebrow: "قانوني",
    title: "شروط الاستخدام",
    sub: "القواعد التي تنطبق عند استخدامك هذا الموقع أو تصفّحك للوظائف المتاحة أو إرسالك طلب تقديم.",
    updated: "آخر تحديث: ١٦ سبتمبر ٢٠٢٦",
    sections: [
      {
        heading: "١. قبول الشروط",
        body: [
          "باستخدامك هذا الموقع فإنك توافق على هذه الشروط. وإذا لم توافق عليها، يُرجى عدم استخدام الموقع أو إرسال طلب تقديم.",
          "تنطبق هذه الشروط على الموقع فقط. أما إذا تعاقدت مع اكواد للخدمات البشرية للحصول على خدمات، فإن اتفاقية الخدمة الموقّعة هي التي تحكم تلك العلاقة.",
        ],
      },
      {
        heading: "٢. استخدام الموقع",
        body: ["توافق على استخدام الموقع بشكل قانوني وفي أغراضه المقصودة فقط."],
        list: [
          "لا ترسل معلومات غير صحيحة، ولا سيرة ذاتية لشخص آخر، ولا مستندات لا يحق لك مشاركتها.",
          "لا تحاول الوصول إلى أجزاء غير عامة من الموقع، ولا تعطيل الخدمة أو إثقالها.",
          "لا تستخرج أو تنسخ أو تعيد نشر الوظائف والمحتوى على نطاق واسع دون إذن كتابي منّا.",
        ],
      },
      {
        heading: "٣. دقة إعلانات الوظائف",
        body: [
          "الوظائف المنشورة هنا هي مهام فعلية نعمل عليها بالنيابة عن شركات عملاء. نحدّث القائمة بانتظام، لكن أي وظيفة قد تُشغل أو تُلغى في أي وقت دون إشعار مسبق.",
          "أوصاف الوظائف والمواقع وأنظمة العمل ومتطلبات الخبرة تأتي من الشركة العميلة. ننشرها بحسن نية ونصحّح الأخطاء متى اكتشفناها.",
        ],
      },
      {
        heading: "٤. التقديم على الوظائف",
        body: [
          "إرسال الطلب لا يُنشئ علاقة عمل مع اكواد للخدمات البشرية ولا مع الشركة العميلة، ولا يضمن الحصول على مقابلة أو عرض وظيفي.",
          "أنت تُقر بأن المعلومات والمستندات التي ترسلها صحيحة وتملك حق مشاركتها، وتوافق على معالجتنا لها كما هو موضح في سياسة الخصوصية.",
          "قد نحتفظ بطلبك لفرص مستقبلية إلا إذا طلبت منّا حذفه.",
        ],
      },
      {
        heading: "٥. لا رسوم على المرشحين",
        body: [
          "اكواد للخدمات البشرية تتقاضى أتعابها من الشركة صاحبة الوظيفة. ولا نطلب من المرشحين أي رسوم مقابل التقديم أو المقابلة أو إعداد وتنسيق السيرة الذاتية أو الحصول على عرض وظيفي.",
          "وإذا طلب منك أي شخص مبالغ باسمنا، فلا تدفع، وأبلغنا على hello@acwadhr.com حتى نتخذ اللازم.",
        ],
      },
      {
        heading: "٦. حقوق الملكية الفكرية",
        body: [
          "تصميم هذا الموقع ونصوصه وبناؤه وشيفرته البرمجية مملوكة لاكواد للخدمات البشرية، عدا أسماء وعلامات العملاء فمملوكة لأصحابها. ويجوز لك الاطلاع على الصفحات وتحميلها وطباعتها لاستخدامك الشخصي، دون إعادة بيعها أو نشرها.",
        ],
      },
      {
        heading: "٧. روابط وخدمات الغير",
        body: [
          "قد يحتوي الموقع على روابط لمواقع أخرى، وقد نستخدم مزوّدين خارجيين للاستضافة والبريد والتعامل مع الملفات. ولا نتحمل مسؤولية محتوى أو توافر أو ممارسات خصوصية مواقع لا نُديرها.",
          "وحيث تُنشر وظائفنا على منصات توظيف خارجية، فإن شروط تلك المنصات هي التي تنطبق على استخدامك لها.",
        ],
      },
      {
        heading: "٨. حدود المسؤولية",
        body: [
          "نبذل جهدنا لإبقاء الموقع متاحًا ومعلوماته دقيقة، لكننا لا نضمن استمرار الوصول دون انقطاع ولا أن تكون كل وظيفة ما زالت متاحة عند قراءتها.",
          "وبالقدر الذي يسمح به القانون، لا نتحمل المسؤولية عن أي خسارة غير مباشرة أو تبعية تنشأ من استخدامك الموقع، بما في ذلك فوات الفرص. ولا يحد أي بند هنا من أي مسؤولية لا يجوز تحديدها قانونًا.",
        ],
      },
      {
        heading: "٩. القانون الواجب التطبيق",
        body: [
          "تخضع هذه الشروط لأحكام قوانين جمهورية مصر العربية، وتختص محاكم القاهرة بنظر أي نزاع ينشأ عن استخدام الموقع، دون المساس بأي حماية إلزامية تكفلها لك قوانين بلد إقامتك.",
        ],
      },
      {
        heading: "١٠. التغييرات على هذه الشروط",
        body: [
          "يجوز لنا تحديث هذه الشروط عند تغيّر الموقع أو القانون. ويوضّح التاريخ في أعلى الصفحة النسخة السارية، ويُعد استمرارك في استخدام الموقع بعد أي تغيير موافقةً على الشروط المحدَّثة.",
        ],
      },
      {
        heading: "١١. التواصل",
        body: [
          "لأي استفسار عن هذه الشروط راسلنا على hello@acwadhr.com، أو بالبريد إلى: اكواد للخدمات البشرية، القاهرة، مصر.",
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use | Acwad HR" },
      {
        name: "description",
        content:
          "The terms that apply when you use the Acwad HR website, browse open roles or submit an application — including our no-fees-to-candidates rule.",
      },
      { property: "og:title", content: "Terms of use — Acwad HR" },
      { property: "og:description", content: "Rules for using this website and applying for roles." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang, toggle, dir } = useLang();
  const c = copy[lang];

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream font-sans">
      <SiteHeader lang={lang} onToggle={toggle} />

      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub}>
        <p className="text-sm text-cream/45">{c.updated}</p>
      </PageHero>

      <LegalBody sections={c.sections} />

      <SiteFooter lang={lang} />
    </div>
  );
}
