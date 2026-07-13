import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AppLink({ href, className, children }: {
  href: string,
  className: string,
  children: React.ReactNode,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const strParams = params.toString();

  const chunks = pathname.split("/");
  const newHref = ["", chunks[1], href.slice(1)].join("/");
  return <Link href={
    strParams === "" ? newHref : `${newHref}?${strParams}`
  } className={className}>{children}</Link>
}