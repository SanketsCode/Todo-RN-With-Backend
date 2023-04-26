import  Axios  from "axios";
import { Dispatch, SetStateAction } from "react";

interface Todo{
    todo_id : number;
    description :string
}

export const getData = async ({setTodos}:{setTodos : Dispatch<SetStateAction<never[]>>}) => {
    await Axios.get('http://192.168.1.104:3000/todos')
      .then(res => {
        const data = res.data;
        data.sort((a : Todo, b : Todo) => {
            return a.todo_id - b.todo_id;
        });
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };