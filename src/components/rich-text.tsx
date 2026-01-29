import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

type RichTextProps = {
  document: Document;
};

export function RichText({ document }: RichTextProps) {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      {documentToReactComponents(document, {
        renderNode: {
          [BLOCKS.HEADING_2]: (_node, children) => (
            <h2 className="mt-8 text-xl font-semibold">{children}</h2>
          ),
          [BLOCKS.HEADING_3]: (_node, children) => (
            <h3 className="mt-6 text-lg font-semibold">{children}</h3>
          ),
          [BLOCKS.PARAGRAPH]: (_node, children) => (
            <p className="leading-relaxed">{children}</p>
          ),
          [BLOCKS.QUOTE]: (_node, children) => (
            <blockquote className="border-l-4 border-zinc-300 pl-4 italic dark:border-zinc-600">
              {children}
            </blockquote>
          ),
          [INLINES.HYPERLINK]: (node, children) => (
            <Link
              href={node.data.uri as string}
              className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
            >
              {children}
            </Link>
          ),
          [BLOCKS.UL_LIST]: (_node, children) => (
            <ul className="list-disc pl-5 space-y-2">{children}</ul>
          ),
        },
      })}
    </div>
  );
}


