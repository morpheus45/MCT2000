// Magazine-style section divider: huge editorial italic number + monospace label + rail
export default function NumberDivider({
  number,
  label,
  kicker,
}: {
  number: string;
  label: string;
  kicker?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <div className="flex items-end gap-6 border-b border-flame-500/30 pb-2">
        <span className="mag-number translate-y-2">{number}</span>
        <div className="flex-1 pb-3">
          {kicker && (
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-flame-500">
              {kicker}
            </div>
          )}
          <div className="heading text-3xl md:text-5xl text-bone-50">{label}</div>
        </div>
        <div className="hidden h-2 flex-1 divider-rail md:block" />
      </div>
    </div>
  );
}
