import React from "react";
import {Button, Form, Upload} from "antd";
import {DownloadOutlined, UploadOutlined} from "@ant-design/icons";
import {openNotification} from "../../COMS/NotificationMessageMapping";
import {notificationMessage, notificationTitle, openNotificationType,} from "../../MDM/MDMUIConfigs/MDMUIMappings";

export default class AndtDUploadWrapper extends React.Component {

    handleRemove = (file) => {
        this.props.removeFile(file, this.props.decorator);
        this.props.formRef.current.setFieldsValue({
            [this.props.decorator]: [],
        });
    };

    handleBeforeUpload = (file) => {
        if (file.name.split(".").length > 2) {
            openNotification(
                openNotificationType.error,
                notificationTitle.form,
                notificationMessage.fileTypeNotAllowed
            );
            return Upload.LIST_IGNORE;
        }
        if (this.props.accept_file_type && !this.props.accept_file_type.includes(file.type)) {
            openNotification(
                openNotificationType.error,
                notificationTitle.form,
                notificationMessage.fileTypeNotAllowed
            );
            return Upload.LIST_IGNORE;
        }

        if (this.props.files_limit && this.props.uploadFileList[this.props.decorator] && this.props.uploadFileList[this.props.decorator].length >= this.props.files_limit) {
            openNotification(
                openNotificationType.error,
                notificationTitle.form,
                notificationMessage.fileLimitExceeded
            );
            return Upload.LIST_IGNORE;
        }
        let kb = file.size / 1000;
        let mb = kb / 1000;
        if (this.props.file_size_limit_mb) {
            if (mb <= this.props.file_size_limit_mb) {
                this.props.addFile(file, this.props.decorator);
            } else {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.form,
                    notificationMessage.fileSizeExceeded
                );
            }
        } else {
            this.props.addFile(file, this.props.decorator);
        }
        return Upload.LIST_IGNORE;
    };

    render() {

        if (this.props.editDataAvailable) {
            if (this.props.uploadFileList.hasOwnProperty(this.props.decorator)) {
                this.props.formRef.current.setFieldsValue({
                    [this.props.decorator]: this.props.uploadFileList[this.props.decorator]
                });
            } else {
                this.props.formRef.current.setFieldsValue({
                    [this.props.decorator]: []
                });
            }
        }

        let props = this.props;
        return (
            <Form.Item
                style={{marginBottom: "10px"}}
                label={this.props.label}
                name={this.props.name}
                help={
                    this.props.required ?
                        this.props.uploadFileList[this.props.decorator] && this.props.uploadFileList[this.props.decorator].length === 0 &&
                            props.message : ""
                       
                }
                rules={[{ required: this.props.required, message: this.props.message },
                () => ({
                    validator(rule, value) {
                        if (props.required && props.uploadFileList.hasOwnProperty(props.decorator) && props.uploadFileList[props.decorator].length === 0) {
                            return Promise.reject();
                        } else {
                            return Promise.resolve();
                        }
                    },

                }),]}
            >
                <Upload
                    onRemove={this.handleRemove}
                    beforeUpload={this.handleBeforeUpload}
                    disabled={this.props.disabled}
                    onDownload={this.props.downloadFile}
                    onPreview={this.props.previewFile}
                    accept={this.props.accept_file_type}
                    fileList={this.props.uploadFileList[this.props.decorator]}
                    value={this.props.uploadFileList[this.props.decorator]}
                    showUploadList={{showDownloadIcon: true, downloadIcon: <DownloadOutlined/>,}}
                >
                    <Button>
                        <UploadOutlined/> Select File
                    </Button>
                </Upload>
            </Form.Item>
        );
    }
}
