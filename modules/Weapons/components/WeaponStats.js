import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

function WeaponStats(props) {
    let weapon = props.weapon;
    return (
        <View>
            <Text style={[styles.generalText, styles.statsTitle]}>Estadísticas:</Text>
            <View style={styles.weaponStats}>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Cadencia de fuego:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.fireRate} balas por segundo</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Tamaño del cargador:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.magazineSize}</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Velocidad al correr:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.runSpeedMultiplier * 100}%</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Tiempo para equipar:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.equipTimeSeconds} (segundos)</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Tiempo para recargar:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.reloadTimeSeconds} (segundos)</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Precisión de la 1ra bala:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.weaponStats.firstBulletAccuracy * 100}%</Text>
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

module.exports = WeaponStats;