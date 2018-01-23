import React from 'react';

import { Form, Input } from 'antd';


const FormItem = Form.Item;

class CreatePostForm extends React.Component {
    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }; // {...formItemLayout} spread operator, spread out all props

        return (
            <Form layout="vertical">
                <FormItem
                    {...formItemLayout}
                    label="Message">
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input a message.' }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}

// enhance CreatePostForm, otherwise there is no check true function
export const WrappedCreatedPostForm = Form.create()(CreatePostForm);
