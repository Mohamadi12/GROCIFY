import { useGroceryStore } from "@/store/grocery-store";
import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

// const TabsLayout = () => {
//   const { isSignedIn, isLoaded } = useAuth();

//   const { loadItems, items } = useGroceryStore();

//   const { colorScheme } = useColorScheme();
//   const isDark = colorScheme === "dark";
//   const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

//   useEffect(() => {
//     loadItems();
//   }, []);

//   if (!isLoaded) {
//     return null;
//   }

//   if (!isSignedIn) {
//     return <Redirect href="/(auth)/sign-in" />;
//   }

//   return (
//     <NativeTabs tintColor={tabTintColor}>
//       <NativeTabs.Trigger name="index">
//         <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon
//           sf={{
//             default: "list.bullet.clipboard",
//             selected: "list.bullet.clipboard.fill",
//           }}
//           md="list"
//         />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="planner">
//         <NativeTabs.Trigger.Icon
//           sf={{ default: "plus.circle", selected: "plus.circle.fill" }}
//           md="add"
//         />
//         <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="insights">
//         <NativeTabs.Trigger.Icon
//           sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
//           md="analytics"
//         />
//         <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// };

// export default TabsLayout;




const TabsLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { loadItems } = useGroceryStore();
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  useEffect(() => {
    loadItems();
  }, []);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const renderIcon = (
    focused: boolean,
    iosDefault: string,
    iosSelected: string,
    androidName: keyof typeof MaterialIcons.glyphMap,
    color: string,
    size: number
  ) => {
    if (Platform.OS === "ios") {
      return (
        <Ionicons
          name={(focused ? iosSelected : iosDefault) as any}
          size={size}
          color={color}
        />
      );
    }

    return (
      <MaterialIcons
        name={androidName}
        size={size}
        color={color}
      />
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tabTintColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ focused, color, size }) =>
            renderIcon(
              focused,
              "clipboard-outline",
              "clipboard",
              "list",
              color,
              size
            ),
        }}
      />

      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ focused, color, size }) =>
            renderIcon(
              focused,
              "add-circle-outline",
              "add-circle",
              "add",
              color,
              size
            ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ focused, color, size }) =>
            renderIcon(
              focused,
              "bar-chart-outline",
              "bar-chart",
              "analytics",
              color,
              size
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;