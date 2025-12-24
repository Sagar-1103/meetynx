"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface DropdownItem {
    id:number;
    label:string;
    value:string;
}

const dropdownItems: DropdownItem[] = [
    { id:1, label:"My Meetings",value:"mine" },
    { id:2, label:"All Meetings",value:"all" },
    { id:3, label:"Shared With Me",value:"shared" },
]

export function MeetingsDropdown() {
  const [itemValue, setItemValue] = useState<string | undefined>(dropdownItems[0]?.value);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">{dropdownItems.find((item)=>item.value===itemValue)?.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={itemValue} onValueChange={setItemValue}>
           {
            dropdownItems && dropdownItems.map((item)=>(
              <DropdownMenuRadioItem onClick={()=>router.push(`/meetings/${item.value}`)} key={item.id} value={item.value}>{item.label}</DropdownMenuRadioItem>
            ))
           }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
