import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
      <Stack.Screen
        name="new-task"
        options={{ presentation: 'modal', title: 'Nova tarefa' }}
      />
    </Stack>
  );
}