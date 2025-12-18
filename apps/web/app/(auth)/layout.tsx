import React from "react";
import MeetynxLogo from "@/public/meetynx-dark-logo.png";
import Image from "next/image";

interface AuthLayoutProps {
    children:React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
        {children}
      </div>

      <div className="hidden lg:flex col-span-6 bg-black text-white relative overflow-hidden m-5 rounded-2xl">
        <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-black to-neutral-800" />
            <div className="flex items-center mx-auto gap-3 mb-8 text-white">
                <Image src={MeetynxLogo} alt="Meetynx Logo" className="size-20 scale-150" />
                {/* <p className="font-bold text-3xl text-white z-10">Meetynx</p> */}
            </div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
