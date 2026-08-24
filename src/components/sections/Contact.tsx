"use client";

import { EditableText } from "../Field";
import type { ContactData } from "@/types/portfolio";

export default function Contact({
  data,
  editMode,
  onChange,
}: {
  data: ContactData;
  editMode: boolean;
  onChange: (v: ContactData) => void;
}) {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24">
      <span className="eyebrow">Contact</span>
      <EditableText
        as="h2"
        editMode={editMode}
        value={data.message}
        onChange={(v) => onChange({ ...data, message: v })}
        className="font-display text-3xl md:text-5xl mt-4 max-w-2xl leading-tight"
        placeholder="Let's build something together."
        multiline
      />
      <div className="mt-6">
        {editMode ? (
          <EditableText
            editMode
            value={data.email}
            onChange={(v) => onChange({ ...data, email: v })}
            placeholder="you@example.com"
            className="w-64 font-mono text-sm"
          />
        ) : (
          data.email && (
            <a
              href={`mailto:${data.email}`}
              className="inline-block font-mono text-sm border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
            >
              {data.email}
            </a>
          )
        )}
      </div>
    </section>
  );
}
