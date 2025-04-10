/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * API: https://api.openweathermap.org
 */

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

class OpenWeather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cityName: "",
      main: "",
      desc: "",
      temp: "",
      icon: ""
    };
  }

  _handleTextChange = (event) => {
    let cityName = event.nativeEvent.text;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=bbeb34ebf60ad50f7893e7440a1e2b0b`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson); 
      this.setState({
        main: responseJson.weather[0].main,
        desc: responseJson.weather[0].description,
        temp: responseJson.main.temp,
        icon: `http://openweathermap.org/img/wn/${responseJson.weather[0].icon}@2x.png`
      })
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        main: 'Not Found!',
        desc: 'Not Found!',
        temp: 'Not Found!'
      })
    });
  }

  render() {
    return (
      <ImageBackground source={require('/background.jpg')} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Weather Check</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type City Name!"
              style={styles.inputField}
              onSubmitEditing={this._handleTextChange}
            />
          </View>
          <View style={styles.weatherInfo}>
            <Image source={{ uri: this.state.icon }} style={styles.weatherIcon} />
            <Text style={styles.weatherMain}>{this.state.main}</Text>
            <Text style={styles.weatherDesc}>{this.state.desc}</Text>
            <Text style={styles.weatherTemp}>{this.state.temp}°F</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  header: {
    backgroundColor: 'rgba(0, 123, 255, 0.8)', // Semi-transparent background
    padding: 20,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    color: 'white'
  },
  inputContainer: {
    padding: 10,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  inputField: {
    padding: 10,
    fontSize: 18
  },
  weatherInfo: {
    padding: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  weatherMain: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  weatherDesc: {
    fontSize: 18,
    color: '#666'
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff'
  }
});

export default OpenWeather;
