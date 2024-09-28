import { FirebaseProvider } from "@/context/firebase";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <FirebaseProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='search/[query]' options={{ headerShown: false }} />
          <Stack.Screen name='flashcard/[id]' options={{ headerShown: false }} />
        </Stack>
        <StatusBar
          backgroundColor='#121212'
          style='light'
        />
      </FirebaseProvider>
    </>
  );
}
