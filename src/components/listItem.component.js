import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  TextInput,
  
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
var {width, height} = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';

export const ListItemView = ({item, onDelete}) => {
  const navigation = useNavigation()
  const [userName, setUserName] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const onUpdateUser = (userId) =>{
    firestore()
    .collection('users')
    .doc(userId)
    .update({
      name: userName
    })
    .then(()=>{
      navigation.navigate('DISPLAY')
    })
    .catch((e)=> console.log(e))
  }

  return (
    <View style={{flex: 1}}>
      <Modal visible={modalOpen} transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Image
                source={require('../assets/close.png')}
                style={{
                  tintColor: '#FFF',
                  width: 30,
                  height: 30,
                  marginLeft: 175,
                }}
              />
            </TouchableOpacity>
            <View style={{marginTop: 25}} />
            <View style={styles.subModalContainer}>
              <TouchableOpacity onPress={()=> [setEditModalOpen(true), setModalOpen(false)]}>
                <Text style={{color: '#007788'}}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.subModalContainer}>
              <TouchableOpacity onPress={()=> [onDelete(item.id), setModalOpen(false)]}>
                <Text style={{color: '#007788'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/*Update user Modal*/}          
      <Modal visible={editModalOpen} transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <View style={styles.editModalContainer}>
            <View style={{flexDirection: 'row',  alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>{item.name}</Text>
            <TouchableOpacity onPress={() => setEditModalOpen(false)}>
              <Image
                source={require('../assets/close.png')}
                style={{
                  tintColor: '#FFF',
                  width: 30,
                  height: 30,
                  marginLeft: 200
                  
                }}
              />
            </TouchableOpacity>
            </View>
           
            <View style={{marginTop: 50}}/>    
            <View style={styles.subEditModalContainer}>
                <TextInput
                  value={userName}
                  onChangeText={(text)=> setUserName(text)}
                  placeholder="Enter your new name"
                  placeholderTextColor="#777"
                  style={{color: '#007788'}}
                />
            </View>

            <View style={styles.subModalContainer}>
            <TouchableOpacity onPress={()=> [onUpdateUser(item.id), setEditModalOpen(false)]}>
                <Text style={{color: '#007788'}}>Update</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <View style={styles.viewContainer}>
          <Text style={{color: '#007788'}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  editModalContainer: {
    width: width / 2 + 150,
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
  subEditModalContainer: {
    width: width / 2 + 100,
    height: height / 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
 
  },
});
