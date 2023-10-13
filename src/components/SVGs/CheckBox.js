
/**
 * Renders an SVG icon of a CheckBox button.
 *
 * @returns {JSX.Element} The SVG icon of a CheckBox button.
 */
import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

const CheckBox = () => {
    return (
        <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="0.5" y="0.5" width="27" height="27" rx="7.5" fill="#29272D" stroke="#313033" />
            <Path d="M10.9463 20.2346C10.5999 20.2344 10.2642 20.1142 9.99631 19.8946L5.51631 16.2246C4.90372 15.6924 4.8254 14.7696 5.33954 14.1418C5.85368 13.514 6.77384 13.4089 7.41631 13.9046L10.8863 16.7446L20.8863 7.53459C21.2622 7.08766 21.8633 6.8995 22.4269 7.05234C22.9905 7.20518 23.4142 7.67123 23.5128 8.24682C23.6114 8.82241 23.3669 9.40289 22.8863 9.73459L11.9663 19.8346C11.69 20.0935 11.325 20.2367 10.9463 20.2346Z" fill="white" />
        </Svg>

    );
};

export default CheckBox;
