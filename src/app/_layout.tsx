import { Stack } from "expo-router";
import { RentalProvider } from "../context/RentalContext";

export default function RootLayout() {
  return (
    <RentalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "TRIO PlayStation", headerShown: false }}
        />
        <Stack.Screen
          name="paket/[id]"
          options={{
            title: "Detail Paket Rental",
            headerStyle: { backgroundColor: '#0071DC' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
    </RentalProvider>
  );
}
