import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function AgentSkill(props) {
    let skill = props.skill;
    return (
        <View style={styles.skillContainer}>
            {skill.displayIcon
                ? <Image source={{ uri: skill.displayIcon }} style={styles.skillImg} />
                : <Text style={styles.noIcon}>No icon available</Text>
            }
            <Text style={[styles.skillName, styles.generalText]}>
                {skill.displayName.toUpperCase()}
                {skill.slot == 'Ultimate' ? <Text> (Definitiva)</Text> : null}
                {skill.slot == 'Passive' ? <Text> (Pasiva)</Text> : null}
            </Text>
            <Text style={[styles.skillText, styles.generalText]}>{skill.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    generalText: {
        fontFamily: 'TungstenBold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    skillContainer: {
        width: '50%',
        padding: 5,
    },
    skillImg: {
        height: 100,
        resizeMode: 'center',
    },
    noIcon: {
        color: 'white',
        textAlign: 'center',
    },
    skillName: {
        fontSize: 24,
        textAlign: 'center',
    },
    skillText: {
        fontSize: 16,
        textAlign: 'center',
    }
});

module.exports = AgentSkill;