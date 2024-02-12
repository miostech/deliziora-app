import React, { useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage
import { useSelector, useDispatch } from 'react-redux';
import { setOpenStatus } from './../redux/features/switchSlice/switchSlice'; // Importe a action corretamente

const SwitchOpenOrClose = () => {
  const openStatus = useSelector(state => state.switchSlice.status); // Ajuste o nome do slice aqui
  const dispatch = useDispatch();

  // Carrega o estado inicial do interruptor ao montar o componente
  useEffect(() => {
    loadSwitchStatus();
  }, []);

  // Função para carregar o estado do interruptor de AsyncStorage
  const loadSwitchStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('switchStatus');
      if (status !== null) {
        dispatch(setOpenStatus(status));
      }
    } catch (error) {
      console.error('Error loading switch status:', error);
    }
  };

  // Função para salvar o estado do interruptor em AsyncStorage
  const saveSwitchStatus = async (status) => {
    try {
      await AsyncStorage.setItem('switchStatus', status);
    } catch (error) {
      console.error('Error saving switch status:', error);
    }
  };

  const toggleSwitch = (value) => {
    const newStatus = value ? 'opened' : 'closed';
    dispatch(setOpenStatus(newStatus));
    saveSwitchStatus(newStatus); // Salva o novo estado do interruptor em AsyncStorage
    console.log("Redux-State Status : ",newStatus)
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#f9f9f9", true: "black" }}
        thumbColor={openStatus === 'opened' ? "white" : "white"}
        ios_backgroundColor="#f9f9f9"
        onValueChange={toggleSwitch}
        value={openStatus === 'opened'}
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "auto",
    height: "auto",
    marginLeft: 10,
  },
});

export default SwitchOpenOrClose;
