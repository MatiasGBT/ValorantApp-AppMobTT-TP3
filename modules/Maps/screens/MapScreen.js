import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions, Image } from 'react-native';
import Constants from 'expo-constants';
import { ActivityIndicator } from 'react-native-paper';
const axios = require('axios').default;

const ScreenWidth = Dimensions.get('window').width;
const ratio = ScreenWidth / 1920; //Necesario para fingir un "auto" en el height del vídeo

function MapScreen({ route }) {
    const mapUuid = route.params.mapUuid;
    function pegarApi() {
        axios.get(`https://valorant-api.com/v1/maps/${mapUuid}?language=es-MX`)
            .then((response) => setMap(response.data.data))
            .catch((error) => console.log(error));
    }
    const [map, setMap] = React.useState(null);
    if (map == null || map.uuid != mapUuid) {
        pegarApi();
    }

    return (
        <ScrollView style={styles.container}>
            {map != null
                ? <View>
                    <Image source={{ uri: map.splash }} resizeMode="cover" style={styles.mapImg} />
                    <View style={styles.mapInfo}>
                        <View style={styles.mapHeader}>
                            <Text style={[styles.generalText, styles.mapHeaderText]}>{map.displayName}</Text>
                            <Text style={[styles.generalText, styles.mapHeaderText]}>{map.coordinates}</Text>
                        </View>
                        {map.displayIcon
                            ? <View>
                                <Text style={[styles.generalText, styles.mapText]}>Mapa:</Text>
                                <Image source={{ uri: map.displayIcon }} style={styles.mapDisplayIcon} />
                              </View>
                            : null
                        }
                    </View>
                </View>
                : <ActivityIndicator />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#FFFBF5',
    },
    generalText: {
        fontFamily: 'TungstenBold',
        color: '#383e3a',
    },
    mapImg: {
        width: '100%',
        height: 1080 * ratio,
    },
    mapInfo: {
        padding: 10,
    },
    mapHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapHeaderText: {
        fontSize: 32,
    },
    mapText: {
        fontSize: 24,
    },
    mapDisplayIcon: {
        width: '100%',
        height: 1650 * ratio,
    },
});

module.exports = MapScreen;