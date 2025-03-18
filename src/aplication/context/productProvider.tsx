import { ProductsContextType, ProductsType } from "@/src/entities/productsType";
import { createContext, useState, useContext, ReactNode, FC } from "react";

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: FC<{ children: ReactNode | any }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<ProductsType[]>([]);
  const [products, setProducts] = useState<ProductsType[]>([]);

  const addProduct = (product: ProductsType) => {
    const existingProduct = basket.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedBasket = basket.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setBasket(updatedBasket);
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (id: string) => {
    if (basket.length > 0) {
      setBasket(basket.filter((product) => product.id !== id));
    }
  };

  const bringProducts = (products: ProductsType[]) => {
    setProducts(products);
  };

  const bringBasket = (basket: ProductsType[]) => {
    setBasket(products);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        basket,
        bringProducts,
        bringBasket,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductsProvider");
  }
  return context;
};
