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
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));
  const navigation = useNavigation();

  function navigationBack() {
    navigation.goBack();
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

  function navigateToLogin() {
    navigation.navigate("Login");
  }


  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      password2: password2
    }

    api.post('/auth/register', data)
      .then(res => {
        if(res.data.status === 2) {
          alert('' + res.data.error)
        } else {
          alert('' + res.data.success)
          navigateToLogin()
        }
      })
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Icon name="user-plus" size={100} />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Nome"
          autoCorrect={false}
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={text => setPassword(text)}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Confirmar senha"
          autoCorrect={false}
          onChangeText={text => setPassword2(text)}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit}>
          <Text style={styles.submitText}>
            Criar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText} onPress={navigateToLogin}>
            Já possui conta? Entrar
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
