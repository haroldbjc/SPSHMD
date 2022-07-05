import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import {MetalWeight} from '../utils/metalWeight';
import Button from '../components/Button';
import {getLocations} from '../api';
import {getRandomLocations} from '../utils/getRandomLocations';

const HomeScreen = () => {
  const [locations, setLocations] = React.useState([]);
  const [region, setRegion] = React.useState({
    latitude: 5.3553808,
    longitude: 100.2912276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [randomLocations, setRandomLocations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleRegionChange = (regionState) => {
    setRegion(regionState);
  };

  // extract latlng from result array
  const getLatLng = (result) => {
    return result.map((item) => {
      return {
        latitude: item.location.coords.latitude,
        longitude: item.location.coords.longitude,
        description: item.result,
        weight: MetalWeight(item.result),
      };
    });
  };

  // load data from api
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLocations();
      setLocations(getLatLng(result));
    };
    fetchData();
    setRandomLocations(getRandomLocations(region, 0.1, 100));
    setIsLoading(false);
  }, []);

  const handlePress = async () => {
    try {
      const results = await getLocations(region);
      setLocations(getLatLng(results));
    } catch (error) {
      console.log(error);
    }
    console.log(locations);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="map" size={30} color={'black'} />
        <Text style={styles.headerText}>Heavy Metal Heat Map</Text>
      </View>
      {!isLoading && (
        <MapView style={styles.map} region={region} onRegionChangeComplete={handleRegionChange}>
          {/* {locations.map((marker, index) => (
          <Marker key={index} coordinate={marker.latln} title={marker.title} description={marker.description} />
        ))} */}
          <MapView.Heatmap
            points={randomLocations}
            opacity={1}
            radius={20}
            maxIntensity={100}
            gradientSmoothing={10}
            heatmapMode={'POINTS_DENSITY'}
          />
        </MapView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    marginVertical: 6,
  },
  sectionContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
  },
  sectionDescription: {
    marginTop: 8,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
});

export default HomeScreen;
