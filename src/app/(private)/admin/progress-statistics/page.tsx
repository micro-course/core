import { ProgressStatistics } from "@/features/admin-panel/progress-statistics";

export default function Page() {
  return (
    <div className="container mx-auto p-4 py-14">
      <h1 className="text-3xl font-bold mb-4">Progress statistics</h1>
      <ProgressStatistics />
    </div>
  );
}
