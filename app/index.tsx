import { supabase } from "@/utils/supbase";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <>
      <View className="flex-1 px-4 pt-10 bg-white w-full">
        <Text className="text-xl font-bold text-blue-500">Welcome to SnookerMate!</Text>
        <View className="mb-4">
          <Text className="mb-2 text-base font-medium text-gray-800">Email</Text>
          <TextInput
            className="h-11 px-3 border border-gray-300 rounded-md"
            placeholder="email@address.com"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-base font-medium text-gray-800">Password</Text>
          <TextInput
            className="h-11 px-3 border border-gray-300 rounded-md"
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <TouchableOpacity
            className={`bg-blue-600 rounded-md py-3 items-center ${loading ? 'opacity-50' : ''
              }`}
            onPress={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Link href="./signup">
            <Text className="text-blue-600 font-semibold">Already Not A User!!! Please Sign up</Text>
          </Link>
        </View>
      </View>
    </>
  );
}
