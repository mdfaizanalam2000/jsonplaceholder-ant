import { Table, message } from 'antd'
import { EyeFilled, EditFilled, DeleteFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import ViewModal from './ViewModal'
import EditModal from './EditModal'

const TableComponent = () => {
    const [todos, setTodos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState({})

    const [messageApi, contextHolder] = message.useMessage();

    const showModal = (todo) => {
        setSelectedTodo(todo)
        setIsModalOpen(true);
    };

    const showEditModal = (todo) => {
        setSelectedTodo(todo)
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos")
            const todos = await response.json()
            setTodos(todos)
        }
        fetchTodos()
    }, [])

    const columns = [
        {
            title: 'SNo',
            render: (value, item, index) => index + 1
        },
        {
            title: 'Task ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
            render: (text) => text === true ? "Yes" : "No"
        },
        {
            title: "Actions",
            render: (item) => {
                return <>
                    {contextHolder}
                    <EyeFilled className='icon' onClick={() => showModal(item)} />
                    <EditFilled className='icon' onClick={() => showEditModal(item)} />
                    <DeleteFilled className='icon' onClick={() => handleDeleteTodo(item)} />
                </>
            }
        }
    ];

    const handleDeleteTodo = (item) => {
        setTodos(todos.filter((todo) => {
            return todo.id !== item.id
        }))
        messageApi.success('Task deleted!');
    }

    return (
        <>
            <h1 className='text-center'>List of todos</h1>
            <Table dataSource={todos} columns={columns} rowKey="id" />
            <ViewModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
            <EditModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} todos={todos} setTodos={setTodos} messageApi={messageApi} />
        </>
    )
}

export default TableComponent