'use client';

import AppLink from "@/app/[lang]/components/AppLink/AppLink";
import { usePathname } from "next/navigation";
import css from './NavigationMenu.module.css';
import { useAppSelector } from "@/app/lib/hooks";
import { localeSelector } from "@/app/lib/redux/selectors";

const links = [
    {
        name: 'orders',
        href: '/orders',
    },
    {
        name: 'products',
        href: '/products',
    },
];

export default function NavigationMenu() {
  const pathname = usePathname();
  const { dict } = useAppSelector(localeSelector);

    return <nav className="py-5 grow">
        <ul className="list-image-none ps-0 text-center">
        {links.map(({href, name}, i) => {
          const chunks = pathname.split("/");
          const isActive = (chunks.length > 2 && chunks[2] === href.slice(1));
          return (
              <li key={name} className={`${i !== 0 ? 'mt-2' : ''}`}>
              <AppLink href={href} className={`
                      ${isActive ? css['navLink-active'] : ''} ${css.navLink} text-dark uppercase`}>
                {dict[name] as string}
              </AppLink>
              </li>
          )})}
        </ul>
    </nav>;
}