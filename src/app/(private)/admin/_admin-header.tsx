import Link from "next/link";

export function AdminHeader() {
  return (
    <div className="container flex h-14 items-center flex gap-2">
      <Link href="/admin/cms/courses">Courses</Link>
      <Link href="/admin/acts">Acts</Link>
      <Link href="/admin/users-list">Acts</Link>
      <Link href="/admin/progress-statistics">Progress statistics</Link>
    </div>
  );
}
