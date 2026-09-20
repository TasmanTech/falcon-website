import Script from 'next/script';

interface JsonLdProps {
  id: string;
  schema: Record<string, unknown>;
}

export default function JsonLd({ id, schema }: JsonLdProps) {
  return (
    <Script id={id} type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}
