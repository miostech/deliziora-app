import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Close from '../components/SVGs/Close';

const colors = require('../style/Colors.json');
const NotificationNotFoundScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.close}>
                <Close
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />
            </View>
            <Image source={require("../../assets/Illustration_warnings_unfound.png")} style={styles.image} />
            <Text style={styles.TextNotFound}>Notificações</Text>
            <Text style={styles.TextNotFound2}>
                Nenhuma notificação foi encontrada ou criada recentemente.
            </Text>
            <View style={styles.button}>
                <Button
                    title='Voltar'
                    color='#fff'
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                ></Button>
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
        fontFamily: "Roboto",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "600",
    },
    TextNotFound2: {
        width: 328,
        color: colors.colors.neutral01Color.neutral_01,
        textAlign: 'center',
        fontFamily: "Roboto",
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
        fontFamily: "Roboto",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
    },
});

export default NotificationNotFoundScreen;
