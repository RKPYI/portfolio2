"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import type { PortfolioData } from "@/types/portfolio";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Awards from "./sections/Awards";
import Availability from "./sections/Availability";
import Contact from "./sections/Contact";

export default function PortfolioApp({
  initialData,
}: {
  initialData: PortfolioData;
}) {
  const { data: session, status: sessionStatus } = useSession();
  const isOwner = Boolean(session?.isOwner);

  const [data, setData] = useState<PortfolioData>(initialData);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function update<K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed.");
      }
      setStatusMessage("Saved — committed to GitHub.");
      setEditMode(false);
    } catch (e) {
      setStatusMessage(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    setData(initialData);
    setEditMode(false);
    setStatusMessage(null);
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Owner controls — only rendered/functional for the authenticated owner */}
      <div className="fixed top-0 right-0 z-50 flex flex-wrap items-center justify-end gap-3 p-4 font-mono text-xs max-w-full">
        {statusMessage && (
          <span className="text-muted bg-paper/90 px-2">{statusMessage}</span>
        )}

        {isOwner && (
          <>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="border border-ink bg-paper px-3 py-1 hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
                <button
                  onClick={handleDiscard}
                  disabled={saving}
                  className="text-muted hover:text-ink px-2 py-1"
                >
                  Discard
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="border border-ink bg-paper px-3 py-1 hover:bg-ink hover:text-paper transition-colors"
              >
                Edit portfolio
              </button>
            )}
          </>
        )}

        {sessionStatus === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="text-muted hover:text-ink px-2 py-1"
          >
            Sign out ({session?.login})
          </button>
        ) : sessionStatus === "loading" ? null : (
          <button
            onClick={() => signIn("github")}
            className="text-muted hover:text-ink px-2 py-1 border border-line"
          >
            Sign in with GitHub
          </button>
        )}
      </div>

      <Hero
        data={data.meta}
        editMode={editMode}
        onChange={(v) => update("meta", v)}
      />
      <About
        data={data.about}
        editMode={editMode}
        onChange={(v) => update("about", v)}
      />
      <Experience
        items={data.experience}
        editMode={editMode}
        onChange={(v) => update("experience", v)}
      />
      <Education
        items={data.education}
        editMode={editMode}
        onChange={(v) => update("education", v)}
      />
      <Certifications
        items={data.certifications}
        editMode={editMode}
        onChange={(v) => update("certifications", v)}
      />
      <Skills
        items={data.skills}
        editMode={editMode}
        onChange={(v) => update("skills", v)}
      />
      <Projects
        items={data.projects}
        editMode={editMode}
        onChange={(v) => update("projects", v)}
      />
      <Testimonials
        items={data.testimonials}
        editMode={editMode}
        onChange={(v) => update("testimonials", v)}
      />
      <Awards
        items={data.awards}
        editMode={editMode}
        onChange={(v) => update("awards", v)}
      />
      <Availability
        data={data.availability}
        editMode={editMode}
        onChange={(v) => update("availability", v)}
      />
      <Contact
        data={data.contact}
        editMode={editMode}
        onChange={(v) => update("contact", v)}
      />

      <footer className="section-divider px-6 md:px-12 py-8 flex items-center justify-between font-mono text-xs text-muted">
        <span>
          © {new Date().getFullYear()} {data.meta.name}
        </span>
        <span>Built with Next.js · Edited via GitHub</span>
      </footer>
    </div>
  );
}
