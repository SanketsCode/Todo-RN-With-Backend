import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';
import {getData} from '../config/Main';

export default function AddTodo({
  setTodos,
}: {
  setTodos: Dispatch<SetStateAction<never[]>>;
}) {
  const [todo, setTodo] = useState<string>('');
  const addTodo = async () => {
    if (todo == '') {
      ToastAndroid.show('Please Enter Text', ToastAndroid.SHORT);
      return;
    }
    await axios
      .post('http://192.168.1.104:3000/todos', {
        description: todo,
      })
      .then(res => {
        console.log(res);
        ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
        getData({setTodos});
        setTodo('');
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show('Not Added', ToastAndroid.SHORT);
      });
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainer}
          value={todo}
          onChangeText={setTodo}
        />
        <TouchableOpacity onPress={addTodo} style={styles.btn}>
          <View>
            <Ionicons name="add-outline" size={40} style={{color: '#000'}} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#EDEDED',
    paddingHorizontal: 10,
    fontSize: 20,
    width: '75%',
  },
  btn: {
    backgroundColor: '#8DEAFA',
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
});
