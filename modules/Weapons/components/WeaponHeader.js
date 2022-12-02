import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const WeaponStats = require('./WeaponStats');
const WeaponShopStats = require('./WeaponShopStats');
const WeaponShopData = require('./WeaponShopData');
const WeaponDamage = require('./WeaponDamage');

function WeaponHeader(props) {
    let weapon = props.weapon;
    return (
        <View style={styles.weaponHeader}>
            <Text style={[styles.generalText, styles.weaponName]}>{weapon.displayName}</Text>
            {weapon.weaponStats
                ? <WeaponStats weapon={weapon}/>
                : null
            }

            {weapon.weaponStats && weapon.weaponStats.adsStats
                ? <WeaponShopStats weapon={weapon}/>
                : null
            }

            {weapon.shopData
                ? <WeaponShopData weapon={weapon}/>
                : null
            }

            {weapon.weaponStats && weapon.weaponStats.damageRanges.length > 0
                ? weapon.weaponStats.damageRanges.map((damageRange, index) => <WeaponDamage damageRange={damageRange} key={index}/>)
                : null
            }
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

module.exports = WeaponHeader;