import { CharacteristicsService } from "deliziora-client-module/client-web";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import Close from "./SVGs/Close";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCharacteristics, toggleSelectedCharacteristic, updateSelectedCharacteristic } from './../redux/features/characteristicsSlice/characteristicsSlice'

const CharacteristicsFilter = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [allchar, setAllChar] = useState([])

  const selectedCharacteristics = useSelector(state => state.characteristics);

  useEffect(() => {
    CharacteristicsService.returnAllCharacteristics().then((res) => {
      setAllChar(res.data);
    });

    return () => {
      setAllChar([]);
    };
  }, []);

  useEffect(() => {
    console.log('Characteristic filter rendered', selectedCharacteristics);
  }, [selectedCharacteristics]);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSwitchToggle = (characteristic) => {
    // Update Redux state
    dispatch(updateSelectedCharacteristic(characteristic));
  };



  return (
    <View style={styles.container}>
      <Pressable onPress={toggleModal} style={styles.openModalButton}>
        <Text style={styles.openModalText}>Selecionar Caracteristicas</Text>
      </Pressable>

      {/* Modal Content */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalLabel}>Selecione as características:</Text>
            <Pressable onPress={toggleModal}>
              <Text>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalItem}>
            <Text style={styles.characteristicLabel}>Selecionar Todas</Text>
            <Switch

              onValueChange={() => handleSwitchToggle("all")}
              value={selectedCharacteristics?.length !== allchar.length}
            />
          </View>
          {allchar.map((option) => (
            <View key={option._id.$oid} style={styles.modalItem}>
              <Text style={styles.characteristicLabel}>{option.name}</Text>
              <Switch
                value={selectedCharacteristics?.includes(option._id.$oid)}
                onValueChange={() => handleSwitchToggle(option._id.$oid)}
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
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  openModalButton: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
  },
  openModalText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalLabel: {
    fontSize: 18,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  characteristicLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default CharacteristicsFilter;
