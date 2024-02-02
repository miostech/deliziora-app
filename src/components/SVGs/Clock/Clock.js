import { Image, StyleSheet } from 'react-native';

export default function Clock() {
  const Img = require("../../../../assets/Clock.png")
  return (

    <Image source={Img} style={styles.root} />

  );
}

const styles = StyleSheet.create({
  root: {
    width: 30,
    height: 30,
  },
});
