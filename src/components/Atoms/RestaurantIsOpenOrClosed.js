import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"; // Removido, pois não estamos mais usando Redux
import { RestaurantService } from "deliziora-client-module/client-web";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";
import Clock from "../../components/SVGs/Clock/Clock";
import { Divider } from "react-native-elements";
const RestaurantIsOpenOrClosed = () => {
  const currentId = useSelector((state) => state.profilePage.currentId); // Removido, pois não estamos mais usando Redux
  const [restaurant, setRestaurant] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const rbSheetRef = useRef();
  const daysOfWeek = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terça-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ];

  useEffect(() => {
    RestaurantService.returnRestaurantById(currentId)
      .then((restaurantData) => {
        setRestaurant(restaurantData.data);

        // Obtenha o dia atual usando Moment.js
        const currentDay = moment().format("dddd").toLowerCase();

        // Verifique se o restaurante está aberto hoje
        if (restaurantData.data.opening_hours[currentDay]) {
          // Se o restaurante estiver aberto hoje, obtenha os horários de abertura e fechamento
          const openTime = restaurantData.data.opening_hours[currentDay].open;
          const closeTime =
            restaurantData.data.opening_hours[currentDay].closed;

          setOpeningTime(openTime);
          setClosingTime(closeTime);

          // Verifique se está aberto no momento atual
          const currentTime = moment().format("HH:mm");
          setIsOpen(
            moment(currentTime, "HH:mm").isBetween(
              moment(openTime, "HH:mm"),
              moment(closeTime, "HH:mm")
            )
          );
        } else {
          // Se não houver horários definidos para o dia atual, defina como fechado
          setIsOpen(false);
          setOpeningTime("-");
          setClosingTime("-");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentId]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        width: "100%",
        alignItems: "center",
        marginBottom: 15,
      }}
    >
      <Pressable
        onPress={() => {
          rbSheetRef.current.open();
        }}
      >
        <View style={{ width: 30 }}>
          <Clock />
        </View>
      </Pressable>

      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Text style={styles.text}>{openingTime}</Text>
          <Text style={styles.text}>-</Text>
          <Text style={styles.text}>{closingTime}</Text>
        </View>
        <Text
          style={[{ fontWeight: "600", alignSelf: "flex-start", }, styles.text2]}
        >
          {"("}
          {isOpen ? "Aberto" : "Fechado"}
          {")"}
        </Text>
      </View>
      <RBSheet
        ref={rbSheetRef}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            ...Platform.select({
              ios: {
                marginTop: 20,
              },
              android: {
                // Estilos para Android, se necessário
              },
              default: {
                // Estilos padrão para outras plataformas
              },
            }),
          },
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.modalHeader}>
            <Text style={[styles.text, { marginBottom: 20 }]}>
              Hórario de funcionamento:
            </Text>
          </View>
          {daysOfWeek.map((day) => (
            <View key={day.key} style={{ marginBottom: 30, width: "100%" }}>
              <Text style={[styles.text2, { fontWeight: "700" }]}>
                {day.label}
              </Text>
              <Text>
                Aberto: {restaurant?.opening_hours?.[day.key]?.open}
              </Text>
              <Text>
                Fechado: {restaurant?.opening_hours?.[day.key]?.closed}
              </Text>
              <Divider />
            </View>
          ))}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default RestaurantIsOpenOrClosed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
  },
  text2: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingVertical: 8,
    minWidth: "90%",
  },
  modalHeader: {
    width: "100%",
    display: "flex",
    height: 60,

    alignItems: "center",
  },
});
