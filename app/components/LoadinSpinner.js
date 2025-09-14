import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
// import React from 'react';
// import Loader from '../../assets/loading.gif'
const LoadinSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={'gray'} style={styles.loader} size={100} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default LoadinSpinner;