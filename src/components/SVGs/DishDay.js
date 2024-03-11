
import React from 'react';
import { Image } from 'react-native-elements';
const DishDay = ({width, height}) => {
    const DishDay = require('../../../assets/DishDay.png');
    return (
        <Image source={DishDay} style={{ width: width, height: height }} />
    );
};

export default DishDay;
