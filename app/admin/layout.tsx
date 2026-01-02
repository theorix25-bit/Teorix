import BottomNav from "@/components/admin/BottomNav";
import Header from "@/components/admin/header";

function layoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="text-white flex flex-col h-[100dvh]">
        <div className="flex flex-col h-[100dvh] ">
          <Header />
          <div className="flex-1 overflow-y-auto">{children}</div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}

export default layoutAdmin;
