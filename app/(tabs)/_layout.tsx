import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useProducts } from "@/src/aplication/context/productProvider";
import { getProducts } from "@/src/infraestructure/firebase/products";
import { getBasket } from "@/src/infraestructure/firebase/basket";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { basket, bringProducts, bringBasket } = useProducts();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { products, error } = await getProducts();
        if (error) {
          setErrorMessage(error.message || "Error al obtener los productos.");
        } else {
          bringProducts(products);
        }
      } finally {
        setLoading(false);
      }
    };

    const getBasketAll = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const { basketData } = await getBasket();
        bringBasket(basketData[0]);
      } catch (error) {
        setErrorMessage("Error al traer el carrito.");
        console.error("Error al traer el carrito:", error);
      } finally {
        setLoading(false);
      }
    };
    getBasketAll();
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
        </View>
      )}
      {errorMessage && (
        <View style={{ padding: 20, backgroundColor: "#f8d7da" }}>
          <Text style={{ color: "#721c24" }}>{errorMessage}</Text>
        </View>
      )}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="basket"
          options={{
            headerShown: true,
            title: `Basket (${basket.length})`,
            tabBarIcon: ({ color }) => (
              <Icon name="shopping-basket" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
