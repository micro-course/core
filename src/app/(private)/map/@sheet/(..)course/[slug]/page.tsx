import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/shared/ui/sheet";

export default function CourseSheetContentPage() {
  return (
    <SheetContent className="w-full sm:w-[700px] !max-w-full">
      <SheetHeader>
        <SheetTitle>Course</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}
