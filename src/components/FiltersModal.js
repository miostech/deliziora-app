import React from 'react';
import { Platform, Pressable, ScrollView, Text, StyleSheet, View } from 'react-native';
import { FilterSearch } from './FilterSearch';
import RBSheet from 'react-native-raw-bottom-sheet';
import Close from './SVGs/Close';
import { Switch } from 'react-native-elements';
import SwitchOpenOrClose from './Switch';
import TypeOfSearch from './TypeOfSearch';

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
                        <Close />
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
                            borderColor: "rgba(255,255,255,0.6",
                            borderBottomWidth: "1px",
                        }}>

                            <Text>Mostrar apenas restaurantes abertos </Text>
                            <SwitchOpenOrClose />
                        </View>
                        <View style={{
                            paddingTop: 10,
                            gap:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>
                                Tipo de Menu
                            </Text>
                            <TypeOfSearch />
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
        borderColor: "rgba(255,255,255,0.6",
        borderBottomWidth: "1px",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
    }
});
