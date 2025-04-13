declare module "@/data/config.json" {
  interface Config {
    defaults: {
      currency: string;
      whatsappNumber: string;
      imageBasePath: string;
      benefits: string;
      ingredients: string;
    };
    categories: {
      [key: string]: string;
    };
  }
  const config: Config;
  export default config;
}

declare module "@/data/products.json" {
  interface ProductData {
    id: string;
    name: string;
    category: string[];
    price: string;
    weight?: string;
    description: string;
    image: string;
  }

  interface ProductsFile {
    products: ProductData[];
  }

  const data: ProductsFile;
  export default data;
}

declare module "@/data/new-products.json" {
  interface NewProductsFile {
    featured: string[];
  }

  const data: NewProductsFile;
  export default data;
}
