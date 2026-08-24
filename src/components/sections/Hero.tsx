"use client";

import { EditableText } from "../Field";
import LiveClock from "../LiveClock";
import type { MetaData } from "@/types/portfolio";

export default function Hero({
  data,
  editMode,
  onChange,
}: {
  data: MetaData;
  editMode: boolean;
  onChange: (v: MetaData) => void;
}) {
  function set<K extends keyof MetaData>(key: K, value: MetaData[K]) {
    onChange({ ...data, [key]: value });
  }
  function setSocial(key: keyof MetaData["socials"], value: string) {
    onChange({ ...data, socials: { ...data.socials, [key]: value } });
  }

  const socialEntries = Object.entries(data.socials).filter(([, v]) => v);

  return (
    <header className="section-divider px-6 md:px-12 pt-10 pb-14 md:pt-16 md:pb-20">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
        <span className="eyebrow">Index / Profile</span>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          {editMode ? (
            <EditableText
              editMode
              value={data.location}
              onChange={(v) => set("location", v)}
              placeholder="City, Country"
              className="w-32"
            />
          ) : (
            <span>{data.location}</span>
          )}
          <span className="text-line">·</span>
          <LiveClock timezone={data.timezone} />
          {editMode && (
            <EditableText
              editMode
              value={data.timezone}
              onChange={(v) => set("timezone", v)}
              placeholder="IANA tz, e.g. Asia/Jakarta"
              className="w-40"
            />
          )}
          <span className="text-line">·</span>
          {editMode ? (
            <EditableText
              editMode
              value={data.availabilityStatus}
              onChange={(v) => set("availabilityStatus", v)}
              placeholder="Available for work"
              className="w-40"
            />
          ) : (
            <span className="uppercase text-signal">
              {data.availabilityStatus}
            </span>
          )}
        </div>
      </div>

      <EditableText
        as="h1"
        editMode={editMode}
        value={data.name}
        onChange={(v) => set("name", v)}
        className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight"
        placeholder="Your Name"
      />
      <EditableText
        as="p"
        editMode={editMode}
        value={data.role}
        onChange={(v) => set("role", v)}
        className="font-mono text-sm md:text-base text-accent mt-4 uppercase tracking-wide"
        placeholder="Your Role"
      />
      <EditableText
        as="p"
        editMode={editMode}
        value={data.tagline}
        onChange={(v) => set("tagline", v)}
        className="max-w-xl text-lg text-muted mt-6 leading-relaxed"
        placeholder="A one-line value proposition."
        multiline
      />

      <div className="flex flex-wrap gap-3 mt-8 font-mono text-xs">
        {editMode ? (
          <>
            <EditableText
              editMode
              value={data.email}
              onChange={(v) => set("email", v)}
              placeholder="you@example.com"
              className="w-52"
            />
            <EditableText
              editMode
              value={data.resumeUrl}
              onChange={(v) => set("resumeUrl", v)}
              placeholder="Résumé/CV URL"
              className="w-52"
            />
            <EditableText
              editMode
              value={data.photoUrl}
              onChange={(v) => set("photoUrl", v)}
              placeholder="Photo URL"
              className="w-52"
            />
            {(
              ["github", "linkedin", "twitter", "dribbble", "behance", "website"] as const
            ).map((key) => (
              <EditableText
                key={key}
                editMode
                value={data.socials[key] || ""}
                onChange={(v) => setSocial(key, v)}
                placeholder={`${key} URL`}
                className="w-52"
              />
            ))}
          </>
        ) : (
          <>
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="border border-line px-3 py-2 hover:border-ink transition-colors"
              >
                {data.email}
              </a>
            )}
            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="border border-ink px-3 py-2 hover:bg-ink hover:text-paper transition-colors"
              >
                Download résumé
              </a>
            )}
            {socialEntries.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="border border-line px-3 py-2 hover:border-ink transition-colors capitalize"
              >
                {key}
              </a>
            ))}
          </>
        )}
      </div>
    </header>
  );
}
