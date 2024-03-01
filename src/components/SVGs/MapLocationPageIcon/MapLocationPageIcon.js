import { Image, StyleSheet } from 'react-native';

export default function MapLocationPageIcon() {
    const Img = require("./PinGoogle.png")
    return (

        <Image source={Img} style={styles.root} />

    );
}

const styles = StyleSheet.create({
    root: {
        width:18,
        height:25

    },
});
