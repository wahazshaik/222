import React from "react";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import FormViewContent from "../MDM/MDMScreens/FormView/FormViewContent";
import {
    custom_api_call,
    get_approval_model,
    get_dropdown_data_api_call,
    HEADER_JSON as header,
    MASTER_DATA_SERVER_URL,
    options_api_call,
    TRANSACTION_DATA_SERVER_URL,
    versioncheck_api_call
} from "../COMS/Utils/ApiCommunicaton";
import {error, openNotification,} from "../COMS/NotificationMessageMapping";
import {
    apiCall,
    notificationMessage,
    notificationTitle,
    openNotificationType,
} from "../MDM/MDMUIConfigs/MDMUIMappings";
import TimeLine from "../MDM/MDMScreens/FormView/TimeLine";
import WorkflowSection from "./WorkflowSection";
import FlattenObjects from "../COMS/Utils/FlattenObjects";
import {localStorageVariableName} from "../AppConfigs";

/**
 * ApprovalForm
 * @param {dataApiUrl} : Api Call for getting the data to be loaded in the formview
 * @param {requestId} : Primary key value of the data on which approval will work
 * @param {modelName} : Model Name for the api calls
 * @param {appName} : App Name for the api calls
 * @param {requestCategory} : Category of the form (Model-name, Project-name)
 * @param {reversionApiUrl} : Api Call for showing reversion
 */


const source = "approval";

class ApprovalForm extends React.Component {
    formRef = React.createRef();
    not_to_preprocess_fields = [];
    app = null;
    model = null;
    request_id = null;
    key = null;
    state = {
        dropdownData: null,
        editFormData: null,
        editDataAvailable: false,
        sections: [],
        loading: true,
        fieldPermissions: [],
        versionList: null,
        request_no: null,
        request_category: null,
        request_date: null,
        approval_status: null,
        status: null,
        dropdownValueSelected: {}
    };


    setDropDownValue = (decorator, dropdownData) => {
        let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
        dropdownValueSelected[decorator] = dropdownData;
        this.setState({dropdownValueSelected});
    };

    componentDidMount() {
        // Fetching form fields data on component initialization

        get_approval_model()
            .then((res) => {
                if (res.ok) {
                    res.json().then((response) => {
                        localStorage.setItem(localStorageVariableName.authToken, response["auth_token"]);
                        localStorage.setItem(localStorageVariableName.userName, response["username"]);
                        localStorage.setItem(localStorageVariableName.isLoggedIn, true);

                        try {
                            document.getElementsByClassName("currentUser")[1].innerText = "Hi, " + response["username"]
                        } catch (e) {

                        }


                        header.Authorization = JSON.parse(
                            localStorage.getItem(localStorageVariableName.authToken));
                        header.Authorization = JSON.parse(
                            localStorage.getItem(localStorageVariableName.authToken));
                        this.app = response.app;
                        this.model = response.model;
                        this.request_id = response.request_id;
                        if (response.approval_api_url) {
                            this.approval_api_url =
                                TRANSACTION_DATA_SERVER_URL + response.approval_api_url;
                        } else {
                            this.approval_api_url =
                                TRANSACTION_DATA_SERVER_URL + "/workflow/approval";
                        }
                        this.optionsApiCall();
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.api,
                        notificationMessage.apiConnectionError
                    );
                }
            })
            .catch((e) => {

                openNotification(
                    openNotificationType.error,
                    notificationTitle.api,
                    notificationMessage.apiConnectionError
                );
            });
    }

    optionsApiCall = () => {
        options_api_call(
            this.app,
            this.model + apiCall.formViewOptionsCall + "&id=" + this.request_id
        )
            .then((res) => {
                if (res.ok) {
                    res.json().then((sections) => {
                        this.setState({sections, loading: false}, () => {
                            this.getData();
                            this.reversionCall();
                        });
                        sections.map((subsection) => {
                            subsection.colComponent.map((item) => {
                                if (item.linked) {
                                    this.not_to_preprocess_fields.push(item.decorator);
                                    this.dropdownApiCall(item);
                                }
                                if (item.listed) {
                                    let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
                                    dropdownValueSelected[item.link_api] = item.list_data;
                                    this.setState({dropdownValueSelected});
                                }
                                return null;
                            });
                            return null;
                        });
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.api,
                        notificationMessage.apiConnectionError
                    );
                }
            })
            .catch(() => {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.api,
                    notificationMessage.apiConnectionError
                );
            });
    };

    onChangeSelect = (value, decorator, e, primary_key_field, props) => {

    };

    dropdownApiCall = (item) => {
        get_dropdown_data_api_call(
            item.dropdown_app,
            item.link_api + apiCall.listViewCall + apiCall.dropDownCall
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.permissions,
                        notificationMessage.nopermissions
                    );
                }
            })
            .then((dropdownData) => {
                let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
                dropdownValueSelected[item.link_api] = dropdownData;
                if (item.dependent) {
                    dropdownValueSelected[item.link_api] = [];
                }
                this.setState({dropdownValueSelected});
            });
    };

    getData = () => {
        custom_api_call(MASTER_DATA_SERVER_URL + "/" + this.app + "." + this.model + "/" + this.request_id, "GET", null).then(
            (res) => {
                if (res.ok) {
                    res.json().then((editFormData) => {
                        const data = editFormData;

                        this.setState({
                            editFormData: data,
                            editDataAvailable: !this.state.editDataAvailable,
                            request_no: this.request_id,
                            request_category: this.props.requestCategory,
                            request_date: data["created_date"],
                            approval_status: data["is_approved"] ? "Approved" : "Pending",
                            status: data["status"],
                        });
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.api,
                        notificationMessage.apiConnectionError
                    );
                }
            }
        );
    };

    reversionCall = () => {
        versioncheck_api_call(this.app, this.model, this.request_id).then((res) => {
            if (res.ok) {
                res.json().then((versionList) => {
                    this.setState({versionList});
                });
            }
        });
    };

    preProcessData(sourceData) {
        let fieldData = [],
            resultData = {};
        for (let i = 0; i < this.not_to_preprocess_fields.length; i++) {
            let key = this.not_to_preprocess_fields[i];
            fieldData[key] = sourceData[key];
            delete sourceData[key];
        }
        FlattenObjects(sourceData, resultData);
        for (let key in fieldData) resultData[key] = fieldData[key];
        return resultData;
    }

    updateWorkflow = (values) => {
        values["id"] = this.request_id;
        values["app_name"] = this.app;
        values["model_name"] = this.model;
        if (values["id"] !== undefined) {
            custom_api_call(this.approval_api_url, "PATCH", values).then((res) => {
                if (res.ok) {
                    openNotification(
                        openNotificationType.success,
                        notificationTitle.form,
                        notificationMessage.approve
                    );
                    setTimeout(() => {
                        localStorage.removeItem(localStorageVariableName.guestAuthToken);
                        localStorage.removeItem(localStorageVariableName.authToken);
                        localStorage.removeItem("approval-authorization");
                        window.location.href = window.location.protocol + "//" + window.location.host + "/";
                    }, 500)

                } else {
                    error(notificationMessage.formSubmitError);
                }
            });
        }
    };

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.editDataAvailable ? (
                        <WorkflowSection
                            hideSection={false}
                            request_no={this.state.request_no}
                            request_category={this.state.request_category}
                            request_date={this.state.request_date}
                            approval_status={this.state.approval_status}
                            app={this.app}
                            model={this.model}
                            updateWorkflow={this.updateWorkflow}
                            status={this.state.status}
                            isRemarksRequired={true}
                        />
                    ) : null}

                    <FormViewContent
                        sections={this.state.sections}
                        dropdownValueSelected={dropdownValueSelected}
                        loading={this.state.loading}
                        editFormData={this.state.editFormData}
                        editDataAvailable={this.state.editDataAvailable}
                        formRef={this.formRef}
                        routeState={this.state.routeState}
                        setDropDownValue={this.setDropDownValue}
                        source={source}
                        toShowHeader={false}
                        onChangeSelect={this.onChangeSelect}
                    />
                </div>
                <div className="timeline">
                    <TimeLine versionList={this.state.versionList}/>
                </div>
            </div>
        );
    }
}

export default withRouter(ApprovalForm);
