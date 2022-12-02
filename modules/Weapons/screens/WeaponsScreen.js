import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
const axios = require('axios').default;
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';

const Weapon = require("../components/Weapon");

function WeaponsScreen() {
    function pegarApi() {
        axios.get('https://valorant-api.com/v1/weapons?language=es-MX')
            .then((response) => {
                setWeapons(response.data.data);
                setWeaponsFiltered(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        pegarApi();
    }, []);

    const [weaponName, setWeaponName] = React.useState("");
    const [weapons, setWeapons] = React.useState([]);
    const [weaponsFiltered, setWeaponsFiltered] = React.useState([]);

    function filterByName(weaponName) {
        setWeaponName(weaponName);
        if (weaponName != '') {
            setWeaponsFiltered(weapons.filter(w => w.displayName.toLowerCase().includes(weaponName.toLowerCase())));
        } else {
            setWeaponsFiltered(weapons);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.weaponsContainer}>
                <Text style={styles.weaponsTitle}>ARSENAL</Text>
                <Text style={styles.weaponsText}>ELIGE TU ARMA</Text>
                <TextInput
                    style={styles.inputName}
                    label="Nombre del arma"
                    value={weaponName}
                    mode='outlined'
                    outlineColor='#FD4556'
                    activeOutlineColor='#FD4556'
                    onChangeText={text => filterByName(text)}
                />
                <View style={styles.weaponsListContainer}>
                    {weaponsFiltered.length != 0
                        ? weaponsFiltered.map((weapon) => <Weapon weapon={weapon} key={weapon.uuid} />)
                        : <Text>No se encontraron armas</Text>
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
        backgroundColor: '#FFFBF5',
    },
    inputName: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 15,
    },
    weaponsContainer: {
        width: '100%',
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