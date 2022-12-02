import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Skin = require("../components/Skin");

function WeaponSkins(props) {
    let skins = props.weapon.skins;
    skins = skins.filter(skin => !skin.displayName.toLowerCase().includes('estándar') && !skin.displayName.toLowerCase().includes('aleatorio'));
    return (
        <View>
            <Text style={styles.skinsTitle}>Skins:</Text>
            <View style={styles.skinsContainer}>
                {skins.length != 0
                    ? skins.map((skin) => <Skin skin={skin} key={skin.uuid} />)
                    : <ActivityIndicator />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    skinsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    skinsTitle: {
        fontSize: 24,
        padding: 10,
        color: '#383e3a',
        fontFamily: 'TungstenBold',
    },
});

module.exports = WeaponSkins;