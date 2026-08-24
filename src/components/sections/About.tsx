"use client";

import { EditableText } from "../Field";
import type { AboutData } from "@/types/portfolio";

export default function About({
  data,
  editMode,
  onChange,
}: {
  data: AboutData;
  editMode: boolean;
  onChange: (v: AboutData) => void;
}) {
  return (
    <section className="section-divider px-6 md:px-12 py-14 md:py-20 grid md:grid-cols-[140px_1fr] gap-6">
      <span className="eyebrow">About</span>
      <div className="max-w-2xl space-y-4">
        <EditableText
          as="p"
          editMode={editMode}
          value={data.short}
          onChange={(v) => onChange({ ...data, short: v })}
          className="text-xl font-display leading-snug"
          placeholder="Short bio, 1–2 sentences."
          multiline
        />
        <EditableText
          as="p"
          editMode={editMode}
          value={data.long}
          onChange={(v) => onChange({ ...data, long: v })}
          className="text-muted leading-relaxed"
          placeholder="Longer narrative bio — your story, how you got here."
          multiline
        />
      </div>
    </section>
  );
}
