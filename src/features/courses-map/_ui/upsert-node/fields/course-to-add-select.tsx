import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { Spinner } from "@/shared/ui/spinner";
import { useState } from "react";
import { CourseId } from "@/kernel/domain/course";
import { useCoursesToAddOptions } from "../../../_vm/upsert-node/use-courses-to-add-options";

export function CourseToAddSelect({
  value,
  onChange,
}: {
  value?: CourseId;
  onChange: (value: CourseId) => void;
}) {
  const [open, setOpen] = useState(false);
  const { isPending, options } = useCoursesToAddOptions(value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", !value && "text-muted-foreground")}
        >
          {value
            ? options?.find((option) => option.value === value)?.label
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
            <CommandList>
              {options?.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
