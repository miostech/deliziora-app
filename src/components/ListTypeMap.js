import { Image, StyleSheet, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const colors = require("../style/Colors.json");



export default function ListTypeMap() {
    const ListImg = require("../../assets/bx_bx-map-pin.png")
    return (
     
            <Image source={ListImg} style={styles.root}/>
       
    );
}

const styles = StyleSheet.create({
    root: {
        width: 30,
        height: 30,
    },
});
