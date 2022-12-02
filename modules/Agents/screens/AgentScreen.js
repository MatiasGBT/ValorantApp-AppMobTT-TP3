import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions, ImageBackground, Image } from 'react-native';
import Constants from 'expo-constants';
import { ActivityIndicator } from 'react-native-paper';
const axios = require('axios').default;
import { LinearGradient } from 'expo-linear-gradient';

const ScreenHeight = Dimensions.get('window').height;

const AgentInfo = require("../components/AgentInfo");
const Skill = require("../components/AgentSkill");

function AgentScreen({ route }) {
    const agentUuid = route.params.agentUuid;
    const revertedAgents = ['Yoru', 'Jett', 'Phoenix', 'Killjoy', 'Sage'];
    function pegarApi() {
        axios.get(`https://valorant-api.com/v1/agents/${agentUuid}?language=es-MX`)
            .then((response) => {
                let apiAgent = response.data.data;
                setAgent(apiAgent);
                setColors(['#' + apiAgent.backgroundGradientColors[0], '#' + apiAgent.backgroundGradientColors[0]]);
                setRevert(revertedAgents.includes(apiAgent.displayName));
            })
            .catch((error) => console.log(error));
    }
    const [agent, setAgent] = React.useState(null);
    const [colors, setColors] = React.useState([]);
    const [revert, setRevert] = React.useState(null);
    if (agent == null || agent.uuid != agentUuid) {
        pegarApi();
    }

    return (
        <ScrollView style={styles.container}>
            {agent != null && colors.length > 0 && revert != null
                ? <View>
                    <LinearGradient colors={colors} style={styles.agentInfoContainer}>
                        <AgentInfo agent={agent}/>
                        <ImageBackground source={{ uri: agent.background }} resizeMode="cover" style={styles.agentImageBackground}>
                            <Image source={{ uri: agent.fullPortrait }} resizeMode="cover" style={revert ? styles.agentRevertedImagePortrait : styles.agentImagePortrait} />
                        </ImageBackground>
                    </LinearGradient>
                    <LinearGradient style={styles.skills} colors={agent.backgroundGradientColors.map(color => '#' + color)}>
                        <Text style={[styles.agentName, styles.generalText]}>HABILIDADES:</Text>
                        <View style={styles.skillListContainer}>
                            {agent.abilities.map((skill) => <Skill skill={skill} key={skill.slot} />)}
                        </View>
                    </LinearGradient>
                </View>
                : <ActivityIndicator />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
    },
    generalText: {
        fontFamily: 'TungstenBold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    
    agentInfoContainer: {
        display: 'flex',
    },
    agentImageBackground: {
        width: '100%',
        height: ScreenHeight - Constants.statusBarHeight,
        marginLeft: '45%',
    },
    agentImagePortrait: {
        width: '100%',
        height: ScreenHeight - Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
    },
    agentRevertedImagePortrait: {
        width: '100%',
        height: ScreenHeight - Constants.statusBarHeight,
        flex: 1,
        justifyContent: 'center',
        transform: [{ scaleX: -1 }],
    },

    skills: {
        padding: 10,
    },
    skillListContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
});

module.exports = AgentScreen;