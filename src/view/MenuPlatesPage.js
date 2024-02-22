import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuService, RestaurantService } from 'deliziora-client-module/client-web';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from '../components/SVGs/ArrowLeft/ArrowLeft';

const Meat = require('../../assets/Meat.png');
const Fish = require('../../assets/Fish.png');
const Vegetarian = require('../../assets/Vegetarian.png');

const categoryImages = {
  Carne: Meat,
  Peixe: Fish,
  Vegano: Vegetarian
};

const MenuOfDay = () => {
  const currentId = useSelector((state) => state.profilePage.currentId);
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const navigation = useNavigation();
  RestaurantService.returnRestaurantById(currentId).then(restaurantData => {
    setRestaurant(restaurantData.data);
    console.log("RESTAURANTE", restaurant);
  }).catch(error => {
    console.error(error);
  })
  useEffect(() => {

    const fetchData = async () => {
      try {
        // Fetch all menu items
        const responseMenuItems = await MenuService.returnAllMenu();
        if (responseMenuItems && responseMenuItems.data && responseMenuItems.data.length > 0) {
          // Filter menu items for the current restaurant
          const menuForCurrentRestaurant = responseMenuItems.data.filter(item => item.id_Restaurants === currentId);
          setMenu(menuForCurrentRestaurant);
        } else {
          console.log("No menu available for this restaurant.");
          setMenu([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentId]);

  // Separate menu items by category
  const categorizedMenu = {
    Carne: menu.filter(item => item.category === 'Carne'),
    Peixe: menu.filter(item => item.category === 'Peixe'),
    Vegano: menu.filter(item => item.category === 'Vegano')
  };

  return (
    <ScrollView style={{
      width: "100%",
      marginTop: 40,
    }}>
      <View style={{
        width: "100%",
        maxWidth: "100%",
        marginTop: 20,
        marginLeft: 0,
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
      }}>
        <Pressable
          style={{
            marginLeft: 20,
            alignSelf: "flex-start",
            justifySelf: "flex-start",
          }}
          onPress={
            () => {
              navigation.goBack();
            }
          }
        >
          <ArrowLeft />
        </Pressable>
        <Text style={[styles.categoryTitle, {
          marginLeft: -20,
        }]}>
          Menu Completo - {restaurant.name}
        </Text>
        <Text> </Text>
      </View>
      {
        Object.entries(categorizedMenu).map(([category, items]) => (
          <View key={category} style={{
            width: "90%",
            marginLeft: 20,
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Image source={categoryImages[category]} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{category}</Text>
            {items.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <View style={styles.plateContainer}>
                  <Text style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: "300",
                  }}>{item.name}</Text>
                  <Text style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: "300",
                  }}>€{item.price}</Text>
                </View>
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        ))
      }
    </ScrollView >
  );
};

export default MenuOfDay;

const styles = StyleSheet.create({

  categoryTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
  plateContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    display: "flex",
    width: 300,
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    minWidth: "90%",
    backgroundColor: 'grey',
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryImage: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
  },
});

