import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import TodoList from "./screens/Todo/TodoList";
import TodoDetails from "./screens/Todo/TodoDetails";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { loadToken } from "./redux/features/authSlice";
import { loadAuth } from "./redux/features/authSlice";

import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

const RootRoutes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const init = async () => {
    try {
      console.log("init working");
      await dispatch(loadAuth());
    } catch (e) {
      console.log("loadAuth error:", e);
    } finally {
      setLoading(false);  
    }
  };
  init();
}, [dispatch]);


  if (loading) {
    // jab tak token load ho raha hai
    console.log("loading true", loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: true }}/>
          <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: true }} />
          <Stack.Screen name="TodoDetails" component={TodoDetails} options={{ headerShown: true }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootRoutes;
