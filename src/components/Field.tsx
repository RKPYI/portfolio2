"use client";

type Tag = "span" | "h1" | "h2" | "h3" | "p";

export function EditableText({
  value,
  onChange,
  editMode,
  as = "span",
  className = "",
  placeholder = "",
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  editMode: boolean;
  as?: Tag;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  if (!editMode) {
    const Component = as;
    return <Component className={className}>{value || placeholder}</Component>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`${className} w-full bg-transparent border border-dashed border-line focus:border-accent outline-none resize-y px-2 py-1`}
      />
    );
  }

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${className} w-full bg-transparent border border-dashed border-line focus:border-accent outline-none px-2 py-1`}
    />
  );
}
