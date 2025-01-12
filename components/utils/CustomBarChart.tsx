import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';

interface ChartData {
  value: number;
  label: string;
  spacing?: number;
  frontColor?: string;
}

interface Props {
  title: string;
  data: ChartData[];
}

const CustomBarChart = ({ title, data }: Props) => {
  const barWidth = 20;

  // Stato per salvare la larghezza del contenitore padre
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);

  // Calcolo dinamico della larghezza del grafico
  const chartContentWidth = data.length * (barWidth + 50); // barWidth + spacing
  const chartWidth = containerWidth - 100 // Adatta al contenitore

  return (
    <View
      style={styles.chartContainer}
      onLayout={(event) => {
        // Ottieni larghezza del contenitore padre
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      <Text style={[texts.subLabel, { color: Colors.secondary, alignSelf: 'center' }]}>{title}</Text>
      <BarChart
        data={data}
        // width={chartWidth} // Larghezza calcolata dinamicamente
        height={200}
        initialSpacing={10}
        hideRules
        hideYAxisText
        barWidth={40}
        adjustToWidth={true}
        xAxisThickness={1}
        yAxisThickness={1}
        isAnimated={true}
        xAxisLength={chartWidth}
        xAxisColor='#ccc'
        yAxisColor='#ccc'
        yAxisTextStyle={[texts.tinyLabel, styles.axisText]}
        xAxisLabelTextStyle={[texts.tinyLabel, styles.axisText]}
        noOfSections={5}
        maxValue={Math.ceil(Math.max(...data.map((item) => item.value)) * 1.1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 8,
    flex: 1, // Assicurati che il contenitore usi tutto lo spazio disponibile
  },
  axisText: {
    color: Colors.primary,
  },
});

export default CustomBarChart;
