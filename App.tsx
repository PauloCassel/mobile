import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserContextProvider } from './src/contexts/UserContext';
import { Routes } from './src/routes';
import { RootSiblingParent } from 'react-native-root-siblings';
import { TaskContextProvider } from './src/contexts/TaskContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <UserContextProvider>
          <TaskContextProvider>
            <Routes />
          </TaskContextProvider>
        </UserContextProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});