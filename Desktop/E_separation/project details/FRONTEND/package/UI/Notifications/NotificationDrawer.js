import React, {createContext,useState } from "react";
import { Drawer, Card } from 'antd';
import { DeleteOutlined, LinkOutlined } from '@ant-design/icons';
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    return (
      <NotificationContext.Provider value={{ notifications, setNotifications }}>
        {children}
      </NotificationContext.Provider>
    );
  };


export default class NotificationDrawer extends React.Component {

    state={
        showDrawer: this.props.notificationToggle,
    }


    render() {
        return (
            <NotificationContext.Consumer >
                {context=>(
                    <Drawer 
                    title="Notifications" 
                    style={{ marginTop: '38px' }} 
                    placement="right" 
                    onClose= {()=>this.props.toggleNotification()}
                    visible={this.props.notificationToggle}>

                    {context.notifications.map(item =>
                        <>
                            <Card
                                actions={[
                                    <LinkOutlined key="setting" />,
                                    <DeleteOutlined key="ellipsis" />,
                                ]}
                                style={{ marginBottom: '15px' }}>
                                Content
                            </Card>

                        </>
                    )}

                </Drawer>
                )}
               
            </NotificationContext.Consumer>
        );
    }
}


