import React, { useEffect } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import { Link , useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../redux/features/authSlice';

const Register = ()=>{
    const[username, setUserName]=useState("")
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigation = useNavigation()

    const dispatch = useDispatch();
    const {error, loading, user, success} = useSelector((state)=>state.auth)

    const handleRegister = ()=>{
        if (!email || !password || !username) {
            return Alert.alert("Warnig", " Please Enter EMail Or Password or username");
          }

          dispatch(register({username, email,password}))
          dispatch(reset());
    
    }

    useEffect(()=>{
      if(success){
        Alert.alert('Success', 'Registeration Success')
        setUserName("")
        setEmail("")
        setPassword("")
        navigation.navigate("Login")
      }
      if(error){
        Alert.alert("Error", error)
      }
      return()=>{
        dispatch(reset())
      }
    }, [success,error])
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Register</Text>
                <TextInput style={styles.input}
                 placeholder="enter email" 
                 keyboardType="email address"
                 value = {email}
                 onChangeText = {(text)=> setEmail(text)}
                 
                 />
                 <TextInput style={styles.input}
                 placeholder="enter username" 
            
                 value = {username}
                 onChangeText = {(text)=> setUserName(text)}
                 
                 />

                 <TextInput style={styles.input}
                 placeholder="enter password" 
                 secureTextEntry={true}
                 value = {password}
                 onChangeText = {(text)=> setPassword(text)}
                 />

                 <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.btnText}>REGISTER</Text>
                 </TouchableOpacity>

                 <Text style={{textAlign: "center"}}>Already  user? Clicked Here to
                    <Link screen={"Login"}> Login!</Link>
                 </Text>

            </View>
        </View>
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

export default Register;
