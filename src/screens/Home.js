import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import {IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MetalWeight, metalWeight} from '../utils/metalWeight';
import {getLocations, postResults} from '../api';
import {getRandomLocations} from '../utils/getRandomLocations';
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
  const [randomLocations, setRandomLocations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [authUser, setAuthUser] = React.useState(null);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [onMapReady, setOnMapReady] = React.useState(false);

  // batch post locations to server
  const postLocations = async () => {
    setRandomLocations(getRandomLocations(region, 0.1, 100));
    const userdata = await AsyncStorage.getItem('user').then((user) => {
      return JSON.parse(user);
    });
    let userid = userdata.id;
    let username = userdata.username;
    for (let i = 0; i < randomLocations.length; i++) {
      let data = {
        userid: userid,
        username: username,
        detectedMetal: metalWeight[Math.floor(Math.random() * metalWeight.length)],
        latitude: randomLocations[i].latitude,
        longitude: randomLocations[i].longitude,
      };
      try {
        setIsLoading(true);
        await postResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    // load data from api
    const fetchData = async () => {
      const result = await getLocations();
      setLocations(getLatLng(result));
    };
    fetchData();
  };

  const handleRegionChange = (regionState) => {
    setRegion(regionState);
  };

  // extract latlng from result array
  const getLatLng = (result) => {
    return result.map((item) => {
      return {
        id: item?._id,
        latitude: item?.latitude,
        longitude: item?.longitude,
        description: item?.result,
        weight: MetalWeight(item.result),
        username: item?.username,
        detectedMetal: item?.detectedMetal,
        date: item?.time,
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
  }

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
        {/* <IconButton
          icon="z-wave"
          size={35}
          style={styles.icon}
          color={theme.colors.accent}
          onPress={() => postLocations()}
        /> */}
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
