import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {ListItemView} from '../components/listItem.component';

var {width, height} = Dimensions.get('window');

export const DisplayScreen = ({navigation}) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchApi = async () => {
        await firestore()
          .collection('users')
          .orderBy('name', 'asc')
          .get()
          .then(querySnapshot => {
            /*
                  A QuerySnapshot allows you to inspect the collection,
                  such as how many documents exist within it,
                  access to the documents within the collection,
                  any changes since the last query and more.
              */
            let temp = [];
            console.log('Total users: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
              console.log('user Id: ', documentSnapshot.id);
              /*
                  A DocumentSnapshot belongs to a specific document,
                  With snapshot you can view a documents data,
                  metadata and whether a document actually exists.
                */
              let userDetails = {};
              // Document fields
              userDetails = documentSnapshot.data();
              // All the document related data
              userDetails['id'] = documentSnapshot.id;
              temp.push(userDetails);
              setListData(temp);
              setIsLoading(false);
            });
          });
      };
      fetchApi();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onDeleteUser = async deleteId => {
    console.log('Delete user ID', deleteId);
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

      <Text style={{alignSelf: 'center', color: '#FFF', marginBottom: 25}}>
        _________________________________
      </Text>

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
});
