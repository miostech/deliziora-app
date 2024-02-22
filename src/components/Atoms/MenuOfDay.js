import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuOfTheDayService, MenuService } from 'deliziora-client-module/client-web';
import ArrowLeft from '../SVGs/ArrowLeft/ArrowLeft';
import { useNavigation } from '@react-navigation/native';

const MenuOfDay = () => {
    const currentId = useSelector((state) => state.profilePage.currentId);
    const [platesOfTheDay, setPlatesOfTheDay] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch menu of the day for the current restaurant
                const responseMenuOfTheDay = await MenuOfTheDayService.returnAllMenuOfDayByRestaurant(currentId);
                if (responseMenuOfTheDay && responseMenuOfTheDay.data && responseMenuOfTheDay.data.length > 0) {
                    // Extract menu item IDs for the day
                    const menuIds = responseMenuOfTheDay.data.map(item => item.id_menu);
                    // Fetch menu items corresponding to the IDs
                    const responseMenuItems = await MenuService.returnAllMenu();
                    const menuItems = responseMenuItems.data.filter(item => menuIds.includes(item._id.$oid));
                    setPlatesOfTheDay(menuItems);
                    console.log("ACHAMOS", platesOfTheDay);
                } else {
                    console.log("No menu available for this restaurant.");
                    setPlatesOfTheDay([]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentId]);

    return (
        <ScrollView style={{
            width: "90%",
            height: "35%",
            marginLeft: 20,
        }}>
            {platesOfTheDay.length > 0 ? (
                platesOfTheDay.map((plate, index) => (
                    <View key={index}>
                        <View style={styles.plateContainer}>
                            <Text style={{
                                textAlign: "center",
                                fontFamily: "Roboto",
                                fontSize: 16,
                                fontStyle: "normal",
                                fontWeight: "300",
                            }}>{plate.name}</Text>
                            <Text style={{
                                textAlign: "center",
                                fontFamily: "Roboto",
                                fontSize: 16,
                                fontStyle: "normal",
                                fontWeight: "300",
                            }}>€{plate.price}</Text>
                        </View>
                        <View style={styles.divider} />
                    </View>
                ))
            ) : (
                <Text>Não há pratos disponíveis para o dia.</Text>
            )}
        </ScrollView>
    );
};

export default MenuOfDay;

const styles = StyleSheet.create({
    plateContainer: {
        maxWidth: "100%",
        flexDirection: "row",
        paddingTop: 20,
        justifyContent: "space-between",
    },
    divider: {
        height: 1,
        minWidth: "90%",
        backgroundColor: 'grey',
        marginBottom: 20,
    },
});
