export type MenuItem = {
  name: string;
  href: string;
  submenu?: {
    name: string;
    href: string;
  }[];
};

export const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];
