import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from "react-native";

import { getAllGarages } from "../services/GaragesService";
import { getValueFor } from "../utils/StoreUtils";

const Item = ({ id, name }) => {
  const history = useHistory();
  return (
    <TouchableOpacity style={styles.item} onPress={() => history.push(`/user/service-details/${id}`)}>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function Garages() {
  const [garages, setGarages] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    name: "Unknown",
    email: "",
    phone: "",
    username: "",
    password: "",
    region_id: "",
    willayat_id: ""
  });

  useEffect(() => {
    const loadUser = async () => {
      const result = await getValueFor("USER");

      if (result !== null) {
        setUser(JSON.parse(result));
      }
    }

    loadUser();
    fetchAllGarages({ region_id: user.region_id, willayat_id: user.willayat_id });
  }, []);

  const fetchAllGarages = async (payload) => {
    const response = await getAllGarages(payload);
    console.log(response);

    if (response !== null) {
      if (response.status === "success") {
        setGarages(response.data);
      } else {
        alert(response.message);
      }
    } else {
      alert("Server Error");
    }
  }

  const renderItem = ({ item }) => <Item id={item.id} name={item.name} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>List of Garages</Text>
      <FlatList
        data={garages}
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