import { useEffect } from "react";
import { siteConfig } from "../lib/siteConfig";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
}

const upsertMeta = (
  key: string,
  attr: "name" | "property",
  content: string
) => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

/** Keeps title, description, canonical, and social cards in sync per route. */
export function useSeo({ title, description, path }: SeoOptions) {
  useEffect(() => {
    const url = `${siteConfig.url}${path}`;

    document.title = title;
    upsertMeta("description", "name", description);
    upsertCanonical(url);

    upsertMeta("og:title", "property", title);
    upsertMeta("og:description", "property", description);
    upsertMeta("og:url", "property", url);

    upsertMeta("twitter:title", "name", title);
    upsertMeta("twitter:description", "name", description);
  }, [title, description, path]);
}
