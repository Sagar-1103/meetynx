import AppSidebar from "@/components/app-sidebar";
import Header from "@/components/header";

interface MainLayoutProps {
    children:React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="w-full min-h-screen">
        <Header />
        <div className="p-2">
          {children}
        </div>
      </main>
    </div>
  );
}
