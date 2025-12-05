import {message, notification} from "antd";


export const success = (response) => {
    message.success(response);
};

export const error = (response) => {
    message.error(response);
};

export const warning = (response) => {
    message.warning(response);
};

export const openNotification = (type, notificationTitle, notificationDescription) => {
    notification[type]({
        message: notificationTitle,
        description: notificationDescription,
    });
};