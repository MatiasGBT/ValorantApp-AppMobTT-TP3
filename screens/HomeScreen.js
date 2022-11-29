import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, Dimensions } from 'react-native';
const axios = require('axios').default;
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Video } from 'expo-av';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const ratio = ScreenWidth / 1920; //Necesario para fingir un "auto" en el height del vídeo

const Agent = ({ agent }) => {
    let colors = agent.backgroundGradientColors.map(color => color = '#' + color);
    return (
        <LinearGradient style={styles.agentHero} colors={colors}>
            <Image source={{ uri: agent.background }} style={styles.agentBackgroundImg}></Image>
            <Image source={{ uri: agent.fullPortrait }} style={styles.agentImg}></Image>
            <Text key={agent.uuid} style={styles.agentName}>{agent.displayName} </Text>
            <View style={styles.agentButtons}>
                <View style={styles.agentButtonContainer}>
                    <Button mode="contained" style={styles.agentButton}>VER AGENTE</Button>
                </View>
                <View style={styles.agentButtonContainer}>
                    <Button mode="contained" style={styles.agentButton}>VER TODOS</Button>
                </View>
            </View>
        </LinearGradient>
    )
}

const Map = ({ map }) => {
    return (
        <View style={styles.mapContainer}>
            <Image source={require('../assets/img/map_bg.png')} style={styles.mapBgImg} />
            <Image source={{ uri: map.splash }} style={styles.mapImg} />
            <View style={styles.mapBody}>
                <Text style={styles.mapName}>{map.displayName}</Text>
                <Button mode="contained" style={styles.mapButton}>VER MAPA</Button>
            </View>
        </View>
    )
}

let agentHero = null;

function HomeScreen() {
    function pegarApi() {
        axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=es-MX')
            .then((response) => {
                let agents = response.data.data;
                agentHero = agents[Math.floor(Math.random() * agents.length)];
            })
            .catch((error) => console.log(error));

        axios.get('https://valorant-api.com/v1/maps?language=es-MX')
            .then((response) => setMaps(response.data.data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        pegarApi();
    }, []);

    const [maps, setMaps] = React.useState([]);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
        <ScrollView style={styles.container}>
            {agentHero != null
                ? <Agent agent={agentHero}></Agent>
                : <ActivityIndicator />}

            <View style={styles.videoContainer}>
                <View style={styles.videoTextContainer}>
                    <Text style={[styles.videoTitle, styles.generalBlackText]}>SOMOS VALORANT</Text>
                    <Text style={[styles.videoSubtitle, styles.generalBlackText]}>DESAFÍA LOS LÍMITES</Text>
                    <Text style={[styles.videoText, styles.generalBlackText]}>Combina tu estilo y experiencia en un escenario global y competitivo. Tienes 13 rondas para atacar y defender tu lado con armas precisas y habilidades tácticas. Además, al contar con una sola vida por ronda, tendrás que pensar más rápido que tu oponente si quieres sobrevivir. Enfréntate a enemigos en los modos competitivo y normal, así como en Deathmatch y Spike Rush.</Text>
                </View>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltefd45731d8f9d9df/6217f2ea910a6c613c73168c/VALORANT_PLAY22_16x9_Target4_v005.mp4',
                    }}
                    shouldPlay
                    isLooping
                    resizeMode="contain"
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </View>

            <View style={styles.mapsContainer}>
                <Text style={[styles.mapsTitle, styles.generalWhiteText]}>MAPAS</Text>
                <Text style={[styles.mapsText, styles.generalWhiteText]}>Cada mapa es un campo de batalla para demostrar tu pensamiento creativo. Están diseñados especialmente para estrategias de equipo, jugadas espectaculares y momentos para remontar. Haz la jugada que otros imitarán en el futuro.</Text>
                <ScrollView horizontal={true}>
                    {maps.length != 0
                        ? maps.map((map) => <Map map={map} key={map.uuid} />)
                        : <ActivityIndicator />
                    }
                </ScrollView>
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

    videoContainer: {
        width: '100%',
        backgroundColor: '#FFFBF5',
    },
    video: {
        //https://stackoverflow.com/questions/39631895/how-to-set-image-width-to-be-100-and-height-to-be-auto-in-react-native
        width: '100%',
        height: 1080 * ratio
    },
    videoTextContainer: {
        padding: 10,
    },
    videoTitle: {
        fontSize: 48,
        textAlign: 'center',
    },
    videoSubtitle: {
        fontSize: 32,
        textAlign: 'center',
    },
    videoText: {
        fontSize: 20,
        textAlign: 'left',
    },

    mapsContainer: {
        width: '100%',
        backgroundColor: '#FFFBF5',
        padding: 10,
        backgroundColor: '#FD4556',
    },
    mapsTitle: {
        fontSize: 48,
        textAlign: 'center',
    },
    mapsText: {
        fontSize: 20,
        textAlign: 'left',
    },
    mapContainer: {
        width: ScreenWidth - 20,
    },
    mapBgImg: {
        position: 'absolute',
        height: 300,
        width: '100%',
        zIndex: 444
    },
    mapImg: {
        height: 300,
    },
    mapBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapName: {
        color: 'white',
        fontFamily: 'TungstenBold',
        fontSize: 32,
        textAlign: 'left',
        marginTop: 5,
        textTransform: 'uppercase',
    },
    mapButton: {
        backgroundColor: '#383e3a', //#ece8e1
        textColor: '#ece8e1', //#383e3a
        borderRadius: 0,
        width: '50%',
        marginBottom: 5,
    },
});

module.exports = HomeScreen;