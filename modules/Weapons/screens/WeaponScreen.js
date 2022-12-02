import * as React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, ScrollView, Dimensions, ImageBackground } from 'react-native';
const axios = require('axios').default;
import Constants from 'expo-constants';

const ScreenWidth = Dimensions.get('window').width;
const ratio = ScreenWidth / 1920; //Necesario para fingir un "auto" en el height del vídeo

const WeaponHeader = require("../components/WeaponHeader");
const WeaponSkins = require("../components/WeaponSkins");

function WeaponScreen({ route }) {
    const weaponUuid = route.params.weaponUuid;
    function pegarApi() {
        axios.get(`https://valorant-api.com/v1/weapons/${weaponUuid}?language=es-MX`)
            .then((response) => setWeapon(response.data.data))
            .catch((error) => console.log(error));
    }
    const [weapon, setWeapon] = React.useState(null);
    if (weapon == null || weapon.uuid != weaponUuid) {
        pegarApi();
    }

    return (
        <ScrollView style={styles.container}>
            {weapon != null
                ? <View style={styles.weapon}>
                    <ImageBackground source={require('../../../assets/img/weapon_bg.jpg')} style={styles.headerImage}>
                        <Image source={{ uri: weapon.displayIcon }} style={styles.weaponImage}/>
                    </ImageBackground>
                    <WeaponHeader weapon={weapon}/>
                    <WeaponSkins weapon={weapon}/>
                  </View>
                : <ActivityIndicator/>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
    },
    weapon: {
        backgroundColor: '#FFFBF5',
    },
    headerImage: {
        width: '100%',
        height: 512 * ratio,
    },
    weaponImage: {
        width: '100%',
        height: 512 * ratio,
    }
});

module.exports = WeaponScreen;