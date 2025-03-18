import { ImageProps, ImageSourcePropType } from "react-native";

export type ProductsType = {
  id: string;
  name: string;
  image: string | ImageSourcePropType | ImageProps | any;
  price: number;
  type?: string;
  quantity: number;
};

export type ProductsContextType = {
  products: ProductsType[];
  addProduct: (product: ProductsType) => void;
  removeProduct: (id: string) => void;
  basket: ProductsType[];
  bringProducts: (product: ProductsType[]) => void;
  bringBasket: (product: ProductsType[]) => void;
};
