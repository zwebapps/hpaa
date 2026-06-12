export default function SiteLoading() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--slate, #4a5568)",
        fontFamily: "var(--font-outfit, system-ui, sans-serif)",
        fontSize: "0.95rem",
        letterSpacing: "0.06em",
      }}
    >
      Loading…
    </div>
  );
}
