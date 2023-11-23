import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const SwitchOpenOrClose = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#f9f9f9', true: '#ccc' }}
                thumbColor={isEnabled ? 'white' : '#ccc'}
                ios_backgroundColor="#f9f9f9"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }]}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-startr',
        justifyContent: 'flex-start',
        width: 'auto',
        height: 'auto',
    },
});

export default SwitchOpenOrClose;