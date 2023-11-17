import { Image, StyleSheet, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const colors = require("../style/Colors.json");



export default function ListType() {
    const ListImg = require("../../assets/ListType.png")
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
