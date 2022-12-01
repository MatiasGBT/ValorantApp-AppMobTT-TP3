import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions, ImageBackground, Image } from 'react-native';
import Constants from 'expo-constants';
import { ActivityIndicator } from 'react-native-paper';
const axios = require('axios').default;
import { LinearGradient } from 'expo-linear-gradient';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

function Skill({ skill }) {
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
                        <View style={styles.agentInfo}>
                            <View style={styles.agentRoleContainer}>
                                <Image source={{ uri: agent.role.displayIcon }} style={styles.roleImage} />
                                <Text style={[styles.roleName, styles.generalText]}>{agent.role.displayName}</Text>
                            </View>
                            <Text style={[styles.roleDescription, styles.generalText]}>{agent.role.description}</Text>
                            <Text style={[styles.agentName, styles.generalText]}>{agent.displayName.toUpperCase()}</Text>
                            <Text style={[styles.agentDescription, styles.generalText]}>{agent.description}</Text>
                        </View>
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

module.exports = AgentScreen;