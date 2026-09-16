# Meridian HR — Corporate Website

موقع تسويقي ثنائي اللغة (عربي / إنجليزي) لشركة خدمات موارد بشرية، مع نموذج تقديم فعلي على الوظائف.
A bilingual (Arabic / English) HR services website with a working job application form.

---

## التشغيل / Running

```sh
npm install          # install dependencies (bun install also works)
npm run dev          # dev server  →  http://localhost:8080
npm run build        # production build
npm run preview      # preview the production build
npx tsc --noEmit     # type check
npm run lint         # eslint
npm run format       # prettier
```

## الصفحات / Pages

| المسار | Route | الوصف |
|---|---|---|
| `/` | Home | الصفحة التعريفية: الخدمات، النتائج، العملاء، الدعوة للتواصل |
| `/jobs` | Open roles | ٢٤ وظيفة، كل واحدة ببطاقة قابلة للطي |
| `/jobs/<id>` | Job detail | صفحة مستقلة لكل وظيفة + نموذج التقديم (٢٤ صفحة) |
| `/requirements` | Hiring requirements | الشروط العامة، المستندات، ومراحل التوظيف |
| `/about` | About us | القصة، المؤشرات، القيم، وتغطية المدن |
| `/faq` | FAQ | ١٢ سؤالاً للمرشحين وللشركات |
| `/privacy` | Privacy policy | سياسة الخصوصية |
| `/terms` | Terms of use | شروط الاستخدام |
| `/sitemap.xml` | Sitemap | تُولَّد آلياً من بيانات الوظائف |

## نموذج التقديم / Application form

النموذج يعمل في الحالتين:

1. **بدون أي إعداد** — يتحوّل تلقائياً إلى فتح البريد برسالة جاهزة تحتوي ما أدخله المتقدم.
2. **بالإرسال المباشر** — يُفعَّل بإضافة متغيرات البيئة التالية فقط، بدون أي تعديل في الكود:

```sh
RESEND_API_KEY=...                                                  # مفتاح خدمة الإرسال
APPLY_TO_EMAIL=careers@your-domain.com                              # صندوق استقبال الطلبات
APPLY_FROM_EMAIL="Meridian HR Careers <careers@your-domain.com>"    # مرسل موثّق على النطاق
```

مسار الخادم `/api/apply` يتحقق من الحقول، ويقبل السيرة الذاتية بصيغ PDF/DOC/DOCX بحد أقصى ٥ ميجابايت،
وفيه حقل فخ مخفي وتحديد لمعدل الطلبات لكل عنوان شبكة. **لا يُخزَّن أي طلب في قاعدة بيانات** — يُسلَّم بالبريد.

### قراءة السيرة الذاتية / CV reading

عند الإرسال تُقرأ السيرة على الخادم ويُستخرج نصها كاملاً، ويُضمَّن في بريد الإشعار في قسم منسّق،
فيقرأ فريق التوظيف المحتوى دون فتح المرفق. يُقرأ `PDF` و `DOCX`؛ وملف `.doc` القديم أو الملف
التالف أو الفارغ يُعلن في البريد بوضوح **دون أن يمنع وصول الطلب**. المتقدم يرى في شاشة التأكيد
عدد الأحرف التي قُرئت ومعاينة من أول السطور.

```sh
node --experimental-strip-types docs/check-cv-reader.mjs   # فحص القارئ والبريد
```

## البيانات / Data

كل بيانات الوظائف في ملف واحد: `src/data/jobs.ts` — ٢٤ وظيفة، لكل وظيفة نسخة عربية وإنجليزية مطابقتان
في الترتيب وعدد العناصر. إضافة وظيفة = إضافة سجل واحد، وتظهر تلقائياً في القائمة والعدّاد وصفحة التفاصيل
وخريطة الموقع، وبدون تعديل أي مكوّن.

لفحص سلامة البيانات:

```sh
node --experimental-strip-types docs/check-jobs-data.mjs   # يجب أن ينتهي بـ PROBLEMS: NONE
```

## المستندات / Docs

مجلد `docs/` يحتوي مستند المتطلبات الكامل (٨٢ متطلب وظيفي + ٢٢ غير وظيفي)، وملف بيانات المتطلبات،
وسكربت توليد المستند، وسكربت فحص البيانات. التفاصيل في `docs/README.md`.

## البنية / Structure

```
src/
  components/     SiteHeader (header + footer), PageHero, JobCard,
                  ApplicationForm, CtaBand, LegalBody
  data/jobs.ts    مصدر الحقيقة الوحيد لبيانات الوظائف
  lib/            اللغة (AR/EN) واتجاه الصفحة
  routes/         صفحات الموقع
  routes/api/     مسارات الخادم
  styles.css      الهوية: الألوان والخطوط (لا تُعدَّل بلا سبب)
```

## ملاحظات / Notes

- اللغة الافتراضية إنجليزية، ويُحفظ اختيار الزائر في المتصفح؛ واتجاه الصفحة يُضبط تلقائياً (RTL/LTR).
- الهوية معرّفة بالكامل في `src/styles.css` — أي إضافة تستخدم نفس الرموز الموجودة.
- نموذج التقديم لا يحتاج قاعدة بيانات؛ لتحويله إلى نظام تتبع طلبات كامل يلزم تخزين + شاشة مراجعة.
