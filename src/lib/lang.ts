import { useEffect, useState } from "react";

export type Lang = "en" | "ar";

const KEY = "acwad-lang";

function read(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(KEY);
  return stored === "ar" ? "ar" : "en";
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(read());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (next: Lang) => {
    window.localStorage.setItem(KEY, next);
    setLangState(next);
  };

  const toggle = () => setLang(lang === "en" ? "ar" : "en");

  return { lang, setLang, toggle, dir: lang === "ar" ? ("rtl" as const) : ("ltr" as const) };
}
