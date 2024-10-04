import { StyleSheet, Text, type TextProps } from "react-native"

// On met le style ici pour definir le prop variant plus bas en "keyof
const styles = StyleSheet.create({
    body3: {
        fontSize: 10,
        lineHeight: 16
    },
    body1: {
        fontSize: 14,
        lineHeight: 16
    },
    body2: {
        fontSize: 12,
        lineHeight: 16
    },
    caption: {
        fontSize: 8,
        lineHeight: 12
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 32
    },
    subtitle1: {
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 16
    },
    subtitle2: {
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 16
    },
    subtitle3: {
        fontWeight: 'bold',
        fontSize: 10,
        lineHeight: 16
    }
})

type Props = TextProps & { // TextProps = n'importe quelle props accepté par le composant Text
    variant?: keyof typeof styles,
    color?: string,
}

export function ThemedText({variant, color, ...rest}: Props) {
    return <Text style={styles[variant ?? 'body3']} {...rest}/> // Si variant n'est pas defini, on utilise body3
}

