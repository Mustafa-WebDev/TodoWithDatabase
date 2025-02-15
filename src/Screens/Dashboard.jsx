import { useState, useEffect } from "react";
import {
  Container, TextField, Button, List, ListItem, ListItemText,
  IconButton, Paper, Typography, Box
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material"; 
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function TodoApp() {
  const navigate = useNavigate();
  const userUid = localStorage.getItem("UserId"); 
  const [tasks, setTasks] = useState([]); 
  const [taskObj, setTaskObj] = useState({ task: "" }); 
  const [editingTask, setEditingTask] = useState(null); 
  const [editText, setEditText] = useState(""); 


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksRef = collection(db, "UsersTask", userUid, "tasks");
        const querySnapshot = await getDocs(tasksRef);
        const loadedTasks = querySnapshot.docs.map((doc) => {
          console.log("Document ID:", doc.id);
          console.log("Document Data:", doc.data());
          return { id: doc.id, ...doc.data() };
        }); 

        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userUid]);

  
  const addTask = async () => {
    if (!taskObj.task.trim()) return; 

    try {
      const tasksRef = collection(db, "UsersTask", userUid, "tasks");
      const docRef = await addDoc(tasksRef, {
        task: taskObj.task,
        createdAt: new Date(),
      });

      setTasks([...tasks, { id: docRef.id, task: taskObj.task }]);
      setTaskObj({ task: "" }); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const deleteTask = async (taskId, index) => {
    try {
      const taskRef = doc(db, "UsersTask", userUid, "tasks", taskId);
      await deleteDoc(taskRef);
      setTasks(tasks.filter((e, i) => i !== index)); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
  const startEditing = (task) => {
    setEditingTask(task.id); 
    setEditText(task.task); 
  };

  
  const saveTask = async (taskId) => {
    if (!editText.trim()) return; 

    try {
      const taskRef = doc(db, "UsersTask", userUid, "tasks", taskId);
      await updateDoc(taskRef, { task: editText });

      
      setTasks(tasks.map((task) =>
        task.id === taskId ? { ...task, task: editText } : task
      ));

      setEditingTask(null); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "1.5rem", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Todo App</Typography>

        
        <TextField
          label="Add a task"
          variant="outlined"
          fullWidth
          value={taskObj.task}
          onChange={(e) => setTaskObj({ task: e.target.value })}
          onKeyPress={(e) => e.key === "Enter" && addTask()} 
          style={{ marginBottom: "1rem" }}
        />

       
        <Button variant="contained" color="primary" fullWidth onClick={addTask}>
          Add Task
        </Button>

       
        <List>
          {tasks.map((task, index) => (
            <ListItem key={task.id} divider>
              {editingTask === task.id ? (
                
                <TextField
                  fullWidth
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                
                <ListItemText primary={task.task} style={{ color: "gray" }} />
              )}

              
              <Box>
                {editingTask === task.id ? (
                  <IconButton onClick={() => saveTask(task.id)}>
                    <Save color="primary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => startEditing(task)}>
                    <Edit color="secondary" />
                  </IconButton>
                )}
                <IconButton onClick={() => deleteTask(task.id, index)}>
                  <Delete color="error" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      
      <Box>
        <Button
        sx={{marginTop:5}}
        variant="contained"
          onClick={() => {
            localStorage.removeItem("UserId");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default TodoApp;
