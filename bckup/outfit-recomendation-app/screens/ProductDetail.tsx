import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

type Props = NativeStackScreenProps<RootStackParamList, "Product-detail">;

const IMAGE_HEIGHT = 440;

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const product = route.params.product;

  const [activeColorIndex, setactiveColorIndex] = useState<number>(0)
  const [activeSizeIndex, setactiveSizeIndex] = useState<number>(0)

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: Spacing * 2 }}>

        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: Spacing / 2 }}>
            <Ionicons name="arrow-back-outline" size={Spacing * 3} color={Colors.text} />
          </TouchableOpacity>

          <Text style={{ fontFamily: Font["poppins-semiBold"], fontSize: Spacing * 2, color: Colors.text }}>Detail</Text>

          <TouchableOpacity>
            <Ionicons size={Spacing * 3} />
          </TouchableOpacity>
        </View>

        {/* Gambar */}
        <Image source={product.image} style={{ width: "100%", height: IMAGE_HEIGHT, borderRadius: Spacing * 6, marginVertical: Spacing }} />

        {/* Nama & Warna */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", paddingVertical: Spacing }}>
          <Text style={{ fontSize: Spacing * 3, fontFamily: Font["poppins-bold"], color: Colors.text }}>{product.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {
              product.colors.map((color, index) => (
                <View
                  key={color.id}
                  style={[
                    {
                      margin: Spacing / 5,
                      borderRadius: Spacing * 2
                    },
                    activeColorIndex === index && {
                      borderWidth: Spacing / 2,
                      borderColor: Colors.borderWithOpacity
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setactiveColorIndex(index)}
                    style={{
                      backgroundColor: color.code,
                      height: Spacing * 2,
                      width: Spacing * 2,
                      borderRadius: Spacing
                    }}
                  />
                </View>
              ))}
          </View>
        </View>

        {/* Detail */}
        <Text style={{color: Colors.text, fontFamily: Font["poppins-regular"], fontSize: Spacing * 1.4}}>{product.description}</Text>
        
      </ScrollView>
    </SafeAreaView >
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
