import ApiHelper from "../../Utils/ApiHelper";
import {
  GROUPS_ENDPOINT,
  HTTP_METHODS,
  MODEL_SUGGEST_ENDPOINT,
  PERMISSIONS_ENDPOINT,
  RBAC_ENDPOINT,
  SUGGEST_ENDPOINT,
  USERS_ENDPOINT
} from "../../Config/API";

export let MASTER_DATA_SERVER = {
    SERVER_URL: process.env.REACT_APP_SERVER_URL, // REST API IP HOST
    PORT: process.env.REACT_APP_SERVER_PORT, // REST API IP PORT
    MASTER_ROUTE: process.env.REACT_APP_API_MASTER_ROUTE,
};
export let MASTER_URL = `${process.env.REACT_APP_SERVER_PROTOCOL}://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${MASTER_DATA_SERVER.MASTER_ROUTE}`;

export class PermissionsDataProvider {
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

    fetchModelsApi = async (app) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}${SUGGEST_ENDPOINT}${MODEL_SUGGEST_ENDPOINT}?query=${app}`,
            HTTP_METHODS.GET,
            null
        );

    searchPermissionsApi = async (model) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}${PERMISSIONS_ENDPOINT}/${model}`,
            HTTP_METHODS.GET,
            null
        );

    getPermissionByUserApi = async (model, user) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}${PERMISSIONS_ENDPOINT}/${model}?user=${user}`,
            HTTP_METHODS.GET,
            null
        );

    getPermissionByGroupApi = async (model, group) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}${PERMISSIONS_ENDPOINT}/${model}?group=${group}`,
            HTTP_METHODS.GET,
            null
        );

    updatePermissionApi = async (params) =>
        await this.apiHelper.apiCall(
            `${RBAC_ENDPOINT}${PERMISSIONS_ENDPOINT}`,
            HTTP_METHODS.POST,
            params
        );
}
