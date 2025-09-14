// import React from "react";
// import { View, Button, StyleSheet } from "react-native";

// const FilterBar = ({ filterType, setFilterType }) => {
//   return (
//     <View style={styles.container}>
//       <Button 
//         title="All" 
//         onPress={() => setFilterType("all")} 
//         color={filterType === "all" ? "#007AFF" : "gray"} 
//       />
//       <Button 
//         title="Priority" 
//         onPress={() => setFilterType("priority")} 
//         color={filterType === "priority" ? "#007AFF" : "gray"} 
//       />
//       <Button 
//         title="Deadline" 
//         onPress={() => setFilterType("dueDate")} 
//         color={filterType === "dueDate" ? "#007AFF" : "gray"} 
//       />
//       <Button 
//         title="Created" 
//         onPress={() => setFilterType("createdAt")} 
//         color={filterType === "createdAt" ? "#007AFF" : "gray"} 
//       />
//     </View>
//   );
// };

// export default FilterBar;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 10
//   }
// });
// components/FilterBar.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FilterBar = ({ filterType, setFilterType }) => {
  const filters = [
    { key: "all", label: "All" },
    { key: "priority", label: "Priority" },
    { key: "dueDate", label: "Deadline" },
    { key: "createdAt", label: "Created" },
  ];

  return (
    <View style={styles.container}>
      {filters.map((f) => {
        const active = filterType === f.key;
        return (
          <TouchableOpacity
            key={f.key}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => setFilterType(f.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
    minWidth: 80,
    alignItems: "center",
  },
  btnActive: {
    backgroundColor: "#007AFF",
    elevation: 2,
  },
  text: {
    color: "#333",
    fontWeight: "600",
  },
  textActive: {
    color: "#fff",
  },
});
