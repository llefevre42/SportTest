
import React from 'react';
import { Text, View, Image } from 'react-native';

export default function Points(props) {
  if (!(props.points))
    return (null)
  return (
    <View style={{ flexDirection: 'row', alignItems: "center" }}>
      <Text style={{ color: "white" }}>{props.points}</Text>
      <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={require('./../img/light.png')} />
    </View>
  )
}