"use client";

import { EditableText } from "../Field";
import type { EducationItem } from "@/types/portfolio";

function emptyItem(): EducationItem {
  return {
    id: crypto.randomUUID(),
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    details: "",
  };
}

export default function Education({
  items,
  editMode,
  onChange,
}: {
  items: EducationItem[];
  editMode: boolean;
  onChange: (v: EducationItem[]) => void;
}) {
  function update(id: string, patch: Partial<EducationItem>) {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function remove(id: string) {
    onChange(items.filter((it) => it.id !== id));
  }
  function add() {
    onChange([...items, emptyItem()]);
  }

  return (
    <section className="section-divider px-6 md:px-12 py-14 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <span className="eyebrow">Education</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add school
          </button>
        )}
      </div>

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="grid md:grid-cols-[140px_1fr] gap-4">
            <div className="font-mono text-xs text-muted flex items-center gap-1 flex-wrap">
              <EditableText
                editMode={editMode}
                value={item.startDate}
                onChange={(v) => update(item.id, { startDate: v })}
                placeholder="2018"
                className="w-16"
              />
              <span>—</span>
              <EditableText
                editMode={editMode}
                value={item.endDate}
                onChange={(v) => update(item.id, { endDate: v })}
                placeholder="2022"
                className="w-16"
              />
            </div>
            <div>
              <EditableText
                as="h3"
                editMode={editMode}
                value={item.school}
                onChange={(v) => update(item.id, { school: v })}
                className="font-display text-xl"
                placeholder="School / University"
              />
              <EditableText
                editMode={editMode}
                value={item.degree}
                onChange={(v) => update(item.id, { degree: v })}
                className="font-mono text-xs text-accent mt-1"
                placeholder="Degree, e.g. B.S. Computer Science"
              />
              <EditableText
                as="p"
                editMode={editMode}
                value={item.details}
                onChange={(v) => update(item.id, { details: v })}
                className="text-muted mt-2 leading-relaxed"
                placeholder="Honors, coursework, thesis, etc."
                multiline
              />
              {editMode && (
                <button
                  onClick={() => remove(item.id)}
                  className="font-mono text-xs text-muted hover:text-ink mt-3"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && !editMode && (
          <p className="text-muted text-sm">Nothing here yet.</p>
        )}
      </div>
    </section>
  );
}
