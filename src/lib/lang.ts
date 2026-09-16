import { useEffect, useState } from "react";

export type Lang = "en" | "ar";

const KEY = "meridian-lang";

export function useLang() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "ar" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(KEY, lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return { lang, setLang, toggle, dir: lang === "ar" ? ("rtl" as const) : ("ltr" as const) };
}
