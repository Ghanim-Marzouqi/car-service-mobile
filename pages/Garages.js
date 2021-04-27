import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, FlatList } from "react-native";
import { Appbar, Button } from 'react-native-paper';

import { getAllGarages } from "../services/GaragesService";
import { getValueFor } from "../utils/StoreUtils";

const Item = ({ id, name }) => {
  const history = useHistory();
  return (
    <Button style={styles.listItem} onPress={() => history.push(`/user/booking/${id}`)}>
      {name}
    </Button>
  );
}

export default function Garages() {
  const history = useHistory();
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

  }, []);

  useEffect(() => {
    fetchAllGarages({ region_id: user.region_id, willayat_id: user.willayat_id });
  }, [user]);

  const fetchAllGarages = async (payload) => {
    const response = await getAllGarages(payload);

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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="List of Garages" />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={garages}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  listItem: {
    width: '100%',
    alignItems: 'flex-start'
  }
});