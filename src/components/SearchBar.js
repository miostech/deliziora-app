import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Modal,
    Pressable,
    Text,
    ScrollView,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { SearchIcon } from "./SearchIcon";
import { FilterSearch } from "./FilterSearch";
import Close from "./SVGs/Close";
import CheckBox from "./SVGs/CheckBox";
import UnCheckBox from "./SVGs/UnCheckBox";
import FoodFilterSlider from "./FoodFilterSlider";
import DistanceSlider from "./DistanceSlider";

const colors = require("../style/Colors.json");

const SearchBar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.root}>
                <View style={styles.content}>
                    <SearchIcon onPress={() => { }} />
                </View>
                <View>
                    <TextInput
                        placeholder="Pesquisar"
                        autoComplete="on"
                        placeholderTextColor={colors.colors.neutral02Color.neutral_1}
                        style={styles.placeholderLabel}
                        overflow="hidden"
                    ></TextInput>
                </View>
            </View>
            <View style={styles.filterButton}>
                <Pressable onPress={() => setModalVisible(true)}>
                    <FilterSearch />
                </Pressable>
            </View>

            <View style={styles.centeredView}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView vertical={true}>
                                <View style={styles.modalContent}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Close />
                                    </Pressable>
                                    <Text style={styles.modalText}>Filtros</Text>
                                    <Svg
                                        width="100%"
                                        height="1"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={styles.line}
                                    >
                                        <Path d="M1 1H329" stroke="#A5A2A6" stroke-linecap="round" />
                                    </Svg>
                                </View>

                                <View style={styles.modalContent2}>
                                    <Text style={styles.modalText2}>Status de funcionamento</Text>
                                    <Text style={styles.modalText3}>
                                        É possível visualizar todos os restaurantes ou apenas os que
                                        estão abertos no momento.
                                    </Text>
                                </View>
                                <View style={styles.modalContent3}>
                                    <View style={styles.modalMiniContent3}>
                                        <Text style={styles.modalText4}>Qualquer</Text>
                                        {isChecked === true ? (
                                            <Text onPress={() => setIsChecked(!isChecked)}>
                                                <CheckBox />
                                            </Text>
                                        ) : (
                                            <Text onPress={() => setIsChecked(!isChecked)}>
                                                <UnCheckBox />
                                            </Text>
                                        )}
                                    </View>
                                    <View style={styles.modalMiniContent3}>
                                        <Text style={styles.modalText4}>Aberto</Text>
                                        {isChecked2 === true ? (
                                            <Text onPress={() => setIsChecked2(!isChecked2)}>
                                                <CheckBox />
                                            </Text>
                                        ) : (
                                            <Text onPress={() => setIsChecked2(!isChecked2)}>
                                                <UnCheckBox />
                                            </Text>
                                        )}
                                    </View>
                                    <View style={styles.modalMiniContent3}>
                                        <Text style={styles.modalText4}>Fechado</Text>
                                        {isChecked3 === true ? (
                                            <Text onPress={() => setIsChecked3(!isChecked3)}>
                                                <CheckBox />
                                            </Text>
                                        ) : (
                                            <Text onPress={() => setIsChecked3(!isChecked3)}>
                                                <UnCheckBox />
                                            </Text>
                                        )}
                                    </View>
                                    <View style={styles.line2}></View>
                                    <View style={styles.modalContent4}>
                                        <Text style={styles.modalText5}>Tipos de comidas</Text>
                                        <Text style={styles.modalText6}>
                                            Busque por cozinhas, escolha do seu gosto
                                            e jeito.
                                        </Text>
                                        <View style={styles.modalMiniContent4}>
                                            <FoodFilterSlider />
                                        </View>
                                    </View>
                                    <View style={styles.line3}></View>
                                    <View style={styles.modalContent5}>
                                        <Text style={styles.modalText7}>Distância</Text>
                                        <Text style={styles.modalText8}>
                                            Arrastes para o lado selecionando a distancia
                                            máxima desejada.
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
                                        <Pressable style={styles.modalButton2}>
                                            <Text style={styles.modalButtonText2}>
                                                Ver restaurantes
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

            </View >

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 32,
        display: "flex",
    },

    root: {
        height: 56,
        width: 300,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.colors.neutral02Color.neutral_10,
        borderRadius: 32,
        display: "flex",
        justifyContent: "end",
    },
    content: {
        marginLeft: 20,
    },
    placeholderLabel: {
        marginLeft: 20,
        maxWidth: 200,
        color: colors.colors.neutral02Color.neutral_1,
    },
    filterButton: {
        marginLeft: 20,
        width: 54,
        backgroundColor: colors.colors.neutral02Color.neutral_10,
        borderRadius: 32,
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
        fontFamily: "Roboto",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "normal",
    },
    modalContent: {
        flexDirection: "row",
        alignItems: "center",
        width: 330,
        marginLeft: "5%",
        top: 100,
        gap: 18,
    },
    line: {
        position: "absolute",
        top: 56,
        width: 330,
        height: 1,
    },
    modalContent2: {
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        width: 330,
        marginLeft: "5%",
        top: 150,
        gap: 18,
    },
    modalText2: {
        width: 330,
        textAlign: "left",
        color: "#201F23",
        fontFamily: "Roboto",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "bold",
    },
    modalText3: {
        width: 330,
        textAlign: "left",
        color: "#201F23",
        fontFamily: "Roboto",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
    },
    modalText4: {
        textAlign: "left",
        color: "#201F23",
        fontFamily: "Roboto",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "bold",
    },
    modalContent3: {
        flexDirection: "column",
        alignItems: "center",
        width: 330,
        marginLeft: "5%",
        top: 200,
        gap: 18,
    },
    modalMiniContent3: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 330,
    },
    line2: {
        backgroundColor: "#A5A2A6",
        width: 330,
        top: "2%",
        height: 2,
    },
    modalContent4: {
        top: 22,
        flexDirection: "column",
        gap: 8,
        width: 330,
    },
    modalText5: {
        textAlign: "left",
        color: "#201F23",
        fontFamily: "Roboto",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "bold",
    },
    modalText6: {
        textAlign: "left",
        color: "#201F23",
        fontFamily: "Roboto",
        fontSize: 16,
        lineHeight: 24,
        fontStyle: "normal",
        fontWeight: "300",
    },
    line3: {
        backgroundColor: "#A5A2A6",
        width: "100%",
        top: "10%",
        height: 2,
    },
    modalMiniContent4: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 1,
        borderColor: '#A5A2A6',
        alignItems: 'flex-start',
    },
    modalContent5: {
        flexDirection: "column",
        width: "100%",
        top: 50,
        gap: 8,
    },
    modalText7: {
        textAlign: "left",
        color: colors.colors.neutral02Color.neutral_01,
        fontFamily: "Roboto",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "bold",
        lineHeight: 21,
    },
    modalText8: {
        textAlign: "left",
        color: colors.colors.neutral02Color.neutral_01,
        fontFamily: "Roboto",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "300",
        lineHeight: 18,
    },
    modalMiniContent5: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 8,
        width: "100%",
    },
    line4: {
        backgroundColor: "#A5A2A6",
        width: "100%",
        top: 32,
        height: 2,
    },
    modalContent6: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 330,
    },
    modalButton: {
        width: 108,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    modalButton2: {
        width: 152,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: colors.colors.neutral02Color.neutral_02,
    },
    modalButtonText: {
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20,
    },
    modalButtonText2: {
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 20,
        color: colors.colors.neutral02Color.neutral_10,
    },
});

export default SearchBar;
