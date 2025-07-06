import { supabase } from '@/utils/supbase';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options : {
        data : {
          name : name
        }
      }
    });

  if (error) {
    Alert.alert('Signup failed', error.message);
  } else if (!session) {
    Alert.alert(
      'Signup successful',
      'Please check your inbox for email verification!',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/'),
        },
      ]
    );
  }
    setLoading(false);
  }

  return (
    <View className="flex-1 m-4">
      <View className="my-1">
        <Text className="mb-1 text-base font-medium text-gray-800">Name</Text>
        <TextInput
          className="h-11 px-3 border border-gray-300 rounded-md"
          placeholder="Stephen Hendry"
          onChangeText={setName}
          value={name}
          autoCapitalize="none"
        />
      </View>
      <View className="my-1">
        <Text className="mb-1 text-base font-medium text-gray-800">Email</Text>
        <TextInput
          className="h-11 border border-gray-300 rounded-md"
          placeholder="stephen.hendry@gmail.com"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View className="my-1">
        <Text className="mb-1 text-base font-medium text-gray-800">Password</Text>
        <TextInput
          className="h-11 border border-gray-300 rounded-md"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View>
        <TouchableOpacity
          className={`my-3 h-11 bg-green-600 rounded-md items-center justify-center ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={signUpWithEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Sign up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
