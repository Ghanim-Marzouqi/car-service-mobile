import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-native";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Appbar, Button } from 'react-native-paper';

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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title={service.name} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.title}>Service Description</Text>
          <Text style={styles.content}>{service.description}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Service Price</Text>
          <Text style={styles.content}>{service.price} O.R</Text>
        </View>
        <Button style={styles.button} mode="contained" onPress={() => history.push("/user/garages")}>
          Select Service
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10
  },
  content: {
    padding: 10,
    fontSize: 15
  },
  button: {
    width: 250,
    marginTop: 20,
    alignSelf: 'center'
  }
});