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
    title: "Privacy policy",
    sub: "How Acwad HR collects, uses and protects personal data — including the CVs and applications submitted through this website.",
    updated: "Last updated: 16 September 2026",
    sections: [
      {
        heading: "1. Who we are",
        body: [
          "Acwad HR (اكواد للخدمات البشرية) provides recruitment, payroll, compliance and training services to companies across Egypt and the Gulf. We are the data controller for the personal data described in this policy.",
          "You can reach us about anything in this policy at hello@acwadhr.com.",
        ],
      },
      {
        heading: "2. Data we collect",
        body: [
          "We only collect what we need to respond to you and to run a recruitment or payroll process.",
        ],
        list: [
          "Contact details you give us: name, email address, phone number and current location.",
          "Application data: the role you applied for, your years of experience, any portfolio or LinkedIn link you provide, and your cover note.",
          "Documents you upload: your CV or résumé in PDF, DOC or DOCX format, and later any documents we request at the offer stage.",
          "Payroll and employee data, when you are employed by one of our clients and we run their payroll: identification numbers, bank details, salary components and statutory registration data.",
          "Correspondence: emails, messages and notes from calls and interviews.",
          "Technical data: the IP address and browser type recorded when you submit a form, used to protect the site against spam and abuse.",
        ],
      },
      {
        heading: "3. Why we process it",
        body: [
          "To assess your application and contact you about roles that match your profile; to consider you for future mandates when a current role is not a fit; to run payroll, statutory filings and benefits for client employees; to meet legal, tax and social insurance obligations; and to keep the website secure.",
        ],
      },
      {
        heading: "4. Legal basis",
        body: [
          "We process application data on the basis of your consent, which you give by ticking the consent statement before submitting the application form, and on the basis of our legitimate interest in carrying out recruitment.",
          "Payroll and employment data is processed to perform the employment contract and to comply with legal obligations.",
        ],
      },
      {
        heading: "5. Who we share it with",
        body: [
          "For recruitment, your CV and application details are shared with the client company that owns the mandate you applied for, and only for that purpose.",
          "We use service providers for email delivery, website hosting and file storage. They process data on our instructions and are not permitted to use it for their own purposes.",
          "We do not sell personal data, and we do not share it for third-party marketing.",
        ],
      },
      {
        heading: "6. CVs and candidate data",
        body: [
          "When you submit the application form on this website, your CV is delivered by email to our recruiting inbox and stored in our recruitment records. Access is limited to the recruiting team working on your application.",
          "We keep your application for as long as it is relevant to live or upcoming mandates. If you want your CV and application removed, email us and we will delete them and confirm that we have done so.",
        ],
      },
      {
        heading: "7. Retention",
        body: [
          "Recruitment records are kept for up to 24 months from the last contact, unless you ask us to delete them earlier.",
          "Payroll, tax and social insurance records are kept for the periods required by the applicable law in each country where we operate, which may be several years after the end of the employment relationship.",
        ],
      },
      {
        heading: "8. Cookies and local storage",
        body: [
          "This website uses your browser's local storage to remember your language preference (Arabic or English) between visits. That value stays on your device and is not used for advertising.",
          "We do not set advertising or cross-site tracking cookies. If analytics are introduced in future, this policy will be updated before they go live.",
        ],
      },
      {
        heading: "9. Your rights",
        body: ["You can exercise the following rights at any time by emailing hello@acwadhr.com."],
        list: [
          "Access: ask for a copy of the personal data we hold about you.",
          "Correction: ask us to fix data that is wrong or incomplete.",
          "Erasure: ask us to delete your data, including your CV, where we are not required by law to keep it.",
          "Restriction and objection: ask us to stop processing your data for recruitment.",
          "Withdrawal of consent: withdraw at any time; it does not affect processing carried out before the withdrawal.",
        ],
      },
      {
        heading: "10. Security",
        body: [
          "Salary and personal data are restricted by role, so that only the payroll desk and the contacts named by the client can see them. Access is password-protected, connections to this website are encrypted, and changes to payroll records are logged.",
        ],
      },
      {
        heading: "11. Changes to this policy",
        body: [
          "If we change how we handle personal data we will update this page and change the date at the top. Material changes affecting candidates or employees will also be communicated by email where we have your address.",
        ],
      },
      {
        heading: "12. Contact",
        body: [
          "For any privacy request, or if you believe your data has been mishandled, write to hello@acwadhr.com. We aim to respond within five working days.",
        ],
      },
    ],
  },
  ar: {
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    sub: "كيف تجمع اكواد للخدمات البشرية البيانات الشخصية وتستخدمها وتحميها — بما يشمل السير الذاتية والطلبات المقدَّمة من خلال هذا الموقع.",
    updated: "آخر تحديث: ١٦ سبتمبر ٢٠٢٦",
    sections: [
      {
        heading: "١. من نحن",
        body: [
          "اكواد للخدمات البشرية تقدّم خدمات التوظيف والرواتب والامتثال والتدريب لشركات في مصر ودول الخليج. ونحن المتحكّم في البيانات الشخصية المشروحة في هذه السياسة.",
          "يمكنك مراسلتنا بخصوص أي بند في هذه السياسة على hello@acwadhr.com.",
        ],
      },
      {
        heading: "٢. البيانات التي نجمعها",
        body: ["نجمع فقط ما نحتاجه للرد عليك أو لإدارة عملية توظيف أو دورة رواتب."],
        list: [
          "بيانات التواصل التي تقدّمها: الاسم والبريد الإلكتروني والهاتف والمدينة الحالية.",
          "بيانات الطلب: الوظيفة التي قدّمت عليها، سنوات خبرتك، وأي رابط لملف أعمال أو LinkedIn تقدّمه، ورسالتك التعريفية.",
          "المستندات التي ترفعها: سيرتك الذاتية بصيغة PDF أو DOC أو DOCX، ولاحقًا أي مستندات نطلبها في مرحلة العرض.",
          "بيانات الرواتب والموظفين، عند عملك لدى أحد عملائنا وتولّينا صرف رواتبهم: أرقام الهوية، وبيانات البنك، ومكوّنات الراتب، وبيانات التسجيل القانوني.",
          "المراسلات: رسائل البريد والمحادثات والملاحظات المدوّنة من المكالمات والمقابلات.",
          "بيانات تقنية: عنوان الشبكة ونوع المتصفح المسجّل عند إرسال أي نموذج، لحماية الموقع من السبام وإساءة الاستخدام.",
        ],
      },
      {
        heading: "٣. لماذا نعالج بياناتك",
        body: [
          "لتقييم طلبك والتواصل معك بشأن الوظائف المناسبة لملفك؛ وأخذك في الاعتبار في مهام مستقبلية عندما لا تناسبك وظيفة حالية؛ وتنفيذ الرواتب والإقرارات القانونية والمزايا لموظفي العملاء؛ والوفاء بالالتزامات القانونية والضريبية والتأمينية؛ والحفاظ على أمن الموقع.",
        ],
      },
      {
        heading: "٤. الأساس القانوني للمعالجة",
        body: [
          "نعالج بيانات الطلبات بناءً على موافقتك، التي تُبديها بتأشير خانة الإقرار قبل إرسال النموذج، وبناءً على مصلحتنا المشروعة في إتمام أعمال التوظيف.",
          "أما بيانات الرواتب والعمل فتُعالَج لتنفيذ عقد العمل وللوفاء بالالتزامات القانونية.",
        ],
      },
      {
        heading: "٥. مع من نشارك البيانات",
        body: [
          "في التوظيف، تُشارَك سيرتك الذاتية وبيانات طلبك مع الشركة صاحبة الوظيفة التي قدّمت عليها، ولهذا الغرض فقط.",
          "نستخدم مزوّدين لخدمات إرسال البريد واستضافة الموقع وتخزين الملفات. يعالجون البيانات بتعليماتنا ولا يُسمح لهم باستخدامها لمصلحتهم.",
          "لا نبيع البيانات الشخصية ولا نشاركها لأغراض تسويق لأي جهة أخرى.",
        ],
      },
      {
        heading: "٦. السير الذاتية وبيانات المرشحين",
        body: [
          "عند إرسال نموذج التقديم من هذا الموقع، تصل سيرتك الذاتية بالبريد إلى صندوق فريق التوظيف وتُحفظ في سجلات التوظيف لدينا. والوصول إليها مقصور على فريق التوظيف العامل على طلبك.",
          "نحتفظ بطلبك طالما كان ذا صلة بمهام نشطة أو مرتقبة. وإذا أردت حذف سيرتك وطلبك، راسلنا وسنحذفهما ونؤكد لك ذلك.",
        ],
      },
      {
        heading: "٧. مدة الاحتفاظ",
        body: [
          "تُحفظ سجلات التوظيف لمدة تصل إلى ٢٤ شهرًا من آخر تواصل، إلا إذا طلبت حذفها قبل ذلك.",
          "تُحفظ سجلات الرواتب والضرائب والتأمينات للمدد التي تلزمها القوانين المعمول بها في كل دولة نعمل بها، وقد تصل إلى عدة سنوات بعد انتهاء علاقة العمل.",
        ],
      },
      {
        heading: "٨. ملفات تعريف الارتباط والتخزين المحلي",
        body: [
          "يستخدم الموقع التخزين المحلي في متصفحك لتذكّر لغة العرض التي اخترتها (العربية أو الإنجليزية) بين الزيارات. وتبقى هذه القيمة على جهازك ولا تُستخدم لأي إعلانات.",
          "لا نضع ملفات تعريف ارتباط إعلانية ولا تتبّع عبر المواقع. وإذا أُضيفت أدوات تحليل مستقبلًا، سيُحدَّث هذا البند قبل تشغيلها.",
        ],
      },
      {
        heading: "٩. حقوقك",
        body: ["يمكنك ممارسة الحقوق التالية في أي وقت بمراسلتنا على hello@acwadhr.com."],
        list: [
          "الاطلاع: طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك.",
          "التصحيح: طلب تصحيح البيانات غير الصحيحة أو الناقصة.",
          "المحو: طلب حذف بياناتك، بما فيها سيرتك الذاتية، عندما لا يُلزمنا القانون بالاحتفاظ بها.",
          "التقييد والاعتراض: طلب وقف معالجة بياناتك لأغراض التوظيف.",
          "سحب الموافقة: في أي وقت، دون أن يؤثر ذلك على المعالجة التي تمت قبل السحب.",
        ],
      },
      {
        heading: "١٠. الأمان",
        body: [
          "بيانات الرواتب والبيانات الشخصية مقيّدة بالدور الوظيفي، بحيث لا يراها إلا مكتب الرواتب وجهات الاتصال التي تحدّدها الشركة العميلة. والوصول محمي بكلمات مرور، والاتصال بالموقع مشفّر، وكل تعديل على سجلات الرواتب يُسجَّل.",
        ],
      },
      {
        heading: "١١. التغييرات على هذه السياسة",
        body: [
          "إذا غيّرنا طريقة تعاملنا مع البيانات الشخصية، سنحدّث هذه الصفحة ونغيّر التاريخ في أعلاها. وسنبلّغ بالتغييرات الجوهرية التي تمس المرشحين أو الموظفين بالبريد الإلكتروني متى كان لدينا عنوانهم.",
        ],
      },
      {
        heading: "١٢. التواصل",
        body: [
          "لأي طلب يتعلق بالخصوصية، أو إذا كنت ترى أن بياناتك قد أُسيء التعامل معها، راسلنا على hello@acwadhr.com. ونستهدف الرد خلال خمسة أيام عمل.",
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy | Acwad HR" },
      {
        name: "description",
        content:
          "How Acwad HR collects, uses, shares and protects personal data, including candidate CVs submitted through this website.",
      },
      { property: "og:title", content: "Privacy policy — Acwad HR" },
      { property: "og:description", content: "How we handle personal data, CVs and candidate records." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
