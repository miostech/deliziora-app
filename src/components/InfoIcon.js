import { Image, StyleSheet, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const colors = require("../style/Colors.json");



export default function InfoIcon() {
    const Img = require("../../assets/InfoIcon.png")
    return (
        <Image source={Img} style={styles.root} />
    );
}

const styles = StyleSheet.create({
    root: {
        width: 24,
        height: 24,
        maxHeight: 24,
        maxWidth: 24
    },
});
