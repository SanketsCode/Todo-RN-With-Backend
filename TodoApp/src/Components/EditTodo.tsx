import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Todo} from '../types/props';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';
import {getData} from '../config/Main';

interface props {
  todo: Todo;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function EditTodo({todo, setEditMode, setTodos}: props) {
  const [todoId, setTodoId] = useState(todo.todo_id);
  const [description, setDescription] = useState(todo.description);

  useEffect(() => {
    setTodoId(todo.todo_id);
    setDescription(todo.description);
 },[todo]);

  const updateTodo = async () => {
    if (description == '') {
      ToastAndroid.show('Please add Some Text', ToastAndroid.SHORT);
      return;
    }

    axios
      .put(`http://192.168.1.104:3000/todos/${todoId}`, {
        description,
      })
      .then(res => {
        ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
        getData({setTodos});
        setEditMode(false);
      })
      .catch(err => {
        ToastAndroid.show('Facing Issue', ToastAndroid.SHORT);
      });
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputContainer}
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity onPress={updateTodo} style={styles.btn}>
          <View>
            <MaterialIcons name="edit" size={40} style={{color: '#000'}} />
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
