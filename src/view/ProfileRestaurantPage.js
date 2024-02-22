import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, ScrollView, ScrollViewBase } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CharacteristicsService, RestaurantService } from 'deliziora-client-module/client-web';
import ArrowLeft from '../components/SVGs/ArrowLeft/ArrowLeft';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg } from 'react-native-svg';
import { Image } from 'react-native-elements';
import MenuOfDay from '../components/Atoms/MenuOfDay';
import LoadingPageScreen from './LoadingPageScreen';
import RestaurantIsOpenOrClosed from '../components/Atoms/RestaurantIsOpenOrClosed';
import { addCurrentRestaurant } from '../redux/features/currentRestaurantSelected/currentRestaurantSelectedSlice';
import PhoneIcon from '../components/PhoneIcon';
import MapLocationPageIcon from '../components/SVGs/MapLocationPageIcon/MapLocationPageIcon';
export default function ProfileRestaurantPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Estado de favorito
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Estado de exibição de descrição
  const [filteredChars, SetFilteredChars] = useState([]);
  const currentId = useSelector(state => state.profilePage.currentId);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // Alterna o estado do favorito
  };
  useEffect(() => {
    RestaurantService.returnRestaurantById(currentId).then((response) => {
      console.log("RESTAURANTE", response.data);
      setRestaurantData(response.data);
      dispatch(addCurrentRestaurant(response.data));
      CharacteristicsService.returnAllCharacteristics().then((responseChar) => {
        console.log("CHARACTERISTICS", responseChar.data);
        console.log(restaurantData)
        const newArrayChars = responseChar.data.filter((item) => response.data.characteristics.includes(item._id.$oid)).map((item) => ({ icon: item.icon }));
        console.log("ARRAY CHARACTERISTICS", newArrayChars);
        SetFilteredChars(newArrayChars);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  if (loading) {
    return (
      <LoadingPageScreen />
    );
  }
  if (error) {
    return (
      <View>
        <Text>Erro: {error.message}</Text>
      </View>
    );
  }
  if (!restaurantData) {
    return (
      <View>
        <Text>Nenhum dado do restaurante encontrado.</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
      {/* <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        width: "100%",
        height: 70,
      }}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </Pressable>
        <Text style={{
          color: "var(--Neutral-02-Color-Neutral-02, #29272D)",
          fontFamily: "Roboto",
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: "600",
        }}>{restaurantData.name}
        </Text>
        <Pressable onPress={handleFavorite}>
          {isFavorite ? (
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M22.1 9.1C22 5.7 19.3 3 15.9 3C14.8 3 13.1 3.8 12.4 5.1C12.3 5.4 11.9 5.4 11.8 5.1C11 3.9 9.4 3.1 8.2 3.1C4.9 3.1 2.1 5.8 2 9.1V9.3C2 11 2.7 12.6 3.9 13.8C3.9 13.8 3.9 13.8 3.9 13.9C4 14 8.8 18.2 11 20.1C11.6 20.6 12.5 20.6 13.1 20.1C15.3 18.2 20 14 20.2 13.9C20.2 13.9 20.2 13.9 20.2 13.8C21.4 12.7 22.1 11.1 22.1 9.3V9.1Z" fill="#f36527" />
            </Svg>
          ) : (
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M12.1 20.8C11.6 20.8 11 20.6 10.6 20.2C4.1 14.5 4 14.4 4 14.3L3.9 14.2C2.7 13 2 11.3 2 9.6V9.4C2.1 5.8 5 3 8.6 3C9.7 3 11.2 3.6 12.1 4.8C13 3.6 14.6 3 15.7 3C19.3 3 22.1 5.8 22.3 9.4V9.6C22.3 11.4 21.6 13 20.4 14.3L20.3 14.4C20.2 14.5 19.4 15.2 13.7 20.3C13.2 20.6 12.7 20.8 12.1 20.8ZM5.5 14C5.9 14.4 7.9 15.8 11.6 19C11.9 19.3 12.3 19.3 12.6 19C16.4 15.6 18.6 13.7 19.1 13.3L19.2 13.2C20.2 12.2 20.7 10.9 20.7 9.6V9.4C20.6 6.6 18.4 4.5 15.6 4.5C14.9 4.5 13.5 5 13 6.1C12.8 6.5 12.4 6.7 12 6.7C11.6 6.7 11.2 6.5 11 6.1C10.5 5.1 9.2 4.5 8.4 4.5C5.7 4.5 3.4 6.7 3.3 9.4V9.7C3.3 11 3.9 12.3 4.8 13.2L5.5 14Z" fill="#f36527" />
            </Svg>
          )}
        </Pressable>
      </View> */}
      <View style={{
        width: "100%",
        height: 235,
        backgroundColor: "var(--Neutral-02-Color-Neutral-02, #29272D)",
      }}>
        <Image source={{ uri: restaurantData.img }} style={{ width: "100%", height: 232 }} />
      </View>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          height: "100%",
          width: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          flex: 2,
        }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          width: 300,
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: 35,
          marginBottom: 5
        }}>
          <MapLocationPageIcon />
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-04, #48464A)",
            textAlign: "left",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "300",
            minWidth: 300,
            maxWidth: 330,
          }}>
            {restaurantData.address.length > 200 ? restaurantData.address.substring(0, 200) + '...' : restaurantData.address}
          </Text>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          width: "90%",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: 30,
          marginBottom: 10,
          paddingBottom: 10,
          borderBottomColor: "gray",
          borderBottomWidth: 1,
        }}>
          <PhoneIcon/>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-04, #48464A)",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "300",
          }}>
            {restaurantData.contact}
          </Text>
        </View>
        {/* Restaurant is opened or closed ? */}
        <RestaurantIsOpenOrClosed />
        {/* Restaurant is opened or closed ? */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16 3.25C15.8009 3.24906 15.6099 3.32837 15.47 3.47L7.46999 11.47C7.17754 11.7628 7.17754 12.2372 7.46999 12.53L15.47 20.53C15.7655 20.8054 16.226 20.7972 16.5116 20.5116C16.7972 20.226 16.8053 19.7655 16.53 19.47L9.05999 12L16.53 4.53C16.8224 4.23718 16.8224 3.76282 16.53 3.47C16.3901 3.32837 16.1991 3.24906 16 3.25Z" fill="#79767B" />
          </Svg>
          <FlatList
            data={filteredChars}
            style={{
              maxWidth: "90%",
              height: 50,
              padding: 5,
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item.icon }} style={{ width: 32, height: 32 }} />
            )}
            contentContainerStyle={{
              gap: 30,
              paddingRight: 20,
            }}
            keyExtractor={(item) => item.toString()}
            horizontal={true}
          />
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8.00001 20.75C8.19908 20.7509 8.39013 20.6716 8.53001 20.53L16.53 12.53C16.8225 12.2372 16.8225 11.7628 16.53 11.47L8.53001 3.47C8.2345 3.19464 7.774 3.20277 7.48839 3.48838C7.20278 3.77399 7.19465 4.23449 7.47001 4.53L14.94 12L7.47001 19.47C7.17756 19.7628 7.17756 20.2372 7.47001 20.53C7.6099 20.6716 7.80095 20.7509 8.00001 20.75Z" fill="#79767B" />
          </Svg>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginLeft: 20,
          minWidth: "90%",
          maxWidth: "90%",
        }}>
          <Text style={{
            textAlign: "justify",
            marginLeft: 20,
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "300",
          }}>
            {isDescriptionExpanded ? restaurantData.description : `${restaurantData.description.substring(0, 50)}...`}
          </Text>
          <Pressable onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
            <Text style={{
              color: "#09598B",
              fontFamily: "Roboto",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: "300",
              paddingBottom: 5,
              marginLeft: 20,
            }}>
              {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
            </Text>
          </Pressable>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: "90%",
          gap: 5,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: 5,
          marginLeft: 20,
        }}>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "bold",
            marginLeft: 20,
          }}>
            Especialidade
          </Text>
          <Text style={
            {
              color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
              fontFamily: "Roboto",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "300",
              marginLeft: 20,
            }
          }
          >
            {restaurantData.especialty}
          </Text>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            marginLeft: 20,
            fontWeight: "bold",
          }}>
            Prato do Dia
          </Text>
          <MenuOfDay />
        </View>
        {/* TODO ir para menu completo */}
        <Pressable style={{
          width: 300,
          height: 50,
          backgroundColor: "black",
          marginBottom: 40,
          alignSelf: "center",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
          onPress={
            () => {
              navigation.navigate('MenuPlatesPage');
            }}
        >
          <Text style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "300",
          }}>
            Ver Menu Completo
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
} 