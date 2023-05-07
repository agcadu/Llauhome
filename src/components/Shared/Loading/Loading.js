import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import {Text, } from 'react-native-elements'


export function Loading(props) {
    const { show, text } = props;


    if (!show) {
        return null;
    }
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="orange"/>
        {text && <Text style={styles.text}>{text}</Text>}
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'orange',
        textTransform: 'uppercase',
        marginTop: 10,
    }

})