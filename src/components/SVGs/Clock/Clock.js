import { Image, StyleSheet } from 'react-native';

export default function Clock() {
  const Img = require("./Clock.png")
  return (

    <Image source={Img} style={styles.root} />

  );
}

const styles = StyleSheet.create({
  root: {
    minWidth: 30,
    minHeight: 30,
    maxWidth: 30,
    maxHeight: 30
  },
});
