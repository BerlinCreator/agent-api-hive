type CodeBlockProps = {
  title: string;
  code: string;
};

export function CodeBlock({ title, code }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-[#090c0a] shadow-[0_12px_32px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{title}</span>
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
