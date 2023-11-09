import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Close from '../components/SVGs/Close';

const colors = require('../style/Colors.json');
const SearchPostalCodeScreen = () => {
    const [locationPermission, setLocationPermission] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.close}>
                <Close
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />
            </View>
            <Image source={require("../../assets/Illustration_Search_CEP.png")} style={styles.image} />
            <Text style={styles.TextNotFound}>Minha localização</Text>
            <Text style={styles.TextNotFound2}>
                {locationPermission
                    ? 'Localização ativada!'
                    : 'Por favor, para melhor experiência, precisamos de sua localização, tudo bem?'}
            </Text>
            <View style={styles.buttongroup}>
                <View style={styles.button}>
                    <Button
                        title='Ativar permissões'
                        color='#fff'
                        onPress={() => setLocationPermission(true)}
                    ></Button>
                </View>
                <View style={styles.button2}>
                    <Button
                        title='Agora não'
                        color='#29272D'
                        onPress={() => setLocationPermission(false)}
                    ></Button>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    image: {
        width: 328,
        height: 328,
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 60,
    },
    TextNotFound: {
        color: colors.colors.neutral01Color.neutral_01,
        textAlign: 'center',
        fontFamily: "Roboto_400Regular",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
    },
    TextNotFound2: {
        width: 328,
        color: colors.colors.neutral01Color.neutral_01,
        textAlign: 'center',
        fontFamily: "Roboto_400Regular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "500",
    },
    button: {
        marginTop: 20,
        width: 328,
        height: 50,
        backgroundColor: colors.colors.neutral02Color.neutral_02,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: "Roboto_400Regular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
    },
    button2: {
        marginTop: 20,
        width: 328,
        height: 50,
        backgroundColor: colors.colors.neutral02Color.neutral_10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: "Roboto_400Regular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
    }
});

export default SearchPostalCodeScreen;
