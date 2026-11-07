import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqEntry {
  q: string;
  a: ReactNode;
}

/**
 * Accessible accordion whose answers are always part of the HTML (collapsed with CSS, not removed from the tree),
 * so crawlers, screen readers and the FAQPage schema all see the same text visitors can open.
 */
export function FaqAccordion({
  items,
  itemClassName,
  triggerClassName,
  answerClassName,
  testIdPrefix,
}: {
  items: FaqEntry[];
  itemClassName?: string;
  triggerClassName?: string;
  answerClassName?: string;
  testIdPrefix?: string;
}) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const answerId = `${uid}-answer-${i}`;
        return (
          <div key={i} className={itemClassName}>
            <h3 className="flex">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpen(isOpen ? null : i)}
                data-testid={testIdPrefix ? `${testIdPrefix}-${i}` : undefined}
                className={cn(
                  "flex flex-1 items-center justify-between gap-4 text-left transition-colors hover:text-white/70",
                  triggerClassName,
                )}
              >
                {item.q}
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-4 w-4 shrink-0 text-white/30 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={answerId}
              role="region"
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className={answerClassName}>{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
