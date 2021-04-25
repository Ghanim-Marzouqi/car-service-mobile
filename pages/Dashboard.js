import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

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
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Ionicons name="person-circle-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold" }}>Welcome, {user.name}</Text>
        <AntDesign name="logout" size={24} color="black" onPress={logoutButtonHandler} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => history.push("/user/services")}>
          <Text style={{ color: 'white' }}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => history.push("/user/my-bookings")}>
          <Text style={{ color: 'white' }}>My Bookings</Text>
        </TouchableOpacity>
      </View>
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%'
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 250,
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10
  }
});