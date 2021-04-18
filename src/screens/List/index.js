import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Keyboard,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import api from "../../services/api";

export default function List() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));
  const navigation = useNavigation();

  function navigationRegister() {
    navigation.navigate("Register");
  }

  async function handleSubmit() {
    const res = await api.post("/auth/authenticate", { email, password });

    const { token } = res.data;

    if (res.data.status === 1) {
      await AsyncStorage.multiSet([
        ["&user-token", token],
      ]);

      navigateToDashboard();
    } else if (res.data.status === 2) {
      alert("" + res.data.error);
    }
  }

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      "keyboardHideShow",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
   <>

    Hello Wolrd from list 

   </>
  );
}
