import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Appbar, Button } from "react-native-paper";

import { getValueFor } from "../utils/StoreUtils";
import { getAllBookings, updateBooingStatus } from "../services/BookingsService";

const Item = ({ booking }) => {
  const history = useHistory();

  const handlePaymentButton = async (bookingId) => {
    const response = await updateBooingStatus(bookingId);

    if (response !== null) {
      if (response.status === "success") {
        alert(response.message);
        history.goBack();
      } else {
        alert(response.message);
      }
    } else {
      alert("Server Error");
    }
  }

  const getStatusComponent = (isConfirmed, isPaid, bookingId) => {
    if (isConfirmed === 1) {
      if (isPaid === 1) {
        return <Text style={{ fontSize: 15, fontWeight: "bold" }}>Paid</Text>
      } else {
        return (
          <Button mode="contained" onPress={() => handlePaymentButton(bookingId)}>
            Pay Now
          </Button>
        );
      }
    } else {
      return <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pending</Text>;
    }
  }

  return (
    <View style={styles.listItem}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date: {booking.booking_date.split(".")[0].replace("T", " ")}</Text>
        {getStatusComponent(booking.is_confirmed, booking.is_paid, booking.id)}
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