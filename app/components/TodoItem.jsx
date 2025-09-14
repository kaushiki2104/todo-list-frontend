import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TodoItem = ({item}) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("TodoDetails", { item:item });
    }

    return(
        <Pressable onPress={handlePress}>
            <View style={styles.card}>
                <Text style={styles.todoTitle}>{item?.title || "No Title"}</Text>
                <Text style={styles.todoDesc}>
                    {item.description?.substring(0, 150) || "No Description"}.....
                </Text>
            </View>
        </Pressable>
    );
}

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
});
export default TodoItem;
