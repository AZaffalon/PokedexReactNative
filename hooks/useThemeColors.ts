import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function useThemeColors() {
    const theme = useColorScheme() ?? "light";
    return Colors[theme];
}