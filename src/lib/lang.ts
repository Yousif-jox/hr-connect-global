import { useEffect, useRef, useState } from "react";

export type Lang = "en" | "ar";

const KEY = "meridian-lang";

export function useLang() {
  const [lang, setLang] = useState<Lang>("en");
  const hydrated = useRef(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "ar" || stored === "en") setLang(stored);
    hydrated.current = true;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (hydrated.current) window.localStorage.setItem(KEY, lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return { lang, setLang, toggle, dir: lang === "ar" ? ("rtl" as const) : ("ltr" as const) };
}
