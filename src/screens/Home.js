import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MetalWeight, metalWeight} from '../utils/metalWeight';
import {getLocations, postResults} from '../api';
import {getRandomLocations} from '../utils/getRandomLocations';
import theme from '../configs/theme';

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

  // // batch post locations to server
  // const postLocations = async () => {
  //   setRandomLocations(getRandomLocations(region, 0.1, 100));
  //   const userdata = await AsyncStorage.getItem('user').then((user) => {
  //     return JSON.parse(user);
  //   });
  //   let userid = userdata.id;
  //   let username = userdata.username;
  //   for (let i = 0; i < randomLocations.length; i++) {
  //     let data = {
  //       userid: userid,
  //       username: username,
  //       detectedMetal: metalWeight[Math.floor(Math.random() * metalWeight.length)],
  //       latitude: randomLocations[i].latitude,
  //       longitude: randomLocations[i].longitude,
  //     };
  //     try {
  //       setIsLoading(true);
  //       await postResults(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   // load data from api
  //   const fetchData = async () => {
  //     const result = await getLocations();
  //     setLocations(getLatLng(result));
  //   };
  //   fetchData();
  // };

  const handleRegionChange = (regionState) => {
    setRegion(regionState);
  };

  // extract latlng from result array
  const getLatLng = (result) => {
    return result.map((item) => {
      return {
        latitude: item?.latitude,
        longitude: item?.longitude,
        description: item?.result,
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
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && (
        <MapView style={styles.map} region={region} onRegionChangeComplete={handleRegionChange}>
          {/* {locations.map((marker, index) => (
          <Marker key={index} coordinate={marker.latln} title={marker.title} description={marker.description} />
        ))} */}
          <MapView.Heatmap
            points={locations}
            opacity={1}
            radius={20}
            maxIntensity={100}
            gradientSmoothing={10}
            heatmapMode={'POINTS_DENSITY'}
          />
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <IconButton icon="view-dashboard-edit" size={35} style={styles.icon} color={theme.colors.accent} />
        {/* <IconButton
          icon="z-wave"
          size={35}
          style={styles.icon}
          color={theme.colors.accent}
          onPress={() => postLocations()}
        /> */}
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
    ...StyleSheet.absoluteFillObject,
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  icon: {
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;
