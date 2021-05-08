import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dropdown } from 'sharingan-rn-modal-dropdown';

import Logo from "../assets/icon.png";
import { createUser } from "../services/AuthService";
import { getRegions, getWillayats } from "../services/GeneralService";

export const data = [
  {
    value: '1',
    label: 'Tiger Nixon'
  },
  {
    value: '2',
    label: 'Garrett Winters'
  },
  {
    value: '3',
    label: 'Ashton Cox'
  },
  {
    value: '4',
    label: 'Cedric Kelly'
  },
];

export default function Registration() {
  const [regions, setRegions] = useState([]);
  const [willayats, setWillayats] = useState([]);
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    user_type: "CUSTOMER",
    region_id: "1",
    willayat_id: "1"
  });

  useEffect(() => {
    const fetchAllRegions = async () => {
      const response = await getRegions();

      if (response !== null) {
        setRegions(response.data.map(el => ({ value: el.id, label: el.name })));
      } else {
        alert("Server Error");
      }
    }

    fetchAllRegions();
  }, []);

  const regionChangeHandler = async (regionId) => {
    if (regionId) {
      setForm({ ...form, region_id: regionId });
      fetchAllWillayatsByRegionId(regionId);
    }
  }

  const fetchAllWillayatsByRegionId = async (id) => {
    const response = await getWillayats({ id });

    if (response !== null) {
      setWillayats(response.data.map(el => ({ value: el.id, label: el.name })));
    } else {
      alert("Server Error");
    }
  }

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const registerButtonHandler = async () => {

    if (!form.name || form.name === "") {
      alert("name cannot be empty");
      return;
    }

    if (!form.email || form.email === "") {
      alert("email cannot be empty");
      return;
    }

    if (!form.phone || form.phone === "") {
      alert("phone cannot be empty");
      return;
    }

    if (!form.username || form.username === "") {
      alert("username cannot be empty");
      return;
    }

    if (!form.password || form.password === "") {
      alert("password cannot be empty");
      return;
    }

    if (!isValidEmail(form.email)) {
      alert("email is not valid");
      return;
    }

    if (form.phone.length !== 8) {
      alert("phone number must be 8 digits");
      return;
    }

    if (form.phone.substr(0, 1) !== "7" && form.phone.substr(0, 1) !== "9") {
      alert("phone number must start with 7 or 9");
      return;
    }

    const response = await createUser(form);

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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Please Enter Name"
        value={form.name}
        onChangeText={text => setForm({ ...form, name: text })} />
      <TextInput
        style={styles.textInput}
        placeholder="Please Enter Email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={text => setForm({ ...form, email: text })} />
      <TextInput
        style={styles.textInput}
        placeholder="Please Enter Phone"
        value={form.phone}
        keyboardType="number-pad"
        onChangeText={text => setForm({ ...form, phone: text })} />
      <TextInput
        style={styles.textInput}
        placeholder="Please Enter Username"
        value={form.username}
        onChangeText={text => setForm({ ...form, username: text })} />
      <TextInput
        style={styles.textInput}
        placeholder="Please Enter Password"
        value={form.password}
        secureTextEntry
        onChangeText={text => setForm({ ...form, password: text })} />
      <View style={{ height: 50, width: 250, alignSelf: 'center', marginTop: 10 }}>
        <Dropdown
          label="Region"
          data={regions}
          enableSearch
          value={form.region_id}
          onChange={regionChangeHandler}
          textInputStyle={{ width: 250, alignSelf: 'center', height: 50 }}
        />
      </View>
      <View style={{ height: 60, width: 250, alignSelf: 'center' }}>
        <Dropdown
          label="Willayat"
          data={willayats}
          enableSearch
          value={form.willayat_id}
          onChange={value => setForm({ ...form, willayat_id: value })}
          textInputStyle={{ width: 250, alignSelf: 'center', height: 50 }}
        />
      </View>
      <Button style={styles.button} mode="contained" onPress={registerButtonHandler}>
        Sign Up
        </Button>
      <Button style={styles.button} mode="outlined" onPress={() => history.goBack()}>
        Already Registered
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20
  },
  textInput: {
    width: 250,
    height: 40,
    marginTop: 10,
    alignSelf: 'center'
  },
  button: {
    width: 250,
    marginTop: 10,
    alignSelf: 'center'
  }
});