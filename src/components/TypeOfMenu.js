
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colors = require("../style/Colors.json");
const TypeOfMenu = () => {
    return (
        <View style={styles.menu}>
            <Text style={styles.menuDitalia}>Menu D’italia</Text>
            <Text style={[styles.carnes, styles.peixeTypo]}>Carnes</Text>
            <Text style={[styles.vegana, styles.peixeTypo]}>Vegana</Text>
            <Text style={[styles.peixe, styles.peixeTypo]}>Peixe</Text>
            <Text
                style={[styles.contrafilAssado, styles.saladaDeBatataTypo]}
            >{`Contrafilé assado `}</Text>
            <Text style={[styles.saladaDeBatata, styles.saladaDeBatataTypo]}>
                Salada de batata
            </Text>
            <Text
                style={[styles.pintadoAssado, styles.pintadoAssadoTypo]}
            >{`Pintado assado `}</Text>
            <Text style={[styles.cupimNaManteiga, styles.saladaDeBatataTypo]}>
                Cupim na manteiga
            </Text>
            <Text style={[styles.feijoadaVegana, styles.saladaDeBatataTypo]}>
                Feijoada vegana
            </Text>
            <Text style={[styles.iscaDeTilapia, styles.pintadoAssadoTypo]}>
                Isca de tilapia
            </Text>
            <Text style={[styles.text, styles.textTypo]}>22,00</Text>
            <Text style={[styles.text1, styles.textTypo]}>12,00</Text>
            <Text style={[styles.text2, styles.textTypo]}>30,00</Text>
            <Text style={[styles.text3, styles.textTypo]}>22,00</Text>
            <Text style={[styles.text4, styles.textTypo]}>27,00</Text>
            <Text style={[styles.text5, styles.textTypo]}>22,00</Text>
            <Image
                style={styles.menuChild}
                contentFit="cover"
                source={require("../assets/vector-11.png")}
            />
            <Image
                style={styles.menuItem}
                contentFit="cover"
                source={require("../assets/line-13.png")}
            />
            <Image
                style={[styles.menuInner, styles.menuChildLayout]}
                contentFit="cover"
                source={require("../assets/line-14.png")}
            />
            <Image
                style={[styles.lineIcon, styles.menuChildLayout]}
                contentFit="cover"
                source={require("../assets/line-16.png")}
            />
            <Image
                style={[styles.menuChild1, styles.menuChildLayout]}
                contentFit="cover"
                source={require("../assets/line-18.png")}
            />
            <Image
                style={[styles.menuChild2, styles.menuChildLayout]}
                contentFit="cover"
                source={require("../assets/line-15.png")}
            />
            <Image
                style={[styles.menuChild3, styles.menuChildLayout]}
                contentFit="cover"
                source={require("../assets/line-17.png")}
            />
            <Image
                style={[styles.menuChild4, styles.menuChildLayout]}
                contentFit="cover"
                source={require("../assets/line-19.png")}
            />
            <Image
                style={[styles.illustrationMenuIcon, styles.illustrationIconLayout]}
                contentFit="cover"
                source={require("../assets/illustration-menu.png")}
            />
            <Image
                style={[styles.illustrationMenuIcon1, styles.illustrationIconLayout]}
                contentFit="cover"
                source={require("../assets/illustration-menu1.png")}
            />
            <Image
                style={[styles.illustrationMenuIcon2, styles.illustrationIconLayout]}
                contentFit="cover"
                source={require("../assets/illustration-menu2.png")}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    peixeTypo: {
        fontSize: FontSize.headlineHeadlineH7_size,
        textAlign: "center",
        color: colors.neutral02ColorNeutral01,
        fontFamily: FontFamily.headlineHeadlineH7,
        left: "50%",
        position: "absolute",
    },
    saladaDeBatataTypo: {
        fontFamily: FontFamily.bodyBody04,
        fontWeight: "300",
        fontSize: FontSize.bodyBody04_size,
        color: colors.neutral02ColorNeutral01,
        left: "50%",
        textAlign: "left",
        position: "absolute", 
    },
    pintadoAssadoTypo: {
        marginLeft: -155,
        fontFamily: FontFamily.bodyBody04,
        fontWeight: "300",
        fontSize: FontSize.bodyBody04_size,
        color: colors.neutral02ColorNeutral01,
        left: "50%",
        textAlign: "left",
        position: "absolute",
    },
    textTypo: {
        marginLeft: 116,
        fontFamily: FontFamily.bodyBody04,
        fontWeight: "300",
        fontSize: FontSize.bodyBody04_size,
        textAlign: "center",
        color: Color.neutral02ColorNeutral01,
        left: "50%",
        position: "absolute",
    },
    menuChildLayout: {
        left: "4.31%",
        right: "4.31%",
        width: "91.39%",
        maxHeight: "100%",
        maxWidth: "100%",
        height: "0.11%",
        position: "absolute",
        overflow: "hidden",
    },
    illustrationIconLayout: {
        height: 104,
        width: 104,
        left: 128,
        position: "absolute",
    },
    time: {
        fontSize: FontSize.size_sm,
        letterSpacing: 0.1,
        lineHeight: 20,
        fontWeight: "500",
        fontFamily: FontFamily.robotoMedium,
        color: Color.m3RefNeutralNeutral10,
        zIndex: 0,
        textAlign: "left",
    },
    rightIcons: {
        width: 46,
        height: 17,
        zIndex: 1,
    },
    cameraCutoutIcon: {
        marginLeft: -12,
        top: 18,
        width: 24,
        height: 24,
        display: "none",
        zIndex: 2,
        left: "50%",
        position: "absolute",
    },
    devicedeviceFrameComponents: {
        top: 0,
        left: 0,
        width: 360,
        height: 52,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: Padding.p_5xl,
        paddingVertical: Padding.p_3xs,
        position: "absolute",
    },
    menuDitalia: {
        marginLeft: -75,
        top: "8.85%",
        fontSize: FontSize.headlineHeadlineH3_size,
        textAlign: "center",
        color: Color.neutral02ColorNeutral01,
        fontFamily: FontFamily.headlineHeadlineH7,
        left: "50%",
        position: "absolute",
    },
    carnes: {
        marginLeft: -31,
        top: "27.19%",
    },
    vegana: {
        marginLeft: -33,
        top: "54.69%",
    },
    peixe: {
        marginLeft: -24,
        top: "83.03%",
    },
    contrafilAssado: {
        top: "32.14%",
        marginLeft: -161,
        fontWeight: "300",
        fontSize: FontSize.bodyBody04_size,
    },
    saladaDeBatata: {
        top: "59.64%",
        marginLeft: -161,
        fontWeight: "300",
        fontSize: FontSize.bodyBody04_size,
    },
    pintadoAssado: {
        top: "87.99%",
    },
    cupimNaManteiga: {
        marginLeft: -156,
        top: "37.51%",
    },
    feijoadaVegana: {
        top: "65.02%",
        marginLeft: -161,
        fontWeight: "300",
        fontSize: FontSize.bodyBody04_size,
    },
    iscaDeTilapia: {
        top: "93.36%",
    },
    text: {
        top: "32.14%",
    },
    text1: {
        top: "59.64%",
    },
    text2: {
        top: "87.99%",
    },
    text3: {
        top: "37.51%",
    },
    text4: {
        top: "65.02%",
    },
    text5: {
        top: "93.36%",
    },
    menuChild: {
        top: 809,
        left: -12449,
        width: 100,
        height: 100,
        position: "absolute",
    },
    menuItem: {
        width: "82.5%",
        top: "13.65%",
        right: "8.75%",
        bottom: "86.25%",
        left: "8.75%",
        maxHeight: "100%",
        maxWidth: "100%",
        height: "0.11%",
        position: "absolute",
        overflow: "hidden",
    },
    menuInner: {
        top: "35.77%",
        bottom: "64.12%",
    },
    lineIcon: {
        top: "63.28%",
        bottom: "36.62%",
    },
    menuChild1: {
        top: "91.62%",
        bottom: "8.27%",
    },
    menuChild2: {
        top: "41.15%",
        bottom: "58.75%",
    },
    menuChild3: {
        top: "68.65%",
        bottom: "31.24%",
    },
    menuChild4: {
        top: "97%",
        bottom: "2.9%",
    },
    illustrationMenuIcon: {
        top: 146,
    },
    illustrationMenuIcon1: {
        top: 407,
    },
    illustrationMenuIcon2: {
        top: 676,
    },
    menu: {
        borderRadius: 8,
        backgroundColor: Color.neutral02ColorNeutral10,
        flex: 1,
        width: "100%",
        height: 949,
        overflow: "hidden",
    },
});

export default TypeOfMenu;
