import { supabase } from "@/utils/supbase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

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
      <View className="flex-1 m-4">
        <Text className="my-1 text-xl font-bold text-blue-500">Welcome to SnookerMate!</Text>
        <View className="my-1">
        <Text className="mb-1 text-base font-medium text-gray-800">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-md"
          placeholder="email@address.com"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        </View>


        <View className="my-1">
        <Text className="mb-1 text-base font-medium text-gray-800">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-md"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
        </View>

        <View className="my-3">
        <TouchableOpacity
          className='h-11 mb-1 bg-blue-600 rounded-md items-center justify-center'
          onPress={signInWithEmail}
          disabled={loading}
        >
          <Text className="text-white font-semibold">Sign in</Text>
        </TouchableOpacity>
        </View>

      </View>
    </>
  );
}
