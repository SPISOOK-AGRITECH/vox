'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  className?: string;
  activeClassName?: string;
}

/**
 * NavLink component for Next.js navigation with active state support
 * @param href - The URL to navigate to
 * @param className - Base className for the link
 * @param activeClassName - Additional className when the link is active
 * @param children - Link content
 * @returns A Link component with active state styling
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
