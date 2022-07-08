import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MetalWeight} from '../utils/metalWeight';
import {getLocations} from '../api';
import theme from '../configs/theme';
import HeaderChip from '../components/HeaderChip';
import Button from '../components/Button';

const HomeScreen = ({navigation}) => {
  const [locations, setLocations] = React.useState([]);
  const [region, setRegion] = React.useState({
    latitude: 5.3553808,
    longitude: 100.2912276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [authUser, setAuthUser] = React.useState(null);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [onMapReady, setOnMapReady] = React.useState(false);

  const handleRegionChange = (regionState) => {
    setRegion(regionState);
  };

  // extract latlng from result array filter out null latlng
  const getLatLng = (result) => {
    let latlng = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].latitude !== null && result[i].longitude !== null) {
        latlng.push({
          id: result[i].id,
          username: result[i].username,
          description: result[i].result,
          latitude: result[i].latitude,
          longitude: result[i].longitude,
          weight: MetalWeight(result[i].result),
          date: result[i].time,
          detectedMetal: result[i].detectedMetal,
        });
      }
    }
    return latlng;
  };

  // load data from api
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLocations();
      setLocations(getLatLng(result));
    };
    fetchData();
    // set user
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user').then((userdata) => {
        return JSON.parse(userdata);
      });
      setAuthUser(user);
    };
    getUser();
    setIsLoading(false);
  }, []);

  // handle navigation to history screen
  const handleNavigateToHistory = () => {
    // extract latlng from result array filter by username
    setButtonLoading(true);
    let getLatLngByUsername = locations.filter((item) => {
      return item.username === authUser.username;
    });
    navigation.navigate('HomeHistory', {
      location: getLatLngByUsername,
    });
    setButtonLoading(false);
  };

  // when map is ready
  const handleMapReady = () => {
    setOnMapReady(true);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={handleRegionChange}
          onLayout={handleMapReady}
        >
          {onMapReady && (
            <MapView.Heatmap
              points={locations}
              opacity={1}
              radius={20}
              maxIntensity={100}
              gradientSmoothing={10}
              heatmapMode={'POINTS_DENSITY'}
            />
          )}
        </MapView>
      )}
      <HeaderChip icon="map" mainText={'HeatMap'} altText={'Monitor the magnitudes of meavy metals'} />
      <View style={styles.buttonContainer}>
        <Button
          loading={buttonLoading}
          icon="history"
          title="History"
          style={styles.button}
          onPress={() => handleNavigateToHistory()}
        />
      </View>
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
    position: 'absolute',
    minWidth: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    flex: 1,
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  icon: {
    backgroundColor: theme.colors.background,
  },
  button: {
    borderRadius: 20,
    width: 120,
    elevation: 5,
  },
});

export default HomeScreen;
