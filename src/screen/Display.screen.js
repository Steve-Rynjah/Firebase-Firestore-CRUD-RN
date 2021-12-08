import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {ListItemView} from '../components/listItem.component';

var {width, height} = Dimensions.get('window');

export const DisplayScreen = ({navigation}) => {
  const [listData, setListData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('')

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchApi = async () => {
        await firestore()
          .collection('users')
          .orderBy('name', 'asc')
          .get()
          .then(querySnapshot => {
            let temp = [];
            let masterTemp = [];

            querySnapshot.forEach(documentSnapshot => {
              let userDetails = {};
              let secondeUserDetails = {};

              userDetails = documentSnapshot.data();
              userDetails['id'] = documentSnapshot.id;
              temp.push(userDetails);

              secondeUserDetails = documentSnapshot.data();
              secondeUserDetails['id'] = documentSnapshot.id;
              masterTemp.push(secondeUserDetails)


              setListData(temp);
              setMasterData(masterTemp)
              setIsLoading(false);
    
            });
          });
      };
      fetchApi();
    } catch (e) {
      console.log(e);
    }
  }, []);



  const searchFilter = (text) => {
    if(text){
      const newData = masterData.filter((item)=>
      item.name.toLowerCase().includes(text.toLowerCase())
      )
      console.log('New data',newData)
      setListData(newData)
      setSearch(text)
    } else {
      setListData(masterData)
      setSearch(text)
    }
  }

  const onDeleteUser = async deleteId => {
    // console.log('Delete user ID', deleteId);
    await firestore()
      .collection('users')
      .doc(deleteId)
      .delete()
      .then(() => {
        //Toast
        console.log('User deleted');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#333" />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.header}>Member List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ADD')}>
          <Text style={{color: '#FFF', marginTop: 35, marginLeft: 50}}>
            Add+
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{alignSelf: 'center', color: '#FFF', marginBottom: 20}}>
        _________________________________
      </Text>

      <View style={styles.searchBar}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/search.png')}
          style={{width: 25, height: 25, marginLeft: 15}}
        />
        <TextInput
            value={search}
            placeholder="Search..."
            placeholderTextColor="#777"
            onChangeText={(text)=> searchFilter(text)}
            style={{color: '#007788', marginLeft: 10, fontSize: 17}}
        />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          marginHorizontal: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        {!isLoading ? (
          <FlatList
            data={listData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.subContainer}
            renderItem={({item}) => (
              <ListItemView item={item} onDelete={onDeleteUser} />
            )}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 250,
            }}>
            <ActivityIndicator size="large" color="#007788" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007788',
  },
  header: {
    color: '#FFF',
    fontSize: 24,
    marginLeft: 90,
    marginTop: 25,
  },
  subContainer: {
    paddingBottom: 15,
    width: width / 2 + 170,

    marginBottom: 700,
    alignSelf: 'center',
    borderRadius: 10,
  },
  viewContainer: {
    width: width / 2 + 130,
    height: height / 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    marginTop: 15,
    borderRadius: 10,
  },
  modalContainer: {
    width: width / 2 + 50,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#007788aa',
    marginTop: 250,
  },
  subModalContainer: {
    width: width / 2,
    height: height / 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: 25,
  },

  searchBar:{
    borderRadius:10,
    marginHorizontal: 15,
    height: height/15,
    backgroundColor: '#FFF',
    marginBottom: 15,
    justifyContent: 'center',
  }
});


