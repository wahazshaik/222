import React from 'react';
import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'
import {APP_NAME, restrictFields, settings, route_url as routeUrl} from '../../../AppConfigs';
import FormViewContent from './FormViewContent';
import {
    file_download_api_call,
    get_dropdown_data_api_call,
    get_indicate_approval_type,
    get_single_data_api_call,
    options_api_call,
    patch_workflow_update_call,
    post_api_call,
    update_api_call,
    versioncheck_api_call
} from '../../../COMS/Utils/ApiCommunicaton';
import {validator_mapping,} from '../../MDMCustomValidators/MDMCustomValidatorsMapping';
import {error, openNotification, success,} from '../../../COMS/NotificationMessageMapping';
import {
    apiCall,
    formViewLabels,
    notificationMessage,
    notificationTitle,
    openNotificationType,
    routeMode,
} from '../../MDMUIConfigs/MDMUIMappings';
import TimeLine from './TimeLine';
import moment from "moment";

const route_url = routeUrl.url + "/";

const APP = APP_NAME.MASTER;

const source = "master";

class FormView extends React.Component {
    formRef = React.createRef();
    state = {
        dropdownData: null,
        editFormData: null,
        editDataAvailable: false,
        sections: [],
        routeName: process.env.REACT_APP_PROJECT_ROUTE==="/null"?this.props.location.pathname.substr(1).split("/")[0]:this.props.location.pathname.substr(1).split("/")[1],
        routeState: this.props.hasOwnProperty('routeState')?this.props.routeState:process.env.REACT_APP_PROJECT_ROUTE==="/null"?this.props.location.pathname.substr(1).split("/")[1]:this.props.location.pathname.substr(1).split("/")[2],
        loading: true,
        fieldPermissions: [],
        versionList: null,
        listView: null,
        uploadFileList: [],
        showFormDataLoader: false,
        toShowApprovalCard: false,
        toShowApprovalDropdown: false,
        approval_type: [],
        status: "",
        dropdownValueSelected : {}
    };

    setDropDownValue = (decorator, dropdownData) => {
        let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
        dropdownValueSelected[decorator] = dropdownData;
        this.setState({dropdownValueSelected});
    };

    addFile = (file, decorator) => {
        let uploadFileList = {...this.state.uploadFileList};
        if (!(Object.keys(uploadFileList).includes(decorator))) {
            uploadFileList[decorator] = []
        }
        uploadFileList[decorator].push(file);
        this.setState({uploadFileList})
        this.formRef.current.setFieldsValue({
            decorator: uploadFileList,
        });
    };

    removeFile = (file, decorator) => {
        let uploadFileList = {...this.state.uploadFileList};
        uploadFileList[decorator] = uploadFileList[decorator].filter((f) => f.uid !== file.uid);
        this.setState({uploadFileList})
        this.formRef.current.setFieldsValue({
            decorator: uploadFileList,
        });
    };

    downloadFile = (file) => {
        if (file instanceof File) {
            if (navigator.appVersion.toString().indexOf(".NET") > 0) {
                window.navigator.msSaveBlob(file, file.name);
            } else {
                var link = document.createElement("a");
                link.download = file.name;
                link.href = URL.createObjectURL(file);
                link.click();
            }
        }
        file_download_api_call(file.uid).then((res) => {
            if (res.ok) {
                res.blob().then((blob) => {
                    if (navigator.appVersion.toString().indexOf(".NET") > 0) {
                        window.navigator.msSaveBlob(blob, file.name);
                    } else {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = file.name;
                        a.click();
                    }
                });
            } else {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.api,
                    notificationMessage.apiConnectionError
                );
            }
        });
    };

    previewFile = (file) => {
        if (file.moss_url) {
            let a = document.createElement("a");
            a.href = file.moss_url;
            a.target = "_blank";
            a.click();
        }
    };

    onFinishFailed = ({errorFields}) => {
        this.formRef.current.scrollToField(errorFields[0].name);
    };

    onFinish = values => {
        if (this.state.routeState !== routeMode.new) {
            const sectionName = this.state.sections[0][formViewLabels.sectionLabel];
            let data = null;
            if (validator_mapping[APP][sectionName]) {
                data = validator_mapping[APP][sectionName][formViewLabels.formValidator].validator(values);
                if (data) {
                    const err = data.error;
                    this.formRef.current.setFields([{
                        name: [data.fieldname],
                        errors: [new Error(err)],
                    },]);
                } else {
                    this.updateSubmitData(values);
                }
            } else {
                this.updateSubmitData(values);
            }
        } else {
            const sectionName = this.state.sections[0][formViewLabels.sectionLabel];
            let data = null;
            if (validator_mapping[APP][sectionName]) {
                data = validator_mapping[APP][sectionName][formViewLabels.formValidator].validator(values);
                if (data) {
                    const err = data.error;
                    this.formRef.current.setFields([{
                        name: [data.fieldname],
                        errors: [new Error(err)],
                    },]);
                } else {
                    this.newsubmitData(values);
                }
            } else {
                this.newsubmitData(values);
            }
        }
    };

    changeDateFormats = (values) => {
        this.state.sections.forEach(subSection => {
            subSection.colComponent.forEach(component => {
                if (component.type === "date") {
                    if (values.hasOwnProperty(component.decorator) && values[component.decorator]!==undefined) {
                        values[component.decorator] = moment(values[component.decorator])
                            .format(component.dateFormatList);
                    }
                }
            });
        });
    };

    newsubmitData = (values) => {
        this.changeDateFormats(values);

        let formData = new FormData();
        formData.append('data', JSON.stringify(values));

        Object.entries(this.state.uploadFileList).forEach(([decorator, fileList]) => {
            fileList.forEach((file, index) => {
                formData.append(decorator + index, file);
            });
        });

        post_api_call(APP, this.state.routeName, formData)
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then((returnData) => {
                            success(notificationMessage.formSubmitSuccess);
                            if(settings.quickForm){
                                this.props.removeRouteState()
                            }else{
                                this.props.history.replace({
                                    pathname: route_url + this.state.routeName,
                                });
                            }
                            
                        });
                } else {
                    res.json()
                        .then((errorObject) => {
                            Object.keys(errorObject).forEach((fieldName) => {
                                this.formRef.current.setFields([{
                                    name: fieldName,
                                    errors: errorObject[fieldName],
                                },]);
                                if (errorObject[fieldName][0].includes('already exists.')) {
                                    openNotification(
                                        openNotificationType.error,
                                        notificationTitle.already_exists,
                                        notificationMessage.already_exists
                                    );
                                }
                            });
                            error(notificationMessage.formSubmitError);
                            if ('non_field_errors' in errorObject) {
                                error(errorObject.non_field_errors[0]);
                            }
                        });
                }
            });
    };

    updateSubmitData = (values) => {
       
        let formData = new FormData();

        const {uploadFileList} = this.state;
        let oldFiles = [];

        Object.entries(uploadFileList).forEach(([decorator, fileList]) => {
            fileList.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append(decorator + index, file);
                } else {
                    oldFiles.push(file);
                }
            });
        });

        formData.append("old_files", JSON.stringify(oldFiles));

        this.changeDateFormats(values);
        formData.append("data", JSON.stringify(values));

        update_api_call(
            APP,
            this.state.routeName,
            this.state.routeState,
            formData
        )
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(returnData => {
                            success(
                                notificationMessage.formUpdateSuccess + this.state.routeState
                            );
                            if(settings.quickForm){
                                this.props.removeRouteState()
                            }else{
                                this.props.history.replace({
                                    pathname: route_url + this.state.routeName,
                                });
                            }
                           
                        });
                   
                } else {
                    this.setState({showSubmitLoader:false});
                    res.json()
                        .then(errorObject => {
                            Object.keys(errorObject).forEach(fieldName => {
                                this.formRef.current.setFields([{
                                    name: fieldName,
                                    errors: errorObject[fieldName],
                                }]);
                            });
                            error(notificationMessage.formUpdateError);
                            if ('non_field_errors' in errorObject) {
                                error(errorObject.non_field_errors[0]);
                            }
                        });
                }
            });
    };

    applyRemovePermission = (sections) => {
        sections.forEach((subsection) => {
            subsection.colComponent.forEach((item, id) => {
                subsection.permissions.forEach(permissions => {
                    if (permissions.codename.slice(9) === item.decorator) {
                        item.decorator = ""
                    }
                });
            });
        });
        sections.forEach((subsection) => {
            subsection.colComponent = subsection.colComponent.filter(item => item.decorator !== "");
        });
    };

    applyReadOnlyPermission = (sections) => {
        sections.forEach((subsection, index1) => {
            subsection.colComponent.forEach((item, index) => {
                subsection.colComponent[index].toRemove = Object.values(restrictFields).includes(item.decorator);
            });
        });
        sections.forEach((subsection, index1) => {
            subsection.colComponent = subsection.colComponent.filter(item => item.toRemove === false)
        });
    };

    dropDownApiCall = (item) => {
        get_dropdown_data_api_call(APP, item.link_api + apiCall.listViewCall + apiCall.dropDownCall)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.permissions,
                        notificationMessage.nopermissions
                    );
                    this.onBackPressed()
                }
            })
            .then(dropdownData => {
                let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
                dropdownValueSelected[item.link_api] = dropdownData;
                if (item.dependent) {
                    dropdownValueSelected[item.link_api] = [];
                }
                this.setState({dropdownValueSelected});
            });
    };

    getData = () => {
        this.setState({showFormDataLoader: true}, () => {
            get_single_data_api_call(APP, this.state.routeName, this.state.routeState)
                .then(res => {
                    this.setState({showFormDataLoader: false}, () => {
                        if (res.ok) {
                            res.json().then(editFormData => {
                                let files = [];
                                if (editFormData.hasOwnProperty("is_filefield") && editFormData.hasOwnProperty("files") && editFormData["files"] && editFormData["is_filefield"]) {
                                    files = editFormData["files"]
                                }
                                this.setState({
                                    editFormData,
                                    status: 'status' in editFormData ? editFormData["status"] : '',
                                    editDataAvailable: !this.state.editDataAvailable,
                                    uploadFileList: files
                                });
                            });
                        } else {
                            openNotification(
                                openNotificationType.error,
                                notificationTitle.api,
                                notificationMessage.apiConnectionError
                            );
                            this.props.history.push({
                                pathname: route_url + this.state.routeName,
                            });
                        }
                    });
                })
        });
    };

    getVersions = () => {
        versioncheck_api_call(APP, this.state.routeName, this.state.routeState)
            .then(res => {
                if (res.ok) {
                    res.json().then(versionList => {
                        this.setState({versionList});
                    });
                }
            });
    };

    // workflow update functio nm call
    updateWorkflow = (values) => {
        try {
            this.setState({loading: true});
            patch_workflow_update_call(values).then((res) => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.api,
                        notificationMessage.apiConnectionError
                    );
                    this.setState({loading: false});
                }
            });
        } catch (error) {
            this.setState({loading: false});
        }
    };

    componentDidMount() {
        options_api_call(APP, this.state.routeName + apiCall.formViewOptionsCall + "&id=" + this.state.routeState)
            .then(res => {
                if (res.ok) {
                    res.json().then(sections => {
                        sections[0].permissions = Array.from(new Set(sections[0].permissions.map(JSON.stringify))).map(JSON.parse);
                        this.applyRemovePermission(sections);
                        if (this.state.routeState === routeMode.new) {
                            this.applyReadOnlyPermission(sections)
                        }
                        this.setState({sections, loading: false}, () => {
                            if (this.state.routeState !== routeMode.new) {
                                this.getData();
                                this.getVersions();
                            }

                            if ('show_card' in sections[0] && 'show_section' in sections[0]) {
                                this.setState({
                                        toShowApprovalCard: sections[0].show_card,
                                        toShowApprovalDropdown: sections[0].show_section
                                    },
                                    () => {
                                        get_indicate_approval_type(APP, this.state.routeName, this.state.routeState)
                                            .then((res) => {
                                                if (res.ok) {
                                                    res.json().then((data) => {
                                                        this.setState({approval_type: data['approval_type']})
                                                    });
                                                } else {
                                                    openNotification(
                                                        openNotificationType.error,
                                                        notificationTitle.api,
                                                        notificationMessage.apiConnectionError
                                                    );
                                                }

                                            })

                                    });
                            }
                        });

                        sections.forEach((subsection) => {
                            subsection.colComponent.forEach(item => {
                                if (item.linked) {
                                    this.dropDownApiCall(item)
                                }
                                if (item.listed) {
                                    let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
                                    dropdownValueSelected[item.link_api] = item.list_data;
                                    this.setState({dropdownValueSelected});
                                }
                            });
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

    }

    // Redirects to grid view on button click
    onBackPressed = () => {
        this.props.history.push({
            pathname: route_url + this.state.routeName,
        });
    };

    render() {
        console.log(this.props)
        return (
            <div>
              
                <div>
                    <FormViewContent
                        {...this.state}
                        form={this.props.form}
                        source={source}
                        toShowHeader={this.props.hasOwnProperty('toShowHeader')?this.props.toShowHeader:true}
                        showBackButton={true}
                        showSaveButton={true}
                        formRef={this.formRef}
                        onFinish={this.onFinish}
                        setDropDownValue={this.setDropDownValue}
                        onBackPressed={this.onBackPressed}
                        addFile={this.addFile}
                        removeFile={this.removeFile}
                        downloadFile={this.downloadFile}
                        previewFile={this.previewFile}
                        app_name={APP}
                        request_date={
                            this.state.editDataAvailable
                                ? this.state.editFormData["created_date"]
                                : ""
                        }
                        approval_status={
                            this.state.editDataAvailable
                                ? this.state.editFormData.is_approved
                                ? "Approved"
                                : "In Process"
                                : "In Process"
                        }
                        updateWorkflow={this.updateWorkflow}
                    />
                </div>
                <div className="timeline">
                    <TimeLine versionList={this.state.versionList}/>
                </div>
            </div>
        );
    }
}

export default FormView;
