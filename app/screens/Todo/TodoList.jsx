import { View, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';
import TodoItem from "../../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodos } from "../../redux/features/todoSlice";
import SearchInput from "../../components/searchText";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state.todo);
  const [searchText, setSearchText]= useState('')



 useEffect(()=>{},[])
  useEffect(() => {
   
    const fetchTodos = async () => {
      try {
        const storeUserId = await AsyncStorage.getItem("userId");
        if (storeUserId) {
          dispatch(getTodos(storeUserId)); // fetch on mount
          console.log('get list ')
        }
      } catch (error) {
        console.log("Error While Getting user id", error);
      }
    };
    fetchTodos();
  }, [dispatch]);

  return (

    <View style={{ flex: 1 }}>
      {/* <SearchInput searchText={searchText} setSearchText={setSearchText}/> */}
      <FlatList
        data={todos || []}
        keyExtractor={(item, index) => (item?.id || item?._id || index).toString()}
        renderItem={({ item }) => <TodoItem item={item} />}
      />
    </View>
  );
};

export default TodoList;
