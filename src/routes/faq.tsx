import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { useLang } from "@/lib/lang";

type Item = { q: string; a: string };

const copy: Record<"en" | "ar", {
  eyebrow: string;
  title: string;
  sub: string;
  candidatesTitle: string;
  candidates: Item[];
  clientsTitle: string;
  clients: Item[];
  stillTitle: string;
  stillBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  en: {
    eyebrow: "FAQ",
    title: "Questions we get asked most.",
    sub: "Straight answers for candidates and for companies. If your question is not here, email us and a human replies.",
    candidatesTitle: "FOR CANDIDATES",
    candidates: [
      {
        q: "How long does the process take?",
        a: "Most mandates move from application to offer in roughly 18 days. Roles with technical assessments or several panel stages take longer — you will always know which stage you are in and who is holding it.",
      },
      {
        q: "Do I have to pay anything?",
        a: "No. Acwad HR is paid by the hiring company. We never charge candidates for applying, interviewing, formatting a CV or receiving an offer. Anyone asking you for a fee in our name is not us.",
      },
      {
        q: "What happens after I apply?",
        a: "Your CV goes to the recruitment partner who owns that mandate. If your profile fits, you get a short screening call within five working days. If it does not fit this role, we keep your details for future mandates unless you ask us not to.",
      },
      {
        q: "Which documents should I send?",
        a: "A current CV is enough to start. We only ask for your ID, education certificates and references once you reach the offer stage, and we tell you in advance what will be needed.",
      },
      {
        q: "I applied before and was not selected. Can I apply again?",
        a: "Yes, and it counts for you rather than against you: we can see what you interviewed for previously, so the next conversation starts further along.",
      },
      {
        q: "How is my data handled?",
        a: "Your CV is stored for recruitment purposes only and is visible to the recruiting team working on your application. You can ask us to delete it at any time — our privacy policy sets out the detail.",
      },
    ],
    clientsTitle: "FOR COMPANIES",
    clients: [
      {
        q: "Can we take one service or all four?",
        a: "Recruitment, payroll, compliance and training are separate services with separate pricing. Most clients start with one and add others as they grow, and your account lead stays the same either way.",
      },
      {
        q: "How do you price your work?",
        a: "Recruitment is priced per placement or as a retained mandate. Payroll is a monthly fee per active employee. Compliance and training are quoted per scope. You get a written quote before any work starts.",
      },
      {
        q: "Can you work alongside our existing HR team?",
        a: "That is the most common setup. We take the execution-heavy work — payroll cycles, filings, sourcing, scheduling — while your team keeps policy ownership, internal communication and the final decision.",
      },
      {
        q: "Which countries do you cover?",
        a: "Egypt and the Gulf are our core markets. Our teams operate across the region, and a share of our mandates are delivered fully remotely.",
      },
      {
        q: "How do you keep our salary data confidential?",
        a: "Access is restricted by role: salary and personal data are visible only to the assigned payroll desk and the client contacts you name. Every change to a payroll record is logged with who made it and when.",
      },
      {
        q: "How quickly can you start?",
        a: "Payroll and compliance onboarding usually takes two to three weeks, including data migration. Recruitment mandates can open within days of an intake briefing.",
      },
    ],
    stillTitle: "Still have a question?",
    stillBody: "Send it to us and a member of the team will reply — usually the same working day.",
    ctaPrimary: "Email the team",
    ctaSecondary: "See open roles",
  },
  ar: {
    eyebrow: "الأسئلة الشائعة",
    title: "أكثر ما يُسألنا عنه.",
    sub: "إجابات مباشرة للمرشحين وللشركات. وإن لم يكن سؤالك هنا، راسلنا بالبريد وسيجيبك شخص من الفريق.",
    candidatesTitle: "للمرشحين",
    candidates: [
      {
        q: "كم تستغرق عملية التوظيف؟",
        a: "معظم المهام تنتقل من التقديم إلى العرض في حدود ١٨ يومًا. الوظائف التي تتضمن اختبارات فنية أو عدة مراحل مقابلات تستغرق وقتًا أطول — وستعرف دائمًا في أي مرحلة أنت ومن المسؤول عنها.",
      },
      {
        q: "هل أدفع أي مقابل؟",
        a: "لا. اكواد للخدمات البشرية تتقاضى أتعابها من الشركة صاحبة الوظيفة. لا نطلب من المرشحين أي رسوم مقابل التقديم أو المقابلات أو تنسيق السيرة الذاتية أو الحصول على عرض. وأي جهة تطلب منك رسومًا باسمنا ليست نحن.",
      },
      {
        q: "ماذا يحدث بعد أن أقدّم؟",
        a: "تصل سيرتك الذاتية إلى شريك التوظيف المسؤول عن الوظيفة. وإذا كان ملفك مناسبًا، ستتلقى مكالمة فرز قصيرة خلال خمسة أيام عمل. وإن لم يكن مناسبًا لهذه الوظيفة، نحتفظ ببياناتك لفرص قادمة إلا إذا طلبت منا خلاف ذلك.",
      },
      {
        q: "ما المستندات التي أرسلها؟",
        a: "سيرة ذاتية محدثة تكفي للبداية. نطلب صورة الهوية والشهادات الدراسية والتوصيات فقط عند الوصول لمرحلة العرض، ونخبرك مسبقًا بما سيُطلب.",
      },
      {
        q: "قدّمت سابقًا ولم يتم اختياري. هل أقدّم مرة أخرى؟",
        a: "نعم، وهذا في مصلحتك لا ضدك: نرى الوظائف التي قابلك فيها سابقًا، فتكون الجولة التالية أقصر وأدق.",
      },
      {
        q: "كيف تُعالَج بياناتي؟",
        a: "تُحفظ سيرتك الذاتية لأغراض التوظيف فقط، ويراها فريق التوظيف المسؤول عن طلبك. ويمكنك أن تطلب حذفها في أي وقت — وتفاصيل ذلك في سياسة الخصوصية.",
      },
    ],
    clientsTitle: "للشركات",
    clients: [
      {
        q: "هل نأخذ خدمة واحدة أم الأربع معًا؟",
        a: "التوظيف والرواتب والامتثال والتدريب خدمات منفصلة بتسعير منفصل. معظم العملاء يبدؤون بخدمة واحدة ثم يضيفون غيرها مع النمو، ومسؤول الحساب يبقى نفسه في الحالتين.",
      },
      {
        q: "كيف تحدّدون أسعاركم؟",
        a: "التوظيف يُسعَّر لكل تعيين أو كمهمة بالتكليف. الرواتب برسوم شهرية لكل موظف نشط. والامتثال والتدريب يُسعَّران حسب النطاق. وتحصل على عرض مكتوب قبل بدء أي عمل.",
      },
      {
        q: "هل تعملون مع فريق الموارد البشرية الموجود لدينا؟",
        a: "هذا هو الوضع الأكثر شيوعًا. نتولى العمل التنفيذي الكثيف — دورات الرواتب والإيداعات والبحث وجدولة المقابلات — بينما يبقى لفريقك ملكية السياسات والتواصل الداخلي والقرار النهائي.",
      },
      {
        q: "ما الدول التي تغطونها؟",
        a: "مصر ودول الخليج هي أسواقنا الأساسية. فرقنا تعمل في المنطقة، وجزء من مهامنا يُنفَّذ بالكامل عن بُعد.",
      },
      {
        q: "كيف تحافظون على سرية بيانات الرواتب؟",
        a: "الوصول مقيّد بالدور: بيانات الرواتب والبيانات الشخصية يراها فقط مكتب الرواتب المكلّف وجهات الاتصال التي تحدّدها في شركتك. وكل تعديل على سجل راتب يُسجَّل باسم من قام به ووقته.",
      },
      {
        q: "ما أسرع وقت للبدء؟",
        a: "تجهيز الرواتب والامتثال يستغرق عادة من أسبوعين إلى ثلاثة أسابيع، بما في ذلك ترحيل البيانات. أما مهام التوظيف فيمكن فتحها خلال أيام من جلسة التعريف.",
      },
    ],
    stillTitle: "لديك سؤال آخر؟",
    stillBody: "أرسله إلينا وسيرد عليك أحد أعضاء الفريق — عادة في نفس يوم العمل.",
    ctaPrimary: "راسل الفريق",
    ctaSecondary: "تصفّح الوظائف المتاحة",
  },
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Acwad HR — answers for candidates and clients" },
      {
        name: "description",
        content:
          "How long hiring takes, whether candidates pay fees, how our services are priced, and how we protect salary data. Straight answers from Acwad HR.",
      },
      { property: "og:title", content: "Acwad HR — Frequently asked questions" },
      {
        property: "og:description",
        content: "Straight answers for candidates and for companies hiring through Acwad HR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-2xl border border-ink/5 bg-white p-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDown className="mt-1 size-4 shrink-0 text-slate-2 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-sm leading-relaxed text-slate-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function FaqPage() {
  const { lang, toggle, dir } = useLang();
  const c = copy[lang];

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream font-sans">
      <SiteHeader lang={lang} onToggle={toggle} />

      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub} />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.candidatesTitle}</h2>
          <Accordion items={c.candidates} />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.clientsTitle}</h2>
          <Accordion items={c.clients} />
        </div>
      </section>

      <CtaBand
        title={c.stillTitle}
        body={c.stillBody}
        primaryLabel={c.ctaPrimary}
        secondaryLabel={c.ctaSecondary}
      />

      <SiteFooter lang={lang} />
    </div>
  );
}
