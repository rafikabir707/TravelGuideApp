import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Linking } from 'react-native';
import MapView from 'react-native-maps';

const countries = {
  France: {
    image: { uri: 'https://simp6.jpg5.su/images3/dex-ezekiel-EobQaSfI-EY-unsplash267e80d3de01e61e.jpg' },
    places: [
      { name: 'Eiffel Tower', image: { uri: 'https://i.imgur.com/pKm650u.jpeg' }, latitude: 48.8584, longitude: 2.2945 },
      { name: 'Louvre Museum', image: { uri: 'https://i.imgur.com/9ouy1dO.jpeg' }, latitude: 48.86105402960853, longitude: 2.3358397307688272 },
      { name: 'Palace of Versailles', image: { uri: 'https://i.imgur.com/UFV6wDQ.jpeg' }, latitude: 48.8019, longitude: 2.1205 },
    ],
  },
  Japan: {
    image: { uri: 'https://simp6.jpg5.su/images3/photo-1524413840807-0c3cb6fa808dq80ampw2070ampautoformatampfitcropampixlibrb-4.00bcd552de92f4fb1.jpg' },
    places: [
      { name: 'Mount Fuji', image: { uri: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww' }, latitude: 35.3606, longitude: 138.7274 },
      { name: 'Tokyo Skytree', image: { uri: 'https://images.unsplash.com/photo-1667628324141-eaee7bf935f9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VG9reW8lMjBTa3l0cmVlfGVufDB8fDB8fHww' }, latitude: 35.710169396691576, longitude: 139.81082927867428 },
      { name: 'Fushimi Inari Shrine', image: { uri: 'https://plus.unsplash.com/premium_photo-1690957796569-32bd288ca4bb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RnVzaGltaSUyMEluYXJpJTIwU2hyaW5lfGVufDB8fDB8fHww' } , latitude: 34.9667, longitude: 135.7714 },
    ],
  },
  America: {
      image: { uri: 'https://simp6.jpg5.su/images3/jan-folwarczny-LLGRiTroses-unsplash2d3db4037f16b792.jpg' },
      places: [
        { name: 'Las Vegas', image: { uri: 'https://plus.unsplash.com/premium_photo-1672114785694-26e4bd4e1039?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGFzJTIwVmVnYXN8ZW58MHx8MHx8fDA%3D' } , latitude: 36.1699, longitude: -115.1398 },
        { name: 'Los Angeles', image: { uri: 'https://images.unsplash.com/photo-1711426793036-cc10917d34a9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fExvcyUyMEFuZ2VsZXN8ZW58MHx8MHx8fDA%3D' } , latitude: 34.0522, longitude: -118.2437 },
        { name: 'Venice Beach', image: { uri: 'https://images.unsplash.com/photo-1444627127335-900f8d0a77ab?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFZlbmljZSUyMEJlYWNofGVufDB8fDB8fHww' } , latitude: 33.993322009857025, longitude: -118.48067632913776 },
      ],
    },
  Egypt: {
      image: { uri: 'https://simp6.jpg5.su/images3/kevin-et-laurianne-langlais-pvFtrzwuc6g-unsplash32e19af2745d0cfd.jpg' },
      places: [
        { name: 'Pyramids of Giza', image: { uri: 'https://plus.unsplash.com/premium_photo-1694475209008-4edd83c382e9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UHlyYW1pZHMlMjBvZiUyMEdpemF8ZW58MHx8MHx8fDA%3D' }, latitude: 29.9792, longitude: 31.1342 },
        { name: 'Sphinx', image: { uri: 'https://media.istockphoto.com/id/178375366/photo/full-sphynx-profile-pyramid-giza-egypt.webp?a=1&b=1&s=612x612&w=0&k=20&c=QVeD-saArkvCUGHk5hK8pJ7RIDocJivyeqBOLJq_T9c=' } , latitude: 29.9761, longitude: 31.1322 },
        { name: 'Egyptian Museum', image: { uri: 'https://images.unsplash.com/photo-1641388020166-3a68d31fa6e4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEVneXB0aWFuJTIwTXVzZXVtfGVufDB8fDB8fHww' } , latitude: 30.0444, longitude: 31.2357 },
      ],
    },
  Brazil: {
      image: { uri: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhemlsfGVufDB8fDB8fHww' },
      places: [
        { name: 'Rio de Janeiro', image: { uri: 'https://plus.unsplash.com/premium_photo-1671211307997-f4f552b0601c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }, latitude: -22.9068, longitude: -43.1729 },
        { name: 'Amazon Rainforest', image: { uri: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638890315/EducationHub/photos/amazon-river-basin.jpg' } , latitude: -3.1190, longitude: -60.0217 },
        { name: 'Iguazu Falls', image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Cataratas.jpg' }, latitude: -25.6953, longitude: -54.4367 },
      ],
    },

};

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryPress = (country) => {
    setSelectedCountry(country);
  };

  const CountryScreen = () => (
    <FlatList
      data={Object.keys(countries)}
      keyExtractor={(item) => item}
      numColumns={3} // Adjust columns for better layout
      contentContainerStyle={styles.countryList}
      renderItem={({ item: country }) => (
        <TouchableOpacity onPress={() => handleCountryPress(country)} style={styles.countryItem}>
          <Image source={countries[country].image} style={styles.countryImage} />
          <Text style={styles.countryName}>{country}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const PlacesScreen = () => {
    const selectedPlaces = countries[selectedCountry].places;

    return (
        <View style={styles.container}>
          <Text style={styles.countryName}>{selectedCountry}</Text>
          <FlatList
            data={selectedPlaces}
            keyExtractor={(item) => item.name}
            renderItem={({ item: place }) => (
              <View style={styles.placeItem}>
                <Image source={place.image} style={styles.placeImage} />
                <View style={styles.placeInfo}>
                  <Text style={styles.placeText}>{place.name}</Text>
                  {/* Location button inside renderItem */}
                  <TouchableOpacity onPress={() => openLocation(place.latitude, place.longitude)} style={styles.locationButton}>
                    <Text style={styles.locationButtonText}>Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            numColumns={2}
            contentContainerStyle={styles.placeList}
          />
          <TouchableOpacity onPress={() => setSelectedCountry(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Countries</Text>
          </TouchableOpacity>
        </View>
      );
    };
  const openLocation = (latitude, longitude) => {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    };

  return <View style={styles.container}>{selectedCountry ? <PlacesScreen /> : <CountryScreen />}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  countryList: {
    padding: 20,
  },
  countryItem: {
    width: '30%', // Adjust width for better grid layout
    margin: 10,
    alignItems: 'center',
  },
  countryImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  countryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  locationButton: {
      backgroundColor: '#0A7968',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    locationButtonText: {
      color: 'white',
      fontSize: 16,
    },
  placeList: {
    padding: 10,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  placeImage: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 5,
  },
  placeText: {
    fontSize: 18,
  },
  placeInfo: {
    flex: 1, // Allow place information to expand to fill remaining space
    justifyContent: 'center',
  },
  placeDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  placeRating: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 20,
        backgroundColor: '#CDD1CC',
        padding: 10,
        borderRadius: 5,
        // Add your button styles here
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        shadowOffset: {
          width: 10,
          height: 8,
        },
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
    padding: 10,
  },
});

export default App