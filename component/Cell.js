import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './../GlobalStyle'
import Points from './../component/Points'


export default function Cell(props) {
    return(
    <View style={styles.cell} >
        <View style={{ flexDirection: 'row' }}>
            <Image style={styles.iconeFeed} source={props.image} />
            <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                {props.children}
            </View>
        </View>
        <Points points={props.points}></Points>
    </View>
    )
}