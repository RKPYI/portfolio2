"use client";

import { EditableText } from "../Field";
import type { ExperienceItem } from "@/types/portfolio";

function emptyItem(): ExperienceItem {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    tech: [],
  };
}

export default function Experience({
  items,
  editMode,
  onChange,
}: {
  items: ExperienceItem[];
  editMode: boolean;
  onChange: (v: ExperienceItem[]) => void;
}) {
  function update(id: string, patch: Partial<ExperienceItem>) {
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
        <span className="eyebrow">Experience</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add role
          </button>
        )}
      </div>

      <div className="space-y-10">
        {items.map((item) => (
          <div key={item.id} className="grid md:grid-cols-[140px_1fr] gap-4">
            <div className="font-mono text-xs text-muted flex items-center gap-1 flex-wrap">
              <EditableText
                editMode={editMode}
                value={item.startDate}
                onChange={(v) => update(item.id, { startDate: v })}
                placeholder="2023"
                className="w-16"
              />
              <span>—</span>
              <EditableText
                editMode={editMode}
                value={item.endDate}
                onChange={(v) => update(item.id, { endDate: v })}
                placeholder="Present"
                className="w-16"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <EditableText
                  as="h3"
                  editMode={editMode}
                  value={item.role}
                  onChange={(v) => update(item.id, { role: v })}
                  className="font-display text-xl"
                  placeholder="Role"
                />
                <span className="text-muted">at</span>
                <EditableText
                  editMode={editMode}
                  value={item.company}
                  onChange={(v) => update(item.id, { company: v })}
                  className="font-display text-xl"
                  placeholder="Company"
                />
              </div>
              <EditableText
                as="p"
                editMode={editMode}
                value={item.description}
                onChange={(v) => update(item.id, { description: v })}
                className="text-muted mt-2 leading-relaxed"
                placeholder="What you did and achieved."
                multiline
              />
              <EditableText
                editMode={editMode}
                value={item.tech.join(", ")}
                onChange={(v) =>
                  update(item.id, {
                    tech: v
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                className="font-mono text-xs text-accent mt-2"
                placeholder="Tech used, comma separated"
              />
              {!editMode && item.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs border border-line px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
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
