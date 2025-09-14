import React from 'react'
import { View, Text, StyleSheet,Image, TouchableOpacity} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector } from 'react-redux';
const Welcome = ()=>{
  const {user} = useSelector(state=>state.auth);
  console.log('userdata',user)
    return(
        <View style={styles.container}>
            <Text  style={styles.todoTitle}>Todo App</Text>
            <View style={styles.textContainer}>
                <Text style={styles.greeting}>
                    Welcome
                    <Text style={{ color: "#252f40" }}>{user?.username}</Text>
                </Text>
                <Text style={styles.para}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio inventore, harum voluptates eius similique sequi rerum iure blanditiis doloremque possimus dicta animi, dolorem molestias maxime est?</Text>
                <Image source={require('../../assets/todo.png')}  style={styles.taskImg}/>
                <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>
            create a todo
            <MaterialIcons name="add" />
          </Text>
        </TouchableOpacity>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    todoTitle: {
        fontSize: 25,
        backgroundColor: "#252f40",
        paddingVertical: 20,
        color: "#fff",
        textAlign: "center",
        width: "100%",
        fontWeight: "700",
      },
      textContainer: {
        marginTop: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      greeting: {
        color: "#000",
        fontSize: 25,
        marginVertical: 10,
        fontStyle: "italic",
      },
      para: {
        fontSize: 14,
        textAlign: "justify",
        paddingHorizontal: 20,
        color: "#768194ff",
      },
      taskImg: {
        height: 300,
        width: "100%",
        backgroundColor: "transprent",
      },
      btn: {
        marginTop: 20,
        backgroundColor: "#627594",
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 5,
      },
      btnText: {
        color: "#fff",
      },
});


export default Welcome;