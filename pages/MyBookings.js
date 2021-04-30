import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Appbar, Button } from "react-native-paper";

import { getValueFor } from "../utils/StoreUtils";
import { getAllBookings, updateBooingStatus } from "../services/BookingsService";
import { sendEmail } from "../services/GeneralService";

const Item = ({ booking }) => {

  const getBookingStatus = (status) => {
    if (status) {
      if (status === "P") {
        return <Text style={{ fontSize: 15, color: 'orange' }}>Pending</Text>;
      } else if (status === "C") {
        return <Text style={{ fontSize: 15, color: 'green' }}>Confirmed</Text>;
      } else if (status === "R") {
        return <Text style={{ fontSize: 15, color: 'red' }}>Rejected</Text>;
      }
    } else {
      return "Unknown";
    }
  }

  return (
    <View style={styles.listItem}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date: {booking.booking_date.split(".")[0].replace("T", " ")}</Text>
        <Text style={{ fontSize: 15 }}>{getBookingStatus(booking.status)}</Text>
      </View>
    </View>
  );
}

export default function MyBookings() {
  const history = useHistory();
  const [bookings, setBookins] = useState([]);
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
    const fetchAllBookingsByCustomerId = async (userId) => {
      const response = await getAllBookings(userId);

      if (response !== null) {
        if (response.status == "success") {
          setBookins(response.data);
        } else {
          alert(response.message);
        }
      } else {
        alert("Server Error");
      }
    }

    fetchAllBookingsByCustomerId(user.id);
  }, [user]);

  const renderItem = ({ item }) => <Item booking={item} />;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="My Bookings" />
      </Appbar.Header>
      <View style={styles.container}>
        <FlatList
          data={bookings}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    flexDirection: "column"
  }
});