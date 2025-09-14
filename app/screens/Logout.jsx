import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({navigation})=>{
  const dispatch = useDispatch()

    const handleCancel = () => {
        navigation.navigate("TodoList");
        
      };

      const handleLogout = () => {
        Alert.alert("Success", "your Logout Successfully");
        dispatch(logout());
        AsyncStorage.removeItem("token");
        // navigation.navigate("TodoList")
      };
    return(
        <View style={styles.container}>
        <FontAwesome5 name="user-cog" size={100} color="black" />
        <Text style={{ marginVertical: 20 }}>Are you Sure Want to logout ?</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleCancel}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
    


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    btnContainer: {
      flexDirection: "row",
      margin: 10,
    },
    btn: {
      backgroundColor: "#252f40",
      width: 80,
      alignItems: "center",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 15,
    },
    btnText: {
      color: "#fff",
    },
    btnLogout: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 15,
    },
  });


export default Logout;