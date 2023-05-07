import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserLoginScreen } from "./UserLoginScreen";
import { UserNoLoginScreen } from "./UserNoLoginScreen";
import { LoadingModal } from "../../components/Shared/LoadingModal/LoadingModal";

export function Cuenta() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setLogin(user ? true : false);
    });
  }, []);

  if (login === null) {
    return <LoadingModal show text="Cargando..." />;
  }

  return login ? <UserLoginScreen /> : <UserNoLoginScreen />;
}
