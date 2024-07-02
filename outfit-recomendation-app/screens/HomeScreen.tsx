import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";

import { user } from "../data/index";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import axios from 'axios';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 250; // Declare IMAGE_HEIGHT here

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;  // Get the category from route params
  const [outfits, setOutfits] = useState<any[]>([]);

  useEffect(() => {
    // Fetch outfits based on the category
    const fetchOutfits = async () => {
      try {
        const response = await axios.get(`http://192.168.0.192:5000/api/json/categories/${category}`);
        setOutfits(response.data.outfit);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOutfits();
  }, [category]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={user.image} style={styles.userImage} />
            <Text style={styles.userName}>Hi, {user.name}</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={Spacing * 3} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="cart-outline" size={Spacing * 3} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.introTextContainer}>
          <Text style={styles.introText}>Explore the best<Text style={styles.introTextHighlight}> Outfits</Text></Text>
        </View>

        <View style={styles.recommendedTextContainer}>
          <Text style={styles.recommendedText}>Direkomendasikan untuk {category}</Text>
        </View>

        <View style={styles.outfitsContainer}>
          {outfits.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.outfitCard}
              onPress={() => navigation.navigate('ProductDetail', { idOutfit: item.idOutfit })}
            >
              <Image
                source={{ uri: item.strOutfitThumb }}
                style={styles.outfitImage}
                resizeMode="cover"
              />
              <Text style={styles.outfitName}>{item.strOutfit}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.background, // Add background color to avoid white space behind status bar
  },
  scrollView: {
    paddingHorizontal: Spacing * 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: Spacing * 4,
    height: Spacing * 4,
    borderRadius: Spacing * 2,
  },
  userName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
    marginLeft: Spacing,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: Spacing / 2,
  },
  introTextContainer: {
    paddingVertical: Spacing * 2,
  },
  introText: {
    fontSize: Spacing * 3.5,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  introTextHighlight: {
    fontSize: Spacing * 4,
    color: Colors.primary,
  },
  recommendedTextContainer: {
    paddingVertical: Spacing * 2,
  },
  recommendedText: {
    fontSize: Spacing * 2,
    fontFamily: Font["poppins-bold"],
    color: Colors.text,
  },
  outfitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  outfitCard: {
    width: (SCREEN_WIDTH - (Spacing * 6)) / 2,  // Adjusting width based on screen size
    marginVertical: Spacing,
  },
  outfitImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderRadius: Spacing,
  },
  outfitName: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: Spacing * 2,
    color: Colors.text,
    marginTop: Spacing,
  },
});

export default HomeScreen;
