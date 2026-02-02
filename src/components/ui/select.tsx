import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  triggerClassName,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn("relative w-full sm:w-auto", className)}
      ref={containerRef}
    >
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-[40px] items-center justify-between gap-2 bg-gradient-to-r from-[#0056A6] to-[#0587FF] hover:opacity-90 text-white border-none rounded-full px-6 font-medium cursor-pointer text-sm min-w-[120px] w-full transition-all focus:ring-2 focus:ring-[#0969da] focus:ring-offset-2",
          triggerClassName,
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-2 w-[376px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#d0d7de] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 hover:bg-[#f6f8fa] transition-colors group text-left"
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-[19px] h-[19px] rounded-[1.5px] border border-[#BFBFBF] mr-4 flex items-center justify-center transition-all",
                    value === option.value && "bg-[#0969da] border-[#0969da]",
                  )}
                >
                  {value === option.value && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[14px] text-[#24292f] font-medium transition-colors",
                    value === option.value && "text-[#0969da]",
                  )}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Select };
