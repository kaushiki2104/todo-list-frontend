import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const SearchInput = ({ setSearchText, searchText }) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder='Search your todo'
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={styles.input}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        width: '90%',
        backgroundColor: '#fff9e5fd',
        paddingLeft: 20,
        borderRadius: 10,
    }

});
export default SearchInput;