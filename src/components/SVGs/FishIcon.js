
import React from 'react';
import { Image } from 'react-native-elements';
const FishIcon = ({width, height}) => {
    const Fish = require('../../../assets/Fish.png');
    return (
        <Image source={Fish} style={{ width: width, height: height }} />
    );
};

export default FishIcon;
