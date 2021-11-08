import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    const data = { 
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    } as Task;
    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    let newArray = [...tasks];
    const taskIndex = tasks.findIndex(task => task.id === id);
    newArray[taskIndex] = {...newArray[taskIndex], done: !newArray[taskIndex].done }
    setTasks([...newArray])

  }

  function handleRemoveTask(id: number) {
   const newArray = tasks.filter((task) => task.id !== id);
   setTasks(newArray);
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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