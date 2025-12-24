"use client";

import { usePathname } from "next/navigation";
import { MeetingsDropdown } from "./meetings-dropdown";
import { Input } from "./ui/input";
import { CaptureDropdown } from "./capture-dropwdown";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="border-b border-gray-300/90 p-3 flex flex-row justify-between">
      <div className="flex">
        {pathname.includes("/meetings") ? (
          <MeetingsDropdown />
        ) : (
          <p className="capitalize align-middle my-auto">{pathname.slice(1)}</p>
        )}
      </div>

      <div className="w-[60%]">
        <Input
          className="w-full border border-gray-300/90"
          type="text"
          placeholder="Search"
        />
      </div>

      <div>
        <CaptureDropdown />
      </div>
    </div>
  );
}
