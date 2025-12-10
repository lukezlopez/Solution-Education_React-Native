import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PostDetailsScreen from "../screens/PostDetailsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import EditPostScreen from "../screens/EditPostScreen";
import Settings from "../screens/Settings";

import AdminScreen from "../screens/AdminScreen";
import TeachersListScreen from "../screens/Teachers/TeachersListScreen";
import TeacherFormScreen from "../screens/Teachers/TeachersFromScreen";
import StudentsListScreen from "../screens/Students/StudentsListScreen";
import StudentFormScreen from "../screens/Students/StudentFromScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { token, role, loading } = useAuth();

    if (loading) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator>

                {!token ? (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>

                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: "Solution Education" }}
                        />

                        <Stack.Screen
                            name="PostDetails"
                            component={PostDetailsScreen}
                            options={{ title: "Post" }}
                        />

                        {role === "professor" && (
                            <>
                                <Stack.Screen
                                    name="CreatePost"
                                    component={CreatePostScreen}
                                    options={{ title: "Criar Post" }}
                                />

                                <Stack.Screen
                                    name="EditPost"
                                    component={EditPostScreen}
                                    options={{ title: "Editar Post" }}
                                />

                                <Stack.Screen
                                    name="Admin"
                                    component={AdminScreen}
                                    options={{ title: "Administração" }}
                                />

                                <Stack.Screen
                                    name="TeachersList"
                                    component={TeachersListScreen}
                                    options={{ title: "Professores" }}
                                />

                                <Stack.Screen
                                    name="TeacherForm"
                                    component={TeacherFormScreen}
                                    options={{ title: "Cadastro/Editar Professor" }}
                                />

                                <Stack.Screen
                                    name="StudentsList"
                                    component={StudentsListScreen}
                                    options={{ title: "Alunos" }}
                                />

                                <Stack.Screen
                                    name="StudentForm"
                                    component={StudentFormScreen}
                                    options={{ title: "Cadastro/Editar Aluno" }}
                                />
                                
                                <Stack.Screen
                                    name="Settings"
                                    component={Settings}
                                    options={{ title: "Configurações" }}
                                />
                            </>
                        )}
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
