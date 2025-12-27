"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, Calendar, UploadIcon, Video } from "lucide-react";
import { ReactNode } from "react";
import { CaptureDialog } from "./capture-dialog";

export interface CaptureItem {
  id: number;
  label: string;
  icon: ReactNode;
}

const captureItems: CaptureItem[] = [
  {
    id: 1,
    label: "Add to a live meeting",
    icon: <Video strokeWidth={1.5} className="size-5 p-0.5" />,
  },
  {
    id: 2,
    label: "Schedule new meeting",
    icon: <Calendar strokeWidth={1.5} className="size-5 p-0.5" />,
  },
  {
    id: 3,
    label: "Upload audio or video",
    icon: <UploadIcon strokeWidth={1.5} className="size-5 p-0.5" />,
  },
];

export function CaptureDropdown() {
  return (
    <DropdownMenu>
      <div className="flex">
        {captureItems?.[0] && (
          <CaptureDialog item={captureItems[0]}>
            <Button className="cursor-pointer rounded-r-none">
              <Video />
              <p className="select-none">Capture</p>
            </Button>
          </CaptureDialog>
        )}
        <DropdownMenuTrigger asChild>
          <Button className="rounded-l-none border-l border-amber-50/50 cursor-pointer">
            <ArrowDown />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent>
        <div className="flex flex-col gap-y-1 p-1">
          {captureItems &&
            captureItems.map((item) => <Item key={item.id} item={item} />)}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Item({ item }: { item: CaptureItem }) {
  return (
    <CaptureDialog item={item}>
      <Button
        variant={"ghost"}
        className="flex w-full text-sm gap-2 p-2 cursor-pointer hover:bg-black/15 rounded-sm"
      >
        {item.icon}
        <p className="select-none">{item.label}</p>
      </Button>
    </CaptureDialog>
  );
}
