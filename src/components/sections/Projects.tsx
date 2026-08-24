"use client";

import { EditableText } from "../Field";
import type { ProjectItem } from "@/types/portfolio";

function emptyItem(): ProjectItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    liveUrl: "",
    repoUrl: "",
    tech: [],
    featured: false,
  };
}

export default function Projects({
  items,
  editMode,
  onChange,
}: {
  items: ProjectItem[];
  editMode: boolean;
  onChange: (v: ProjectItem[]) => void;
}) {
  function update(id: string, patch: Partial<ProjectItem>) {
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
        <span className="eyebrow">Projects</span>
        {editMode && (
          <button
            onClick={add}
            className="font-mono text-xs border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
          >
            + Add project
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border border-line p-5 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <EditableText
                as="h3"
                editMode={editMode}
                value={item.title}
                onChange={(v) => update(item.id, { title: v })}
                className="font-display text-xl"
                placeholder="Project title"
              />
              {editMode ? (
                <label className="font-mono text-xs text-muted flex items-center gap-1 shrink-0">
                  <input
                    type="checkbox"
                    checked={item.featured}
                    onChange={(e) =>
                      update(item.id, { featured: e.target.checked })
                    }
                  />
                  Featured
                </label>
              ) : (
                item.featured && (
                  <span className="font-mono text-xs text-signal shrink-0">
                    ★ Featured
                  </span>
                )
              )}
            </div>

            <EditableText
              as="p"
              editMode={editMode}
              value={item.description}
              onChange={(v) => update(item.id, { description: v })}
              className="text-muted mt-2 leading-relaxed flex-1"
              placeholder="Problem, process, outcome."
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
              className="font-mono text-xs text-accent mt-3"
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

            <div className="flex flex-wrap gap-3 mt-4 font-mono text-xs">
              {editMode ? (
                <>
                  <EditableText
                    editMode
                    value={item.liveUrl}
                    onChange={(v) => update(item.id, { liveUrl: v })}
                    placeholder="Live URL"
                    className="w-40"
                  />
                  <EditableText
                    editMode
                    value={item.repoUrl}
                    onChange={(v) => update(item.id, { repoUrl: v })}
                    placeholder="Source URL"
                    className="w-40"
                  />
                </>
              ) : (
                <>
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-ink px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
                    >
                      View live
                    </a>
                  )}
                  {item.repoUrl && (
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-line px-3 py-1 hover:border-ink transition-colors"
                    >
                      Source
                    </a>
                  )}
                </>
              )}
            </div>

            {editMode && (
              <button
                onClick={() => remove(item.id)}
                className="font-mono text-xs text-muted hover:text-ink mt-3 self-start"
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
