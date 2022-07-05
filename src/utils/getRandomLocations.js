// get random location within given radius of the given latlng
export const getRandomLocation = (latlng, radius) => {
  const randomLat = latlng.latitude + Math.random() * radius - radius / 2;
  const randomLng = latlng.longitude + Math.random() * radius - radius / 2;
  return {
    latitude: randomLat,
    longitude: randomLng,
    weight: 1,
  };
};

// get random locations within given radius of the given latlng
export const getRandomLocations = (latlng, radius, count) => {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push(getRandomLocation(latlng, radius));
  }
  return locations;
};
