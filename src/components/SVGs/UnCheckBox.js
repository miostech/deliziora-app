
/**
 * Renders an SVG icon of a UnCheckBox button.
 *
 * @returns {JSX.Element} The SVG icon of a UnCheckBox button.
 */
import React from 'react';
import { Svg, Rect } from 'react-native-svg';

const UnCheckBox = () => {
    return (
        <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="#201F23" />
        </Svg>
        
    );
};

export default UnCheckBox;
