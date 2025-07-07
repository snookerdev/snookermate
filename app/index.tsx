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
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  function getValidationErrors () : string[] {
    const errors : string[] = [];
    if(email.trim() === '') {
      errors.push('email.empty');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('email.invalid');
      }
    }
    if(password.trim() === '') {
      errors.push('password.empty');
    }
    return errors;
  }

  async function signInWithEmail() {
    const validationErrors = getValidationErrors();
    setErrors(getValidationErrors());
    if (validationErrors.length > 0) {
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('Logged in successfully');
    }
    setLoading(false);
  }

  return (
    <>
      <View className="flex-1 m-4">
        <Text className="mt-5 text-xl font-bold text-blue-500">Welcome to SnookerMate!</Text>
        <View className="my-1">
          <Text className="mb-1 text-base font-medium text-gray-800">Email</Text>
          <TextInput
            className="h-11 px-3 border border-gray-300 rounded-md"
            placeholder="stephen.hendry@gmail.com"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.includes('email.empty') && <Text className="mb-1 text-base font-medium text-red-600">Error : Email should not be empty</Text>}
          {errors.includes('email.invalid') && <Text className="mb-1 text-base font-medium text-red-600">Error : Email is not valid</Text>}
        </View>

        <View className="my-1">
          <Text className="mb-1 text-base font-medium text-gray-800">Password</Text>
          <TextInput
            className="h-11 px-3 border border-gray-300 rounded-md"
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            autoCapitalize="none"
          />
        {errors.includes('password.empty') && <Text className="mb-1 text-base font-medium text-red-600">Error : Password should not be empty</Text>}
        </View>

        <View className="my-1">
          <TouchableOpacity
            className={`h-11 bg-blue-600 rounded-md items-center justify-center ${loading ? 'opacity-50' : ''
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

        <View className="my-1">
          <Link href="./signup">
            <Text className="text-blue-600 font-semibold">Already Not A User!!! Please Sign up</Text>
          </Link>
        </View>

        <View className="my-1">
          <Link href="./tailwind">
            <Text className="text-blue-600 font-semibold">TailWind</Text>
          </Link>
        </View>

      </View>
    </>
  );
}
