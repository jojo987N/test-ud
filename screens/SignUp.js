import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { addUser, auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from "react-native-animatable"
import { APP_CONSTANT, fonts, icon, screen } from '../global'
import { colors } from '../global'

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  async function signUp() {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    addUser(userCredentials, name, phone, address).then(() => navigation.navigate(screen.SIGN_IN))
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{APP_CONSTANT.TEXT.REGISTER_NOW}</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={styles.textInputContainer}>
          <Entypo name={icon.EMAIL} size={20} color={colors.inputIcon} style={styles.inputIcon} />
          <TextInput
            placeholder={APP_CONSTANT.EMAIL}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name={icon.PASSWORD} size={20} color={colors.inputIcon} style={styles.inputIcon} />
          <TextInput
            placeholder={APP_CONSTANT.PASSWORD}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            secureTextEntry />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name={icon.USER} size={20} color={colors.inputIcon} style={styles.inputIcon} />
          <TextInput
            placeholder={APP_CONSTANT.NAME}
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Entypo name={icon.PHONE} size={20} color={colors.inputIcon} style={styles.inputIcon} />
          <TextInput
            placeholder={APP_CONSTANT.PHONE}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={() => { signUp() }}>
          <LinearGradient
            colors={colors.signInButton}
            style={styles.signInButton} >
            <Text style={{ ...styles.signInText, color: colors.white }}>{APP_CONSTANT.TEXT.SIGN_UP}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LinearGradient
            colors={colors.signUpButton.gradient}
            style={styles.signInButton} >
            <Text style={styles.signInText}>{APP_CONSTANT.TEXT.SIGN_IN}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authScreen
  },
  header: {
    alignItems: "center",
    flex: 1,
    paddingBottom: 50,
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 25, fontWeight: fonts.authScreen.title, color: colors.authScreen.title,
    letterSpacing: 5
  },
  footer: {
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    marginHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: colors.grey
  },
  textInput: {
    width: "90%",
    padding: 10
  },
  signInButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.signInText,
    letterSpacing: 1
  },
  signUpButton: {
    backgroundColor: colors.signUpButton.background,
    marginHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    width: "100%"
  }
})