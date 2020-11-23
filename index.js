/**
 * @format
 */
import 'react-native-get-random-values';
import 'react-native-gesture-handler';

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
