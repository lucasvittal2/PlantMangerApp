import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps{
    title: string
}
export function Button({title, ...rest}:ButtonProps){
    return(
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}
            >
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            </TouchableOpacity>
    );
}
            
const styles = StyleSheet.create({
    button:{
        fontSize:20,
        color:colors.white,
        backgroundColor:colors.green,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:16,
        marginBottom:30,
        padding:17,
        width:56,
        height:56,
       },
       buttonText:{
        color:colors.white,
        fontSize:24
    }
   })