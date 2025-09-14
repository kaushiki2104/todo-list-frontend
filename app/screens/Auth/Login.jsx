import React, { useEffect } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import { Link } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../redux/features/authSlice';
import LoadinSpinner from '../../components/LoadinSpinner';

const Login = ()=>{
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")

     const dispatch = useDispatch();
    const {error, loading, user, success} = useSelector((state)=>state.auth)

    const handleLogin = () => {
  if (!email || !password) {
    return Alert.alert("Warning", "Please Enter Email or Password");
  }

  dispatch(login({ email, password })) 
  dispatch(reset())
};

      useEffect(()=>{
          if(success){
           
            setEmail("")
            setPassword("")
          
          }
          if(error){
            Alert.alert("Error", error)
          }
          return()=>{
            dispatch(reset())
          }
        }, [success,error])
    return(
      <>
    {loading ? ( <LoadinSpinner />) : (
         <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Todo App Login</Text>
                <TextInput style={styles.input}
                 placeholder="enter email" 
                 keyboardType="email address"
                 value = {email}
                 onChangeText = {(text)=> setEmail(text)}
                 
                 />

                 <TextInput style={styles.input}
                 placeholder="enter password" 
                 secureTextEntry={true}
                 value = {password}
                 onChangeText = {(text)=> setPassword(text)}
                 />

                 <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.btnText}>LOGIN</Text>
                 </TouchableOpacity>

                 <Text style={{textAlign: "center"}}>Not a user? Click Here
                                     <Link screen={"Register"}> !</Link>
                                  </Text>

            </View>
        </View>
    )}

     
    
      </>
       
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgray",
    },
    card: {
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        width: "90%",
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 30,
        paddingHorizontal: 20,
        textAlign: "center",
        paddingVertical: 10,
      },
      input: {
        borderBottomWidth: 1,
        marginTop: 20,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 10,
      },
      btn: {
        backgroundColor: "#000",
        alignItems: "center",
        padding: 10,
        marginVertical: 30,
        justifyContent: "center",
        borderRadius: 10,
      },
      btnText: {
        color: "#ffff",
        fontSize: 18,
      },
    
});

export default Login;