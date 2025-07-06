import { Text, View } from "react-native";

export default function TailWind() {
    return (
        <View className="flex-1 m-4 border">
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 1 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 2 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 3 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 4 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 5 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 6 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 7 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 8 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 9 </Text></View>
            <View className="border my-2 h-11"><Text className="text-lg font-semibold"> Row 10 </Text></View>
        </View>
    );
}
// Always start with flex-1 m-4
// Each children will have my-1, TextInput by default has h-11 for others put h-11 manually
// my-1 inside childeren will mb-1 except last
// text-xs/sm/medium/lg/xl-n will make your size bigger or smaller, in that case no need to apply h-11
