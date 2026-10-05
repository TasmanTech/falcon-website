interface JsonLdProps {
  id: string;
  schema: Record<string, unknown>;
}

// Rendered as a plain <script> so the JSON-LD is in the server HTML for crawlers that don't run JavaScript.
// next/script would inject it client-side after hydration instead.
export default function JsonLd({ id, schema }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
