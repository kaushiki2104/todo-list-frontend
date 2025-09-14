import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../redux/features/todoSlice";
import Home from "../Home";

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const navigation = useNavigation(); 
  const dispatch = useDispatch()
  // const {error,loading} = useSelector(state=>state.todo)
  // const { error, loading, success } = useSelector(state => state.todo)
  const { success, loading, error, todos } = useSelector((state) => state.todo)


  const {user} = useSelector(state=>state.auth)
  const handleCreate = () => {
    if (todoTitle.trim() === "" || todoDesc.trim() === "") {
      return Alert.alert("Warning", "Please add todo title or description");
    }

    try {
    dispatch(createTodo({title:todoTitle,description:todoDesc, createdBy:user?.id})).unwrap(); 

    Alert.alert("Success", "Todo Created!");
    setTodoTitle("");
    setTodoDesc("");
    navigation.navigate("Home", { screen: "TodoList" });
    }catch (error){
    Alert.alert("Faild", error);
    }


  };

  useEffect(() => {
  
}, [success, error]);

    return(
        <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create a Todo</Text>
        <TextInput
          placeholder="enter todo title"
          style={styles.input}
          value={todoTitle}
          onChangeText={(text) => setTodoTitle(text)}
        />
        <TextInput
          placeholder="enter todo description"
          style={styles.inputDesc}
          value={todoDesc}
          onChangeText={(text) => setTodoDesc(text)}
          multiline
          numberOfLines={10}
        />
        <TouchableOpacity style={styles.btn} onPress={handleCreate} >
          <Text style={styles.btnText}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    )
}


const styles = StyleSheet.create({
    formContainer: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 30,
    },
    title: {
      fontSize: 20,
      marginTop: 100,
      color: "#627594",
      fontWeight: "500",
      textTransform: "uppercase",
    },
    input: {
      borderWidth: 1,
      borderColor: "lightgray",
      borderRadius: 5,
      width: "90%",
      marginVertical: 15,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
    },
    inputDesc: {
      borderWidth: 1,
      borderColor: "lightgray",
      borderRadius: 5,
      width: "90%",
      marginVertical: 15,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      minHeight: 200,
    },
    btn: {
      backgroundColor: "#252f40",
      width: "90%",
      height: 50,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 15,
    },
    btnText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "500",
    },
  });

export default AddTodo