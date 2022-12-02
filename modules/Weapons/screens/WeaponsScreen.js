import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
const axios = require('axios').default;
import Constants from 'expo-constants';

const Weapon = require("../components/Weapon");

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
});

module.exports = WeaponsScreen;