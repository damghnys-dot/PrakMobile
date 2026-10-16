import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "TRIO PlayStation", headerShown: false }}
      />
    </Stack>
  );
}
