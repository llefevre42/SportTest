import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Dimensions, Image } from 'react-native';
import HeaderDate from './component/HeaderDate';
import Points from './component/Points'
import Activity from './component/Activity'
import styles from './GlobalStyle'

const { height, width } = Dimensions.get("window");

export default function App() {

  //const [isLoading, setLoading] = useState(true);
  //const [data, setData] = useState([]);

  /*useEffect(() => {
    fetch('https://sh-tech-interview.s3.eu-west-3.amazonaws.com/frontend/feed.json', {
      method: 'GET',
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
    let c = new Date(a.date);
    let d = new Date(b.date);
    return d - c
  })
  return (
    <View style={{ backgroundColor: "black", width: width }}>
      <FlatList
        data={data.data}
        renderItem={({ item, index }) =>
          <View style={{ marginVertical: 10 }}>
            <HeaderDate index={index} date={item.date} difDay={data.data[index - 1]}></HeaderDate>
            {item.type == "activity" ?
              <Activity type={item.payload.type} titre={item.payload.type} image={require('./img/svg-walking.svg')} points={item.payload.points} value={item.payload}></Activity>
              :
              item.type == "bonus" ?
                <View style={styles.cell}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.iconeFeed} source={require('./img/svg1.svg')} />
                    <Text style={styles.bonusText}>{item.payload.bonusName}</Text>
                  </View>
                  <Points points={item.payload.points}></Points>
                </View>
                :
                item.type == "challenge" ?
                  <View>
                    <View style={styles.cell}>
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


