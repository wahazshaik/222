import getCookie from "./cookies";

const CREDENTIALS_INCLUDE = "include";
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

export default class ApiHelper {
    baseUrl = null;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    apiCall = (url, method, values) => {
        if (values && values.constructor.name !== "FormData") {
            values = JSON.stringify(values);
            HEADER_JSON["Content-Type"] = "application/json";
        }
        return fetch(this.baseUrl + url, {
            ...STANDARD_METHOD_OPTIONS,
            ...CACHE_SETTINGS,
            ...CORS_SETTINGS,
            method: method,
            headers: {
                ...HEADER_JSON,
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: values != null ? values : null,
        });
    };
}

export const excel_export_api_call = (api, values) =>
    fetch(`${api}`, {
        ...STANDARD_METHOD_OPTIONS,
        ...CACHE_SETTINGS,
        ...CORS_SETTINGS,
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            ...HEADER_JSON,
            Authorization: JSON.parse(localStorage.getItem("auth-token")),
            "X-CSRFToken": getCookie("reco-csrftoken"),
        },
    });
