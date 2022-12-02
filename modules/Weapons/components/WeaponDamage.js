import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

function WeaponDamage(props) {
    let damageRange = props.damageRange;
    return (
        <View>
            <Text style={[styles.generalText, styles.statsTitle]}>Daño por bala (de {damageRange.rangeStartMeters} a {damageRange.rangeEndMeters} metros):</Text>
            <View style={styles.weaponStats}>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Cabeza:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{damageRange.headDamage}</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Cuerpo:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{damageRange.bodyDamage}</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Piernas:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{damageRange.legDamage}</Text>
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

module.exports = WeaponDamage;