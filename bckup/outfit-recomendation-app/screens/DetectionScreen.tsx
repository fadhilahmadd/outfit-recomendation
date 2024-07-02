import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Alert,
    Dimensions,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import Colors from "../constants/Colors";

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.45;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

const DetectionScreen: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleTakePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleClearImage = () => {
        setSelectedImage(null);
    };

    const handlePrediction = async (endpoint: string) => {
        if (!selectedImage) {
            Alert.alert("No image selected", "Please select or take a photo to proceed.");
            return;
        }

        const formData = new FormData();
        formData.append('files', {
            uri: selectedImage,
            name: 'photo.jpg',
            type: 'image/jpeg'
        } as any);

        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            Alert.alert("Prediction Results", JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong while making the prediction.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Outfit Recomendation</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleUploadImage} style={styles.button}>
                        <Text style={styles.buttonText}>Unggah Gambar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
                        <Text style={styles.buttonText}>Ambil Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClearImage} style={styles.button}>
                        <Text style={styles.buttonText}>Bersihkan Gambar</Text>
                    </TouchableOpacity>
                </View>

                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => handlePrediction('http://192.168.1.9:5000/predict')}
                        style={[styles.button, styles.detectButton]}
                    >
                        <Text style={[styles.buttonText, styles.detectButtonText]}>Deteksi (CNN)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handlePrediction('http://192.168.1.9:5000/predict-kmeans')}
                        style={[styles.button, styles.detectButton]}
                    >
                        <Text style={[styles.buttonText, styles.detectButtonText]}>Deteksi (K-means)</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing * 2,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: Spacing * 2,
    },
    title: {
        fontFamily: Font["poppins-bold"],
        fontSize: Spacing * 3,
        color: Colors.text,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: Spacing,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: Spacing,
        borderRadius: Spacing,
        flex: 1,
        marginHorizontal: Spacing / 2,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: Font["poppins-semiBold"],
        color: Colors.onPrimary,
        fontSize: Spacing * 1.6,
    },
    detectButton: {
        backgroundColor: Colors.primary,
    },
    detectButtonText: {
        fontFamily: Font["poppins-semiBold"],
        color: Colors.onPrimary,
        fontSize: Spacing * 1.6,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: Spacing * 2,
        alignSelf: 'center',
        marginVertical: Spacing,
    },
});

export default DetectionScreen;
