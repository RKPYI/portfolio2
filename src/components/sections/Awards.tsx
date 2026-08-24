"use client";

import { EditableText } from "../Field";
import type { AwardItem } from "@/types/portfolio";

function emptyItem(): AwardItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    issuer: "",
    date: "",
    description: "",
  };
}

export default function Awards({
  items,
  editMode,
  onChange,
}: {
  items: AwardItem[];
  editMode: boolean;
  onChange: (v: AwardItem[]) => void;
}) {
  function update(id: string, patch: Partial<AwardItem>) {
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
        <span className="eyebrow">Awards &amp; Recognition</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add award
          </button>
        )}
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="grid md:grid-cols-[140px_1fr] gap-4">
            <EditableText
              editMode={editMode}
              value={item.date}
              onChange={(v) => update(item.id, { date: v })}
              className="font-mono text-xs text-muted"
              placeholder="2024"
            />
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <EditableText
                  as="h3"
                  editMode={editMode}
                  value={item.title}
                  onChange={(v) => update(item.id, { title: v })}
                  className="font-display text-lg"
                  placeholder="Award title"
                />
                <span className="text-muted text-sm">
                  <EditableText
                    editMode={editMode}
                    value={item.issuer}
                    onChange={(v) => update(item.id, { issuer: v })}
                    placeholder="Issuer"
                    className="inline w-40"
                  />
                </span>
              </div>
              <EditableText
                as="p"
                editMode={editMode}
                value={item.description}
                onChange={(v) => update(item.id, { description: v })}
                className="text-muted mt-1 leading-relaxed"
                placeholder="Brief context."
                multiline
              />
              {editMode && (
                <button
                  onClick={() => remove(item.id)}
                  className="font-mono text-xs text-muted hover:text-ink mt-2"
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
