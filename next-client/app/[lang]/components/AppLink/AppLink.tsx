import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLink({ href, className, children }: {
    href: string,
    className: string,
    children: React.ReactNode,
}) {
    const pathname = usePathname();
    const chunks = pathname.split("/");
    const newHref = ["", chunks[1], href.slice(1)].join("/");
return <Link href={newHref} className={className}>{ children}</Link>
}