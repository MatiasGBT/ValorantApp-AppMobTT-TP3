import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Constants from 'expo-constants';

const ScreenHeight = Dimensions.get('window').height;

function AgentInfo(props) {
    let agent = props.agent;
    return (
        <View style={styles.agentInfo}>
            <View style={styles.agentRoleContainer}>
                <Image source={{ uri: agent.role.displayIcon }} style={styles.roleImage} />
                <Text style={[styles.roleName, styles.generalText]}>{agent.role.displayName}</Text>
            </View>
            <Text style={[styles.roleDescription, styles.generalText]}>{agent.role.description}</Text>
            <Text style={[styles.agentName, styles.generalText]}>{agent.displayName.toUpperCase()}</Text>
            <Text style={[styles.agentDescription, styles.generalText]}>{agent.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    generalText: {
        fontFamily: 'TungstenBold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    agentInfo: {
        position: 'absolute',
        zIndex: 444,
        width: '65%',
        height: ScreenHeight - Constants.statusBarHeight,
        padding: 10,
    },
    agentRoleContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    roleImage: {
        width: 32,
        height: 32,
        marginRight: 5,
    },
    roleName: {
        fontSize: 32,
    },
    roleDescription: {
        fontSize: 16,
    },
    agentName: {
        fontSize: 48,
        marginTop: 'auto',
    },
    agentDescription: {
        fontSize: 24,
    },
});

module.exports = AgentInfo;