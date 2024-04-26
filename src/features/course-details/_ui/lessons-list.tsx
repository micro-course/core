import { LessonPartial } from "../_domain/types";
import { MdxCode } from "@/shared/lib/mdx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

export function LessonsList({ lessons = [] }: { lessons: LessonPartial[] }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight mb-3">
        Уроки ({lessons.length})
      </h3>
      <Accordion type="multiple">
        {lessons.map((lesson, i) =>
          lesson.shortDescription ? (
            <AccordionItem key={i} value={i.toString()}>
              <AccordionTrigger className="text-left">
                {i + 1}. {lesson.title}
              </AccordionTrigger>
              {lesson.shortDescription && (
                <AccordionContent>
                  <MdxCode code={lesson.shortDescription} />
                </AccordionContent>
              )}
            </AccordionItem>
          ) : (
            <div
              className="flex flex-1 items-center justify-between py-4 font-medium border-b"
              key={i}
            >
              {i + 1}. {lesson.title}
            </div>
          ),
        )}
      </Accordion>
    </div>
  );
}
