import { CustomFooter } from "@/shared/ui/footer";
import { LoginModal } from "@/shared/ui/login-modal";
import { CustomNavbar } from "@/shared/ui/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen p-2 gap-4">
      <CustomNavbar />
      <main className="bg-bismark-50 container mx-auto max-w-7xl px-6 flex-grow pt-16 rounded-md fade-in">
        {children}
      </main>
      <CustomFooter />
      <LoginModal />
    </div>
  );
}
