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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  async function signUpWithEmail() {
    const validationErrors = getValidationErrors();
    setErrors(getValidationErrors());
    if (validationErrors.length > 0) {
      return;
    }

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
        },
        emailRedirectTo: 'https://snookerdev.github.io/snookermate/welcome'
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

  function getValidationErrors () : string[] {
    const errors : string[] = [];
    if(name.trim() === '') {
      errors.push('name.empty');
    }
    if(email.trim() === '') {
      errors.push('email.empty');
    } else {
      // Simple email regex for validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('email.invalid');
      }
    }
    if(password.trim() === '') {
      errors.push('password.empty');
    } else if(password.length < 6) {
      errors.push('password.short');
    }
    if(confirmPassword.trim() === '') {
      errors.push('confirmPassword.empty');
    }
    if(password.trim() !== '' && confirmPassword.trim() !== '' && password !== confirmPassword) {
      errors.push('password.mismatch');
    }
    return errors;
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
        {errors.includes('name.empty') && <Text className="mb-1 text-base font-medium text-red-600">Error : Name should not be empty</Text>}
      </View>
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
        {errors.includes('password.short') && <Text className="mb-1 text-base font-medium text-red-600">Error : Password should be at least 6 characters</Text>}
        {errors.includes('password.mismatch') && <Text className="mb-1 text-base font-medium text-red-600">Error : Password and Confirm Password should be same</Text>}
      </View>
      <View className="my-1">
        <Text className="mb-1 text-base font-medium text-gray-800">Confirm Password</Text>
        <TextInput
          className="h-11 px-3 border border-gray-300 rounded-md"
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.includes('confirmPassword.empty') && <Text className="mb-1 text-base font-medium text-red-600">Error : Confirm Password should not be empty</Text>}
        {errors.includes('password.mismatch') && <Text className="mb-1 text-base font-medium text-red-600">Error : Password and Confirm Password should be same</Text>}
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
