
interface SettingsHeaderProps {
  title: string;
  description: string;
}

export function SettingsHeader({ title, description }: SettingsHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-1 text-muted-foreground">{description}</p>
    </div>
  );
}
