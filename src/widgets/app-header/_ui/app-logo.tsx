import { Logo } from "@/shared/ui/icons";
import Link from "next/link";

export function AppLogo() {
  return (
    <Link className="mr-6 flex items-center space-x-2" href="/">
      <Logo className="h-6 w-6" />
      <span className="font-bold inline-block">Micro courses</span>
    </Link>
  );
}
