import Link from "next/link";

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
  return (
    <nav className="bg-gray-700 p-2 flex  items-center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="block py-2 px-4 text-white hover:bg-gray-700"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
