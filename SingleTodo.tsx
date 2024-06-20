import React, { useState } from 'react';
import { Todo } from '../model';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline, MdOutlineDownloadDone } from 'react-icons/md';
import "./style.css";

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, setTodos, todos }) => {
    const [edit, setEdit] = useState<Boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.task)

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        alert("added todo")
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
        alert("Todo has been deleted")
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, task: editTodo } : todo))
        setEdit(false)
    }

    return (
        <form className='todos_single' onSubmit={(e) => handleEdit(e, todo.id)}>
            {
                edit ? (
                    <input value={editTodo} placeholder='Edit the todo' onChange={(e) => setEditTodo(e.target.value)} className='todos_single--text' />
                ) : (
                    todo.completed ? (
                        <s className='todos_single--text'>{todo.task}</s>
                    ) : (
                        <span className='todos_single--text'>{todo.task}</span>
                    )

                )
            }


            <div>
                <span className="icon" onClick={() => {
                    if (!edit && !todo.completed) {
                        setEdit(!edit)
                    }
                }}>
                    <CiEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <MdOutlineDeleteOutline />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdOutlineDownloadDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;
