import * as React from "react";
import { StyleSheet,Image,TouchableOpacity } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function SupportPage() 
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>We are here to help!</Text> 
                <TouchableOpacity onclick="mailto:support@chartbotapp.com?subject=Customer Support Email">
                    <Image style={styles.image} source={require("../assets/images/emailSupport_1280.png")}></Image>
                    <Text style={styles.supportBody}>Email Support</Text>
                </TouchableOpacity>
        </View>
    );    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50
    //justifyContent: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 150,
    textAlign: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  supportBody: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 5
  },
  image: {
    flex: 0.5,
    maxWidth: "100%"
  }
});
