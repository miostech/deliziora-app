import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuOfTheDayService, MenuService } from 'deliziora-client-module/client-web';

const MenuOfDay = () => {
    const currentId = useSelector((state) => state.profilePage.currentId);
    const [platesOfTheDay, setPlatesOfTheDay] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date().getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

                // Fetch menu of the day for the current restaurant and current day
                const responseMenuOfTheDay = await MenuOfTheDayService.returnAllMenuOfDayByRestaurant(currentId);
                
                if (responseMenuOfTheDay && responseMenuOfTheDay.data && responseMenuOfTheDay.data.length > 0) {
                    // Filter menu items for the current day and current restaurant
                    const menuItems = responseMenuOfTheDay.data.filter(item => item.day === today);
                    
                    // Fetch menu details for the filtered menu items
                    const menuIds = menuItems.map(item => item.id_menu);
                    const responseMenuItems = await MenuService.returnAllMenu();
                    const filteredMenuItems = responseMenuItems.data.filter(item => menuIds.includes(item._id.$oid));

                    setPlatesOfTheDay(filteredMenuItems);
                } else {
                    console.log("No menu available for this restaurant on the current day.");
                    setPlatesOfTheDay([]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentId]);

    return (
        <ScrollView style={styles.container}>
            {platesOfTheDay.length > 0 ? (
                platesOfTheDay.map((plate, index) => (
                    <View key={index} style={styles.plateContainer}>
                        <Text style={
                            styles.text
                        }>{plate.name}</Text>
                        <Text style={
                            styles.text
                        }>€{plate.price}</Text>
                    </View>
                ))
            ) : (
                <Text>Não há pratos disponíveis para o dia atual.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "35%",
        marginLeft: 20,
    },
    plateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    text:{
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: 'left',
    }
});

export default MenuOfDay;
