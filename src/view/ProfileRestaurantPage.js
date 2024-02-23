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
          marginLeft: 27,
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
          <PhoneIcon />
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
        <ScrollView style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: "90%",
          maxHeigh: 200,
          gap: 5,
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
          <Pressable style={{
            width: 300,
            height: 50,
            backgroundColor: "black",
            marginTop:20,
            marginBottom: 20,
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
      </ScrollView>
    </View>
  );
} 