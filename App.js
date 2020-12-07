import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, SafeAreaView, ActivityIndicator, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const urll = 'https://rickandmortyapi.com/api/episode';
const image = require('./images/1.jpg');
const ep='https://rickandmortyapi.com/api/episode/8';


const HomeScreen = ({ navigation }) => {

  const [isLoading, setLoading] = useState('true');
  const [data, setData] = useState([]);
  const [episode, setEpidose] = useState([]);
  const [id,setId]=useState([]);
  
  useEffect(() => {
    fetch(urll)
      .then((response) => response.json()).then((json) => {
        setData(json.results);
        setEpidose(json.episode);
        setId(json.id);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ImageBackground source={image} style={styles.im} >
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>{episode}</Text>
              <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.touchStyle}
                    onPress={() => navigation.navigate('Episode')}>
                    <Text style={styles.item}>
                      {item.episode}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

      </SafeAreaView>
    </ImageBackground>
  );
}

const EpisodeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState('true');
  const [data, setData] = useState([]);
  const[name,setName]=useState([]);
  const[air_date,setAirDate]=useState([]);
 

  useEffect(() => {
    fetch(ep)
      .then((response) => response.json()).then((json) => {
        setData(json.ep)
        setName(json.name)
        setAirDate(json.air_date);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text> Bölüm adı = {name}</Text>
              <Text>Yayınlanma Tarihi = {air_date}</Text>

              <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.touchStyle}
                    onPress={() => navigation.navigate('Characters')}>
                     
                     <Text style={styles.item}>
                      {item.name}
                      {item.air_date}
                    </Text>
                  </TouchableOpacity>
                )}
              />

            </View>

          )}

      </SafeAreaView>
  );
}



const Stack = createStackNavigator();

const NavigationOptionHandler=()=>({
  headerShown:false
})

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Empty">
          <Stack.Screen name="Home" component={HomeScreen} options={NavigationOptionHandler} />
          <Stack.Screen name="Episode" component={EpisodeScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  im: {
    flex: 1,
    resizeMode: 'stretch',
  },
  item: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,

  },
  touchStyle: {
    borderColor: '#add8e6',
    borderWidth: 5,
    borderRadius: 4,
    width: 100,
    height: 50,
    backgroundColor: '#fff',
    marginTop: 20,

  }
})

export default App;
