import { useProducts } from "@/src/aplication/context/productProvider";
import Cart from "@/src/components/cart";
import { createBasket, getBasket } from "@/src/infraestructure/firebase/basket";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Basket() {
  const { basket } = useProducts();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const saveBasket = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        await createBasket({ products: basket });
      } catch (error) {
        setErrorMessage("Error al guardar el carrito.");
        console.error("Error al guardar el carrito:", error);
      } finally {
        setLoading(false);
      }
    };
    saveBasket();
  }, [basket]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {!loading && !errorMessage && <Cart type="basket" products={basket} />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#f8d7da",
  },
  errorText: {
    color: "#721c24",
  },
});

export default Basket;
