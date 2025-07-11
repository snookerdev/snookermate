import { Stack } from "expo-router";

export default function Layout () {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Tournaments', headerShown: false }} />
            <Stack.Screen name="create" options={{ title: 'Create Tournament' }} />
        </Stack>
    );
}