"use client";

import { EditableText } from "../Field";
import type { TestimonialItem } from "@/types/portfolio";

function emptyItem(): TestimonialItem {
  return { id: crypto.randomUUID(), name: "", role: "", quote: "" };
}

export default function Testimonials({
  items,
  editMode,
  onChange,
}: {
  items: TestimonialItem[];
  editMode: boolean;
  onChange: (v: TestimonialItem[]) => void;
}) {
  function update(id: string, patch: Partial<TestimonialItem>) {
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
        <span className="eyebrow">Testimonials</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add testimonial
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border-l-2 border-accent pl-5">
            <EditableText
              as="p"
              editMode={editMode}
              value={item.quote}
              onChange={(v) => update(item.id, { quote: v })}
              className="font-display text-lg leading-snug"
              placeholder="“Working with them was...”"
              multiline
            />
            <div className="mt-3 font-mono text-xs text-muted">
              <EditableText
                editMode={editMode}
                value={item.name}
                onChange={(v) => update(item.id, { name: v })}
                placeholder="Name"
                className="inline w-32"
              />
              {" — "}
              <EditableText
                editMode={editMode}
                value={item.role}
                onChange={(v) => update(item.id, { role: v })}
                placeholder="Role, Company"
                className="inline w-40"
              />
            </div>
            {editMode && (
              <button
                onClick={() => remove(item.id)}
                className="font-mono text-xs text-muted hover:text-ink mt-3"
              >
                Remove
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
