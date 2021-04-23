import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,FlatList, Alert
} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png'
import { loadPlant, PlantsProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants(){

    const [myPlants, setMyPlants] = useState<PlantsProps[]>();
    const [loading, setLoading] = useState(true);
    const [ nextWatered, setNextWatered] = useState<string>();
    useEffect( ()=> {
        async function loadStorageData(){
            const planstStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(planstStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );
            setNextWatered(
                `Não esqueça de regar a ${planstStoraged[0].name} à ${nextTime} horas`
            );
            
            setMyPlants(planstStoraged)
             setLoading(false);
        }
        loadStorageData();
        
    }, [])
    if(loading){
        return <Load/>;
    }
    function handleRemove( plant: PlantsProps){
        Alert.alert('Remover',`Deseja remover a ${plant.name}?`,[
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😭',
                onPress: async () => {
                    try{
                        await removePlant(plant.id);
                        setMyPlants( (oldData) => (
                             oldData.filter( (item) => item.id !== plant.id)
                            ))
                    }catch(error){
                        Alert.alert('Não foi possível Remover! 😭');

                    }
                }
            }
        ])
    }
    return(
        <View style = { styles.container}>
            <Header/>
            <View style = { styles.spotlight}>
                <Image
                source = { waterDrop}
                style = { styles.spotlightImage}
                />
                <Text style = { styles.spotlightText }>
                    {nextWatered}
                </Text>
            </View>
            <View style = { styles.plants }>
                <Text style = { styles.plantsTitle }>
                    Próximas regadas
                </Text>
                <FlatList
                data = {myPlants}
                keyExtractor = { (item)=> String(item.id) }
                renderItem = {({item}) => (
                    <PlantCardSecondary
                    handleRemove = { () => {handleRemove(item)} }
                    data ={item}
                    />
                )}
                showsVerticalScrollIndicator = { false }
                contentContainerStyle = { { flex: 1 } }
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'space-between',
       paddingHorizontal: 30,
       paddingTop: 50,
       backgroundColor: colors.background
   },
   spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
   },
   spotlightImage:{
        width: 60,
        height: 60,
        marginRight:10

   },
   spotlightText:{
       flex: 1,
       color: colors.blue,
       paddingHorizontal: 20,
       
   },
   plants:{
       flex:1,
       width: '100%',
       color: colors.green
   },
   plantsTitle: {
       fontSize: 24,
       fontFamily: fonts.text,
       color: colors.heading,
       marginVertical: 20
   }
});