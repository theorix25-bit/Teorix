export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="px-7 py-4">
        {children}
      </div>
    </>
  );
}
