// Librairies
import React, { useState, useEffect, useRef } from "react";
import classes from "./App.module.css";
import axios from "../../axios-firebase";

// Composants
import Title from "../../Components/Title/Title";
import Todos from "../../Components/Todos/Todos";

function App() {
  //States
  const [todos, setTodos] = useState([]);
  const [field, setField] = useState("");
  const [errorLength, setErrorLength] = useState(false);

  // Ref
  const inputRef = useRef(null);

  // Etats - Cycle de vie
  useEffect(() => {
    inputRef.current.focus();
    fetchTodos();
  }, []);

  // Methods
  const addTodoHandler = (e) => {
    if (errorLength) {
      setErrorLength(false);
    }
    e.preventDefault();
    if (field.length >= 4) {
      const newTodo = {
        nom: field,
        done: false,
      };
      axios.post("/todos.json", newTodo).then((response) => {
        fetchTodos();
        setField("");
      });
    } else {
      setErrorLength(true);
    }
  };

  const changeFieldHandler = (e) => {
    setField(e.target.value);
  };

  const deleteTodoHandler = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    axios
      .delete("/todos/" + todos[index].id + ".json")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeDoneHandler = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !todos[index].done;
    setTodos(newTodos);

    axios
      .put("todos/" + todos[index].id + ".json", todos[index])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTodos = () => {
    axios
      .get("/todos.json")
      .then((response) => {
        const newTodos = [];
        for (let key in response.data) {
          newTodos.push({
            ...response.data[key],
            id: key,
          });
        }

        setTodos(newTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.App}>
      <Title />
      <div className={classes.add}>
        <form onSubmit={(e) => addTodoHandler(e)}>
          <input
            value={field}
            onChange={(e) => changeFieldHandler(e)}
            type="text"
            placeholder="Que souhaitez-vous ajouter ?"
            ref={inputRef}
          />
          <button type="submit">Ajouter</button>
        </form>
        {errorLength && (
          <div style={{ color: "red" }}>
            <small>Veuillez inserer au moins 4 caractères</small>
          </div>
        )}
      </div>
      <Todos
        todos={[...todos]}
        delete={deleteTodoHandler}
        changeDone={changeDoneHandler}
      />
      {/* </> */}
      {/* )} */}
    </div>
  );
}

export default App;
