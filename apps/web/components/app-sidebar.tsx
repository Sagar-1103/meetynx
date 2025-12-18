"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Image from "next/image";
import MeetynxLogo from "@/public/meetynx-logo.png";
import Link from "next/link";
import {
  Home,
  Layers2,
  MoreHorizontal,
  Settings,
  Star,
  Upload,
  Video,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import { getSession } from "next-auth/react";
import { Separator } from "./ui/separator";

export default function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const links = [
    {
      label: "Home",
      href: "/home",
      icon: <Home className={`h-5 w-5 shrink-0 `} />,
    },
    {
      label: "Meetings",
      href: "/meetings",
      icon: <Video className={`h-5 w-5 shrink-0 `} />,
    },
    {
      label: "Uploads",
      href: "/uploads",
      icon: <Upload className={`h-5 w-5 shrink-0 `} />,
    },
    {
      label: "Integrations",
      href: "/integrations",
      icon: <Layers2 className={`h-5 w-5 shrink-0 `} />,
    },
    {
      label: "Upgrade",
      href: "/upgrade",
      icon: <Star className={`h-5 w-5 shrink-0 `} />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className={`h-5 w-5 shrink-0 `} />,
    },
    {
      label: "More",
      href: "#",
      icon: <MoreHorizontal className={`h-5 w-5 shrink-0 `} />,
    },
  ];

  return (
    <div className="h-screen">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 border-r border-gray-300/90">
          <div className="flex flex-1 flex-col overflow-x-hidden gap-y-3 overflow-y-auto">
            <Link
              href="/home"
              className="relative z-20 flex gap-1 items-center space-x-2 text-sm font-normal text-black"
            >
              <Image
                src={MeetynxLogo}
                alt="Meetynx Logo"
                className="w-10 scale-150"
              />
              <h1 className="text-2xl font-semibold">Meetynx</h1>
            </Link>

            <Separator className="bg-gray-300/90" />

            <div className="flex flex-col mt-1 gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={`rounded-sm px-4 ${pathname === link.href ? "bg-gray-950/90 text-white" : "hover:bg-black/15 hover:text-black"}`}
                />
              ))}
            </div>
          </div>
          <div>
            {user && user?.image && (
              <SidebarLink
                link={{
                  label: `${user.name}`,
                  href: "#",
                  icon: (
                    <Image
                      src={user.image}
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
