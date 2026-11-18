import React, { useEffect } from 'react';

interface JsonLdSchemaProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}

export const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ schema, id = 'json-ld-schema' }) => {
  useEffect(() => {
    // Locate or create script tag
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    try {
      script.text = JSON.stringify(schema, null, 2);
    } catch (e) {
      console.error('Failed to stringify JSON-LD schema', e);
    }

    return () => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
    };
  }, [schema, id]);

  return null;
};
