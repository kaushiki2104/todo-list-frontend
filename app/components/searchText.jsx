import { View, TextInput, StyleSheet } from "react-native";


const SearchInput = ({ setSearchtext, searchtext }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search your todo "
        value={searchtext}
        onChangeText={(text) => setSearchtext(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    marginTop: 20,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#f9fad2ff",
    paddingLeft: 20,
    marginBottom: 10,
  },
});

export default SearchInput;