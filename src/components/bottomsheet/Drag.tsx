import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {SCREEN_HEIGHT} from '@myapp/utilities/constants';
import {useBackHandler} from '@myapp/hooks/useBackHandler';
import {hasChild, ModalProps, ViewStyles} from '@myapp/types';
import {commonStyles} from '@myapp/utilities/commonStyles';
// import Colors from '../utils/colors';
// import {SCREEN_HEIGHT} from '../utils/constants';

const duration = 400;

interface DragProps extends ModalProps, hasChild, Partial<ViewStyles> {
    dragHeight?: number;
    dragRatio?: number;
    dragTo?: boolean;
    dragEnable?: boolean;
    /*
        below all configs for full screen take
        main container it will hiding backdrop
    */
    takeHoleSpace?: boolean;
}

export default function Drag({
    show,
    hide,
    dragHeight = 80,
    children,
    style,
    // drag configs
    dragRatio = 1.5,
    dragTo = false,
    dragEnable = true,
    /*
   below all configs for full screen take
   main container it will hiding backdrop
  */
    takeHoleSpace = true,
}: DragProps) {
    const [layoutHeight, setLayoutHeight] = useState(0);
    const dragY = useSharedValue(0);
    const slideUpAnimation = useDerivedValue(() => {
        const value = show ? 1 : 0;
        return withTiming(value, {duration});
    }, [show]);
    useBackHandler(show, hide);

    const handleHide = () => {
        hide();
        setTimeout(() => {
            dragY.value = 0;
        }, duration);
    };

    const panGesture = useAnimatedGestureHandler({
        onActive: ({translationY}) => {
            dragY.value = Math.max(translationY, 0);
        },
        onEnd: () => {
            const outOfRange = dragHeight * dragRatio;
            const currentLoc = dragY.value;
            const animatedTo = dragTo ? SCREEN_HEIGHT : layoutHeight;

            if (currentLoc > outOfRange) {
                dragY.value = withTiming(animatedTo, {}, () => {
                    runOnJS(handleHide)();
                });
            } else {
                dragY.value = withTiming(0);
            }
        },
    });

    const rootContainerStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            slideUpAnimation.value,
            [0, 1],
            ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.5)'],
        );
        return {
            backgroundColor,
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            slideUpAnimation.value,
            [0, 0.2, 1],
            [0, 1, 1],
            Extrapolate.CLAMP,
        );
        const translateY = interpolate(
            slideUpAnimation.value,
            [0, 1],
            [SCREEN_HEIGHT, 0],
            Extrapolate.CLAMP,
        );
        return {
            zIndex: 10,
            transform: [{translateY}],
            opacity,
        };
    });

    const sheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: dragY.value}],
        };
    });

    const backdropStyle = useAnimatedStyle(() => {
        return {
            opacity: slideUpAnimation.value,
        };
    });

    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                styles.root,
                rootContainerStyle,
            ]}
            pointerEvents="box-none">
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    styles.container,
                    containerStyle,
                ]}>
                <TouchableWithoutFeedback onPress={hide}>
                    <Animated.View
                        style={[
                            takeHoleSpace
                                ? commonStyles.flexOne
                                : commonStyles.flexZero,
                            backdropStyle,
                        ]}
                    />
                </TouchableWithoutFeedback>
                <PanGestureHandler
                    enabled={dragEnable}
                    onGestureEvent={panGesture}>
                    <Animated.View
                        onLayout={e =>
                            setLayoutHeight(e.nativeEvent.layout.height)
                        }
                        style={[styles.mainContent, style, sheetStyle]}>
                        {children}
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flex: 1,
        zIndex: 1000,
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        flex: 1,
        // backgroundColor: 'red',
    },
    mainContent: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});
