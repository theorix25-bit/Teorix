
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-center mt-2">Examen teórico Dgt</h1>
      <div className="container h-100" style={{height:"100vh"}}>{children}</div>
    </>
  );
}
