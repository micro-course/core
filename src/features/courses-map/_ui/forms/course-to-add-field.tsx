import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { CourseId } from "@/entities/course/course";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { useGetCoursesToAddQuery } from "../../_vm/queries";
import { cn } from "@/shared/ui/utils";
import { Spinner } from "@/shared/ui/spinner";
import { useState } from "react";

export function CourseToAddField({
  value,
  onChange,
}: {
  value: CourseId;
  onChange: (value: CourseId) => void;
}) {
  const [open, setOpen] = useState(false);
  const { data: courses, isPending } = useQuery({
    ...useGetCoursesToAddQuery(),
    select: (data) =>
      data.map((course) => ({
        label: course.title,
        value: course.id,
      })),
    initialData: [],
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", !value && "text-muted-foreground")}
        >
          {value
            ? courses.find((course) => course.value === value)?.label
            : "Select course"}
          {isPending ? (
            <Spinner className="ml-2 h-4 w-4 shrink-0" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search course..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses.map((course) => (
              <CommandItem
                value={course.label}
                key={course.value}
                onSelect={() => {
                  onChange(course.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    course.value === value ? "opacity-100" : "opacity-0",
                  )}
                />
                {course.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
