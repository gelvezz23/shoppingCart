import { useProducts } from "@/src/aplication/context/productProvider";
import Cart from "@/src/components/cart";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Home() {
  const { products } = useProducts();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Cart products={products} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
