import React, { Component } from 'react';
import { Upload, message, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const props = {
    name: 'file',
    accept:'application/epub+zip',
    action: 'http://localhost:3000/upbook',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class BookUp extends Component {
    render() {
        return (
            <div>
                <Card title="电子书上传" style={{ width: '90%', margin: 'auto' }}>
                    <Upload {...props}>
                        <Button>
                            <UploadOutlined />点击上传
                        </Button>
                    </Upload>
                </Card>
            </div>
        );
    }
}

export default BookUp;