import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


function cmpDate(d1, d2) {
  var d1_tmp = new Date(d1);
  var d2_tmp = new Date(d2);
  if (d1_tmp.getYear() >= d2_tmp.getYear())
    if (d1_tmp.getMonth() >= d2_tmp.getMonth())
      if (d1_tmp.getDay() != d2_tmp.getDay())
        return (true)
}

export default function App() {

  //const [isLoading, setLoading] = useState(true);
  //const [data, setData] = useState([]);

  /*useEffect(() => {
    fetch('https://sh-tech-interview.s3.eu-west-3.amazonaws.com/frontend/feed.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }}
      )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
*/

  const data = require('./feed.json');
  console.log(data)
  data.data.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c
  })
  console.log(data.data)
  return (
    <View style={styles.container}>
      <FlatList
        data={data.data}
        renderItem={({ item, index }) =>
          <View style={{ backgroundColor: "black", width: width }}>
            {index > 0 ?
              cmpDate(item.date, data.data[index - 1].date) ?
                <View>
                  <Text style={{ color: 'white' }}>{days[new Date(item.date).getDay()]} {new Date(item.date).getDate()} {months[new Date(item.date).getMonth()]}</Text>
                </View>
                : null
              : <View>
                    <Text style={{ color: 'white' }}>{days[new Date(item.date).getDay()]} {new Date(item.date).getDate()} {months[new Date(item.date).getMonth()]}</Text>
              </View>
            }
            {item.type == "activity" ?
              <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", }} >
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 40, height: 40 }} source={require('./svg-walking.svg')} />
                  <View>
                    <Text style={{ color: "white" }}>{item.payload.type}</Text>
                    <Text style={{ color: "white" }}>{item.payload.steps} pas</Text>
                  </View>
                </View>
                <Text style={{ color: "white" }}>{item.payload.points}</Text>
              </View> :
              item.type == "bonus" ?
                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 40, height: 40 }} source={require('./svg1.svg')} />
                    <Text style={{ color: "gold" }}>{item.payload.bonusName}</Text>
                  </View>
                  <Text style={{ color: "gold" }}>{item.payload.points}</Text>
                </View> :
                item.type == "challenge" ?
                  <View>
                    <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 40, height: 40, tintColor: "" }} source={require('./svg-flag.svg')} />
                        <View>
                          <Text style={{ color: "white" }}>{item.payload.display.title}</Text>
                          <Text style={{ color: "white" }}>{item.payload.display.en.title}</Text>
                        </View>
                      </View>
                    </View>
                    <Image style={{ width: 100, height: 100, tintColor: "", alignSelf: "center" }} source={item.payload.display.badge} />
                  </View> : null
            }
          </View>
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
