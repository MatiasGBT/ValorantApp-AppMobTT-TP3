import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

function WeaponShopStats(props) {
    let weapon = props.weapon;
    return (
        <View>
            <Text style={[styles.generalText, styles.statsTitle]}>Estadísticas al apuntar:</Text>
            <View style={styles.weaponStats}>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Cadencia de fuego:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.adsStats.fireRate} balas por segundo</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Velocidad al correr:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.adsStats.runSpeedMultiplier * 100}%</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Precisión de la 1ra bala:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.adsStats.firstBulletAccuracy * 100}%</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weaponHeader: {
        padding: 10,
    },
    generalText: {
        fontFamily: 'TungstenBold',
        color: '#383e3a',
    },
    weaponName: {
        fontSize: 32,
    },
    statsTitle: {
        fontSize: 24,
        marginTop: 5,
    },
    weaponStats: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    weaponStat: {
        width: ScreenWidth / 3 - 10, //10 = weaponHeader padding,
        marginTop: 5,
    },
    weaponStatText: {
        fontSize: 16,
    }
});

module.exports = WeaponShopStats;