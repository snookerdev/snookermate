import { supabase } from "@/utils/supbase";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {

  useEffect(() => {
    (async() => {
      console.log('Fetching data from supbase');
      const {data, error}  = await supabase.from('tournaments').select('*');
      if(error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to SnookerMate!
      </Text>
    </View>
  );
}
