import React from 'react';
import { Svg, Path } from 'react-native-svg';
export default function ListType({ focused }) {
    const iconProps = {
        xmlns: "http://www.w3.org/2000/svg",
        className: "icon icon-tabler icon-tabler-list-details",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        strokeWidth: "1.5",
        stroke: focused ? "#f36527" : "black",
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    return (
        <Svg {...iconProps}>
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M13 5h8" />
            <Path d="M13 9h5" />
            <Path d="M13 15h8" />
            <Path d="M13 19h5" />
            <Path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
            <Path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        </Svg>
    );
}

