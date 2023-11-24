
import React from 'react';
import { Image } from 'react-native-elements';
const VegeterianIcon = ({width, height}) => {
    const Vegeterian = require('../../../assets/Vegetarian.png');
    return (
        <Image source={Vegeterian} style={{ width: width, height: height }} />
    );
};

export default VegeterianIcon;
