import React, { useState } from 'react';
import { View, Alert, TextInput, StyleSheet, Modal, Pressable, Text } from 'react-native'
import { SearchIcon } from './SearchIcon';
import { FilterSearch } from './FilterSearch';
import { Svg, Path } from 'react-native-svg';
import Close from './SVGs/Close';
import CheckBox from './SVGs/CheckBox';
import UnCheckBox from './SVGs/UnCheckBox';
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
                        placeholderTextColor={colors.colors.neutral02Color.neutral_1}
                        style={styles.placeholderLabel}
                        overflow="hidden"
                    >
                    </TextInput>
                </View>
            </View>
            <View style={styles.filterButton}>
                <Pressable
                    onPress={() => setModalVisible(true)}>
                    <FilterSearch />
                </Pressable>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalContent}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Close />
                                </Pressable>
                                <Text style={styles.modalText}>Filtros</Text>
                                <Svg width="330" height="1" viewBox="0 0 330 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.line}>
                                    <Path d="M1 1H329" stroke="#A5A2A6" stroke-linecap="round" />
                                </Svg>
                            </View>
                            <View style={styles.modalContent2}>
                                <Text style={styles.modalText2}>Status de funcionamento</Text>
                                <Text style={styles.modalText3}>É  possível visualizar todos os restaurantes ou apenas os que estão abertos no momento.</Text>
                            </View>
                            <View style={styles.modalContent3}>
                                <View style={styles.modalMiniContent3}>
                                    <Text style={styles.modalText4}>Qualquer</Text>
                                    {
                                        isChecked === true ?
                                            (<Text onPress={() => setIsChecked(!isChecked)}><CheckBox /></Text>) :
                                            (<Text onPress={() => setIsChecked(!isChecked)}><UnCheckBox /></Text>)
                                    }
                                </View>
                                <View style={styles.modalMiniContent3}>
                                    <Text style={styles.modalText4}>Aberto</Text>
                                    {
                                        isChecked2 === true ?
                                            (<Text onPress={() => setIsChecked2(!isChecked2)}><CheckBox /></Text>) :
                                            (<Text onPress={() => setIsChecked2(!isChecked2)}><UnCheckBox /></Text>)
                                    }
                                </View>
                                <View style={styles.modalMiniContent3}>
                                    <Text style={styles.modalText4}>Fechado</Text>
                                    {
                                        isChecked3 === true ?
                                            (<Text onPress={() => setIsChecked3(!isChecked3)}><CheckBox /></Text>) :
                                            (<Text onPress={() => setIsChecked3(!isChecked3)}><UnCheckBox /></Text>)
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        top: 100,
        alignItems: 'center',
        borderRadius: 32,
        display: 'flex'
    },


    root: {
        height: 56,
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.colors.neutral02Color.neutral_10,
        borderRadius: 32,
        display: 'flex',
        justifyContent: 'end',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        height: '100%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        color: '#201F23',
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
    },
    modalContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginLeft: '5%',
        top: 100,
        gap: 18,
    },
    line: {
        position: 'absolute',
        top: 56,
        width: 330,
        height: 1
    },
    modalContent2: {
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginLeft: '5%',
        top: 150,
        gap: 18,
    },
    modalText2: {
        width: '100%',
        textAlign: 'left',
        color: '#201F23',
        fontFamily: 'Roboto',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
    },
    modalText3: {
        width: '100%',
        textAlign: 'left',
        color: '#201F23',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: "400",
        lineHeight: 'normal',
    },
    modalText4: {
        textAlign: 'left',
        color: '#201F23',
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
    },
    modalContent3: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginLeft: '5%',
        top: 200,
        gap: 18,
    },
    modalMiniContent3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

});

//make this component available to the app
export default SearchBar;
