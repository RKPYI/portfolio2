"use client";

import { EditableText } from "../Field";
import type { CertificationItem } from "@/types/portfolio";

function emptyItem(): CertificationItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    issuer: "",
    date: "",
    credentialUrl: "",
  };
}

export default function Certifications({
  items,
  editMode,
  onChange,
}: {
  items: CertificationItem[];
  editMode: boolean;
  onChange: (v: CertificationItem[]) => void;
}) {
  function update(id: string, patch: Partial<CertificationItem>) {
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
        <span className="eyebrow">Certifications</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add certificate
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        {items.map((item) => (
          <div key={item.id} className="border border-line p-4">
            <EditableText
              as="h3"
              editMode={editMode}
              value={item.name}
              onChange={(v) => update(item.id, { name: v })}
              className="font-display text-lg"
              placeholder="Certificate name"
            />
            <EditableText
              editMode={editMode}
              value={item.issuer}
              onChange={(v) => update(item.id, { issuer: v })}
              className="font-mono text-xs text-accent mt-1"
              placeholder="Issuing organization"
            />
            <div className="flex items-center gap-3 font-mono text-xs text-muted mt-2">
              <EditableText
                editMode={editMode}
                value={item.date}
                onChange={(v) => update(item.id, { date: v })}
                placeholder="Issued: 2024"
                className="w-32"
              />
              {editMode ? (
                <EditableText
                  editMode
                  value={item.credentialUrl}
                  onChange={(v) => update(item.id, { credentialUrl: v })}
                  placeholder="Verification URL"
                />
              ) : (
                item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-ink"
                  >
                    Verify
                  </a>
                )
              )}
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
