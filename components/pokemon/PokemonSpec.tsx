import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle;
};
export function PokemonSpec({
  style,
  image,
  imageStyle,
  title,
  description,
  ...rest
}: Props) {
  return (
    <View style={[style, styles.root]} {...rest}>
      <Row style={styles.specRow}>
        {image && <Image source={image} style={[styles.icon, imageStyle]} />}
        <ThemedText style={{ textTransform: "capitalize" }}>{title}</ThemedText>
      </Row>
      <ThemedText variant="caption" color="grayMedium">
        {description}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  specRow: {
    height: 32,
    alignItems: "center",
  },
});
