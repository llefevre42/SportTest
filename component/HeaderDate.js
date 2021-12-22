
import React from 'react';
import {Text, View} from 'react-native';

function cmpDate(d1, d2) {
  var d1_tmp = new Date(d1);
  var d2_tmp = new Date(d2);
  if (d1_tmp.getYear() >= d2_tmp.getYear())
    if (d1_tmp.getMonth() >= d2_tmp.getMonth())
      if (d1_tmp.getDay() != d2_tmp.getDay())
        return (true)
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function HeaderDate(props) {
  if (props.index > 0)
    if (cmpDate(props.date, props.difDay.date))
      return (
        <View>
          <Text style={{ color: 'white', marginLeft: 30, marginBottom: 10 }}>{days[new Date(props.date).getDay()]} {new Date(props.date).getDate()} {months[new Date(props.date).getMonth()]}</Text>
        </View>
      )
    else
      return (null)
    else {
    return (
      <View>
        <Text style={{ color: 'white', marginLeft: 30, marginBottom: 10, marginTop: 10 }}>{days[new Date(props.date).getDay()]} {new Date(props.date).getDate()} {months[new Date(props.date).getMonth()]}</Text>
      </View>
    )
  }
}