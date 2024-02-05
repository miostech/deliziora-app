import { Image, StyleSheet, View } from 'react-native';



export default function PhoneIcon() {
    const Img = require("../../assets/Map.png")
    return (
     
            <Image source={Img} style={styles.root}/>
       
    );
}

const styles = StyleSheet.create({
    root: {
        width: 30,
        height: 30,
    },
});
