import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

function WeaponShopData(props) {
    let weapon = props.weapon;
    return (
        <View>
            <Text style={[styles.generalText, styles.statsTitle]}>Datos de la tienda:</Text>
            <View style={styles.weaponStats}>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Costo:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.shopData.cost}</Text>
                </View>
                <View style={styles.weaponStat}>
                    <Text style={[styles.generalText, styles.weaponStatText]}>Categoría:</Text>
                    <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.shopData.category}</Text>
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

module.exports = WeaponShopData;