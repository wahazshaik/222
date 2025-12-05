import ApiHelper from "../../Utils/ApiHelper";
import {GROUPS_ENDPOINT, HTTP_METHODS, RBAC_ENDPOINT, USERS_ENDPOINT,} from "../../Config/API";

export let MASTER_DATA_SERVER = {
    SERVER_URL: process.env.REACT_APP_SERVER_URL, // REST API IP HOST
    PORT: process.env.REACT_APP_SERVER_PORT, // REST API IP PORT
    MASTER_ROUTE: process.env.REACT_APP_API_MASTER_ROUTE,
};
export let MASTER_URL = `${process.env.REACT_APP_SERVER_PROTOCOL}://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${MASTER_DATA_SERVER.MASTER_ROUTE}`;

export class GroupsDataProvider {
    apiHelper = new ApiHelper(MASTER_URL);

    getUsersApi = async () =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}`,
            HTTP_METHODS.GET,
            null
        );

    getGroupsApi = async () =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${GROUPS_ENDPOINT}`,
            HTTP_METHODS.GET,
            null
        );

    getUsersByGroupApi = async (groupname) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${USERS_ENDPOINT}/${groupname}`,
            HTTP_METHODS.GET,
            null
        );

    addNewGroupApi = async (params) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${GROUPS_ENDPOINT}`,
            HTTP_METHODS.POST,
            params
        );

    updateGroupUsersApi = async (id, params) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${GROUPS_ENDPOINT}/${id}`,
            HTTP_METHODS.PATCH,
            params
        );

    deleteGroupApi = async (id) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}/${GROUPS_ENDPOINT}/${id}`,
            HTTP_METHODS.DELETE,
            null
        );
}
