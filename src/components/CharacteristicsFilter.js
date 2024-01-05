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

const CharacteristicsFilter = ({selectedCharacteristics, setSelectedCharacteristics, updateFilteredSearch}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [allchar, setAllchar] = useState([]);
  useEffect(() => {
    CharacteristicsService.returnAllCharacteristics().then((res) => {
      setAllchar(res.data);
      console.log(allchar);
    });

    return () => {
      setAllchar([]);
    };
  }, []);

  const [allSelected, setAllSelected] = useState(false); // Set allSelected to true initially

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSwitchToggle = (characteristic) => {
    setSelectedCharacteristics((prevSelected) => {
      const updatedCharacteristics = new Set(prevSelected);

      if (characteristic === "all") {
        setAllSelected(!allSelected);

        if (allSelected) {
          updatedCharacteristics.clear();
        } else {
          allchar.forEach((option) => updatedCharacteristics.add(option._id.$oid));
        }
      } else {
        if (updatedCharacteristics.has(characteristic._id.$oid)) {
          updatedCharacteristics.delete(characteristic._id.$oid);
        } else {
          updatedCharacteristics.add(characteristic._id.$oid);
        }
      }

      return Array.from(updatedCharacteristics);
    });
    updateFilteredSearch()
  };

  useEffect(() => {
    // Verifica se todas as opções foram selecionadas
    const allOptionsSelected =
      selectedCharacteristics.length === allchar.length;
    setAllSelected(allOptionsSelected);
    console.log("SELECTED",selectedCharacteristics)
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
              onValueChange={() => handleSwitchToggle("all")}
            />
          </View>
          {allchar.map((option) => (
            <View key={option.value} style={styles.modalItem}>
              <Text style={styles.characteristicLabel}>{option.name}</Text>
              <Switch
                value={selectedCharacteristics.includes(option._id.$oid)}
                onValueChange={() => handleSwitchToggle(option)}
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    width: 330,
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
