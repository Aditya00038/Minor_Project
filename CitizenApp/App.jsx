import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from './src/screens/CustomHeader'; // adjust path if needed
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chatbot from './src/screens/Chatbot';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Dashboard from './src/screens/Dashboard';
import ReportProblem from './src/screens/ReportProblem';
import MyReports from './src/screens/MyReports';
import ReportDetails from './src/screens/ReportDetails';
import BeforeAfter from './src/screens/BeforeAfter';
import RateFeedback from './src/screens/RateFeedback';
import Profile from './src/screens/Profile';
import Leaderboard from './src/screens/Leaderboard';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ffffff96',
        tabBarStyle: {
          height: 80,
          // paddingBottom: 5,
          paddingTop: 15,
          backgroundColor: '#4A90E2',
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/home.png' }} style={{ width: 25, height: 25, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarLabel: 'Chatbot',
          tabBarIcon: ({ color, size }) => (
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1380/1380370.png' }} style={{ width: 25, height: 25, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({ color, size }) => (
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/plus-math.png' }} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="MyReports"
        component={MyReports}
        options={{
          tabBarLabel: 'My Reports',
          tabBarIcon: ({ color, size }) => (
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/group.png' }} style={{ width: 25, height: 25, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/trophy.png' }} style={{ width: 25, height: 25, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          header: () => <CustomHeader />, // Use your custom header everywhere
        }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="ReportProblem" component={ReportProblem} />
            <Stack.Screen name="ReportDetails" component={ReportDetails} />
            <Stack.Screen name="BeforeAfter" component={BeforeAfter} />
            <Stack.Screen name="RateFeedback" component={RateFeedback} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default App;