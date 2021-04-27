import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text } from "react-native";
import { Appbar, Button } from 'react-native-paper';

import { getValueFor, remove } from "../utils/StoreUtils";

export default function Dashboard() {
  const history = useHistory();
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

  const logoutButtonHandler = async () => {
    await (remove("USER"));
    history.replace("/auth");
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Dashboard" />
        <Appbar.Action icon="logout" onPress={logoutButtonHandler} />
      </Appbar.Header>
      <View>
        <View style={styles.userContainer}>
          <Text style={{ fontSize: 20 }}>Welcome, </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} mode="contained" onPress={() => history.push("/user/services")}>
            Services
          </Button>
          <Button style={styles.button} mode="contained" onPress={() => history.push("/user/my-bookings")}>
            My Bookings
          </Button>
        </View>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    flexDirection: "row",
    padding: 5
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
  },
  button: {
    width: 250,
    marginTop: 10
  }
});