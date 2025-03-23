export type MenuItem = {
  name: string;
  href: string;
  submenu?: {
    name: string;
    href: string;
  }[];
};

const productCategories = [
  { name: "Natural Food Products", href: "/product_category/food-products" },
  { name: "Herbal Products", href: "/product_category/herbal-products" },
  {
    name: "Cosmetics & Herbal Products",
    href: "/product_category/natural-cosmetics",
  },
  { name: "Natural Hair Care", href: "/product_category/natural-hair-care" },
];

export const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  {
    name: "Products",
    href: "#",
    submenu: productCategories,
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];
