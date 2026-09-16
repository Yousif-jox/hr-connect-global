import { createFileRoute } from "@tanstack/react-router";

import { JOB_IDS } from "@/data/jobs";

/**
 * Sitemap generated from the live job data, so a role added to
 * src/data/jobs.ts appears here automatically — nothing to keep in sync.
 * URLs are absolute, using the origin the request arrived on.
 */
const STATIC_PAGES = ["/", "/jobs", "/requirements", "/about", "/faq", "/privacy", "/terms"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [...STATIC_PAGES, ...JOB_IDS.map((id) => `/jobs/${id}`)];

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`),
          "</urlset>",
          "",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
