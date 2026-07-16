interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function JobDescriptionInput({
  value,
  onChange,
  label = "Role brief",
  placeholder = "Paste the job description, role requirements, success metrics, and must-have skills.",
}: JobDescriptionInputProps) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-coffee-900">
        {label}
        <span className="text-xs font-medium text-zinc-500">{value.length} characters</span>
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={9}
        placeholder={placeholder}
        className="mt-2 w-full resize-y rounded-lg border border-coffee-300 bg-white/90 px-4 py-3 text-sm leading-6 text-coffee-900 outline-none transition placeholder:text-zinc-400 focus:border-accent-600 focus:ring-2 focus:ring-accent-100"
      />
    </label>
  );
}
