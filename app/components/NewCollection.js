import CustomDialog from "./common/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";

export function NewCollection({ label, onAddCollection }) {
  const [isOpen, setIsOpen] = useState(false);
  const collectionName = useRef(null);

  function handleSaveCollection() {
    onAddCollection(collectionName.current.value);
    setIsOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSaveCollection();
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{label}</button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-[425px] mx-4 sm:mx-auto w-[calc(100%-2rem)] gap-2 max-w-md"
          aria-describedby="dialog-description"
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>New Collection</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col">
                <Label htmlFor="name" className="my-2">
                  Collection name
                </Label>
                <Input
                  id="name"
                  defaultValue=""
                  ref={collectionName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSaveCollection();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewCollection;
