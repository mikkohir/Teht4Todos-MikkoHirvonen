import { Text,Pressable,StyleSheet } from 'react-native'
import React from 'react'

export default function Row({item,toggleComplete}) {
    const textDecorationLine = item.completeTask ? 'line-through' : 'none'
    return (
        <Pressable onPress={() => toggleComplete(item.id)}>
        <Text style={[styles.row,{textDecorationLine}]}>{item.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        fontSize: 20,
        padding: 4,
        margin: 4,
    },
});