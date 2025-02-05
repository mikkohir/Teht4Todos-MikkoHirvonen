import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import Row from './components/Row';
import { useCallback, useState, useEffect } from 'react';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'

export default function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    storeData(data)
  },[data])

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setData(json)
      console.log("Data fetched")
    }
    catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async(value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY,json)
      console.log("Data saved")
    }
    catch (ex) {
      console.log(ex)
    }
  }

  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name,
      completeTask: false,
    }
    const tempData = [...data,newItem]
    setData(tempData)
  },[data])

  const toggleComplete = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, completeTask: !item.completeTask } : item
    );
    setData(updatedData); 
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <Add add={add}/>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => ( 
        <Row 
          item={item}
          toggleComplete={toggleComplete}
         />)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
  }
});
