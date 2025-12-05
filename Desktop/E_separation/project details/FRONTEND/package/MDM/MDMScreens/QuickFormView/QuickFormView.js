import React from 'react';
import FormView from '../FormView/FormView'
import { Drawer,Space, Button,Form } from 'antd';
import {withRouter} from "react-router-dom"; // Sends all routing details specified in Route to local history

class QuickFormView extends React.Component {
    
    onClose = (submitted) => {
        if(submitted){
            console.log(this.props.form)
            this.props.form.submit();
        }else{
            this.props.removeRouteState();
        }
        
    };

    render() {
        return (
            <Drawer
                title={this.props.routeState==='new'?'Create '+this.props.routeName:'Edit ' +this.props.routeName}
                width={720}
                style={{ marginTop: '38px' }} 
                closable={false}
                visible={this.props.routeState}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={()=>this.onClose(false)}>Cancel</Button>
                        <Button onClick={()=>this.onClose(true)} type="primary">
                            Submit
              </Button>
                    </Space>
                }
            >
                <FormView 
                    {...this.props}
                    toShowHeader={false}
                />

            </Drawer>
        );
    }
}

export const withUseFormHook = (Component) => {
    return props => {
        const [form] = Form.useForm();
        return <Component {...props} form={form}  />
    }       
}

export default withRouter(withUseFormHook(QuickFormView));
