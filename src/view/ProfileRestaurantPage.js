import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CharacteristicsService, MenuOfTheDayService, RestaurantService } from 'deliziora-client-module/client-web';
import ArrowLeft from '../components/SVGs/ArrowLeft/ArrowLeft';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg } from 'react-native-svg';
import { Image } from 'react-native-elements';
import MapSvg from '../components/SVGs/MapSvg/MapSvg';
import Carousel from 'react-native-snap-carousel';


export default function ProfileRestaurantPage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Estado de favorito
  const [restaurantIsOpen, setRestaurantIsOpen] = useState(false); // Estado de abertura do restaurante
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Estado de exibição de descrição
  const currentId = useSelector(state => state.profilePage.currentId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allMenuOfDay, setAllMenuOfDay] = useState([]);
  // Função para verificar se o restaurante está aberto
  const isRestaurantOpen = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentTime = `${currentHour}:${currentMinutes}`;
    const openingHours = restaurantData.opening_hours[currentDay];
    if (!openingHours) {
      return false;
    }

    const { open, closed } = openingHours;
    if (currentTime >= open && currentTime <= closed) {
      return true;
    } else {
      return false;
    }
  };
  // Função para obter o horário de funcionamento do dia atual
  const getHorarioFuncionamento = () => {
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
    const horario = restaurantData.horarios.find(horario => horario.dia === hoje);
    return horario ? `${horario.abertura} - ${horario.fechamento}` : 'Indisponível';
  };
  // Função para lidar com o favorito
  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // Alterna o estado do favorito
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await RestaurantService.returnRestaurantById(currentId);
        setRestaurantData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRestaurantData();

    return () => {
      setLoading(false);
      setError(null);
      setRestaurantData(null);
    };
  }, [currentId, dispatch]);

  const [allChars, setAllChars] = useState([]);
  const [filteredChars, SetFilteredChars] = useState([]);
  useEffect(() => {
    CharacteristicsService.returnAllCharacteristics().then(response => {
      setAllChars(response.data);
      console.log("Temos aqui >>", allChars)
      console.log("Temos aqui <<", restaurantData.characteristics)
      // Filtrar os elementos de allChars que também estão presentes em restaurantData.characteristics
      SetFilteredChars(allChars.filter(char => restaurantData.characteristics.includes(char._id.$oid)))

      // Agora você pode usar filteredChars, que contém apenas as características presentes tanto em allChars quanto em restaurantData.characteristics
      console.log("Características filtradas:", filteredChars);

    });
  }, []);


  useEffect(() => {
    // Verificar se o restaurante está aberto quando os dados do restaurante são carregados
    if (restaurantData) {
      const isOpen = isRestaurantOpen();
      setRestaurantIsOpen(isOpen);
    }
  }, [restaurantData]);

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
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
    <View>
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
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
        }}>{restaurantData.name}</Text>
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
      </View>
      <View style={{
        width: "100%",
        height: 232,
        backgroundColor: "var(--Neutral-02-Color-Neutral-02, #29272D)",
        zIndex: 0,
      }}>
        <Image source={{ uri: restaurantData.img }} style={{ width: "100%", height: 232 }} />
      </View>
      <View style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        width: "100%",
        minHeight: 500,
        height: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 1,
        position: "absolute",
        top: 232,
        backgroundColor: "white",
      }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          width: 300,
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 20,
        }}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M15 7.69701C15 12.6061 7.5 18.3334 7.5 18.3334C7.5 18.3334 0 12.6061 0 7.69701C0 3.68628 3.415 0.333374 7.5 0.333374C11.585 0.333374 15 3.68628 15 7.69701Z" fill="#F36527" />
            <Path d="M7.5 10.1515C8.88072 10.1515 10 9.05259 10 7.69698C10 6.34136 8.88072 5.24243 7.5 5.24243C6.11928 5.24243 5 6.34136 5 7.69698C5 9.05259 6.11928 10.1515 7.5 10.1515Z" fill="white" />
          </Svg>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-04, #48464A)",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "400",
            maxWidth: 200
          }}>
            {restaurantData.address.length > 200 ? restaurantData.address.substring(0, 200) + '...' : restaurantData.address}
          </Text>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          width: 300,
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 20,
          paddingBottom: 20,
          borderBottomColor: "gray",
          borderBottomWidth: 1,
        }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14.61 20.035C15.4001 20.5447 16.3417 20.7669 17.2763 20.6641C18.211 20.5613 19.0817 20.1398 19.7421 19.4705L20.3195 18.9059C20.5726 18.647 20.7144 18.2993 20.7144 17.9373C20.7144 17.5752 20.5726 17.2274 20.3195 16.9686L17.8689 14.5436C17.6122 14.2913 17.2666 14.1499 16.9066 14.1499C16.5467 14.1499 16.2011 14.2913 15.9444 14.5436C15.6855 14.7968 15.3378 14.9385 14.9757 14.9385C14.6136 14.9385 14.2659 14.7968 14.007 14.5436L10.1579 10.6945C10.0295 10.568 9.92752 10.4172 9.85793 10.2509C9.78833 10.0846 9.75248 9.90612 9.75248 9.72585C9.75248 9.54557 9.78833 9.3671 9.85793 9.20079C9.92752 9.0345 10.0295 8.8837 10.1579 8.75716C10.4102 8.50042 10.5516 8.15485 10.5516 7.79489C10.5516 7.43491 10.4102 7.08935 10.1579 6.83261L7.72016 4.39485C7.46121 4.14173 7.11356 4 6.7515 4C6.38931 4 6.04166 4.14173 5.78271 4.39485L5.21816 4.97222C4.54894 5.63264 4.12749 6.50339 4.02463 7.43803C3.92177 8.37268 4.14394 9.31422 4.65373 10.1043C7.30963 14.0185 10.689 17.3892 14.61 20.035Z" fill="#F36527" />
            <Path d="M15.7557 6.75144C16.2292 6.27801 16.2292 5.52379 15.7557 5.05036C15.2823 4.57693 14.5281 4.57693 14.0546 5.05036L12 7.10482L9.9454 5.05036C9.47197 4.57693 8.71775 4.57693 8.24432 5.05036C7.77089 5.52379 7.77089 6.27801 8.24432 6.75144L10.2989 8.80601L8.24432 10.8606C7.77089 11.3341 7.77089 12.0883 8.24432 12.5617C8.71775 13.0352 9.47197 13.0352 9.9454 12.5617L12 10.5071L14.0546 12.5617C14.5281 13.0352 15.2823 13.0352 15.7557 12.5617C16.2292 12.0883 16.2292 11.3341 15.7557 10.8606L13.7011 8.80601L15.7557 6.75144Z" fill="#F36527" />
          </Svg>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-04, #48464A)",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "400",
          }}>
            {restaurantData.contact}
          </Text>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 40,
          width: 300,
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 20
        }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14 2H9.76C7.63827 2 5.60344 2.84285 4.10315 4.34315C2.60285 5.84344 1.76 7.87827 1.76 10V14.24C1.76 18.6583 5.34172 22.24 9.76 22.24H14C18.4183 22.24 22 18.6583 22 14.24V10C22 5.58172 18.4183 2 14 2ZM11.88 18.12C11.3277 18.12 10.88 17.6723 10.88 17.12V12.12C10.8785 11.8542 10.9828 11.5987 11.17 11.41L15.17 7.41C15.4237 7.15634 15.7934 7.05728 16.1399 7.15012C16.4864 7.24297 16.757 7.51362 16.8499 7.86012C16.9427 8.20663 16.8437 8.57634 16.59 8.83L12.88 12.53V17.12C12.88 17.6723 12.4323 18.12 11.88 18.12Z" fill="#F36527" />
          </Svg>
          <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 5
          }}>
            <Text style={{
              color: "var(--Neutral-02-Color-Neutral-04, #48464A) !important",
              textAlign: "center",
              fontFamily: "Roboto",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "400",
            }}>12AM - 23PM</Text>
            {/* Horario não está correto */}
            <Text style={{
              color: restaurantIsOpen ? "#00662C" : "#FF0000",
              fontFamily: "Roboto",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "semi-bold",
            }}>
              | {restaurantIsOpen ? 'Aberto' : 'Fechado'}
            </Text>
          </View>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.flatListRef.scrollToOffset({ animated: true, offset: 0 })}>
            <Text style={{ fontSize: 12 }}>{"<"}</Text>
          </TouchableOpacity>
          <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
            data={filteredChars}
            renderItem={({ item }) => (
              <Image source={{ uri: item.icon }} style={{ width: 32, height: 32 }} />
            )}
            keyExtractor={(item) => item.toString()}
            horizontal={true}
            scrollEnabled
            pinchGestureEnabled
            contentContainerStyle={{
              gap: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: 300,
              paddingVertical: 10,
            }}
          />
          <TouchableOpacity onPress={() => {
            this.flatListRef.scrollToEnd({ animated: true });
          }}>
            <Text style={{ fontSize: 24 }}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "column",
          gap: 5
        }}>
          <Text>
            {isDescriptionExpanded ? restaurantData.description : `${restaurantData.description.substring(0, 50)}...`}
          </Text>
          <Pressable onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
            <Text style={{
              color: "#09598B",
              fontFamily: "Roboto",
              fontSize: 12,
              fontStyle: "normal",
              fontWeight: "400",
            }}>
              {isDescriptionExpanded ? 'Ver menos' : 'Ver mais'}
            </Text>
          </Pressable>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          gap: 5,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: 20,
        }}>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
            fontFamily: "Roboto",
            fontSize: 18,
            fontStyle: "normal",
            fontWeight: "bold",
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
            }
          }
          >
            {restaurantData.especialty}
          </Text>
          <Text style={{
            color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
            fontFamily: "Roboto",
            fontSize: 18,
            fontStyle: "normal",
            fontWeight: "bold",
          }}>
            Prato do Dia
          </Text>

        </View>
        {/* TODO ir para menu completo */}
        <Pressable style={{
          width: 300,
          height: 50,
          backgroundColor: "black",
          borderRadius: 100,
          position: "absolute",
          bottom: 40,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 20, // 142.857%
          }}>
            Ver Menu Completo
          </Text>
        </Pressable>
      </View>
    </View >
  );
}
