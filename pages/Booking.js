import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-native";
import { StyleSheet, View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

import { getValueFor } from "../utils/StoreUtils";
import { getGarageById } from "../services/GaragesService";
import { createBooking } from "../services/BookingsService";

export default function Booking() {
  const history = useHistory();
  const { id } = useParams();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
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
  const [garage, setGarage] = useState({
    id: "",
    name: "",
    description: "",
    owner_id: "",
    service_id: "",
    region_id: "",
    willayat_id: "",
    owner_name: "",
    service_name: "",
    service_price: "",
    region_name: "",
    willayat_name: ""
  });

  useEffect(() => {
    const fetchGarageById = async () => {
      const response = await getGarageById(id);

      if (response !== null) {
        if (response.status === "success") {
          setGarage(response.data);
        } else {
          alert(response.message);
        }
      } else {
        alert("Server Error");
      }
    }

    fetchGarageById();
  }, [id]);

  useEffect(() => {
    const loadUser = async () => {
      const result = await getValueFor("USER");

      if (result !== null) {
        setUser(JSON.parse(result));
      }
    }

    loadUser();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleBookButton = async () => {
    const newDate = new Date(date.setHours(date.getHours() + 4)).toISOString().split(".")[0].replace("T", " ");

    const response = await createBooking({
      booking_date: newDate,
      user_id: user.id,
      service_id: garage.service_id,
      garage_id: garage.id
    });

    if (response !== null) {
      if (response.status === "success") {
        alert(response.message);
        history.replace("/user");
      } else {
        alert(response.message);
      }
    } else {
      alert("Server Error");
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="Booking Details" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Service Name</Text>
          <Text style={styles.content}>{garage.service_name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Service Price</Text>
          <Text style={styles.content}>{garage.service_price} O.R</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Garage Name</Text>
          <Text style={styles.content}>{garage.name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Garage Owner</Text>
          <Text style={styles.content}>{garage.owner_name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Please Select Date and Time:</Text>
          <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
            <Button style={{ width: 150 }} mode="contained" onPress={showDatepicker}>
              Select Date
            </Button>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>{date.toDateString()}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Button style={{ width: 150 }} mode="contained" onPress={showTimepicker}>
              Select Time
            </Button>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>{date.toLocaleTimeString()}</Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Button mode="contained" onPress={handleBookButton}>
              Book Now
            </Button>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            timeZoneOffsetInSeconds={14400}
            onChange={onChange}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  contentContainer: {
    flexDirection: 'column',
    marginBottom: 10
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  content: {
    fontSize: 15
  }
});