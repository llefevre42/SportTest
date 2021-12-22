import React from 'react';
import { Text, View , Image } from 'react-native';
import styles from './../GlobalStyle'
import Points from './../component/Points'


export default function Activity(props) {
    let finalValue = ''
    if (props.type == "Walking")
      finalValue = (props.value.steps < 999 ? props.value.steps : (Math.trunc(props.value.steps / 1000) + ' ' + (props.value.steps % 1000)))
    else if (props.type == "Cycling")
      finalValue = (props.value.distance / 1000 + ' km - ' + (Math.trunc((props.value.duration / 60) / 60)) + ':' + (Math.trunc((props.value.duration / 60) % 60)) + ':00')
    return (
      <View style={styles.cell} >
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.iconeFeed} source={props.image} />
          <View style={{ marginHorizontal: 10, alignContent: 'center' }}>
            <Text style={styles.basicTitle}>{props.titre}</Text>
            <Text style={styles.basicText}>{finalValue}</Text>
          </View>
        </View>
        <Points points={props.value.points}></Points>
      </View>
    )
  }
  