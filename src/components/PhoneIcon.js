import { Image, StyleSheet, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const colors = require("../style/Colors.json");



export default function PhoneIcon() {
    const Img = require("../../assets/PhoneIcon.png")
    return (

        <Image source={Img} style={styles.root} />

    );
}

const styles = StyleSheet.create({
    root: {
        width: 30,
        height:30,
    },
});
