import React from 'react';
import {DefaultTheme, Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddNote from './src/components/AddNote';
import List from './src/components/List';
import Credits from './src/components/Credits';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Notes"
            component={List}
            options={{header: () => null}}
          />
          <Stack.Screen name="Add Note" component={AddNote} />
          <Stack.Screen name="Credits" component={Credits} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
