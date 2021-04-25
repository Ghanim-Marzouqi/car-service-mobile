import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from "react-native";

import { getAllServices } from "../services/ServicesService";

const Item = ({ id, name }) => {
  const history = useHistory();
  return (
    <TouchableOpacity style={styles.item} onPress={() => history.push(`/user/service-details/${id}`)}>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const renderItem = ({ item }) => <Item id={item.id} name={item.name} />;

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    const response = await getAllServices();

    if (response !== null) {
      if (response.status === "success") {
        setServices(response.data);
      }
    } else {
      alert("Server Error");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>List of Services</Text>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#007bff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  pageTitle: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  }
});