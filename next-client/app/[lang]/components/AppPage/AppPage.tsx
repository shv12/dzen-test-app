export default function AppPage({ title, children }: { title: React.ReactNode, children: React.ReactNode }) {
  return <>
    <div className="mb-4">{title}</div>
    {children}
  </>;
}