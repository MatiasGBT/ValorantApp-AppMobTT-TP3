import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ScreenHeight = Dimensions.get('window').height;

function Agent(props) {
    let agent = props.agent;
    const navigation = useNavigation();
    let colors = [
        '#' + agent.backgroundGradientColors[0],
        '#' + agent.backgroundGradientColors[0],
    ]
    return (
        <LinearGradient style={styles.agentContainer} colors={colors}>
            <Image source={{ uri: agent.background }} style={styles.agentBackgroundImg}></Image>
            <Image source={{ uri: agent.fullPortrait }} style={styles.agentImg}></Image>
            <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{agent.displayName}</Text>
                <Button mode="contained" style={styles.agentButton} onPress={()=>navigation.navigate("Agente", {agentUuid: agent.uuid})}>
                    <Text style={styles.agentButtonText}>VER DETALLES</Text>
                </Button>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    agentContainer: {
        width: '50%',
        height: ScreenHeight / 2 - Constants.statusBarHeight / 2,
        padding: 5,
    },
    agentBackgroundImg: {
        width: '100%',
        height: '80%',
        position: 'absolute',
    },
    agentImg: {
        width: '100%',
        height: '80%',
    },
    agentInfo: {
        height: '20%',
        width: '100%',
    },
    agentName: {
        fontSize: 24,
        fontFamily: 'ValorantFont',
        textAlign: 'center',
        color: '#fff',
    },
    agentButton: {
        backgroundColor: '#FD4556',
        borderRadius: 0,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    agentButtonText: {
        fontSize: 10,
    },
});

module.exports = Agent;