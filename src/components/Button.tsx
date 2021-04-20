import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import fonst from '../styles/fonts';

interface ButtonsProps extends TouchableOpacityProps{
    title: string;
    enabled: boolean;
}
// type btnProps = View['ButtonsProps']
export function Button({title, enabled, ...rest}:ButtonsProps){
    return(
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}
            {...rest}
            >    
                {title}   
            </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:  colors.green,
        height:56,
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }

})