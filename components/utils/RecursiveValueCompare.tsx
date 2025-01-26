import { texts } from "@/styles/texts";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  test1: any;
  test2: any;
}

const RecursiveValueCompare = ({ test1, test2 }: Props) => {
  const getCommonKeys = (obj1: any, obj2: any) => {
    const keys1 = Object.keys(obj1 || {});
    const keys2 = Object.keys(obj2 || {});
    return keys1.filter((key) => keys2.includes(key));
  };

  const renderComparison = (key: string, value1: any, value2: any) => {
    if (value1 && typeof value1 === "object" && value2 && typeof value2 === "object") {
      // Render nested comparison
      return (
        <View key={key} style={styles.section}>
          <Text style={[texts.label, styles.sectionTitle]}>{key}</Text>
          <View style={styles.nestedContent}>
            <RecursiveValueCompare test1={value1} test2={value2} />
          </View>
        </View>
      );
    }

    // Render flat value comparison
    return (
      <View key={key} style={styles.row}>
        <Text style={[texts.subLabel, styles.label]}>{key}</Text>
        <Text style={[texts.subLabel, styles.value]}>{value1 ?? "—"}</Text>
        <Text style={[texts.subLabel, styles.value]}>{value2 ?? "—"}</Text>
      </View>
    );
  };

  if (!test1 && !test2) return null;

  const commonKeys = getCommonKeys(test1 || {}, test2 || {});

  return (
    <View style={styles.container}>
      {commonKeys.map((key) =>
        renderComparison(key, test1[key], test2[key])
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    color: Colors.primary,
  },
  nestedContent: {
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: Colors.cardBackground,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    color: Colors.primary,
    flex: 1,
  },
  value: {
    color: Colors.accent,
    flex: 1,
    textAlign: "right",
  },
});

export default RecursiveValueCompare;
