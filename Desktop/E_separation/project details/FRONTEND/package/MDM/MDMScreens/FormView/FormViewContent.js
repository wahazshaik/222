import React, {Component} from "react";
import {Form} from "antd";
import FormHeader from "./FormHeader";
import FormLoader from "./FormLoader";
import FormRenderer from "./FormRenderer";
import WorkflowSection from "../../../WORKFLOW/WorkflowSection";


export default class FormViewContent extends Component {

    render() {
        let workflow = null;
        if (this.props.editDataAvailable && this.props.source !== "master" && this.props.toShowApprovalSection) {
            workflow = (<WorkflowSection
                key={"workflowsection"}
                hideApprovalAction={this.props.hideApprovalAction}
                request_no={this.props.request_no}
                request_category={this.props.request_category}
                request_date={this.props.request_date}
                approval_status={this.props.approval_status}
                app={this.props.app}
                model={this.props.model}
                updateWorkflow={this.props.updateWorkflow}
                status={this.props.status}
                approval_type={this.props.approval_type}
                isRemarksRequired={true}
            />)

        } else if (this.props.toShowApprovalCard) {
            workflow = (<WorkflowSection
                key={"workflowsection"}
                hideApprovalAction={!this.props.toShowApprovalDropdown}
                request_no={this.props.routeState}
                request_category={this.props.routeName}
                request_date={this.props.request_date}
                approval_status={this.props.approval_status}
                app={this.props.app_name}
                model={this.props.routeName}
                status={this.props.status}
                approval_type={this.props.approval_type}
                updateWorkflow={this.props.updateWorkflow}
                isRemarksRequired={true}
            />)

        }
        return (
            <Form ref={this.props.formRef}
                  onFinish={this.props.onFinish}
                  layout={"vertical"}
                  form={this.props.form}
                  autoComplete={"off"}
            >
                {this.props.toShowHeader?
                    <FormHeader {...this.props} />
                :null}
                {workflow}
                <FormLoader {...this.props} />
                <FormRenderer {...this.props} />
            </Form>
        );
    }
}
