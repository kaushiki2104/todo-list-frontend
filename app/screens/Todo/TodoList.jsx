import { View, FlatList,StyleSheet,TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from 'react';
import TodoItem from "../../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodos } from "../../redux/features/todoSlice";
import SearchInput from "../../components/searchText";
import FilterBar from "../../components/FilterBar";
const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state.todo);
  const [searchtext, setSearchtext] = useState("");
  const [filterType, setFilterType] = useState("all");
const priorityOrder = { High: 1, Medium: 2, Low: 3 };



 useEffect(()=>{},[])
  useEffect(() => {
   
    const fetchTodos = async () => {
      try {
        const storeUserId = await AsyncStorage.getItem("userId");
        if (storeUserId) {
          dispatch(getTodos(storeUserId)); 
        }
      } catch (error) {
        console.log("Error While Getting user id", error);
      }
    };
    fetchTodos();
  }, [dispatch]);


  // Processing Todos
  let displayedTodos = [...(todos || [])];

  // Search filter
  // if (searchtext) {
  //   console.log('search text')
  //   displayedTodos = displayedTodos.filter((todoItem) =>
  //     todoItem.title.toLowerCase().includes(searchtext.toLowerCase())
  //   );
  // }

  // // Sorting/Filtering
  // if (filterType === "priority") {
  //   const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  //   console.log('priority work ')
  //   displayedTodos.sort((a, b) =>
  //     (priorityOrder[a.category] || 99) - (priorityOrder[b.category] || 99)
  //   );
  // } else if (filterType === "dueDate") {
  //   console.log('dedline')
  //   displayedTodos.sort((a, b) =>
  //     new Date(a.dueDate) - new Date(b.dueDate)
  //   );
  // } else if (filterType === "createdAt") {
  //   console.log('created');
    
  //   displayedTodos.sort((a, b) =>
  //     new Date(b.createdAt) - new Date(a.createdAt)
  //   );
  // }


  const filteredTodos = todos
    ?.filter((todoItem) =>
      searchtext
        ? todoItem.title.toLowerCase().includes(searchtext.toLowerCase())
        : true
    )
    ?.sort((a, b) => {
      if (filterType === "priority") {
        return priorityOrder[a.category] - priorityOrder[b.category];
      } else if (filterType === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (filterType === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0; // all
    });




  return (

 <View style={{ flex: 1 }}>
  <SearchInput searchtext={searchtext} setSearchtext={setSearchtext} />
      <FilterBar filterType={filterType} setFilterType={setFilterType} />

  {/* If no todos */}
      {filteredTodos?.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Data Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item, index) =>
            (item?.id || item?._id || index).toString()
          }
          renderItem={({ item }) => <TodoItem item={item} />}
        />
      )}



    {/* <FlatList
      data={displayedTodos}
      keyExtractor={(item, index) => (item?.id || item?._id || index).toString()}
      renderItem={({ item }) => <TodoItem item={item} />}
    />  */}
</View>
) 

};

// const styles = StyleSheet.create({
//   filterRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 10,
//   },
//   filterBtn: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 6,
//     backgroundColor: "#ddd",
//   },
//   activeBtn: {
//     backgroundColor: "blue",
//   },
//   filterText: {
//     color: "#333",
//     fontWeight: "600",
//   },
//   activeText: {
//     color: "#fff",
//   },
// });

export default TodoList;


const styles = StyleSheet.create({
   container: { flex: 1, paddingHorizontal: 10 },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "500",
  },
});