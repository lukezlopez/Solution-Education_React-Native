import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function withProfessorProtection(WrappedComponent) {
    return function Protected(props) {
        const { role, loading } = useAuth();
        const nav = useNavigation();

        useEffect(() => {
            if (!loading && role !== "professor") {
                nav.navigate("Login");
            }
        }, [loading, role]);

        if (loading || role !== "professor") {
            return <View><Text>Verificando permissão...</Text></View>;
        }

        return <WrappedComponent {...props} />;
    };
}
