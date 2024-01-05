import {StyleSheet, View, SafeAreaView, Modal} from 'react-native';
import React from 'react';
import {ContainerViewStyles, HasChild, ModalProps} from '../../types';
import {commonStyles} from '../../utility/commonStyles';
import WrapperWithoutFeedback from '../button/WrapperWithoutFeedback';
import {Colors} from '../../utility/Colors';

interface BottomSheetProps
  extends ModalProps,
    HasChild,
    Partial<ContainerViewStyles> {
  takeHoleSpace?: boolean;
}

export default function Bottom({
  show,
  hide,
  takeHoleSpace = false,
  children,
  containerStyle,
}: BottomSheetProps) {
  // const opacity = useDerivedValue(() => {
  //     return withTiming(show ? 1 : 0);
  // }, [show]);

  // const style = useAnimatedStyle(() => {
  //     return {
  //         opacity: interpolate(opacity.value, [0, 0.2, 1], [0, 1, 1]),
  //     };
  // });
  return (
    <Modal
      visible={show}
      transparent
      animationType="slide"
      onRequestClose={hide}>
      <SafeAreaView style={[commonStyles.flexOne, styles.container]}>
        <WrapperWithoutFeedback onPress={hide}>
          {!takeHoleSpace ? (
            <View style={[commonStyles.flexOne, styles.backdrop]} />
          ) : (
            <View />
          )}
        </WrapperWithoutFeedback>
        <View style={[styles.mainContainer, containerStyle]}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    elevation: 10,
  },
});
