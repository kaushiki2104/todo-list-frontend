import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TodoItem = ({ item }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("TodoDetails", { item: item });
  };
  //  console.log("item are ", item)
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.todoTitle}>{item?.title || "No Title"}</Text>
            <Text style={styles.todoCategory}>
              {" "}
              ({item?.category || "General"})
            </Text>
          </View>
          <View style={{flexDirection:"row"}}>
             <Text style={styles.todoDate}>
            {item?.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : ""}
          </Text> 
             <Text style={styles.todoDate}>
              {" - "}
            {item?.dueDate ? new Date(item.dueDate).toLocaleDateString() : ""}
          </Text> 
          </View>
         
        </View>

        <View style={styles.row}>
          <Text style={styles.todoDesc}>
            {item.description?.substring(0, 150) || "No Description"}.....
          </Text>
          <Text style={styles.todoStatus}>
            {item.isCompleted ? "Completed ✅" : "Pending ⏳"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 15,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoTitle: {
    fontWeight: "700",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  todoDesc: {
    color: "gray",
    textAlign: "justify",
  },
  todoDate: {
    color: "gray",
    fontSize: 12,
  },
  todoStatus: {
    color: "green",
    fontWeight: "600",
    marginLeft: 10,
  },
  todoCategory: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
});
export default TodoItem;
