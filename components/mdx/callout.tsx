type CalloutType = 'note' | 'info' | 'tip' | 'warning';

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const typeClass: Record<CalloutType, string> = {
  note: 'callout-note',
  info: 'callout-info',
  tip: 'callout-tip',
  warning: 'callout-warning',
};

const labels: Record<CalloutType, string> = {
  note: 'Note',
  info: 'Info',
  tip: 'Tip',
  warning: 'Warning',
};

export function Callout({ type = 'note', children }: CalloutProps) {
  const resolvedType = type ?? 'note';

  return (
    <div className={`callout ${typeClass[resolvedType]}`}>
      <p className="callout-label">{labels[resolvedType]}</p>
      <div className="callout-body">{children}</div>
    </div>
  );
}
