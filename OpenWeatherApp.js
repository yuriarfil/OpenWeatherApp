/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * https://api.openweathermap.org
 */

import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

class OpenWeather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cityName: "",
      main: "",
      desc: "",
      temp: ""
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
            temp: responseJson.main.temp
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
        <View style={styles.container}>
         <View Style={styles.row}>
           <TextInput
             placeholder="Type City Name!"
             onSubmitEditing={this._handleTextChange}
             />
            <Text>
               {this.state.main}
            </Text>
			<Text>
               {this.state.desc}
            </Text>
			<Text>
               {this.state.temp}
            </Text>
         </View>
        </View>
      )
   }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 100},
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 400
  },
});

export default OpenWeather
