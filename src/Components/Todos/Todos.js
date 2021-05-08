import Todo from "./Todo/Todo";

function Todos(props) {
  return (
    <>
      {props.todos.map((todo, index) => (
        <Todo
          key={index}
          nom={todo.nom}
          done={todo.done}
          delete={(e) => props.delete(index)}
          changeDone={() => props.changeDone(index)}
        />
      ))}
    </>
  );
}

export default Todos;
