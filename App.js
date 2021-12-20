import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  data.data.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c
  })
  return (
    <View style={{ backgroundColor: "black", width: width }}>
      <FlatList
        data={data.data}
        renderItem={({ item, index }) =>
          <View style={{ marginVertical: 10 }}>
            {index > 0 ?
              cmpDate(item.date, data.data[index - 1].date) ?
                <View>
                  <Text style={{ color: 'white', marginLeft: 30, marginBottom: 10 }}>{days[new Date(item.date).getDay()]} {new Date(item.date).getDate()} {months[new Date(item.date).getMonth()]}</Text>
                </View>
                : null
              : <View>
                <Text style={{ color: 'white', marginLeft: 30, marginBottom: 10, marginTop: 10 }}>{days[new Date(item.date).getDay()]} {new Date(item.date).getDate()} {months[new Date(item.date).getMonth()]}</Text>
              </View>
            }
            {item.type == "activity" && item.payload.type == "Walking" ?
              <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 30 }} >
                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.iconeFeed} source={require('./img/svg-walking.svg')} />
                  <View style={{ marginHorizontal: 10, alignContent: 'center' }}>
                    <Text style={styles.basicTitle}>{item.payload.type}</Text>
                    {item.payload.steps < 999 ?
                      <Text style={styles.basicText}>{item.payload.steps} pas</Text> :
                      <Text style={styles.basicText}>{Math.trunc(item.payload.steps / 1000)} {item.payload.steps % 1000} pas</Text>}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Text style={{ color: "white" }}>{item.payload.points}</Text>
                  <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={require('./img/light.png')} />
                </View>
              </View> :
              item.type == "activity" && item.payload.type == "Cycling" ?
                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 30 }} >
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.iconeFeed} source={require('./img/lost.jpg')} />
                    <View style={{ marginHorizontal: 10, alignContent: 'center' }}>
                      <Text style={styles.basicTitle}>{item.payload.type}</Text>
                        <Text style={styles.basicText}>{item.payload.distance / 1000} km - {Math.trunc((item.payload.duration / 60) / 60)}:{Math.trunc((item.payload.duration / 60) % 60)}:00  </Text> 
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: "center" }}>
                      <Text style={{ color: "white" }}>{item.payload.points}</Text>
                      <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={require('./img/light.png')} />
                    </View>

                </View> :
                item.type == "bonus" ?
                  <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 30 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={styles.iconeFeed} source={require('./img/svg1.svg')} />
                      <Text style={styles.bonusText}>{item.payload.bonusName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                      <Text style={{ color: "white" }}>{item.payload.points}</Text>
                      <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={require('./img/light.png')} />
                    </View>
                  </View> :
                  item.type == "challenge" ?
                    <View>
                      <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 30 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image style={styles.iconeFeed} source={require('./img/svg-flag.svg')} />
                          <View style={{ marginHorizontal: 10, alignContent: 'center' }}>
                            <Text style={styles.basicTitle}>{item.payload.display.title}</Text>
                            <Text style={styles.basicText}>{item.payload.display.en.title}</Text>
                          </View>
                        </View>
                      </View>
                      <Image style={{ width: 100, height: 100, alignSelf: "center", marginVertical: 10 }} source={item.payload.display.badge} />
                    </View> : null
            }
          </View>
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  iconeFeed:{
    width: 40, height: 40
  },
  basicText: {
    color: "white"
  },
  basicTitle: {
    color: "white",
    fontWeight: "bold"
  },
  bonusText: {
    color: "gold",
    alignSelf: 'center',
    fontWeight: "bold",
    marginHorizontal: 10
  },
});
