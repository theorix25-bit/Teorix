import ChatAssistant from "@/components/ChatAssistant";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const urlAsistente = process.env.NEXT_URL_ASISTENTE!;
  return (
    <>
      <div className="bg-carbon text-white">{children}</div>
      <ChatAssistant urlAsistente={urlAsistente} />
    </>
  );
}
