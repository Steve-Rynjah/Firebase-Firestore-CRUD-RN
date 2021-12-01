import React, {useState} from "react";
import {View, Text, Dimensions, StyleSheet, StatusBar, TextInput, TouchableOpacity} from 'react-native'
import firestore from "@react-native-firebase/firestore";

var {width, height} = Dimensions.get('window')

export const AddScreen = ({navigation}) =>{
    const [newUser, setNewUser] = useState('')

    const onAdd = () => {
        try {
            const addData = async () => {
                if(newUser){
                    firestore()
                    .collection("users")
                    .add({
                        name: newUser
                    })
                    .then(()=>{
                        navigation.navigate('DISPLAY')
                    })
                    .catch((e)=> console.log(e))
                } else {
                    alert('Please enter the req. name')
                }
            }
            addData();
        } catch(e){
            console.log(e)
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#333"/>
            <Text style={styles.header}>Add Member</Text>
            <Text style={{alignSelf: 'center', color: '#FFF', marginBottom: 25}}>_________________________________</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder="Enter a name"
                    style={{marginLeft: 15, color: '#007788'}}
                    onChangeText={(name)=> setNewUser(name)}
                    
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={onAdd}>
                    <Text style={{color: '#007788'}}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#007788'  
    },
    header:{
        color: '#FFF',
        fontSize: 24,
        marginTop: 25,
        alignSelf: 'center'
    },
    input:{
        alignSelf:'center',
        width: width/2 + 170,
        height: height/15,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
        borderRadius:10,
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: 75
    },

    button:{
        alignSelf:'center',
        width: width/2 ,
        height: height/15,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
        borderRadius:10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    }
})