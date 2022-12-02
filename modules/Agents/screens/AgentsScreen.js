import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, Text, ScrollView, View } from 'react-native';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';

const Agent = require("../components/Agent");

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
});

module.exports = AgentsScreen;