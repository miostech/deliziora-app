// characteristicsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const characteristicsSlice = createSlice({
    name: 'characteristics',
    initialState: [],
    reducers: {
        setSelectedCharacteristics: (state, action) => {
            console.log("setSelectedCharacteristic", action.payload);
            state.selectedCharacteristics = action.payload;
        },
        toggleSelectedCharacteristic: (state, action) => {
            console.log("toggleSelectedCharacteristic", action.payload);
            const characteristic = action.payload;
            const index = state.selectedCharacteristics?.filter((value) => value == characteristic)?.length;
            console.log("AQUI", action.payload)
            console.log("INDEX", index)
            if (index > 0) {
                state = state.selectedCharacteristics?.filter((value) => value != characteristic);
                return state
            } else {
                state.selectedCharacteristics?.push(characteristic);
            }
        },

        updateSelectedCharacteristic: (state, action) => {
            const checkIfExist = state.filter(f => f == action.payload);
            if (checkIfExist.length === 0) {
                state.push(action.payload)
            } else {
                state = state.filter(f => f != action.payload)
                return state
            }
        },
    },
});

export const { setSelectedCharacteristics, toggleSelectedCharacteristic, updateSelectedCharacteristic } = characteristicsSlice.actions;

export default characteristicsSlice.reducer;
