import { Button, Checkbox, Form, Input, Modal } from 'antd';
import React from 'react'

const AddTodoModal = ({ isAddModalOpen, setIsAddModalOpen, setTodos, messageApi }) => {
    const [createForm] = Form.useForm();

    const handleCancel = () => {
        createForm.setFieldsValue([])
        setIsAddModalOpen(false);
    };

    const onFinish = (values) => {
        setTodos(prevState => [values, ...prevState])
        createForm.resetFields()
        setIsAddModalOpen(false)
        messageApi.success("Task created!")
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal title="Add Todo Details" open={isAddModalOpen} onCancel={handleCancel} footer={false}>
                <Form form={createForm}
                    name="createForm"
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="UserID (not editable later)"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your userid!',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        label="TodoID (not editable later)"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your todoid!',
                            },
                        ]}
                    >
                        <Input type='number' />
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
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="completed"
                        valuePropName='checked'
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        initialValue={false}
                    >
                        <Checkbox>Completed</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='btn' type="primary" htmlType="submit">
                            Create
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

export default AddTodoModal