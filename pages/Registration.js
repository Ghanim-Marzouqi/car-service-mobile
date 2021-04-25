import React, { useState } from "react";
import { useHistory } from "react-router-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Logo from "../assets/icon.png";
import { createUser } from "../services/AuthService";

export default function Registration() {
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
    <View style={styles.container}>
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
      {/* <Picker>
        selectedValue={"Java"}
        onValueChange={(itemValue, itemIndex) => { }}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
      <TouchableOpacity style={styles.registerButton} onPress={registerButtonHandler}>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => history.goBack()}>
        <Text style={styles.backButton}>Already Registered</Text>
      </TouchableWithoutFeedback>
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
  logoText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20
  },
  textInput: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 5
  },
  registerButton: {
    width: 250,
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10
  },
  backButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  }
});