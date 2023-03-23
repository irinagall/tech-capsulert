import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import FirebaseAuth from "./src/FirebaseAuth";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//--- begin notifications A

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
// move this to class; give call back so that we know when we're ready to send
// notifications. When this gets the token, it should store it in a property of
// the class so that we can use that at any time. Don't let your app do anything
// before this has completed; this is a core functionality. Show a loading screen
// until your complete callback is called (l64)
async function registerForPushNotificationsAsync(complete) {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    // sendPushNotification(token);
    // we are set up here and can notify.
    complete();
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
//---- end notifications A

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  //---- begin notifications B

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //-- end notiications B

  // -- begin auth
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
  //-- end auth
  return (
    <View style={styles.container}>
      {/* testing to display the email address of logged in user at the top  */}
      <Text style={{ color: "white", fontSize: 20 }}>
        {(auth.getCurrentUser() || {}).email || "NONE"}
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
