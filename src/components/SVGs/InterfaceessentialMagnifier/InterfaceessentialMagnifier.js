import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function InterfaceessentialMagnifier() {
    return (
        <View style={styles.interfaceessentialMagnifier}>
            <Svg style={styles.icon} width="20" height="19" viewBox="0 0 20 19" fill="none" >
                <Path fillRule="evenodd" clipRule="evenodd" d="M5.66945 17.9382C2.24481 16.512 0.0101592 13.1704 0.000250505 9.46066C-0.020804 5.46246 2.54018 1.90737 6.33922 0.661047C10.1383 -0.585272 14.3075 0.761901 16.6589 3.99558C19.0104 7.22927 19.0069 11.6107 16.6503 14.8407L19.5303 17.7207C19.8227 18.0135 19.8227 18.4878 19.5303 18.7807C19.2374 19.0731 18.7631 19.0731 18.4703 18.7807L15.6803 15.9907C13.0401 18.5968 9.09409 19.3644 5.66945 17.9382ZM12.1692 16.6011C15.0549 15.4036 16.9343 12.5849 16.9303 9.46066L16.8903 9.46066C16.8848 5.22037 13.4605 1.77812 9.22025 1.75066C6.09599 1.74662 3.27729 3.62605 2.07982 6.51172C0.882347 9.39739 1.5422 12.7203 3.75139 14.9295C5.96058 17.1387 9.28352 17.7986 12.1692 16.6011Z" fill="#79767B" />
            </Svg>

        </View>
    )
}

const styles = StyleSheet.create({
    interfaceessentialMagnifier: {
        flexShrink: 0,
        height: 24,
        width: 24,
        transform: [
            {
                rotateZ: "90.00deg"
            }
        ],
        alignItems: "flex-start",
        rowGap: 0
    },
    icon: {
        position: "absolute",
        flexShrink: 0,
        top: 2,
        right: 2,
        bottom: 2,
        left: 3,
        overflow: "visible"
    }
})