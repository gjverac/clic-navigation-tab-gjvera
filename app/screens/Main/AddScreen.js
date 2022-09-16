import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  NativeModules,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { idGenerator } from "../../../utils/IdGenerator";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

export default function AddScreen() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);

  const createProduct = async () => {
    if (!productName || !description || !price) {
      Alert.alert("ERROR - Campos vacíos");
    } else {
      const id = idGenerator(10);
      upLoadImage(id);
      await setDoc(doc(db, "products", id), {
        id: id,
        productName: productName,
        description: description,
        price: price,
      });
      
      Alert.alert("Creación correcta");
      //NativeModules.DevSettings.reload(); //recargar la pantalla
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const upLoadImage = (id) => {
    const storage = getStorage();
    const file=image;

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + String(id)+'.jpg');
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
     (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Producto</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setProductName(value)}
        value={productName}
        placeholder="Nombre del producto"
      ></TextInput>
      <TextInput
        style={styles.textArea}
        onChangeText={(value) => setDescription(value)}
        value={description}
        placeholder="Descripción"
        multiline
        numberOfLines={3}
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPrice(value)}
        value={price}
        placeholder="$ Precio"
      ></TextInput>
      <Pressable onPress={() => pickImage()} style={styles.button}
      >
        <Text style={styles.label}>Pick an image from camera roll</Text>
      </Pressable>
      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
      <Pressable onPress={() => createProduct()} style={styles.button}>
        <Text style={styles.label}>Crear Producto</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    width: 340,
    height: 50,
    borderRadius: 5,
    borderColor: "#02CCFF",
    padding: 10,
  },
  textArea: {
    marginTop: 10,
    borderWidth: 1,
    width: 340,
    height: 100,
    borderRadius: 5,
    borderColor: "#02CCFF",
    padding: 10,
  },
  bImage: {
    width: 180,
    height: 180,
  },
  button: {
    marginTop: 20,
    //marginBottom: 30,
    padding: 10,
    backgroundColor: "#02CCFF",
    borderRadius: 5,
    width: 340,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    marginTop: 20,
    //marginBottom: 30,
    padding: 10,
    backgroundColor: "#02CCFF",
    borderRadius: 5,
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
