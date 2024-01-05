import {
    StyleSheet,
    Image,
    View,
    Text,
    ColorValue,
    ImageStyle,
} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '@myapp/utilities/Colors';
import {commonStyles} from '@myapp/utilities/commonStyles';
import {AppIcons} from '@myassets/index';
import {RadioInCircleButton} from '../button';
import {Spacing} from '../spacing';
import {HorizontalLine} from '../line';
import {ContainerViewStyles} from '@myapp/types';
// import {DropdownProps as RNDropDownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

// interface DropDownProps<T> extends Partial<ContainerViewStyles> {
//     placeholder?: string;
//     downArrowTintColor?: ColorValue;
//     dropArrowStyles?: ImageStyle;
//     disable?: boolean;
//     data: T;
// }

// interface ListData {
//     label: string;
//     value: string;
// }

type ListData = {
    label: string;
    value: string;
};

type DropDownProps<T> = {
    placeholder?: string;
    downArrowTintColor?: ColorValue;
    dropArrowStyles?: ImageStyle;
    disable?: boolean;
    data: T[];
    selectedValue: string;
    onValueChange: (value: T) => void;
    showRadioButton?: boolean;
} & Partial<ContainerViewStyles> &
    Record<keyof T, keyof T>;

export default function DropDown<T extends ListData>({
    placeholder = 'Select item',
    containerStyle,
    downArrowTintColor,
    dropArrowStyles,
    disable = false,
    data,
    label,
    value,
    selectedValue,
    onValueChange,
    showRadioButton = true,
}: DropDownProps<T>) {
    // const [selectedValue, setSelectedValue] = useState(null);

    return (
        <Dropdown
            statusBarIsTranslucent={true}
            containerStyle={[styles.container]}
            style={[styles.main, containerStyle]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            renderRightIcon={() => {
                return (
                    <Image
                        style={[
                            styles.downArrow,
                            dropArrowStyles,
                            {tintColor: downArrowTintColor},
                        ]}
                        resizeMode="contain"
                        source={AppIcons.side_arrow}
                    />
                );
            }}
            data={data}
            disable={disable}
            labelField={label as string}
            valueField={value as string}
            renderItem={item => {
                console.log('Drop down 1', item, selectedValue);
                return (
                    <>
                        <View style={[commonStyles.row, styles.radioButton]}>
                            {showRadioButton && (
                                <>
                                    <RadioInCircleButton
                                        selected={item.value === selectedValue}
                                        onPress={() => {}}
                                    />
                                    <Spacing size={5} />
                                </>
                            )}
                            <Text style={[commonStyles.primaryColor]}>
                                {item.label}
                            </Text>
                        </View>
                        <HorizontalLine />
                    </>
                );
            }}
            placeholder={placeholder}
            value={selectedValue}
            onChange={item => {
                onValueChange(item);
            }}
        />
    );
}

const styles = StyleSheet.create({
    radioButton: {
        padding: 15,
        paddingHorizontal: 8,
    },
    downArrow: {
        width: 10,
        height: 10,
        transform: [{rotate: '90deg'}],
    },
    textColor: {
        fontSize: 14,
        color: '#707070',
    },
    main: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        padding: 3,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#707070',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#707070',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    container: {
        zIndex: 1000,
    },
});
