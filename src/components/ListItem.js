import React, {useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import Cats from './Cats';
const ListItem = React.memo(({item, deleteItem, reload}) => {
  const navigation = useNavigation();
  const anim = useRef(new Animated.Value(1)).current;
  const object = JSON.parse(item.item[1]);
  const text = object.value;
  const date = object.date;
  const cat = object.cat;

  const remove = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        console.log('Done');
        deleteItem(item.item[0]);
      }
    });
  };
  return (
    <Animated.View
      style={
        ({opacity: anim},
        {
          transform: [{scale: anim}],
        },
        {
          height: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 90],
          }),
        })
      }>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('Add Note', {
            current: text,
            cat: cat,
            key: item.item[0],
            reload: reload,
          })
        }
        onLongPress={() => {
          Alert.alert(
            'Remove note?',
            'Do you want to remove this note?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => remove()},
            ],
            {cancelable: false},
          );
        }}>
        <View style={styles.textContainer}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{...styles.title, opacity: anim}}>
            {text && text.replace(/(\r\n|\n|\r)/gm, '')}
          </Animated.Text>
        </View>
        <Animated.View style={{height: '100%'}}>
          <LottieView
            style={{width: 50, height: 50}}
            resizeMode="cover"
            source={Cats['cats' + cat]}
            loop
            progress={0.5}
          />
        </Animated.View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.time}>
            {moment(date).format('HH:mm')}
          </Animated.Text>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.date}>
            {moment(date).fromNow()}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: '400',
  },
  delete: {
    padding: 8,
    backgroundColor: '#427fff',
    borderRadius: 50,
  },
  time: {
    padding: 8,
    fontSize: 14,
    color: 'gray',
    fontWeight: '300',
  },
  date: {
    padding: 8,
    fontSize: 14,
    color: 'gray',
    fontWeight: '300',
  },
  subtitle: {padding: 8, fontSize: 14, fontWeight: '400'},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});

export default ListItem;
