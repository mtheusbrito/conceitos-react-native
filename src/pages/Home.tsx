import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    const taskAlredExists = tasks.find((t)=>t.title.toLocaleLowerCase().replace(' ','' ) === newTaskTitle.toLowerCase().replace(' ', ''));
    if(taskAlredExists){
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome.');
      return;
    }else{
    const data = { 
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        } as Task;
        setTasks([...tasks, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    let newArray = [...tasks];
    const taskIndex = tasks.findIndex(task => task.id === id);
    newArray[taskIndex] = {...newArray[taskIndex], done: !newArray[taskIndex].done }
    setTasks([...newArray]);
  }
  function handleEditTask(taskId: number, taskNewTitle: string){
    let newArray = [...tasks];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    newArray[taskIndex] = {...newArray[taskIndex], title: taskNewTitle }
    setTasks([...newArray]);

  }
  function handleRemoveTask(id: number) {
    Alert.alert('Tem certeza que você deseja remover esse item?','', [{text: "Cancelar", onPress: ()=>{
      
    },style: 'cancel'},{
      text: 'Ok',
      onPress: ()=>{
        const newArray = tasks.filter((task) => task.id !== id);
        setTasks(newArray);
      }
    }])
   
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})