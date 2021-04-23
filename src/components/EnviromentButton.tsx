import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps{
    title: string,
    active?: boolean
}

export function EnviormentButton ({
    title,
    active = false,
    ...rest
}: EnviromentButtonProps){
    return(
        <RectButton
        style = { [
            styles.container,
            active && styles.containerActive
        ] }
        {...rest}
        >
        <Text style = { [
            styles.text,
            active && styles.textActive
            ] }>
            {title}
        </Text>

        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        height: 40,
        width:85,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius:12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,

    },
    containerActive:{
        backgroundColor: colors.green_light,
        height: 40,
        width:90
    },
    text:{
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 12

    },
    textActive:{
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})