import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Category = {
  name: string | null;
};

type User = {
  name: string | null;
  image: string | null;
  username: string | null;
};

type Event = {
  id: string;
  user: User;
  date: Date;
  title: string;
  image: string;
  category: Category;
};

type EventSheetProps = {
  event: Event;
};

const EventSheet = ({ event }: EventSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EventSheet;
