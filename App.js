import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import FirebaseAuth from "./src/FirebaseAuth";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  //--
  const auth = new FirebaseAuth();

  auth.onAuthStateChange((authState) => {
    console.log("authState:");
    console.info(authState);
  });
  //creates the user
  // auth
  //   .createUser("bob@hotmail.com", "Password123!")
  //   .then((user) => {
  //     console.log("user:" + user);
  //   })
  //   .catch((error) => {
  //     console.log("error:" + error);
  //   });
  auth
    .login("bob@hotmail.com", "Password123!")
    .then((user) => {
      console.log("user:");
      console.info(user);
    })
    .catch((error) => {
      console.log("error:" + error);
    });
  //--
  return (
    <View style={styles.container}>
      {/* testing to display the email address of logged in user at the top  */}
      <Text style={{ color: "white" }}>
        {auth.getCurrentUser().email || "NONE"}
      </Text>

      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
