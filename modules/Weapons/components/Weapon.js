import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';

function Weapon(props) {
    let weapon = props.weapon;
    return (
        <View style={styles.weaponContainer}>
            <Image source={{ uri: weapon.displayIcon }} style={styles.weaponImg} />
            <Text style={styles.weaponName}>{weapon.displayName}.</Text>
            <View style={styles.weaponButtonContainer}>
                <Button mode="contained" style={styles.weaponButton}>VER DETALLES</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weaponContainer: {
        width: '50%',
        borderBottomWidth: 2,
        borderColor: 'hsla(38,22%,90%,.75)',
        padding: 5,
    },
    weaponImg: {
        height: 100,
        resizeMode: 'center',
    },
    weaponName: {
        color: '#383e3a',
        fontFamily: 'TungstenBold',
        fontSize: 32,
        textAlign: 'left',
        marginTop: 5,
        textTransform: 'uppercase',
    },
    weaponButtonContainer: {
        backgroundColor: 'transparent',
        padding: 5,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: 'hsla(38,22%,90%,.75)',
    },
    weaponButton: {
        backgroundColor: '#FD4556',
        borderRadius: 0,
        fontSize: 16,
    },
});

module.exports = Weapon;