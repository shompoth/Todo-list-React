import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://projet-todo-5a391-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
