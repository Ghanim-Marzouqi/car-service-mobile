import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from "react-native";

const Item = ({ id, name }) => {
  const history = useHistory();
  return (
    <TouchableOpacity style={styles.item} onPress={() => history.push(`/user/booking/${id}`)}>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function Booking() {
  return (
    <View style={styles.container}>
      <Text>Booking Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});