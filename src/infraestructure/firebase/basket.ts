import { ProductsType } from "@/src/entities/productsType";
import { db } from "./config";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  DocumentData,
  doc,
  setDoc,
} from "firebase/firestore";

export const getBasket = async () => {
  try {
    const q = query(collection(db, "basket"));
    const querySnapshot = await getDocs(q);
    const basketData: any = [];
    querySnapshot.forEach((doc) => {
      return basketData.push(doc.data().items);
    });
    return { basketData, error: undefined };
  } catch (error) {
    console.error("Error al obtener posts:", error);
    return { products: undefined, error };
  }
};

export const createBasket = async ({
  products,
}: {
  products: ProductsType[];
}) => {
  try {
    const basketDocRef = doc(db, "basket", "globalBasket");
    await setDoc(basketDocRef, { items: products });
    return { data: true, error: undefined };
  } catch (error) {
    return { data: undefined, error };
  }
};
