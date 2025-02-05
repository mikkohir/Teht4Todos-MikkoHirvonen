import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from 'react'

export default function Add({add}) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.form} value={name} onChangeText={text => setName(text)} placeholder="Enter task"
            />
            <Button title='Save' color={''} onPress={() => save(name)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:16
    },
    form: {
        width: '83%',
        fontSize: 20,
    },
})