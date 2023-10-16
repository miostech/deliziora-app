import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

class LoadingPageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animations: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
            ],
        };
    }

    componentDidMount() {
        this.animate();
    }

    animate = () => {
        const animations = this.state.animations;
        const duration = 500;

        Animated.sequence([
            Animated.stagger(300, [
                Animated.timing(animations[0], {
                    toValue: 0,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animations[1], {
                    toValue: 0,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animations[2], {
                    toValue: 0,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ]),
            Animated.stagger(300, [
                Animated.timing(animations[0], {
                    toValue: 1,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animations[1], {
                    toValue: 1,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(animations[2], {
                    toValue: 1,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ]),
        ]).start(() => this.animate());
    };

    render() {
        const { animations } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.dotsContainer}>
                    <Animated.View
                        style={[styles.dot, { opacity: animations[0] }]}
                    />
                    <Animated.View
                        style={[styles.dot, { opacity: animations[1] }]}
                    />
                    <Animated.View
                        style={[styles.dot, { opacity: animations[2] }]}
                    />
                </View>
                <Text style={styles.loadingText}>A carregar Informações...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'orange',
        margin: 5,
    },
    loadingText: {
        marginTop: 50,
        fontSize: 18,
    },
});

export default LoadingPageScreen;
