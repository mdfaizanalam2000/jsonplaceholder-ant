import React, { useEffect } from 'react'
import { Modal } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

const EditModal = ({ isModalOpen, setIsModalOpen, selectedTodo, setSelectedTodo, todos, setTodos, messageApi }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(selectedTodo)
        //eslint-disable-next-line
    }, [isModalOpen])

    const handleCancel = () => {
        setSelectedTodo({})
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        values = { ...values, completed: selectedTodo.completed }

        setTodos(todos.map((todo) => {
            if (todo.id === selectedTodo.id) {
                return values
            }
            return todo
        }))
        setSelectedTodo({})
        setIsModalOpen(false)
        messageApi.success("Task edited!")
    };
    const onFinishFailed = (errorInfo) => {
        alert('Failed:', errorInfo);
    };

    const handleCheckboxChange = (e) => {
        setSelectedTodo((prevState) => {
            return { ...prevState, completed: e.target.checked }
        })
        form.setFieldValue("completed", e.target.checked)
    }

    return (
        <>
            <Modal forceRender title="Edit Todo Details" open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Form form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="UserID (not editable)"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your userid!',
                            },
                        ]}
                        initialValue={selectedTodo.userId}

                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="TodoID (not editable)"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your todoid!',
                            },
                        ]}
                        initialValue={selectedTodo.id}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                        initialValue={selectedTodo.title}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="completed"
                        // valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        initialValue={selectedTodo.completed}
                    >
                        <Checkbox checked={selectedTodo.completed} onChange={(e) => handleCheckboxChange(e)}>Completed</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='btn' type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                        <Button type="primary" danger onClick={() => handleCancel()}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditModal