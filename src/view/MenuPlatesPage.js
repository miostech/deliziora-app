import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { MenuService, RestaurantService } from 'deliziora-client-module/client-web';
import { useNavigation } from '@react-navigation/native';
import ArrowLeft from '../components/SVGs/ArrowLeft/ArrowLeft';
import { Divider } from 'react-native-elements';

// Import category images
const Carne = require('../../assets/Meat.png');
const Peixe = require('../../assets/Fish.png');
const Vegetariano = require('../../assets/Vegetarian.png');
const Aperitivos = require('../../assets/Snacks.png');
const Salada = require('../../assets/Salad.png');
const PratoDoDia = require('../../assets/DishDay.png');
const Entradas = require('../../assets/Appetizer.png');
const Sobremesa = require('../../assets/Dessert.png');
const Outros = require('../../assets/Others.png');

// Define category images mapping
const categoryImages = {
  Carne: Carne,
  Peixe: Peixe,
  Vegetariano: Vegetariano,
  Entradas: Entradas,
  Salada: Salada,
  Sobremesa: Sobremesa,
  Outros: Outros,
  PratoDoDia: PratoDoDia,
  Aperitivos: Aperitivos,
};

const MenuOfDay = () => {
  const currentId = useSelector((state) => state.profilePage.currentId);
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch restaurant data
    RestaurantService.returnRestaurantById(currentId)
      .then(restaurantData => {
        setRestaurant(restaurantData.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch menu data
    const fetchData = async () => {
      try {
        const responseMenuItems = await MenuService.returnAllMenu();
        if (responseMenuItems && responseMenuItems.data && responseMenuItems.data.length > 0) {
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
    Vegetariano: menu.filter(item => item.category === 'Vegetariano'),
    Entradas: menu.filter(item => item.category === 'Entradas'),
    Salada: menu.filter(item => item.category === 'Salada'),
    Sobremesa: menu.filter(item => item.category === 'Sobremesa'),
    Outros: menu.filter(item => item.category === 'Outros'),
    PratoDoDia: menu.filter(item => item.category === 'PratoDoDia'),
    Aperitivos: menu.filter(item => item.category === 'Aperitivos'),
  };

  return (
    <ScrollView style={{ width: "100%", marginTop: 40 }}>
      {Object.entries(categorizedMenu).map(([category, items]) => (
        items.length > 0 && (
          <View key={category} style={styles.categoryContainer}>
            <Image source={categoryImages[category]} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{category}</Text>
            {items.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <View style={styles.plateContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>€{item.price}</Text>
                </View>
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        )
      ))}
    </ScrollView>
  );
};

export default MenuOfDay;

const styles = StyleSheet.create({
  categoryContainer: {
    width: "90%",
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
  },
  plateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  itemName: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  itemPrice: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: 300,
    backgroundColor: "#ccc",
    marginTop: 10,
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 5,
  },
  categoryImage: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
  },
});
