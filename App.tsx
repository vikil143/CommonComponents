/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/routes';
import {RootContext} from './src/context';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <GestureHandlerRootView style={[styles.container]}>
        <View style={[styles.container]}>
          <StatusBar barStyle={'light-content'} />
          <RootContext>
            <Navigator />
          </RootContext>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
