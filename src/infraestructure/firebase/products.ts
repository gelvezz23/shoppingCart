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
} from "firebase/firestore";

export const getProducts = async () => {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const products: any = [];
    querySnapshot.forEach((doc) => {
      return products.push(doc.data());
    });
    return { products, error: undefined };
  } catch (error: any) {
    console.error("Error al obtener posts:", error);
    return { products: undefined, error };
  }
};
