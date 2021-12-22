import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './../GlobalStyle'
import Points from './Points'
import Cell from './Cell'

export default function Activity(props) {
    let finalValue = ''
    let finalImg = ''
    if (props.type == "Walking"){
        finalValue = (props.value.steps < 999 ? props.value.steps : (Math.trunc(props.value.steps / 1000) + ' ' + (props.value.steps % 1000 < 100 ? '0'+ props.value.steps % 1000 : props.value.steps % 1000 )))
        finalImg = require('./../img/svg-walking.svg')
    }
    else if (props.type == "Cycling"){
        finalValue = (props.value.distance / 1000 + ' km - ' + (Math.trunc((props.value.duration / 60) / 60)) + ':' + (Math.trunc((props.value.duration / 60) % 60)) + ':00')
        finalImg = require('./../img/lost.jpg')
    }
   return (
        <Cell image={finalImg} points={props.value.points}>
            <Text style={styles.basicTitle}>{props.titre}</Text>
            <Text style={styles.basicText}>{finalValue}</Text>
        </Cell>
    )
}
