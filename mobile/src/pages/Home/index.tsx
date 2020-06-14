import React, {useEffect, useState, ChangeEvent} from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Home = () => {

    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(respose => {
          const ufs = respose.data.map(uf => uf.sigla).sort();
          setUfs(ufs);
      })
  }, [])

  useEffect(() => {
      if(selectedUF)
      {
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(respose => {
          const citys = respose.data.map(city => city.nome);
          setCities(citys);
         })
      }
      else{
        setCities([]);
      }   
  }, [selectedUF])

    function handleNavigateToPoins(){
        navigation.navigate('Points', {
          uf: selectedUF,
          city: selectedCity
        });
    }

    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Ubuntu_700Bold
    });

    if(!fontsLoaded)
    {
        return <AppLoading />
    }

    return (
        <ImageBackground source={require('../../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 274, height: 368}} >
            <View style={styles.main}>
                 <Image source={require('../../../assets/logo.png')} />
                 <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                 <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiete.</Text>   
            </View>
          
          <View style={styles.footer}>
              <RNPickerSelect    
              useNativeAndroidPickerStyle={false} 
                      style={stylesSelect}              
                      placeholder={{
                        label: 'Selecione um Estado',
                        value: null,
                    }}
                    value={selectedUF}
                    onValueChange={value => setSelectedUF(value)}
                    items={ufs.map(uf => {return { label: uf, value: uf} })}
                 />
                    <RNPickerSelect
                    useNativeAndroidPickerStyle={false} 
                     style={stylesSelect}     
                     placeholder={{
                      label: 'Selecione uma Cidade'
                  }}
                  value={selectedCity}
                  onValueChange={value => setSelectedCity(value)}
                  items={cities.map(city => {return { label: city, value: city} })}
                 />
                <RectButton style={styles.button} onPress={handleNavigateToPoins}>
                    <View style={styles.buttonIcon}>
                      <Icon name='arrow-right' color='#FFF'></Icon>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
          </View>
        </ImageBackground>
    );
}

const stylesSelect = StyleSheet.create({
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#6C6C80',
    fontFamily: 'Roboto_500Medium',
  },
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    color: '#6C6C80',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {
    },
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
      fontWeight: 'bold'
    }
  }); 

export default Home;