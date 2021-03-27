import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 80,
          width: 80,
          borderRadius: 40,
          backgroundColor: "grey"
        }}
      ></View>
      <Text style={styles.title}>@username</Text>
      <View style={{ paddingTop: 50 }}>
        <Text style={styles.title}> Saved News Articles </Text>
        <View
          style={{
            height: 80,
            width: 350,
            borderRadius: 20,
            backgroundColor: "lightgrey",
            marginTop: 20
          }}
        ></View>
        <View
          style={{
            height: 80,
            width: 350,
            borderRadius: 20,
            backgroundColor: "lightgrey",
            marginTop: 20
          }}
        ></View>
        <View
          style={{
            height: 80,
            width: 350,
            borderRadius: 20,
            backgroundColor: "lightgrey",
            marginTop: 20
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50
    //justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
