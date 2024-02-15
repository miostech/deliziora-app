import React from 'react';
import { Platform, Pressable, ScrollView, Text, StyleSheet, View } from 'react-native';
import { FilterSearch } from './FilterSearch';
import RBSheet from 'react-native-raw-bottom-sheet';
import Close from './SVGs/Close';
import { Switch } from 'react-native-elements';
import SwitchOpenOrClose from './Switch';
import TypeOfSearch from './TypeOfSearch';
import CharacteristicsFilter from './CharacteristicsFilter';
import DistanceSlider from './DistanceSlider';

export default function FiltersModal() {
    let rbSheetRef;

    return (
        <>
            <Pressable onPress={() => rbSheetRef.open()}>
                <FilterSearch />
            </Pressable>
            <RBSheet
                ref={ref => {
                    rbSheetRef = ref;
                }}
                openDuration={250}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80%",
                        borderRadius: 24,
                        ...Platform.select({
                            ios: {
                                marginTop: 20,
                            },
                            android: {
                                // Estilos para Android, se necessário
                            },
                            default: {
                                // Estilos padrão para outras plataformas
                            }
                        })
                    }
                }}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => rbSheetRef.close()}>
                            <Close />
                        </Pressable>
                        <Text>Filtros</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={{
                            fontWeight: "bold",
                            marginTop: 5
                        }}>Status de Funcionamento</Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 40,
                            paddingBottom: 15,
                        }}>

                            <Text>Mostrar apenas restaurantes abertos </Text>
                            <SwitchOpenOrClose />
                        </View>
                        <View style={{
                            paddingTop: 10,
                            gap: 10,
                            borderTopWidth: 1,
                            borderTopColor: 'gray'
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>
                                Tipo de Menu
                            </Text>
                            <TypeOfSearch />
                        </View>
                        <View style={{
                            paddingTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Caracteristicas</Text>
                            <Text>Busque por Restaurantes, com uma ou mais caracteristicas</Text>
                        </View>
                        <View style={{
                            paddingBottom: 15,
                        }}>
                            <CharacteristicsFilter />
                        </View>
                        <View style={{
                            paddingTop: 10,
                            borderTopColor: 'gray',
                            borderTopWidth: 1,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Distância</Text>
                            <DistanceSlider />
                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 40,
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 10,
                        }}>
                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 100,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "auto",
                                    minWidth: 150,
                                    height: 40,
                                    borderColor: "#000000",
                                    borderWidth: 1,
                                    marginTop: 10,
                                    padding: 10,
                                }}
                                onPress={() => rbSheetRef.close()}
                            >
                                <Text 
                                style={{
                                    fontWeight: "bold",
                                    color: "#000000",
                                    textAlign: "center",
                                    fontSize: 16
                                }}>
                                    Limpar filtros
                                </Text>
                            </Pressable>
                            <Pressable style={{
                                backgroundColor: "#000000",
                                borderRadius: 100,
                                justifyContent: "center",
                                alignItems: "center",
                                width: "auto",
                                minWidth: 150,
                                height: 40,
                                marginTop: 10,
                                padding: 10,
                            }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: 16
                                }}>
                                    Ver Restaurantes
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </RBSheet>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        paddingVertical: 8,
        minWidth: "90%",
    },
    modalHeader: {
        width: "100%",
        display: "flex",
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
});
