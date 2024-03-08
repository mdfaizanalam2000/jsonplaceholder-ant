import React from 'react';
import { Modal } from 'antd';

const ViewModal = ({ isModalOpen, setIsModalOpen, selectedTodo, setSelectedTodo }) => {
    const handleOk = () => {
        setSelectedTodo({});
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setSelectedTodo({});
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal cancelButtonProps={{ style: { display: 'none' } }} title="Todo Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p><b>UserID: </b>{selectedTodo.userId}</p>
                <p><b>TodoID: </b>{selectedTodo.id}</p>
                <p><b>Title: </b>{selectedTodo.title}</p>
                <p><b>Completed: </b>{selectedTodo.completed ? "Yes" : "No"}</p>
            </Modal>
        </>
    );
}

export default ViewModal