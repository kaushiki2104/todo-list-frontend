import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
   KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../redux/features/todoSlice";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native';

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const navigation = useNavigation(); 
  const dispatch = useDispatch()
  // const {error,loading} = useSelector(state=>state.todo)
  // const { error, loading, success } = useSelector(state => state.todo)
  const { success, loading, error, todos } = useSelector((state) => state.todo)
  const {user} = useSelector(state=>state.auth)



const [openCaterogy, setOpenCategory] = useState(false);
  const [catgoryValue, setCategoryValue] = useState('General');
  const [categoryItems, setCategoryItems] = useState([
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
  
  ]);
const [dueDate, setDueDate] = useState(new Date());
 const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // hide picker after selection (Android)
    console.log('selected date ', selectedDate)
    if (selectedDate) setDueDate(selectedDate);
  };



  const handleCreate = () => {
    if (todoTitle.trim() === "" || todoDesc.trim() === "") {
      return Alert.alert("Warning", "Please add todo title or description");
    }

    console.log('data',todoTitle,todoDesc,catgoryValue)
    try {
  dispatch(createTodo({title:todoTitle,description:todoDesc,category:catgoryValue,dueDate:dueDate.toISOString(), createdBy:user?.id})).unwrap(); 

    Alert.alert("Success", "Todo Created!");
    setTodoTitle("");
    setTodoDesc("");
    setCategoryValue("Low")
    navigation.navigate("Home", { screen: "TodoList" });
    }catch (error){
    Alert.alert("Faild", error);
    }


  };

  useEffect(() => {
  
}, [success, error]);

    return(
     <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
  <View style={styles.formContainer}>
    <Text style={styles.title}>Create a Todo</Text>
    <TextInput
      placeholder="enter todo title"
      style={styles.input}
      value={todoTitle}
      onChangeText={setTodoTitle}
    />
    <TextInput
      placeholder="enter todo description"
      style={styles.inputDesc}
      value={todoDesc}
      onChangeText={setTodoDesc}
      multiline
      numberOfLines={10}
    />


    <View style={{ marginVertical: 10 }}>
        <Button
          title={`Select Due Date: ${dueDate.toLocaleDateString()}`}
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

    <DropDownPicker
      open={openCaterogy}
      value={catgoryValue}
      items={categoryItems}
      setOpen={setOpenCategory}
      setValue={(callback) => {
    setCategoryValue(callback(catgoryValue)); // ✅ ensures string
  }}
      setItems={setCategoryItems}
      placeholder="Select One"
      style={styles.dropdown}
    />

    <TouchableOpacity style={styles.btn} onPress={handleCreate}>
      <Text style={styles.btnText}>CREATE</Text>
    </TouchableOpacity>
  </View>
</KeyboardAvoidingView>

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
      dropdown: {
    width: "90%",
    justifyContent: "center",
    marginLeft: 25,
    marginVertical: 20,
    // marginBottom: 15 ,
  },
  });

export default AddTodo