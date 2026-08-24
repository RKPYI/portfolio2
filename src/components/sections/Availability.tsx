"use client";

import { EditableText } from "../Field";
import type { AvailabilityData } from "@/types/portfolio";

export default function Availability({
  data,
  editMode,
  onChange,
}: {
  data: AvailabilityData;
  editMode: boolean;
  onChange: (v: AvailabilityData) => void;
}) {
  return (
    <section className="section-divider px-6 md:px-12 py-14 md:py-20 grid md:grid-cols-[140px_1fr] gap-6">
      <span className="eyebrow">Availability</span>
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
        <div>
          <p className="font-mono text-xs text-muted mb-1">Status</p>
          <EditableText
            as="p"
            editMode={editMode}
            value={data.status}
            onChange={(v) => onChange({ ...data, status: v })}
            className="font-display text-lg"
            placeholder="Open to freelance work"
          />
        </div>
        <div>
          <p className="font-mono text-xs text-muted mb-1">Working hours</p>
          <EditableText
            as="p"
            editMode={editMode}
            value={data.workingHours}
            onChange={(v) => onChange({ ...data, workingHours: v })}
            className="font-display text-lg"
            placeholder="9am – 6pm, Mon–Fri"
          />
        </div>
        <div>
          <p className="font-mono text-xs text-muted mb-1">Rate</p>
          <EditableText
            as="p"
            editMode={editMode}
            value={data.rate}
            onChange={(v) => onChange({ ...data, rate: v })}
            className="font-display text-lg"
            placeholder="On request"
          />
        </div>
        <div>
          <p className="font-mono text-xs text-muted mb-1">Book a call</p>
          {editMode ? (
            <EditableText
              editMode
              value={data.calendlyUrl}
              onChange={(v) => onChange({ ...data, calendlyUrl: v })}
              placeholder="Calendly/Cal.com URL"
            />
          ) : data.calendlyUrl ? (
            <a
              href={data.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm underline hover:text-accent"
            >
              Schedule a call →
            </a>
          ) : (
            <p className="text-muted text-sm">—</p>
          )}
        </div>
      </div>
    </section>
  );
}
