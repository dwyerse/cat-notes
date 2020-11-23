import React from 'react';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';

const Credits = () => {
  return (
    <SafeAreaView>
      <View style={{margin: 32}}>
        <Text style={styles.credit}>{'Source code on github'}</Text>
        <Text style={styles.credit}>
          {'Radhikakpor on LottieFiles https://lottiefiles.com/16778-cat2'}
        </Text>
        <Text style={styles.credit}>
          {'Quix on LottieFiles https://lottiefiles.com/8874-cat'}
        </Text>
        <Text style={styles.credit}>
          {
            'Thrive.io on LottieFiles https://lottiefiles.com/6890-cat-agent-007'
          }
        </Text>
        <Text style={styles.credit}>
          {'NorthSea on LottieFiles https://lottiefiles.com/8175-catcoffee'}
        </Text>
        <Text style={styles.credit}>
          {'NorthSea on LottieFiles https://lottiefiles.com/8175-catcoffee'}
        </Text>
        <Text style={styles.credit}>
          {'Issey on LottieFiles https://lottiefiles.com/4889-cat'}
        </Text>
        <Text style={styles.credit}>
          {'Mishal N. on LottieFiles https://lottiefiles.com/38910-cat-escape'}
        </Text>
        <Text style={styles.credit}>
          {
            'Mr. Lonely on LottieFiles https://lottiefiles.com/36413-cat-loading'
          }
        </Text>
        <Text style={styles.credit}>
          {'Julio on LottieFiles https://lottiefiles.com/29178-cat-in-box'}
        </Text>
        <Text style={styles.credit}>
          {
            'Icons made by "https://www.flaticon.com/authors/freepik" Freepik from www.flaticon.com'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  credit: {
    margin: 4,
    fontWeight: '700',
  },
});

export default Credits;
