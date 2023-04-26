import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {Todo} from '../types/props';
import {defaultStyles} from '../config/styles';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';
import {getData} from '../config/Main';

interface props {
  todo: Todo;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setEditTodo: Dispatch<SetStateAction<Todo | null>>;
  setTodos: Dispatch<SetStateAction<never[]>>;
}

export default function ShowTodo({
  todo,
  setEditMode,
  setEditTodo,
  setTodos,
}: props) {
  const SetData = () => {
    setEditTodo(todo);
    setEditMode(true);
  };

  const DeleteTodo = async () => {
    await axios
      .delete(`http://192.168.1.104:3000/todos/${todo.todo_id}`)
      .then(res => {
        ToastAndroid.show('Successfully Deleted', ToastAndroid.SHORT);
        getData({setTodos});
      })
      .catch(err => {
        ToastAndroid.show('Not Deleted', ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.text, {width: '20%', textAlign: 'center'}]}>
        {todo.todo_id}
      </Text>
      <Text style={[defaultStyles.text, {width: '50%', textAlign: 'center'}]}>
        {todo.description}
      </Text>

      <TouchableOpacity onPress={SetData} style={{width: '15%', elevation: 5}}>
        <MaterialIcons name="edit" size={20} style={{color: '#8DFAD8'}} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={DeleteTodo}
        style={{width: '15%', elevation: 5}}>
        <MaterialIcons name="delete" size={20} style={{color: '#F1310B'}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderColor: '#000',
  },
});
