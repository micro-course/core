import { RedirectToLastLesson } from "@/features/learn/redirect-to-last-lesson";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="coutainer py-14 mx-auto px-3">
      <RedirectToLastLesson />
    </div>
  );
}
