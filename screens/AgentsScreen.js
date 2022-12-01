import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, Text, ScrollView, View, Image, Dimensions } from 'react-native';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { Button, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const ratio = ScreenWidth / 1920; //Necesario para fingir un "auto" en el height del vídeo

const Agent = ({ agent }) => {
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

function AgentsScreen() {
    function pegarApi() {
        axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=es-MX')
            .then((response) => {
                setAgents(response.data.data);
                setAgentsFiltered(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        pegarApi();
    }, []);

    const [agents, setAgents] = React.useState([]);
    const [agentsFiltered, setAgentsFiltered] = React.useState([]);
    const [agentName, setAgentName] = React.useState("");

    function filterAgentsByName(agentName) {
        setAgentName(agentName);
        if (agentName != '') {
            setAgentsFiltered(agents.filter(a => a.displayName.toLowerCase().includes(agentName.toLowerCase())));
        } else {
            setAgentsFiltered(agents);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.inputName}
                label="Nombre del agente"
                value={agentName}
                mode='outlined'
                outlineColor='#FD4556'
                activeOutlineColor='#FD4556'
                onChangeText={text => filterAgentsByName(text)}
            />
            <View style={styles.agentsListContainer}>
                {agentsFiltered.length > 0
                    ? agentsFiltered.map((agent) => <Agent agent={agent} key={agent.uuid} />)
                    : <Text>No se encontraron agentes</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
    },
    generalBlackText: {
        fontFamily: 'TungstenBold',
        color: '#383e3a',
    },
    generalWhiteText: {
        fontFamily: 'TungstenBold',
        color: '#ece8e1',
    },
    agentsListContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    inputName: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 15,
    },

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

module.exports = AgentsScreen;