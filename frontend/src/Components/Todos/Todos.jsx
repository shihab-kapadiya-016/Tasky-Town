import React, { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import axios from "axios"
import api from "../../axios.js"

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("medium");

    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [editPriority, setEditPriority] = useState("");


    useEffect(() => {
        ;(async () => {
            try {
                const reponse = await api.get('/users/get-todos')
                const todoArray = reponse.data.data[0].todo
                

                setTodos(todoArray)
            
            } catch (error) {
                console.error("No Todos")
            }}) ()
    }, [])

    const addTodo = async () => {
    try {
        if (task.trim()) {
        setTodos([
            ...todos,
            {
            title: task,
            isCompleted: false,
            priority: priority,
            },
        ]);

        const response = await api.post("/todo/create-todo", 
            {
                title: task, 
                priority: priority,
            })
        setTask("");
        setPriority("medium");
    }
        } catch (error) {
            console.log(error)
    }
    };


    const toggleComplete = async (index) => {

        try {
            await api.patch(`/todo/toggle-complete/${todos[index]._id}`)
        } catch (error) {
            console.error(error.reponse)
        }

        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const deleteTodo = async (index) => {


        try {
            const response = await api.delete(`/todo/delete-todo/${todos[index]._id}`)
        
            const newTodos = todos.filter((_, i) => i !== index);
            setTodos(newTodos);

        } catch (error) {
            console.error(error.response.data)
        }

        

    };

    const saveEdit = async (index) => {

        try {
            api.patch(`/todo/update-title/${todos[index]._id}`, {title: editTask})
            api.patch(`/todo/update-priority/${todos[index]._id}`, {priority: editPriority})
            
        } catch (error) {
            console.error(error.message)
        }

    
        const newTodos = [...todos];
        newTodos[index].title = editTask;
        newTodos[index].priority = editPriority;
        setTodos(newTodos);
        setEditIndex(null);
    };

    const handleKeyPress = (e, index) => {
        if (e.key === "Enter") {
        saveEdit(index);
        }
    };

    const getPriorityColor = (level) => {
        switch (level) {
        case "high":
            return "bg-red-100 text-red-600";
        case "medium":
            return "bg-yellow-100 text-yellow-600";
        case "low":
            return "bg-green-100 text-green-600";
        default:
            return "";
        }
    };

    return (
        <div className="mt-10 bg-white px-4 py-10">
        <div className="max-w-xl mx-auto">
            <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">
            Tasky Town 🧠
            </h1>

            <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
            </select>

            <button
                onClick={addTodo}
                className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
            >
                Add
            </button>
            </div>

            <ul className="space-y-3">
            {todos.length === 0 && (
                <p className="text-gray-500 text-center">No tasks yet 😴</p>
            )}
            {todos.map((todo, index) => (
                <li
                key={index}
                className={`flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl shadow ${
                    todo.isCompleted ? "line-through text-gray-400" : ""
                }`}
                >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full">
                    {editIndex === index ? (
                    <>
                    <input
                        type="text"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, index)}
                        autoFocus
                        className="border-b w-full sm:w-auto outline-none text-black font-medium bg-transparent"
                    />
                    <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-xl shadow-sm font-semibold transition duration-150" onClick={() => saveEdit(index) }>
                        Save
                    </button>
                    </>
                    ) : (
                    <>
                        <span
                        onClick={() => {
                            setEditIndex(index);
                            setEditTask(todo.title);
                            setEditPriority(todo.priority);
                        }}
                        className="cursor-pointer font-medium w-full sm:w-auto"
                        >
                        {todo.title}
                        </span>
                        <span
                        onClick={() => {
                            setEditIndex(index);
                            setEditTask(todo.title);
                            setEditPriority(todo.priority);
                        }}
                        className={`text-xs px-2 py-1 rounded-full font-semibold cursor-pointer ${getPriorityColor(
                            todo.priority
                        )}`}
                        >
                        {todo.priority.toUpperCase()}
                        </span>
                    </>
                    )}
                </div>

                <div className="flex gap-2 ml-2">
                    <button
                    onClick={() => toggleComplete(index)}
                    className="text-green-600 hover:text-green-800"
                    title="Mark as done"
                    >
                    <FaCheck />
                    </button>
                    <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete task"
                    >
                    <FaTrash />
                    </button>
                </div>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
};

export default Todos;
