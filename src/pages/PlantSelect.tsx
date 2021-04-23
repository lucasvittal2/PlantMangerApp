import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { EnviormentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { PlantsProps } from '../libs/storage';

interface EnvironmentsProps{
    key: string,
    title: string
};


export function PlantSelect(){
    const navigation = useNavigation();
    const [environment, setenvironment] = useState<EnvironmentsProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [environmentSelected , setEnvironmentSelected] = useState('all');
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPAge] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    function handleEnvironmentSelected(environment:string){
        setEnvironmentSelected(environment);
        if(environment === 'all'){
            return setFilteredPlants(plants);
        }
        const filtered = plants.filter( plants => plants.environments.includes(environment))
        setFilteredPlants(filtered);

    }
    function handlePlantSelect(plant: PlantsProps){
        navigation.navigate('PlantSave', { plant })
    }

    async function fetchPlants(){
        const { data } = await api
        .get(`http://192.168.100.45:3333/plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if(!data){
            return setLoading(true);
        }
        if(page > 1){
            setPlants( oldValue => [...oldValue, ...data])
            setFilteredPlants( oldValue => [...oldValue, ...data]);
        }
        else{
            setPlants(data);
            setFilteredPlants(data);

        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number){
        if(distance < 1){
            return;
        }
        setLoadingMore(true);
        setPAge( oldValue=> oldValue + 1);
        fetchPlants();
    }

    useEffect( ()=> {
        async function fetchEnvionment(){
            const { data } = await api
            .get('http://192.168.100.45:3333/plants_environments?_sort=title&_order=asc');
            setenvironment([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }
        fetchEnvionment()
    },[]);

    useEffect( ()=> {
        fetchPlants()
    },[]);
    if(loading){
        return <Load/>;
    }
    return(
        <View style = { styles.container }>
            <View style = { styles.header }>
            <Header/>
                <View>
                    <Text style = { styles.title }>
                        Em qual ambiente
                        </Text>
                    <Text style = { styles.subtitle }>
                        você quer colocar sua planta?
                    </Text>
                </View>
            </View>
            <View>
                <FlatList
                keyExtractor = {(item) => { String(item.key) }}
                ListHeaderComponent={<View />}
                ListHeaderComponentStyle={{ marginRight: 32 }}
                horizontal
                showsHorizontalScrollIndicator={ false }
                contentContainerStyle = { styles.enviromentList }
                data = {environment}
                renderItem = {({item}) => (
                    <EnviormentButton
                    title= { item.title }
                    active = { item.key === environmentSelected }
                    onPress = { () => handleEnvironmentSelected(item.key) }
                    
                    />
                )}
                
                />
            </View>
            <View style = { styles.plants }>
                    <FlatList
                    keyExtractor = {(item) => {String(item.key)} }
                    data = {filteredPlants}
                    renderItem = {({ item })=>(
                        <PlantCardPrimary
                        data={item}
                        onPress = {()=> handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator= { false }
                    numColumns = { 2 }
                    contentContainerStyle = { styles.contentContainerStyle}
                    onEndReachedThreshold = { 0.1 }
                    onEndReached = {
                        ({distanceFromEnd}) =>{
                        handleFetchMore(distanceFromEnd)
                        }
                    }
                    ListFooterComponent = {
                        loadingMore?
                        <ActivityIndicator color = { colors.green}/>:
                        <></>
                    }
                    />
            </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle:{ 
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
         color: colors.heading

    },
    header:{
        paddingHorizontal: 30,

    },
    enviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    contentContainerStyle:{
        justifyContent: 'center'
    }
});

