import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import Close from './SVGs/Close';

const CharacteristicsFilter = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([
        'animals',
        'parking',
        'accessibility',
        'cardPayment',
    ]); // Initialize with all values
    const [allSelected, setAllSelected] = useState(true); // Set allSelected to true initially

    const characteristicsOptions = [
        { label: 'Aceita Animais', value: 'animals' },
        { label: 'Tem Estacionamento', value: 'parking' },
        { label: 'Acesso a Pessoas com Mobilidade Reduzida', value: 'accessibility' },
        { label: 'Aceita Pagamento com Cartão', value: 'cardPayment' },
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSwitchToggle = (characteristic) => {
        if (characteristic === 'all') {
            setAllSelected(!allSelected);
            setSelectedCharacteristics(allSelected ? [] : characteristicsOptions.map(option => option.value));
        } else {
            const updatedCharacteristics = selectedCharacteristics.includes(characteristic)
                ? selectedCharacteristics.filter(val => val !== characteristic)
                : [...selectedCharacteristics, characteristic];

            setSelectedCharacteristics(updatedCharacteristics);
        }
    };

    useEffect(() => {
        // Verifica se todas as opções foram selecionadas
        const allOptionsSelected = selectedCharacteristics.length === characteristicsOptions.length;
        setAllSelected(allOptionsSelected);
    }, [selectedCharacteristics]);

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleModal} style={styles.openModalButton}>
                <Text style={styles.openModalText}>Selecionar Caracteristicas</Text>
            </Pressable>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalLabel}>Selecione as características:</Text>
                        <Pressable onPress={toggleModal}>
                            <Close />
                        </Pressable>
                    </View>
                    <View style={styles.modalItem}>
                        <Text style={styles.characteristicLabel}>Selecionar Todas</Text>
                        <Switch
                            value={allSelected}
                            onValueChange={() => handleSwitchToggle('all')}
                        />
                    </View>
                    {characteristicsOptions.map(option => (
                        <View key={option.value} style={styles.modalItem}>
                            <Text style={styles.characteristicLabel}>{option.label}</Text>
                            <Switch
                                value={selectedCharacteristics.includes(option.value)}
                                onValueChange={() => handleSwitchToggle(option.value)}
                            />
                        </View>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    openModalButton: {
        backgroundColor: 'black',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: 330,
    },
    openModalText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalLabel: {
        fontSize: 18,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    characteristicLabel: {
        fontSize: 16,
        marginRight: 10,
    },
});

export default CharacteristicsFilter;
