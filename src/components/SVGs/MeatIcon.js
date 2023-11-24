
import React from 'react';
import { Image } from 'react-native-elements';
const MeatIcon = ({width, height}) => {
    const Meat = require('../../../assets/Meat.png');
    return (
        <Image source={Meat} style={{ width: width, height: height }} />
    );
};

export default MeatIcon;
