import ApiHelper, {excel_export_api_call} from "../../Utils/ApiHelper";
import {error, success} from "../../../COMS/NotificationMessageMapping";
import {notificationMessage} from "../../Config/Mappings";
import {
  API_VIEWS,
  GROUPS_ENDPOINT,
  HTTP_METHODS,
  MASTERS_ENDPOINT,
  RBAC_ENDPOINT,
  USERS_ENDPOINT,
} from "../../Config/API";

export let MASTER_DATA_SERVER = {
    SERVER_URL: process.env.REACT_APP_SERVER_URL, // REST API IP HOST
    PORT: process.env.REACT_APP_SERVER_PORT, // REST API IP PORT
    MASTER_ROUTE: process.env.REACT_APP_API_MASTER_ROUTE,
};
export let MASTER_URL = `${process.env.REACT_APP_SERVER_PROTOCOL}://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${MASTER_DATA_SERVER.MASTER_ROUTE}`;

export class UserDataProvider {
    apiHelper = new ApiHelper(MASTER_URL);

    getUsersApi = async () =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}`,
            HTTP_METHODS.GET,
            null
        );

    deleteUserApi = async (id) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}/${id}`,
            HTTP_METHODS.DELETE,
            null
        );

    getGroupsApi = async () =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${GROUPS_ENDPOINT}`,
            HTTP_METHODS.GET,
            null
        );

    getGroupsByUserApi = async (username) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${GROUPS_ENDPOINT}/${username}`,
            HTTP_METHODS.GET,
            null
        );

    updateUserGroupApi = async (id, params) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}/${id}`,
            HTTP_METHODS.PATCH,
            params
        );

    addNewUserApi = async (params) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}`,
            HTTP_METHODS.POST,
            params
        );

    getUsersByGroupApi = async (groupname) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}/${groupname}`,
            HTTP_METHODS.GET,
            null
        );

    // Following apiCall's are for custom user profile instead of django default

    optionsFormApiCall = async (APP, Model, routeState) =>
        await this.apiHelper.apiCall(
            `/${APP}.${Model}${API_VIEWS.FORM_VIEW}${routeState}`,
            HTTP_METHODS.OPTIONS,
            null
        );

    getRBACUserApi = async (APP, Model, id) =>
        await this.apiHelper.apiCall(
            `/${APP}.${Model}/${id}`,
            HTTP_METHODS.GET,
            null
        );

    getAllDataApi = async (
        APP,
        Model,
        page,
        pageSize,
        searchQuery,
        filterQuery
    ) =>
        await this.apiHelper.apiCall(
            `/${APP}.${Model}/list` +
            fetchGridDataApiValueBuilder(page, pageSize, searchQuery, filterQuery),
            HTTP_METHODS.GET,
            null
        );

    addUserProfileApi = async (APP, Model, values) =>
        await this.apiHelper.apiCall(`/${APP}.${Model}`, HTTP_METHODS.POST, values);

    updateUserProfileApi = async (APP, Model, values, id) =>
        await this.apiHelper.apiCall(
            `/${APP}.${Model}/${id}`,
            HTTP_METHODS.PUT,
            values
        );

    deleteUserProfileApi = async (APP, Model, id) =>
        await this.apiHelper.apiCall(
            `/${APP}.${Model}/${id}`,
            HTTP_METHODS.DELETE,
            null
        );

    dropDownApiCallMaster = async (item) =>
        await this.apiHelper.apiCall(
            `${MASTERS_ENDPOINT}.${item}${API_VIEWS.LIST}`,
            HTTP_METHODS.GET,
            null
        );

    getListViewColumnsApi = async (app, model) =>
        await this.apiHelper.apiCall(
            `/${app}.${model}${API_VIEWS.LIST_VIEW}`,
            HTTP_METHODS.OPTIONS,
            null
        );
}

export const excelDownloadApi = (APP, Model, selectedRow, listView) =>
    excel_export_api_call(
        `${MASTER_URL}/${APP}.${Model}/export`,
        excelDownloadListBuilder(selectedRow, listView)
    ).then((res) => {
        if (res.ok) {
            res.blob().then((blob) => {
                if (navigator.appVersion.toString().indexOf(".NET") > 0) {
                    window.navigator.msSaveBlob(
                        blob,
                        `${MASTER_URL}/${APP}.${Model}/export/.xls`
                    );
                } else {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement("a");
                    a.href = url;
                    a.download = `${process.env.REACT_APP_PROJECT_NAME}-${Model}.xlsx`;
                    a.click();
                }
            });
            success(notificationMessage.exportSuccess);
        } else {
            error(notificationMessage.exportError);
        }
    });

//Function is used to decide what kind of search query passed while fetching data
function fetchGridDataApiValueBuilder(
    pageNo,
    pageSize,
    searchQuery,
    filterQuery
) {
    let values = "";

    if (pageNo) {
        values = "?page=" + pageNo;
    }

    if (values && pageSize) {
        values += "&pageSize=" + pageSize;
    }

    if (searchQuery !== null) {
        values += "&" + searchQuery;
    }

    if (filterQuery !== null) {
        values += "&" + filterQuery + "filter=1";
    }
    return values;
}

function excelDownloadListBuilder(selectedRow, listView) {
    // Check if there is multiple data or single
    let listItems = [];
    for (let i = 0; i < selectedRow.length; i++) {
        listItems.push(selectedRow[i]);
    }

    let columns = [];
    for (let i = 0; i < listView.length; i++) {
        let value = listView[i].field;
        if (value.includes(".")) {
            columns.push(value.split(".")[0]);
        } else {
            columns.push(value);
        }
    }
    let data = {
        results: selectedRow.length > 0 ? selectedRow : "all",
        columns: columns,
    };

    return data;
}
