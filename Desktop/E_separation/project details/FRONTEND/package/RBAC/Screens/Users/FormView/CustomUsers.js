import React, {Component} from "react";
import PropTypes from "prop-types";
import FormViewContent from "../../../../MDM/MDMScreens/FormView/FormViewContent";
import moment from "moment";
import {routeMode} from "../../../../MDM/MDMUIConfigs/MDMUIMappings";
import {openNotification} from "../../../../COMS/NotificationMessageMapping";
import {UserDataProvider} from "../UsersDataProvider";
import {
  notificationMessage,
  notificationTitle,
  openNotificationType,
  restrictFields,
  USERS_APP_NAME,
  USERS_MODEL_NAME,
} from "../../../Config/Mappings";

class CustomUsers extends Component {
    dataProvider = new UserDataProvider();

    formRef = React.createRef();
    state = {
        dropdownData: null,
        editFormData: null,
        editDataAvailable: false,
        sections: [],
        routeName: this.props.location.pathname.substr(1).split("/")[1],
        routeState: this.props.location.pathname.substr(1).split("/")[2],
        loading: true,
        fieldPermissions: [],
        showProgress: false,
        versionList: null,
        listView: null,
        hideAction: false,
        showSaveButton: true,
        workflowData: [],
        dropdownValueSelected: {}
    };

    static get propTypes() {
        return {
            location: PropTypes.any,
            form: PropTypes.any,
            history: PropTypes.any,
        };
    }

    componentDidMount() {
        this.optionsCall();
    }

    optionsCall = () => {
        // Fetching form fields data on component intitalization
        this.dataProvider
            .optionsFormApiCall(
                USERS_APP_NAME,
                USERS_MODEL_NAME,
                this.state.routeState
            )
            .then((res) => {
                if (res.ok) {
                    res.json().then((sections) => {
                        this.setState({
                            hideAction: !sections[0].show_section,
                        });
                        sections[0].permissions = Array.from(
                            new Set(sections[0].permissions.map(JSON.stringify))
                        ).map(JSON.parse);
                        if (this.state.routeState === routeMode.new) {
                            this.applyReadOnlyPermission(sections);
                        } else {
                            this.applyReadOnlyPermissionUser(sections);
                        }

                        // Looping over section data to check if linked api or listed data are present or not
                        sections.forEach((subsection) => {
                            subsection.colComponent.forEach((item) => {
                                if (item.linked) {
                                    this.dropDownApiCall(item);
                                }
                                if (item.listed) {
                                    // Storing linked data corresponding to link name
                                    let dropdownValueSelected =  Object.assign({}, this.state.dropdownValueSelected); 
                                    dropdownValueSelected[item.link_api] = item.list_data;
                                    this.setState({dropdownValueSelected});
                                }
                            });
                        });

                        this.setState({sections, loading: false}, () => {
                            // If route mode is edit
                            if (this.state.routeState !== routeMode.new) {
                                // this.getVersions();
                                this.getData();
                            }
                        });
                    });
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.apiConnectionError
                    );
                }
            })
            .catch(() => {
                openNotification(
                    openNotificationType.error,
                    notificationTitle.error,
                    notificationMessage.apiConnectionError
                );
            });
    };

    applyRemovePermission = (sections) => {
        sections.forEach((subsection) => {
            subsection.colComponent.forEach((item, id) => {
                subsection.permissions.forEach((permissions) => {
                    if (permissions.codename.slice(9) === item.decorator) {
                        item.decorator = "";
                    }
                });
            });
        });
        sections.forEach((subsection) => {
            subsection.colComponent = subsection.colComponent.filter(
                (item) => item.decorator !== ""
            );
        });
    };

    applyReadOnlyPermission = (sections) => {
        sections.forEach((subsection, index1) => {
            subsection.colComponent.forEach((item, index) => {
                if (Object.values(restrictFields).includes(item.decorator)) {
                    subsection.colComponent[index].toRemove = true;
                } else {
                    subsection.colComponent[index].toRemove = false;
                }
            });
        });
        sections.forEach((subsection, index1) => {
            subsection.colComponent = subsection.colComponent.filter(
                (item) => item.toRemove === false
            );
        });
    };

    applyReadOnlyPermissionUser = (sections) => {
        sections[0].permissions.forEach((value, key) => {
            sections.forEach((subsection, index1) => {
                subsection.colComponent.forEach((item, index) => {
                    if (
                        value.codename.slice(16, value.codename.length) === item.decorator
                    ) {
                        subsection.colComponent[index].disabled = true;
                    }
                    if (value.codename.slice(16, value.codename.length) === "save") {
                        this.setState({
                            showSaveButton: false,
                        });
                    }
                });
            });
        });
    };

    dropDownApiCall = (item) => {
        this.dataProvider
            .dropDownApiCallMaster(item.link_api)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.apiConnectionError
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
        this.dataProvider
            .getRBACUserApi(USERS_APP_NAME, USERS_MODEL_NAME, this.state.routeState)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    this.props.history.push({
                        pathname: this.state.routeName,
                    });
                }
            })
            .then((editFormData) => {
                try {
                    this.setState({
                        editFormData,
                        editDataAvailable: !this.state.editDataAvailable,
                    });
                } catch (e) {
                    openNotification(
                        openNotificationType.error,
                        notificationTitle.error,
                        notificationMessage.apiConnectionError
                    );
                }
            });
    };

    postUser = (values) => {
        try {
            this.dataProvider
                .addUserProfileApi(USERS_APP_NAME, USERS_MODEL_NAME, values)
                .then((res) => {
                    if (res.ok) {
                        return res.json().then((res) => {
                            openNotification(
                                openNotificationType.success,
                                notificationTitle.success,
                                notificationMessage.formSubmitSuccess
                            );
                            this.onBackPressed();
                        });
                    } else {
                        return res.json().then((res) => {
                            Object.keys(res).map((i) =>
                                openNotification(openNotificationType.error, i, res[i][0])
                            );
                        });
                    }
                });
        } catch (error) {
            openNotification(
                openNotificationType.error,
                notificationTitle.error,
                notificationMessage.apiConnectionError
            );
        }
    };

    patchUser = (values) => {
        try {
            this.dataProvider
                .updateUserProfileApi(
                    USERS_APP_NAME,
                    USERS_MODEL_NAME,
                    values,
                    this.state.routeState
                )
                .then((res) => {
                    if (res.ok) {
                        return res.json().then((res) => {
                            openNotification(
                                openNotificationType.success,
                                notificationTitle.edit,
                                notificationMessage.formUpdateSuccess
                            );
                            this.onBackPressed();
                        });
                    } else {
                        return res.json().then((res) => {
                            Object.keys(res).map((i) =>
                                openNotification(openNotificationType.error, i, res[i][0])
                            );
                        });
                    }
                });
        } catch (error) {
            openNotification(
                openNotificationType.error,
                notificationTitle.edit,
                notificationMessage.formUpdateError
            );
        }
    };

    onBackPressed = () => {
        this.props.history.push({
            pathname:
                process.env.REACT_APP_PROJECT_ROUTE + "/" + this.state.routeName,
        });
    };

    changeDateFormats = (values) => {
        this.state.sections.forEach((subSection) => {
            subSection.colComponent.forEach((component) => {
                if (component.type === "date") {
                    if (values.hasOwnProperty(component.decorator)) {
                        values[component.decorator] = moment(
                            values[component.decorator]
                        ).format(component.dateFormatList);
                    }
                }
            });
        });
        return values;
    };

    onFinish = (values) => {
        // values = this.changeDateFormats(values);

        values["de_activated_at"] = moment();

        if (this.state.routeState !== "new") {
            this.patchUser(values);
        } else {
            this.postUser(values);
        }
    };

    render() {
        return (
            <FormViewContent
                onBackPressed={this.onBackPressed}
                sections={this.state.sections}
                onChangeRadio={() => console.log("Radio Checked")}
                loading={this.state.loading}
                editFormData={this.state.editFormData}
                editDataAvailable={this.state.editDataAvailable}
                onFinish={this.onFinish}
                formRef={this.formRef}
                form={this.props.form}
                routeState={this.state.routeState}
                onChangeSelect={this.onChangeSelect}
                toShowHeader={true}
                showSaveButton={this.state.showSaveButton}
                toShowBackButton={true}
                {...this.state}
            />
        );
    }
}

export default CustomUsers;
