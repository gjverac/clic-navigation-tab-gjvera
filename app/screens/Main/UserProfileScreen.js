import { View, Text,Pressable,StyleSheet } from 'react-native'
import React from 'react'

export default function UserProfileScreen(props) {
  const { navigate } = props.navigation;
  const closeSession=()=>{
    navigate("Login");
  }
  
  return (
    <View style={styles.container}>
      <Pressable onPress={() => closeSession()} style={styles.button}  >
        <Text style={styles.label}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  )
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
    marginTop: 200,
    //marginLeft:10,
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
