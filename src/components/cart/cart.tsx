import { useProducts } from "@/src/aplication/context/productProvider";
import { ProductsType } from "@/src/entities/productsType";
import React, { FC } from "react";
import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const RenderItem = ({
  id,
  name,
  image,
  price,
  type,
  quantity,
}: ProductsType) => {
  const { addProduct, removeProduct } = useProducts();

  return (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Cantidad: {quantity}</Text>
        <Text style={styles.price}>precio: {price}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addProduct({ id, name, image, price, quantity })}
        >
          <Text style={styles.deleteButtonText}>
            {type === "basket" ? " + 1" : "Agregar"}
          </Text>
        </TouchableOpacity>

        {type === "basket" && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeProduct(id)}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const RenderComponent = ({
  item,
  type,
}: {
  item: ProductsType;
  type: string;
}) => (
  <RenderItem
    type={type}
    id={item.id}
    name={item.name}
    price={item.price}
    image={item.image}
    quantity={item.quantity}
  />
);

const Cart: FC<{ products: ProductsType[] | any; type?: string }> = ({
  products,
  type = "none",
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={(event) => (
          <RenderComponent type={type} item={event.item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
  },
});

export default Cart;
