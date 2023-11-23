import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { SearchIcon } from "./SearchIcon";
import { FilterSearch } from "./FilterSearch";
import ListType from "./ListType";
import Close from "./SVGs/Close";
import CheckBox from "./SVGs/CheckBox";
import UnCheckBox from "./SVGs/UnCheckBox";
import FoodFilterSlider from "./FoodFilterSlider";
import DistanceSlider from "./DistanceSlider";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Device from "expo-device";
import ListTypeMap from "./ListTypeMap";
import SwitchOpenOrClose from "./Switch";

const colors = require("../style/Colors.json");

const SearchBar = ({ listType, setListType, isfilter, islistType }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const refRBSheet = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <View
          style={
            isfilter === false && islistType === false
              ? styles.contentWithOutListFilter
              : styles.content
          }
        >
          <View>
            <SearchIcon onPress={() => { }} />
          </View>
          <View>
            <TextInput
              placeholder="Pesquisar"
              placeholderTextColor={colors.colors.neutral02Color.neutral_1}
              style={styles.placeholderLabel}

              selectionColor={colors.colors.neutral02Color.neutral_1}
              overflow="hidden"
            ></TextInput>
          </View>
        </View>
        {isfilter === false ? null : (
          <View style={styles.filterButton}>
            <Pressable onPress={() => refRBSheet.current.open()}>
              <FilterSearch />
            </Pressable>
          </View>
        )}
        {islistType === false ? null : (
          <View style={styles.filterButton}>
            <Pressable
              onPress={() => {
                setListType(!listType);
              }}
            >
              {listType ? <ListTypeMap /> : <ListType />}
            </Pressable>
          </View>
        )}
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        animationType="fade"
        height={Dimensions.get("window").height - 150}
        customStyles={{
          wrapper: {
            backgroundColor:
              Device.brand == "Apple" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)",
            height: "100%",
          },
          draggableIcon: {},
          container: {},
        }}
      >
        <View style={styles.containerView}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#A5A2A6",
                width: "95%",
                paddingBottom: 15,
                gap: 15,
              }}
            >
              <Pressable
                style={styles.buttonClose}
                onPress={() => refRBSheet.current.close()}
              >
                <Close />
              </Pressable>
              <Text style={styles.modalText}>Filtros</Text>
            </View>
          </View>
          <ScrollView
            vertical={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.modalContentAll}>
              <View style={styles.modalContent2}>
                <Text style={styles.modalText2}>
                  É possível visualizar todos os restaurantes ou apenas os que
                  estão abertos no momento.
                </Text>
                <View style={styles.modalContent3}>
                  <Text style={styles.modalText3}>
                    Mostrar apenas restaurantes abertos
                  </Text>
                  <SwitchOpenOrClose />
                </View>
              </View>
              <View style={styles.line2}></View>
              <View style={styles.modalContent4}>
                <Text style={styles.modalText5}>Caracteristicas</Text>
                <Text style={styles.modalText6}>
                  Busque por cozinhas, escolha do seu gosto e jeito.
                </Text>
                <View style={styles.modalMiniContent4}>
                  <FoodFilterSlider />
                </View>
              </View>
              <View style={styles.line3}></View>
              <View style={styles.modalContent5}>
                <Text style={styles.modalText7}>Distância</Text>
                <Text style={styles.modalText8}>
                  Arrastes para o lado selecionando a distancia máxima desejada.
                </Text>
                <View style={styles.modalMiniContent5}>
                  <DistanceSlider />
                </View>
              </View>
              <View style={styles.line4}></View>
              <View style={styles.modalContent6}>
                <Pressable style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Limpar Filtros</Text>
                </Pressable>
                <Pressable
                  onPress={() => refRBSheet.current.close()}
                  style={styles.modalButton2}
                >
                  <Text style={styles.modalButtonText2}>Ver restaurantes</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.colors.neutral02Color.neutral_10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 50,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
  },

  root: {
    height: 56,
    width: "100%",
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    borderRadius: 32,
    height: 56,
    width: "70%",
    padding: 20,
    flexDirection: "row",
    backgroundColor: colors.colors.neutral02Color.neutral_10,
    justifyContent: "end",
    alignItems: "center",
  },
  contentWithOutListFilter: {
    borderRadius: 32,
    height: 56,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    backgroundColor: colors.colors.neutral02Color.neutral_10,
    justifyContent: "end",
    alignItems: "center",
  },
  placeholderLabel: {
    marginLeft: 20,
    maxWidth: 200,
    color: colors.colors.neutral02Color.neutral_1,
  },
  filterButton: {
    marginLeft: 20,
    width: 54,
    height: 54,
    backgroundColor: colors.colors.neutral02Color.neutral_10,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "red",
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: "#201F23",
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  modalContentAll: {
    flex: 1,
    gap: 10,
  },
  modalContent: {
    backgroundColor: colors.colors.neutral01Color.neutral_08,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
  },
  line: {},
  modalContent2: {
    flex: 1,
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  modalText2: { fontSize: 18, fontWeight: "bold" },
  modalText3: { fontSize: 16 },
  modalText4: { fontSize: 17, fontWeight: "bold" },
  modalContent3: {
    flex: 1,
  },
  modalContent3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  line2: {
    borderBottomWidth: 1,
    borderColor: "#A5A2A6",
    marginTop: 15,
    marginBottom: 30,
  },
  modalContent4: {
    flex: 1,
    gap: 10,
  },
  modalText5: { fontSize: 18, fontWeight: "bold" },
  modalText6: { fontSize: 16 },
  line3: {
    borderBottomWidth: 1,
    borderColor: "#A5A2A6",
    marginTop: 30,
    marginBottom: 30,
  },
  modalMiniContent4: { paddingTop: 40 },
  modalContent5: {
    flex: 1,
    gap: 10,
  },
  modalText7: { fontSize: 18, fontWeight: "bold" },
  modalText8: { fontSize: 16 },
  modalMiniContent5: {},
  line4: {
    borderBottomWidth: 1,
    borderColor: "#A5A2A6",
    marginTop: 30,
    marginBottom: 30,
  },
  modalContent6: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    padding: 12,
    borderRadius: 24,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton2: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 24,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {},
  modalButtonText2: { color: "white" },
});

export default SearchBar;
