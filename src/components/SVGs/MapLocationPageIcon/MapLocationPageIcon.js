import { Image, StyleSheet } from 'react-native';

export default function MapLocationPageIcon() {
    const Img = require("./Location.png")
    return (

        <Image source={Img} style={styles.root} />

    );
}

const styles = StyleSheet.create({
    root: {
        minWidth: 30,
        minHeight: 30,
        maxWidth: 30,
        maxHeight: 30,

    },
});
