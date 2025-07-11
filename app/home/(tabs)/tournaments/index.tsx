import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const router = useRouter();
    return (
        <View className="flex-1 m-4">
            <Text className="mt-5 justify-center items-center text-xl font-bold">Tournaments</Text>
            <View className="my-1">
                <TouchableOpacity className='h-11 bg-blue-600 rounded-md items-center justify-center' onPress={() => router.navigate('./tournaments/create')}>
                    <Text className="text-white font-semibold">Create Torunament</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}