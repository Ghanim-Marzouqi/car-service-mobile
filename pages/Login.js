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

import Logo from "../assets/icon.png";
import { authenticateUser } from "../services/AuthService";
import { save } from "../utils/StoreUtils";

export default function Login() {
  const history = useHistory();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const loginButtonHandler = async () => {

    if (!form.username || form.username === "") {
      alert("username cannot be empty");
      return;
    }

    if (!form.password || form.password === "") {
      alert("password cannot be empty");
      return;
    }

    const response = await authenticateUser(form);

    if (response !== null) {
      if (response.status === "success") {
        if (response.data.user_type === "CUSTOMER") {
          save("USER", JSON.stringify(response.data));
          history.push("/user");
        } else {
          alert("This app can be used by customers only");
        }
      } else {
        alert(response.message);
      }
    } else {
      alert("Server Error");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.logoText}>CAR SERVICE</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={loginButtonHandler}>
        <Text style={{ color: 'white' }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={() => history.push("/auth/register")}>
        <Text style={styles.registerButton}>Sign Up</Text>
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
  loginButton: {
    width: 250,
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10
  },
  registerButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  }
});