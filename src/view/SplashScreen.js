import { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
const gif = require("../../assets/SplashDelizioragif.gif");
export default function SplashScreen({ navigation }) {
  useEffect(()=>{
    setTimeout(() => {
      navigation.reset({
      index: 0,
      routes: [{ name: "Walkthrough" }],
    });
    }, 2900);
    
  },[])
  return (
    <View>
      <Image
        source={gif}
        style={{ height: "100%", width: "100%" }}
        resizeMode={"cover"}
      />
    </View>
  );
}
