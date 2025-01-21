import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

const RegistersScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const { register } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isPosting, setIsPosting] = useState(false);

  const onRegister = async () => {
    if (
      form.fullName.length ===0 ||
      form.email.length === 0 ||
      form.password.length === 0
    ) {
      return;
    }
    setIsPosting(true);
    console.log(form.fullName, form.email, form.password);
    const wasSuccessful = await register(
      form.fullName,
      form.email,
      form.password
    );

    setIsPosting(false);
    if (wasSuccessful) {
      router.replace("/(products-app)/(home)");
      return;
    }
    Alert.alert("Error", "Register failed");
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText
            style={{
              color: "gray",
            }}
          >
            Por favor Crea una cuenta para continuar
          </ThemedText>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder="Nombre completo"
            keyboardType="default"
            autoCapitalize="words"
            value={form.fullName}
            onChangeText={(value) => setForm({ ...form, fullName: value })}
            icon="person-outline"
          />
          <ThemedTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="Passowrd"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            icon="lock-closed-outline"
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedButton disabled={isPosting} onPress={onRegister} icon="arrow-forward">
            Crear cuenta
          </ThemedButton>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <ThemedText>Ya tienes una cuenta ?</ThemedText>
          <ThemedLink
            style={{
              marginHorizontal: 10,
            }}
            href={"/auth/login"}
          >
            Imgresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistersScreen;
