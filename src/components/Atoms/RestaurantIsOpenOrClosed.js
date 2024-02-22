import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Removido, pois não estamos mais usando Redux
import { RestaurantService } from 'deliziora-client-module/client-web';
import moment from 'moment';
import Clock from '../../components/SVGs/Clock/Clock'
const RestaurantIsOpenOrClosed = () => {
    const currentId = useSelector((state) => state.profilePage.currentId); // Removido, pois não estamos mais usando Redux
    const [restaurant, setRestaurant] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');

    useEffect(() => {
        RestaurantService.returnRestaurantById(currentId)
            .then(restaurantData => {
                setRestaurant(restaurantData.data);

                // Obtenha o dia atual usando Moment.js
                const currentDay = moment().format('dddd').toLowerCase();

                // Verifique se o restaurante está aberto hoje
                if (restaurantData.data.opening_hours[currentDay]) {
                    // Se o restaurante estiver aberto hoje, obtenha os horários de abertura e fechamento
                    const openTime = restaurantData.data.opening_hours[currentDay].open;
                    const closeTime = restaurantData.data.opening_hours[currentDay].closed;

                    setOpeningTime(openTime);
                    setClosingTime(closeTime);

                    // Verifique se está aberto no momento atual
                    const currentTime = moment().format('HH:mm');
                    setIsOpen(moment(currentTime, 'HH:mm').isBetween(moment(openTime, 'HH:mm'), moment(closeTime, 'HH:mm')));
                } else {
                    // Se não houver horários definidos para o dia atual, defina como fechado
                    setIsOpen(false);
                    setOpeningTime('-');
                    setClosingTime('-');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [currentId]);

    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,

            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 30,
            marginBottom: 5,
        }}>
            <Clock />
            <View style={{
                flexDirection: "row",
                gap: 5,
                marginLeft: 30,
            }}>
                <Text style={styles.text}>{openingTime}AM</Text><Text style={styles.text}>-</Text><Text style={styles.text}>{closingTime}PM</Text>
            </View>
            <Text style={styles.text}>|</Text>
            <Text style={[{ color: isOpen ? 'green' : 'red', fontWeight: "600" }, styles.text2]}>{isOpen ? 'Aberto' : 'Fechado'}</Text>
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
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: 'left',
    },
    text2: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: 'left',
    },
});
