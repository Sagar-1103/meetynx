import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactNode } from "react"
import { CaptureItem } from "../capture-dropwdown"

interface CaptureDialogProps {
    children:ReactNode;
    item:CaptureItem;
}

export function CaptureDialog({ children, item }: CaptureDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
            {children}
          {/* <Button variant="outline">Open Dialog</Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{item.label}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name your meeting</Label>
              <Input id="name-1" name="meetName" className="border-black/20" placeholder="New meeting" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="link-1">Meeting Link</Label>
              <Input id="link-1" name="meetLink" className="border-black/20" placeholder="https://meet.google.com/qms-gobb-mzf" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="language-1">Meeting Language</Label>
              <Input id="language-1" name="meetLanguage" className="border-black/20" placeholder="English" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer border border-black/20" variant="ghost" >Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">Start Capturing</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
