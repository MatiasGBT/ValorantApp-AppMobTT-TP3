import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';

const Weapon = ({ weapon }) => {
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

function WeaponsScreen() {
    function pegarApi() {
        axios.get('https://valorant-api.com/v1/weapons?language=es-MX')
            .then((response) => setWeapons(response.data.data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        pegarApi();
    }, []);
    
    const [weapons, setWeapons] = React.useState([]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.weaponsContainer}>
                <Text style={styles.weaponsTitle}>ARSENAL</Text>
                <Text style={styles.weaponsText}>ELIGE TU ARMA</Text>
                <View style={styles.weaponsListContainer}>
                    {weapons.length != 0
                        ? weapons.map((weapon) => <Weapon weapon={weapon} key={weapon.uuid} />)
                        : <ActivityIndicator />
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
    },
    weaponsContainer: {
        width: '100%',
        backgroundColor: '#FFFBF5',
        padding: 10,
    },
    weaponsTitle: {
        color: '#383e3a',
        fontFamily: 'TungstenBold',
        fontSize: 48,
        textAlign: 'center',
    },
    weaponsText: {
        color: '#383e3a',
        fontFamily: 'TungstenBold',
        fontSize: 32,
        textAlign: 'center',
    },
    weaponsListContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
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

module.exports = WeaponsScreen;