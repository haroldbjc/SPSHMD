/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';

import HistoryChip from '../components/HistoryChip';
import {deleteLocation} from '../api';
import Button from '../components/Button';
import {metalWeight} from '../utils/metalWeight';
import metalColors from '../constants/metalColors';
import EmptyView from '../components/EmptyView';

const HistoryScreen = ({navigation}) => {
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [location, setLocations] = React.useState(navigation.getParam('location'));

  // limit decimal places to 6
  const limitDecimal = (num) => {
    return parseFloat(num).toFixed(6);
  };

  const concatLatLng = (marker) => {
    if (marker.latitude === null || marker.longitude === null) {
      return 'Location ignored';
    }
    return `${limitDecimal(marker.latitude)}, ${limitDecimal(marker.longitude)}`;
  };

  // get date in format: 'MM/DD/YYYY HH:MM:SS'
  const getDate = (date) => {
    if (date === null) {
      return 'Not available';
    }
    return new Date(date).toLocaleString('en-US', {
      timeZone: 'Malaysia',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  //  open dialog to confirm delete
  const handleDelete = (markerid) => {
    setSelectedLocation(markerid);
    setIsDialogVisible(true);
  };

  // delete location from the server
  const deleteLocationHandler = async (id) => {
    try {
      await deleteLocation(id);
    } catch (error) {
      console.log(error);
    }
    setIsDialogVisible(false);
    setLocations(location.filter((marker) => marker.id !== id));
  };

  // set background color for chip based on marker metal
  const getChipColor = (metal) => {
    for (let i = 0; i < metalWeight.length; i++) {
      if (metal === metalWeight[i]) {
        return metalColors[i];
      }
    }
    return metalColors.NOMETAL;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {location.map((marker, index) => (
          <HistoryChip
            key={index}
            metal={marker.detectedMetal}
            location={concatLatLng(marker)}
            date={getDate(marker.date)}
            onPress={() => handleDelete(marker.id)}
            color={getChipColor(marker.detectedMetal)}
          />
        ))}
        {location.length === 0 && <EmptyView />}
        <Portal>
          <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}
            contentStyle={{justifyContent: 'center'}}
            style={styles.dialog}
          >
            <Dialog.Title>Delete this location?</Dialog.Title>
            <Dialog.Actions>
              <Button title="Cancel" onPress={() => setIsDialogVisible(false)} style={styles.buttonStyle} />
              <Button
                title="Confirm"
                onPress={() => deleteLocationHandler(selectedLocation)}
                style={styles.buttonStyle}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  marker: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonStyle: {
    marginLeft: 10,
  },
  dialog: {
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default HistoryScreen;
