"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Collections",
    href: "/collections",
  },
  {
    name: "Cards",
    href: "/cards",
  },
  {
    name: "Create Collection",
    href: "/collection",
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="bg-gray-700 p-2 flex items-center"
      aria-label="Main navigation"
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`py-2 px-4 text-white hover:bg-gray-600 ${
            pathname === link.href ? "border-b-2 border-white" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
