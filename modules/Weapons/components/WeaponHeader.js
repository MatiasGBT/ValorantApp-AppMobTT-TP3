import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

function WeaponHeader(props) {
    let weapon = props.weapon;
    return (
        <View style={styles.weaponHeader}>
            <Text style={[styles.generalText, styles.weaponName]}>{weapon.displayName}</Text>
            {weapon.weaponStats
                ? <View>
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
                : null
            }

            {weapon.weaponStats && weapon.weaponStats.adsStats
                ? <View>
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
                : null
            }

            {weapon.shopData
                ? <View>
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
                        <View style={styles.weaponStat}>
                            <Text style={[styles.generalText, styles.weaponStatText]}>Se puede reembolsar:</Text>
                            <Text style={[styles.generalText, styles.weaponStatText]}>{weapon.shopData.canBeTrashed ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                  </View>
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
        justifyContent: 'space-between',
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