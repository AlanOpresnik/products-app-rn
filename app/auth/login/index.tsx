import {
  KeyboardAvoidingView,
  useWindowDimensions,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { router } from "expo-router";

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const { login } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    console.log(form.email, form.password);
    const wasSuccessful = await login(form.email, form.password);

    setIsPosting(false);
    if (wasSuccessful) {
      router.replace("/(products-app)/(home)");
      return;
    }
    Alert.alert("Error", "Login failed");
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText
            style={{
              color: "gray",
            }}
          >
            Por favor Ingrese para continuar
          </ThemedText>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Passowrd"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedButton
            disabled={isPosting}
            onPress={onLogin}
            icon="arrow-forward"
          >
            Ingresar
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
          <ThemedText>No tienes cuenta ?</ThemedText>
          <ThemedLink
            style={{
              marginHorizontal: 10,
            }}
            href={"/auth/register"}
          >
            Crear una
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
