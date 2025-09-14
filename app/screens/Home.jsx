import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./Welcome";
import AddTodo from "./Todo/AddTodo";
import TodoList from "./Todo/TodoList";
import Logout from "./Logout";
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: '#8392ab',
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#027594',
        tabBarStyle: { backgroundColor: '#252f40' },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Welcome"
        component={Welcome}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? "#fff" : "#8392ab"} />
          ),
        }} 
      />
      <Tab.Screen 
        name="AddTodo" 
        component={AddTodo} 
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="add-task" size={24} color={focused ? "#fff" : "#8392ab"} />
          ),
        }} 
      />
      <Tab.Screen 
        name="TodoList"
        component={TodoList} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="list" size={24} color={focused ? "#fff" : "#8392ab"} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Logout" 
        component={Logout} 
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="logout" size={24} color={focused ? "#fff" : "#8392ab"} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default Home;
