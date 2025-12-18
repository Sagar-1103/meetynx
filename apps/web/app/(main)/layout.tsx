import AppSidebar from "@/components/app-sidebar";

interface MainLayoutProps {
    children:React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="w-full min-h-screen p-2">
        {children}
      </main>
    </div>
  );
}
