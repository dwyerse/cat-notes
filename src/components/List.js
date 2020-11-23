import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet, View, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './ListItem';
import LottieView from 'lottie-react-native';

const List = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllKeys();
  }, []);

  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      values.sort((a, b) => {
        const oA = JSON.parse(a[1]);
        const oB = JSON.parse(b[1]);
        return oA.date < oB.date;
      });
      setData(values);
    } catch (e) {
      // read key error
    }
  };

  const deleteItem = async (key) => {
    try {
      let newValues = [];
      for (let item of data) {
        console.log(item);
        if (item[0] != key) {
          newValues.push(item);
        }
      }
      setData(newValues);
      await AsyncStorage.removeItem(key);
      await getAllKeys();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: -40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 200,
            width: 200,
            marginRight: -40,
            marginLeft: -40,
          }}>
          <LottieView
            resizeMode="cover"
            source={require('../assets/cat1.json')}
            autoPlay
            loop
          />
        </View>
        <View>
          <Text style={{fontWeight: '200', fontSize: 20}}>{'Cat Notes'}</Text>
        </View>
      </View>
      <FlatList
        style={{flex: 1}}
        data={data}
        bounces={true}
        renderItem={(item) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            reload={() => getAllKeys()}
          />
        )}
        keyExtractor={(item, _) => item[0]}
      />
      <Text
        style={styles.credits}
        onPress={() => navigation.navigate('Credits')}>
        {'Credits'}
      </Text>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() =>
          navigation.navigate('Add Note', {reload: () => getAllKeys()})
        }
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 0.9,
    margin: 16,
    fontSize: 14,
    color: '#515151',
  },
  mainImage: {
    width: '25%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#427efe',
  },
  credits: {
    color: '#427efe',
    padding: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
