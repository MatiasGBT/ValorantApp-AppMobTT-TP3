import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Skin(props) {
    let skin = props.skin;
    return (
        <View style={styles.skinContainer}>
            <Image source={{ uri: skin.displayIcon }} style={styles.skinImg} />
            <Text style={styles.skinName}>{skin.displayName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    skinContainer: {
        width: '50%',
        padding: 10,
    },
    skinImg: {
        height: 100,
        resizeMode: 'center',
    },
    skinName: {
        color: '#383e3a',
        fontFamily: 'TungstenBold',
        fontSize: 24,
        textAlign: 'left',
        marginTop: 5,
        textTransform: 'uppercase',
    },
});

module.exports = Skin;