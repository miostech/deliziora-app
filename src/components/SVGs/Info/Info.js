import { Image, StyleSheet, View } from 'react-native';
export default function PhoneIcon() {
  const Img = require("./Icon.png")
  return (
    <Image source={Img} style={styles.root} />
  );
}
const styles = StyleSheet.create({
  root: {
    minWidth: 30,
    minHeight: 30,
    maxWidth: 30,
    maxHeight:30
  },
});
