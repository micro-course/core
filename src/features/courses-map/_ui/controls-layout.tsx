export function ControlsLayout({
  actionsPanel,
}: {
  actionsPanel?: React.ReactNode;
}) {
  return (
    <>
      <div
        className="empty:hidden absolute top-1/2 -translate-y-1/2 left-4  z-20 
        border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
        rounded p-2  "
      >
        {actionsPanel}
      </div>
    </>
  );
}
