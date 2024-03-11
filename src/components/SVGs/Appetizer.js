
import React from 'react';
import { Image } from 'react-native-elements';
const Appetizer = ({width, height}) => {
    const Appetizer = require('../../../assets/Appetizer.png');
    return (
        <Image source={Appetizer} style={{ width: width, height: height }} />
    );
};

export default Appetizer;
