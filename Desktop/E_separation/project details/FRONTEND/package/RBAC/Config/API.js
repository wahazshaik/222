export const MASTERS_ENDPOINT = `/${process.env.REACT_APP_API_NAME}`;
export const RBAC_ENDPOINT = "/rbac";
export const GROUPS_ENDPOINT = "Groups";
export const USERS_ENDPOINT = "Users";
export const PERMISSIONS_ENDPOINT = "/Permissions";
export const SUGGEST_ENDPOINT = "/Suggest";
export const MODEL_SUGGEST_ENDPOINT = "/Models";

export const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    PUT: "PUT",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
};

export const API_VIEWS = {
    FORM_VIEW: "?set=formview&id=",
    LIST_VIEW: "?set=listview",
    LIST: "/list?is_active=True",
};
