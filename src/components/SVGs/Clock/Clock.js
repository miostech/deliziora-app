import { Image, StyleSheet } from 'react-native';

export default function Clock() {
  const Img = require("./Clock.png")
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
