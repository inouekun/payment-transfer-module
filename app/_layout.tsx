import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      primary: 'rgb(0, 95, 175)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(212, 227, 255)',
      onPrimaryContainer: 'rgb(0, 28, 58)',
      secondary: 'rgb(71, 85, 182)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(223, 224, 255)',
      onSecondaryContainer: 'rgb(0, 13, 95)',
      tertiary: 'rgb(0, 104, 116)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(151, 240, 255)',
      onTertiaryContainer: 'rgb(0, 31, 36)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(253, 252, 255)',
      onBackground: 'rgb(26, 28, 30)',
      surface: 'rgb(253, 252, 255)',
      onSurface: 'rgb(26, 28, 30)',
      surfaceVariant: 'rgb(224, 226, 236)',
      onSurfaceVariant: 'rgb(67, 71, 78)',
      outline: 'rgb(116, 119, 127)',
      outlineVariant: 'rgb(195, 198, 207)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(47, 48, 51)',
      inverseOnSurface: 'rgb(241, 240, 244)',
      inversePrimary: 'rgb(165, 200, 255)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(240, 244, 251)',
        level2: 'rgb(233, 239, 249)',
        level3: 'rgb(225, 235, 246)',
        level4: 'rgb(223, 233, 245)',
        level5: 'rgb(218, 230, 244)',
      },
      surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
      onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
      backdrop: 'rgba(45, 49, 56, 0.4)',
    },
  };
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='confirmation' options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
