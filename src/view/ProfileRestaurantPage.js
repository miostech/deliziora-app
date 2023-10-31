import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Close from "../components/SVGs/Close";
const Colors = require("../style/Colors.json");

export default function ProfileRestaurantPage({ route, navigation }) {
  const [restaurant, setRestaurant] = useState(route.params.restaurant);
  const [modalVisible, setModalVisible] = useState(false);

  const image1 = require("../../assets/AccessAnimals.png");
  const image2 = require("../../assets/AccessCard.png");
  const image3 = require("../../assets/AccessChair.png");
  const image4 = require("../../assets/AccessGarage.png");

  const plate1 = require("../../assets/PlatesOfTheDay1.png");
  const plate2 = require("../../assets/PlatesOfTheDay2.png");
  const plate3 = require("../../assets/PlatesOfTheDay3.png");
  const plate4 = require("../../assets/PlatesOfTheDay4.png");

  const plates = [
    { imagePlate: plate1, name: "Massas" },
    { imagePlate: plate2, name: "Saladas" },
    { imagePlate: plate3, name: "Aperitivos" },
    { imagePlate: plate4, name: "Vinhos" },
  ];

  const handleItemPress = () => {
    setModalVisible(!modalVisible);
  };
  const RenderItem = ({ item }) => {
    const itemStyle = styles.item;
    const nameStyle = styles.itemName;
    return (
      <Pressable style={itemStyle} onPress={() => handleItemPress()}>
        <View
          style={{
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={item.imagePlate} style={styles.imagePlates} />
          <Text style={nameStyle}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={restaurant.image} style={styles.imageRestaurant} />
      </View>
      <ScrollView
        vertical={true}
        showsHorizontalScrollIndicator={false}
        style={styles.containerRestaurantInfo}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.restaurantTitleInfo}>
          <Text style={styles.textRestaurantTitleInfo}>{restaurant.title}</Text>
          <Text style={styles.textRestaurantNormalInfo}>
            {restaurant.address}
          </Text>
          <View style={[styles.row, { marginBottom: 15, marginTop: 15 }]}>
            <Text
              style={[styles.textRestaurantNormalInfo, { fontWeight: "bold" }]}
            >
              Contato:
            </Text>
            <Text style={styles.textRestaurantNormalInfo}>
              {restaurant.contact}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.restaurantDistanceInfo]}>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              240
            </Text>
            <Text style={styles.textRestaurantNormalInfo}>seguidores</Text>
          </View>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              12h - 13h
            </Text>
            <View style={[styles.row]}>
              <Text style={styles.textRestaurantNormalInfo}>Horario</Text>
              <Text style={styles.textRestaurantNormalInfo}>-</Text>
              <Text
                style={[
                  styles.textRestaurantNormalInfo,
                  { color: "green", fontWeight: "bold" },
                ]}
              >
                Aberto
              </Text>
            </View>
          </View>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              1km
            </Text>
            <Text style={styles.textRestaurantNormalInfo}>Distancia</Text>
          </View>
        </View>
        <View style={[styles.row, styles.imageAccessContainer]}>
          <View>
            <Image source={image1} style={styles.image} />
          </View>
          <View>
            <Image source={image2} style={styles.image} />
          </View>
          <View>
            <Image source={image3} style={styles.image} />
          </View>
          <View>
            <Image source={image4} style={styles.image} />
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              { fontWeight: "bold", fontSize: 18 },
            ]}
          >
            Sobre
          </Text>
          <Text style={styles.textRestaurantNormalInfo}>
            {restaurant.about}
          </Text>
        </View>
        <View style={styles.platesContainer}>
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
            ]}
          >
            Pratos do Dia
          </Text>
          <FlatList
            horizontal
            data={plates}
            renderItem={({ item }) => <RenderItem item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{ width: "100%", paddingLeft: "85%" }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Close height={"32"} width={"32"} />
                </Pressable>
              </View>
              <ScrollView
                vertical={true}
                showsHorizontalScrollIndicator={false}
                style={styles.containerModalInfo}
                contentContainerStyle={styles.contentContainer}
              >
                <View style={styles.modalMenuTitle}>
                  <Text style={[{fontSize:24, textAlign:"center"}]}>Menu {restaurant.title}</Text>
                </View>
                <View style={styles.modalContentMenu}>
                  <Text style={[styles.bold, {fontSize:22, marginBottom:24}]}>Massas</Text>
                  <View style={styles.modalContentMenuBox}>
                    <View style={[styles.row, {justifyContent:"space-between", }]}>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>Esparguete</Text>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>€000</Text>
                    </View>
                    <View>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur. Nunc lectus
                        mollis aliquet sit.
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={[styles.row, {justifyContent:"space-between", }]}>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>Lasanha</Text>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>€000</Text>
                    </View>

                    <View>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur. Nunc lectus
                        mollis aliquet sit.
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.modalContentMenu}>
                  <Text style={[styles.bold, {fontSize:22, marginBottom:24}]}>Massas</Text>
                  <View style={styles.modalContentMenuBox}>
                    <View style={[styles.row, {justifyContent:"space-between", }]}>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>Esparguete</Text>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>€000</Text>
                    </View>
                    <View>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur. Nunc lectus
                        mollis aliquet sit.
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={[styles.row, {justifyContent:"space-between", }]}>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>Lasanha</Text>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>€000</Text>
                    </View>

                    <View>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur. Nunc lectus
                        mollis aliquet sit.
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.modalContentMenu}>
                  <Text style={[styles.bold, {fontSize:22, marginBottom:24}]}>Massas</Text>
                  <View style={styles.modalContentMenuBox}>
                    <View style={[styles.row, {justifyContent:"space-between", }]}>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>Esparguete</Text>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>€000</Text>
                    </View>
                    <View>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur. Nunc lectus
                        mollis aliquet sit.
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={[styles.row, {justifyContent:"space-between", }]}>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>Lasanha</Text>
                      <Text style={[styles.bold, {fontSize:16, color:"grey"}]}>€000</Text>
                    </View>

                    <View>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur. Nunc lectus
                        mollis aliquet sit.
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    position: "absolute",
    height: "60%",
    width: "80%",
    top: 200,
    right: 40,
    borderRadius: 20,
  },
  modalContent: {
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
  },
  modalMenuTitle: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingBottom: 20,
    width: "100%",
  },
  modalContentMenu: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingBottom: 35,
  },
  modalContentMenuBox:{
    marginBottom:23,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 50,
  },
  containerRestaurantInfo: {
    flex: 1,
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 150,
    height: "100%",
    padding: 10,
  },
  containerModalInfo: {
    height: "100%",
    padding: 10,
  },
  restaurantTitleInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 35,
    borderBottomColor: "grey",
  },
  textRestaurantTitleInfo: { fontSize: 22, fontWeight: "bold" },
  textRestaurantNormalInfo: { fontSize: 16 },
  restaurantDistanceInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
    gap: 30,
  },
  restaurantDistanceContent: { justifyContent: "center", alignItems: "center" },
  image: {
    width: 65,
    height: 80,
  },
  imagePlates: {
    width: 100,
    height: 100,
  },
  imageRestaurant: {
    width: "100%",
    position: "absolute",
  },
  imageAccessContainer: {
    gap: 20,
  },
  aboutContainer: {
    marginTop: 35,
    gap: 10,
  },
  platesContainer: { marginTop: 35, flex: 1 },
  itemName: {
    fontWeight: "bold",
  },
});
