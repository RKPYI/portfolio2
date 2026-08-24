"use client";

import { EditableText } from "../Field";
import type { SkillGroup } from "@/types/portfolio";

function emptyGroup(): SkillGroup {
  return { id: crypto.randomUUID(), category: "", items: [] };
}

export default function Skills({
  items,
  editMode,
  onChange,
}: {
  items: SkillGroup[];
  editMode: boolean;
  onChange: (v: SkillGroup[]) => void;
}) {
  function update(id: string, patch: Partial<SkillGroup>) {
    onChange(items.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  }
  function remove(id: string) {
    onChange(items.filter((g) => g.id !== id));
  }
  function add() {
    onChange([...items, emptyGroup()]);
  }

  return (
    <section className="section-divider px-6 md:px-12 py-14 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <span className="eyebrow">Skills</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add category
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((g) => (
          <div key={g.id}>
            <EditableText
              editMode={editMode}
              value={g.category}
              onChange={(v) => update(g.id, { category: v })}
              className="font-mono text-xs uppercase tracking-wide text-accent mb-2"
              placeholder="Category, e.g. Languages"
            />
            {editMode ? (
              <EditableText
                editMode
                multiline
                value={g.items.join(", ")}
                onChange={(v) =>
                  update(g.id, {
                    items: v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className="text-sm"
                placeholder="Comma-separated skills"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs border border-line px-2 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {editMode && (
              <button
                onClick={() => remove(g.id)}
                className="font-mono text-xs text-muted hover:text-ink mt-2"
              >
                Remove category
              </button>
            )}
          </div>
        ))}
        {items.length === 0 && !editMode && (
          <p className="text-muted text-sm">Nothing here yet.</p>
        )}
      </div>
    </section>
  );
}
