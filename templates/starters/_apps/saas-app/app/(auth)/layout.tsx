export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <div
        className="w-full px-[var(--container-pad)]"
        style={{ maxWidth: "min(92vw, 480px)" }}
      >
        {children}
      </div>
    </div>
  );
}
