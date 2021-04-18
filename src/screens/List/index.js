import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Keyboard,
  FlatList,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import api from "../../services/api";

export default function List() {
  const [spents, setSpents] = useState([]);

  const navigation = useNavigation();

  function navigationRegister() {
    navigation.navigate("Register");
  }

  async function loadSpents() {
    const res = await api.get("/spents");
    console.log(res.data)
    setSpents(res.data);
  }

  useEffect(() => {
    loadSpents();
  }, []);

  async function handleSubmit() {
    const res = await api.post("/auth/authenticate", { email, password });

    const { token } = res.data;

    if (res.data.status === 1) {
      await AsyncStorage.multiSet([["&user-token", token]]);

      navigateToDashboard();
    } else if (res.data.status === 2) {
      alert("" + res.data.error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}> casos</Text>.
          </Text>
        </View>

        <Text style={styles.title}>Bem-Vindo!</Text>

        <FlatList
          data={spents}
          keyExtractor = {spents => String (spents._id)}
          renderItem = {({ item: spents }) => (
            <View>
              <Text>{spents._id}</Text>
            </View>
          )}
        >

        </FlatList>
      </View>
    </SafeAreaView>
  );
}
