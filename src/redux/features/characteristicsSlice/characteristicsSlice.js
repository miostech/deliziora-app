import { createSlice } from '@reduxjs/toolkit';

const characteristicsSlice = createSlice({
    name: 'characteristics',
    initialState: [], // Estado inicial como um array vazio
    reducers: {
        setSelectedCharacteristics: (state, action) => {
            // Define o estado como o payload da ação
            return action.payload;
        },
        toggleSelectedCharacteristic: (state, action) => {
            const characteristic = action.payload;
            // Verifica se a característica já está presente no estado
            const index = state.findIndex(char => char === characteristic);
            if (index !== -1) {
                // Remove a característica se já estiver presente
                state.splice(index, 1);
            } else {
                // Adiciona a característica se não estiver presente
                state.push(characteristic);
            }
        },
        updateSelectedCharacteristic: (state, action) => {
            const characteristic = action.payload;
            // Verifica se a característica já está presente no estado
            const index = state.findIndex(char => char === characteristic);
            if (index === -1) {
                // Adiciona a característica se não estiver presente
                state.push(characteristic);
            } else {
                // Remove a característica se já estiver presente
                state.splice(index, 1);
            }
        },
    },
});

export const { setSelectedCharacteristics, toggleSelectedCharacteristic, updateSelectedCharacteristic } = characteristicsSlice.actions;

export default characteristicsSlice.reducer;
