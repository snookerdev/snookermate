import Auth from "@/components/Auth";
import { supabase } from "@/utils/supbase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to SnookerMate!
      </Text>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
