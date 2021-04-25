import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-native";
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";

import { getServiceById } from "../services/ServicesService";

export default function ServiceDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [service, setService] = useState({});

  useEffect(() => {
    fetchServiceById(id);
  }, []);

  const fetchServiceById = async (id) => {
    const response = await getServiceById({ id });

    if (response !== null) {
      if (response.status === "success") {
        setService(response.data);
      } else {
        alert(response.message);
        history.goBack();
      }
    } else {
      alert("Server Error");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Service Details Page</Text>
      </View>
      <Text style={styles.serviceTitle}>Service Name: {service.name}</Text>
      <Text style={styles.serviceDesc}>{service.description}</Text>
      <Text style={styles.servicePrice}>Service Price: {service.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => history.push("/user/garages")}>
        <Text style={{ color: 'white' }}>Select Service</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  titleContainer: {
    alignSelf: "center",
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  serviceTitle: {
    fontSize: 15,
    padding: 10
  },
  serviceDesc: {
    fontSize: 15,
    padding: 10
  },
  servicePrice: {
    fontSize: 15,
    padding: 10
  },
  button: {
    width: 250,
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    alignSelf: "center"
  }
});