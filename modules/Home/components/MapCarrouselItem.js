import { Button } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

function MapCarrouselItem(props) {
    let map = props.map;
    return (
        <View style={styles.mapContainer}>
            <Image source={require('../../../assets/img/map_bg.png')} style={styles.mapBgImg} />
            <Image source={{ uri: map.splash }} style={styles.mapImg} />
            <View style={styles.mapBody}>
                <Text style={styles.mapName}>{map.displayName}</Text>
                <Button mode="contained" style={styles.mapButton}>VER MAPA</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: '#383e3a',
        borderRadius: 0,
        width: '50%',
        marginBottom: 5,
    },
});

module.exports = MapCarrouselItem;