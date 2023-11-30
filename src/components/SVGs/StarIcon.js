
import React from 'react';
import { Image } from 'react-native-elements';
const StarIcon = ({width, height}) => {
    const Star = require('../../../assets/start.png');
    return (
        <Image source={Star} style={{ width: width, height: height }} />
    );
};

export default StarIcon;
