import Carousel, { Pagination } from "react-native-snap-carousel";
import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import WalkthroughSvg3 from "./SVGs/WalkthroughSvg3/WalkthroughSvg3";
import WalkthroughSvg2 from "./SVGs/WalkthroughSvg2/WalkthroughSvg2";
import WalkthroughSvg1 from "./SVGs/WalkthroughSvg1/WalkthroughSvg1";

export default function WalkthroughSlider({ navigation }) {
  const colors = require("../style/Colors.json");
  const [carouselWidth, setCarouselWidth] = useState(
    Dimensions.get("window").width
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselRef, setCarouselRef] = useState(null);
  const items = [
    {
      id: 1,
      title: "Registrar endereço",
      text: "Ao acessar o mapa digite o código postal para selecionarmos restaurantes próximos a si.",
      image: <WalkthroughSvg1 />,
    },
    {
      id: 2,
      title: "Acessar restaurantes",
      text: "Toque nos ícones dos restaurantes apresentados no mapa para obter melhores informação sobre o estabelecimento.",
      image: <WalkthroughSvg2 />,
    },
    {
      id: 3,
      title: "Visualizar pratos",
      text: "Acesse os perfis dos restaurantes para visualizar os pratos disponíveis no momento.",
      image: <WalkthroughSvg3 />,
    },
  ];
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        backgroundColor: colors.colors.neutral01Color.neutral_08,
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignSelf: "flex-end",
          marginRight: 40,
        }}
      ></View>

      <Carousel
        data={items}
        ref={(c) => setCarouselRef(c)}
        sliderWidth={carouselWidth}
        itemWidth={carouselWidth}
        windowSize={1}
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text>{item.image}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  margin: 20,
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {item.text}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {activeSlide === 0 ? (
          <TouchableOpacity>
            <Text>{"          "}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => carouselRef.snapToPrev()}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        )}
        <View>
          <Pagination
            dotsLength={items.length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: colors.colors.baseColor.base_01,
            }}
            inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: colors.colors.baseColor.base_03,
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        {activeSlide === 2 ? (
          <TouchableOpacity onPress={() => navigation.navigate("HomeTab")}>
            <Text>Finalizar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => carouselRef.snapToNext()}>
            <Text>Próximo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
