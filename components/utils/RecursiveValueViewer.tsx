import { texts } from "@/styles/texts";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";


interface Props {
    data: any, 
    parentKey?: string
}

const RecursiveValueViewer = ({ data, parentKey }: Props) => {

    if (data === null || data === undefined) return null;

    if (typeof data !== 'object') {
        return (
        <View style={styles.row}>
            <Text style={[texts.label, styles.label]}>{parentKey}</Text>
            <Text style={[texts.label, styles.value]}>{data}</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
        {Object.entries(data).map(([key, value]) => {
            const fullKey = parentKey ? `${parentKey} - ${key}` : key;

            if (typeof value === 'object' && value !== null) {
            return (
                <View key={key} style={styles.section}>
                <Text style={[texts.label, styles.sectionTitle]}>{key}</Text>
                <View style={[styles.nestedContent]}>
                    <RecursiveValueViewer data={value} parentKey="" />
                </View>
                </View>
            );
            }

            return (
            <View key={key} style={styles.row}>
                <Text style={[texts.subLabel, styles.label]}>{key}</Text>
                <Text style={[texts.subLabel, styles.value]}>{value as string}</Text>
            </View>
            );
        })}
        </View>
    );
};

const styles = StyleSheet.create({
    valuesSection: {
        paddingTop: 30, 
        gap: 10, 
      }, 
      textColor: {
        color: Colors.primary
      },
      subTextColor: {
        color: Colors.secondary
      }, 
      content: {
        marginTop: 16,
      },
      container: {
        width: '100%',
      },
      section: {
        marginVertical: 8,
      },
      sectionTitle: {
        marginBottom: 8,
        color: Colors.primary
      },
      nestedContent: {
        paddingLeft: 16,
        borderLeftWidth: 2,
        borderLeftColor: Colors.cardBackground, 
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      },
      label: {
        color: Colors.primary
      },
      value: {
        color: Colors.accent
      },
})

export default RecursiveValueViewer; 