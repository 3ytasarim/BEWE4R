import React from "react";
import { Link } from "wouter";

/**
 * A small, safe Markdown renderer for blog posts (no HTML is ever injected): headings (## / ###), bullet and numbered
 * lists, paragraphs, **bold**, *italic* and [links](https://… or /internal-path).
 */

type Block =
  | { kind: "h2" | "h3"; text: string }
  | { kind: "ul" | "ol"; items: string[] }
  | { kind: "p"; text: string };

export function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (list) blocks.push(list);
    list = null;
  };

  for (const raw of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const h = line.match(/^(#{2,3})\s+(.+)$/);
    const ul = line.match(/^[-*]\s+(.+)$/);
    const ol = line.match(/^\d+[.)]\s+(.+)$/);
    if (h) {
      flush();
      blocks.push({ kind: h[1] === "##" ? "h2" : "h3", text: h[2]! });
    } else if (ul || ol) {
      const kind = ul ? "ul" : "ol";
      if (!list || list.kind !== kind) {
        flush();
        list = { kind, items: [] };
      }
      list.items.push((ul ?? ol)![1]!);
    } else {
      flush();
      blocks.push({ kind: "p", text: line });
    }
  }
  flush();
  return blocks;
}

const SAFE_HREF = /^(https?:\/\/|mailto:|\/)/i;
const LINK_CLASS = "font-medium text-[#0f0f0f] underline underline-offset-2 transition-colors hover:text-[#0f0f0f]/60";

/** **bold**, *italic* and [text](url) inside one line. */
export function renderInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let key = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(
        <strong key={key++} className="font-semibold text-[#0f0f0f]">
          {m[1]}
        </strong>,
      );
    } else if (m[2] !== undefined) {
      out.push(<em key={key++}>{m[2]}</em>);
    } else if (m[3] !== undefined && SAFE_HREF.test(m[4]!)) {
      const href = m[4]!;
      out.push(
        href.startsWith("/") ? (
          <Link key={key++} href={href} className={LINK_CLASS}>
            {m[3]}
          </Link>
        ) : (
          <a key={key++} href={href} className={LINK_CLASS} target="_blank" rel="noopener noreferrer">
            {m[3]}
          </a>
        ),
      );
    } else out.push(m[0]);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="space-y-6 text-[17px] leading-[1.75] text-[#374151]">
      {parseBlocks(content).map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={i} className="!mt-12 font-display text-3xl leading-tight text-[#0f0f0f] lg:text-4xl">
                {renderInline(b.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="!mt-8 font-display text-2xl leading-snug text-[#0f0f0f]">
                {renderInline(b.text)}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-[#0f0f0f]">
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#0f0f0f]">
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ol>
            );
          default:
            return <p key={i}>{renderInline(b.text)}</p>;
        }
      })}
    </div>
  );
}
