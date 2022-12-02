import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const ScreenHeight = Dimensions.get('window').height;

function AgentHero(props) {
    const navigation = useNavigation();
    let agent = props.agent;
    let colors = agent.backgroundGradientColors.map(color => color = '#' + color);
    return (
        <LinearGradient style={styles.agentHero} colors={colors}>
            <Image source={{ uri: agent.background }} style={styles.agentBackgroundImg}></Image>
            <Image source={{ uri: agent.fullPortrait }} style={styles.agentImg}></Image>
            <Text key={agent.uuid} style={styles.agentName}>{agent.displayName} </Text>
            <View style={styles.agentButtons}>
                <View style={styles.agentButtonContainer}>
                    <Button mode="contained" style={styles.agentButton} onPress={()=>navigation.navigate("Agente", {agentUuid: agent.uuid})}>VER AGENTE</Button>
                </View>
                <View style={styles.agentButtonContainer}>
                    <Button mode="contained" style={styles.agentButton} onPress={()=>navigation.navigate("Agentes")}>VER TODOS</Button>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    agentHero: {
        width: '100%',
        height: ScreenHeight - Constants.statusBarHeight,
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
    agentName: {
        fontSize: 48,
        fontFamily: 'ValorantFont',
        textAlign: 'center',
        color: '#fff',
    },
    agentButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    agentButtonContainer: {
        backgroundColor: 'transparent',
        width: '45%',
        padding: 5,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: 'hsla(38,22%,90%,.5)',
    },
    agentButton: {
        backgroundColor: '#FD4556',
        borderRadius: 0,
    },
});

module.exports = AgentHero;