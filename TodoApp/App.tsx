import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Todo, renderProp} from './src/types/props';
import {defaultStyles} from './src/config/styles';
import AddTodo from './src/Components/AddTodo';
import ShowTodo from './src/Components/ShowTodo';
import {getData} from './src/config/Main';
import EditTodo from './src/Components/EditTodo';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getData({setTodos});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.text, {fontSize: 30, textAlign: 'center'}]}>
        Todo List
      </Text>
      {!editMode && <AddTodo setTodos={setTodos} />}
      {editMode && editTodo && (
        <EditTodo
          todo={editTodo}
          setEditMode={setEditMode}
          setTodos={setTodos}
        />
      )}
      <View style={styles.tableContainer}>
        <View style={styles.Tcontainer}>
          <Text
            style={[defaultStyles.text, {width: '20%', textAlign: 'center'}]}>
            ID
          </Text>
          <Text
            style={[defaultStyles.text, {width: '50%', textAlign: 'center'}]}>
            TASK
          </Text>

          <TouchableOpacity
            style={{width: '15%', elevation: 5}}></TouchableOpacity>
          <TouchableOpacity
            style={{width: '15%', elevation: 5}}></TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={({item, index}: renderProp) => (
            <ShowTodo
              todo={item}
              setEditMode={setEditMode}
              setEditTodo={setEditTodo}
              setTodos={setTodos}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tableContainer: {
    marginTop: 15,
  },
  Tcontainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderColor: '#000',
  },
});
