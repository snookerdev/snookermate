import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
      }}>
      <Tabs.Screen name="index" options={{
          title: 'Tournaments',
          headerShown: false
        }}/>
      <Tabs.Screen name="profile" options={{
          title: 'Profile',
          headerShown: false
        }}/>
    </Tabs>
  )
}