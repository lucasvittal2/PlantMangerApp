import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const navigation = useNavigation();
    const [name,setName] = useState<string>()
    const [isFocused, setIsFocused] = useState(false);
    const [ isFilled,setIsFilled ] = useState(false); 
    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function  handlerInputFocus(){
        setIsFocused(true);
    }
    function handleInputChange(value:string){
        setIsFilled(!!value);
        setName(value);

    }
    function handleSubmit(){
        navigation.navigate('Confirmation')
    }
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios'? 'padding': 'height'}
            >
                <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                >
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>               
                            <Text style={styles.emoji}>
                                { isFilled ? '😄':'😊'}
                            </Text>
                            <Text style={styles.title}>
                                Como podemos {'\n'}
                                chamar você

                            </Text>
                            <TextInput
                                placeholder="Digite um nome"
                                style={[
                                    styles.input,
                                    (isFilled || isFocused) && {borderColor: colors.green}
                                ]}
                                onBlur={ handleInputBlur }
                                onFocus={ handlerInputFocus }
                                onChangeText = { handleInputChange }
                            />

                            <View style = {styles.footer}>
                                <Button
                                enabled = {!!name}
                                title = "Confirmar"
                                onPress = {handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}

const styles=  StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around'
    },
    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
        alignItems:'center',
    },
    header:{
        alignItems:'center',
        width:'100%'
    },
    emoji:{
        fontSize:44
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color:colors.heading,
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center',
        width:'100%'
    },
    title:{
        fontSize:24,
        lineHeight:32,
        textAlign:'center',
        color:colors.heading,
        fontFamily: fonts.heading,
        marginTop:20
    },
    footer:{
        width:'100%',
        marginTop: 40,
        paddingHorizontal: 20

    }
})