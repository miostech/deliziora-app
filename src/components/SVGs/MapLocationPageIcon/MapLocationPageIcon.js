import { Image, StyleSheet } from 'react-native';

export default function MapLocationPageIcon() {
    const Img = require("./Location.png")
    return (

        <Image source={Img} style={styles.root} />

    );
}

const styles = StyleSheet.create({
    root: {
        minWidth: 24,
        minHeight: 24,
        maxWidth: 24,
        maxHeight: 24
    },
});
