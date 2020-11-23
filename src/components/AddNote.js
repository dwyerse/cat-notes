import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB, TextInput} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import Cats from './Cats';
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const AddNote = ({route}) => {
  const navigation = useNavigation();
  let params = route.params;
  console.log(params);
  let currentParam = params ? params.current : '';
  const [value, onChangeText] = useState(currentParam);
  let keyParam = params ? route.params.key : '';

  if (!keyParam || keyParam == '') {
    keyParam = uuidv4();
  }

  const [cat, setCat] = useState(1);

  useEffect(() => {
    console.log('Start');
    setCat(params.cat ? params.cat : getRandomInt(1, 9));
  }, []);

  const [key, setKey] = useState(keyParam);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          bottom: 0,
        }}>
        <LottieView
          style={{opacity: 0.5, flex: 1}}
          resizeMode="cover"
          source={Cats['cats' + cat]}
          autoPlay
          loop
        />
      </View>

      <TextInput
        style={styles.textInput}
        autoFocus={true}
        autoCorrect={false}
        multiline={true}
        numberOfLines={10}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        value={value}
      />
      <FAB
        style={styles.fab}
        icon="check"
        onPress={() => {
          console.log(value);
          if (value && value.trim() !== '') {
            setStringValue(key, value, cat);
            route.params.reload();
          }
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

const setStringValue = async (key, value, cat) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify({
        value: value,
        cat: cat,
        date: moment(),
      }),
    );
  } catch (e) {
    // save error
  }
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontWeight: '200',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
    backgroundColor: '#427efe',
    zIndex: 2,
  },
});

export default AddNote;
