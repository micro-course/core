import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/ui/utils";
import { useState } from "react";
import { UserId } from "@/kernel";

export function UserSelect({
  value,
  onChange,
  users,
}: {
  value?: UserId;
  onChange: (value?: UserId) => void;
  users: {
    id: UserId;
    email: string;
  }[];
}) {
  const [open, setOpen] = useState(false);
  const options = users.map((course) => ({
    label: course.email,
    value: course.id,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", !value && "text-muted-foreground")}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select course"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value={undefined}
              key={0}
              onSelect={() => {
                setOpen(false);
              }}
            >
              Не выбрано
            </CommandItem>
            {options.map((option) => (
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
