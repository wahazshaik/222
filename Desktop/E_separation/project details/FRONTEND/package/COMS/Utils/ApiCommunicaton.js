import getCookie from "./cookies";
import {MASTER_DATA_SERVER, RBAC_DATA_SERVER} from "../../AppConfigs";

/**
 * API Calls
 * @param {getCookie} : Cookie Data
 * @param {MASTER_DATA_SERVER} : Details of api call, host, port
 * @param {app} : Name of app to be passed while making api call
 * @param {entity} : Entity name to be passed while making api call
 * @param {id} : ID of element to be passed while making api call
 * @param {values} : Json data to be passed while making api call
 */

/* Type of request call */
export const METHOD_PUT = "PUT";
export const METHOD_POST = "POST";
export const METHOD_GET = "GET";
export const METHOD_PATCH = "PATCH";
export const METHOD_DELETE = "DELETE";
export const METHOD_OPTIONS = "OPTIONS";

/* Type of credentials include */
export const CREDENTIALS_INCLUDE = "include";
export const STANDARD_METHOD_OPTIONS = {
    credentials: CREDENTIALS_INCLUDE,
};

/* Cache setting details */
export const CACHE_SETTINGS = {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
};

/* Core setting details */
export const CORS_SETTINGS = {
    mode: "cors", // no-cors, cors, *same-origin
    credentials: "same-origin", // include, *same-origin, omit
};

/* Header details with Auth token  */
export let HEADER_JSON = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
    source: "workflow",
    req: "list",
};
/* Api call URL generation  */
export let MASTER_DATA_SERVER_URL = ((SERVER) =>
    `${SERVER.PROTOCOL}://${SERVER.SERVER_URL}:${SERVER.PORT}/${SERVER.API_PREFIX}/${SERVER.MASTER_ROUTE}`)(
    MASTER_DATA_SERVER
);
export let TRANSACTION_DATA_SERVER_URL = ((SERVER) =>
    `${SERVER.PROTOCOL}://${SERVER.SERVER_URL}:${SERVER.PORT}/${SERVER.API_PREFIX}`)(MASTER_DATA_SERVER);
/* Fuction for timeout call*/

/* Update data API call */
export const update_api_call = (app, entity, id, formData) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity + "/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_PUT,
        body: formData,
        headers: {
            Accept: "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post data API call */
export const post_api_call = (app, entity, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        body: values,
        method: METHOD_POST,
        headers: {
            Accept: "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post rbac user data API call */
export const post_rbac_user_api_call = (values) =>
    fetch(RBAC_DATA_SERVER + "Users", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        body: JSON.stringify(values),
        method: METHOD_POST,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post rbac group data API call */
export const post_rbac_groups_api_call = (values) =>
    fetch(RBAC_DATA_SERVER + "Groups", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        body: JSON.stringify(values),
        method: METHOD_POST,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post rbac user data API call */
export const patch_rbac_user_api_call = (values, id) =>
    fetch(RBAC_DATA_SERVER + "Users/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        body: JSON.stringify(values),
        method: METHOD_PATCH,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post rbac user data API call */
export const patch_rbac_group_api_call = (values, id) =>
    fetch(RBAC_DATA_SERVER + "Groups/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        body: JSON.stringify(values),
        method: METHOD_PATCH,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post login data API call */
export const post_api_login_call = (app, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_POST,
        body: JSON.stringify(values),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Post login data API call */
export const post_api_logout_call = () =>
    fetch(MASTER_DATA_SERVER_URL + "/logout", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_POST,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const options_rbac_main_api_call = () =>
    fetch(RBAC_DATA_SERVER + "meta?set=appmeta", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: "OPTIONS",
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Option screen data API call */
export const options_main_api_call = (app, entity) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + entity+'&project='+process.env.REACT_APP_PROJECT_NAME, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_OPTIONS,
        headers: {
            ...HEADER_JSON,
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            Authorization: localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)?
                JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)) : JSON.parse(localStorage.getItem("guest-auth-token")),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Option data API call */
export const options_api_call = (app, entity) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_OPTIONS,
        headers: {
            ...HEADER_JSON,
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });
export const options_api_header_call = (app, entity, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_OPTIONS,
        body: JSON.stringify(values),
        headers: {
            ...HEADER_JSON,
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Get single data API call */
export const get_single_data_api_call = (app, entity, id) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity + "/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Get all data API call */
export const get_all_data_api_call = (app, entity, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity + values, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const get_rbac_users_data_api_call = () =>
    fetch(RBAC_DATA_SERVER + "Users", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const get_rbac_group_data_api_call = () =>
    fetch(RBAC_DATA_SERVER + "Groups", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const get_groups_by_user_api_call = (user) =>
    fetch(RBAC_DATA_SERVER + "Groups/" + user, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const get_users_by_group_api_call = (group) =>
    fetch(RBAC_DATA_SERVER + "Users/" + group, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Get dropdown data API call */
export const get_dropdown_data_api_call = (app, entity) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Delete single data API call */
export const delete_single_data_api_call = (app, entity, id) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity + "/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_DELETE,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Delete single data API call */
export const delete_rbac_users_api_call = (id) =>
    fetch(RBAC_DATA_SERVER + "Users/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_DELETE,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const delete_rbac_group_api_call = (id) =>
    fetch(RBAC_DATA_SERVER + "Groups/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_DELETE,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Delete multi data API call */
export const delete_multi_data_api_call = (app, entity, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_DELETE,
        body: JSON.stringify(values),
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

// versions check API call
export const versioncheck_api_call = (app, entity, id) =>
    fetch(MASTER_DATA_SERVER_URL + "/versions/" + app + "." + entity + "/" + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const excel_export_api_call = (app, entity, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity + "/export", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_POST,
        body: JSON.stringify(values),
        headers: {
            ...HEADER_JSON,
            // "X-ids": JSON.stringify(values),
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const excel_import_api_call = (app, entity, values) =>
    fetch(MASTER_DATA_SERVER_URL + "/" + app + "." + entity + "/import", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_POST,
        body: values,
        headers: {
            Accept: "application/json",
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            // "X-ids": JSON.stringify(values),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const get_approval_hierarchy = (app, entity, pk) =>
    fetch(
        TRANSACTION_DATA_SERVER_URL +
        "/workflow/get-hierarchy?app_name=" +
        app +
        "&model_name=" +
        entity +
        "&pk=" +
        pk, {
            ...STANDARD_METHOD_OPTIONS,
            ...CACHE_SETTINGS,
            ...CORS_SETTINGS,
            method: METHOD_GET,
            headers: {
                ...HEADER_JSON,
                "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
            },
        }
    );

export const get_approval_transactions = (app, entity, pk) =>
    fetch(
        TRANSACTION_DATA_SERVER_URL +
        "/workflow/get-transactions?app_name=" +
        app +
        "&model_name=" +
        entity +
        "&pk=" +
        pk, {
            ...STANDARD_METHOD_OPTIONS,
            ...CACHE_SETTINGS,
            ...CORS_SETTINGS,
            method: METHOD_GET,
            headers: {
                ...HEADER_JSON,
                "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
            },
        }
    );

export const get_all_workflow_transactions = (app) =>
    fetch(
        TRANSACTION_DATA_SERVER_URL +
        "/workflow/get-all-transactions?app_name=" + app, {
            ...STANDARD_METHOD_OPTIONS,
            ...CACHE_SETTINGS,
            ...CORS_SETTINGS,
            method: METHOD_GET,
            headers: {
                ...HEADER_JSON,
                "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
            },
        }
    );

export const get_workflow_transitions = (app, entity) =>
    fetch(
        TRANSACTION_DATA_SERVER_URL +
        "/workflow/get-transitions?app_name=" + app + "&model_name=" +
        entity, {
            ...STANDARD_METHOD_OPTIONS,
            ...CACHE_SETTINGS,
            ...CORS_SETTINGS,
            method: METHOD_GET,
            headers: {
                ...HEADER_JSON,
                "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
            },
        }
    );

export const patch_workflow_update_call = (values) =>
    fetch(TRANSACTION_DATA_SERVER_URL + "/workflow/approval", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        body: JSON.stringify(values),
        method: METHOD_PATCH,
        headers: {
            ...HEADER_JSON,
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const dynamic_dashboard_api_call = (values) =>
    fetch(MASTER_DATA_SERVER_URL + "/dynamic-dashboard", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_POST,
        body: values,
        headers: {
            ...HEADER_JSON,
            Authorization: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_TOKEN_PREFIX}-auth-token`)),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

/* Custom Generic API call */
export const custom_api_call = (url, method, values) =>
    fetch(url, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: method,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
        },
        body: values ? JSON.stringify(values) : null,
    });

export const get_file_upload_configs = (model) =>
    fetch(
        TRANSACTION_DATA_SERVER_URL + "/form/file-configs?model_name=" + model, {
            ...STANDARD_METHOD_OPTIONS,
            ...CACHE_SETTINGS,
            ...CORS_SETTINGS,
            method: METHOD_GET,
            headers: {
                ...HEADER_JSON,
                "Approval-Authorization": localStorage.getItem(
                    "approval-authorization"
                ),
                "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
            },
        }
    );

export const file_download_api_call = (query_params) =>
    fetch(MASTER_DATA_SERVER_URL + "/download-file/" + query_params, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });


export const get_approval_model = () =>
    fetch(TRANSACTION_DATA_SERVER_URL + "/workflow/getapprovalmodel", {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            source: "workflow",
            req: "list",
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });

export const get_indicate_approval_type = (app, model, id) =>
    fetch(TRANSACTION_DATA_SERVER_URL + "/workflow/indicate_approval_type/" + app + '.' + model + '/' + id, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: METHOD_GET,
        headers: {
            ...HEADER_JSON,
            "Approval-Authorization": localStorage.getItem("approval-authorization"),
            "X-CSRFToken": getCookie(`${process.env.REACT_APP_TOKEN_PREFIX}-csrftoken`),
        },
    });
