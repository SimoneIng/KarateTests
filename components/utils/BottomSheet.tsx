import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface CustomBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  isVisible?: boolean;
  onDismiss?: () => void;
}

const CustomBottomSheet = ({
  children,
  snapPoints = ['30%', '50%', '70%'],
  isVisible = false,
  onDismiss,
}: CustomBottomSheetProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onDismiss?.();
  }, [onDismiss]);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present(); 
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isVisible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
  });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.container}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheet;