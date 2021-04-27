import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, FlatList } from "react-native";
import { Appbar, Button } from 'react-native-paper';

import { getAllServices } from "../services/ServicesService";

const Item = ({ id, name }) => {
  const history = useHistory();
  return (
    <Button style={styles.listItem} mode="text" onPress={() => history.push(`/user/service-details/${id}`)}>
      {name}
    </Button>
  );
}

export default function Services() {
  const history = useHistory();
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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="List of Services" />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={services}
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