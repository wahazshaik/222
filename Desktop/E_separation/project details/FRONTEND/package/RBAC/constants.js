export const userGridColumns = [
    {
        headerName: "User Id",
        field: "id",
        editable: false,
        checkboxSelection: true,
        type: "integer",
    },
    {
        headerName: "User name",
        field: "username",
        editable: false,
        type: "text",
    },
    {
        headerName: "Last login",
        field: "last_login",
        editable: false,
        type: "text",
    },
    {
        headerName: "Super access",
        field: "is_superuser",
        editable: false,
        type: "text",
    },
    {
        headerName: "Status",
        field: "is_active",
        editable: false,
        type: "text",
    },
];

export const groupGridColumns = [
    {
        headerName: "Group Id",
        field: "id",
        editable: false,
        checkboxSelection: true,
        type: "integer",
    },
    {
        headerName: "Group name",
        field: "name",
        editable: false,
        type: "text",
    },
];

export const user_form_group_column_headers = [
    {
        headerName: "Group",
        field: "name",
        checkboxSelection: true,
        editable: false,
    },
];

export const group_form_user_column_headers = [
    {
        headerName: "User",
        field: "username",
        checkboxSelection: true,
        editable: false,
    },
];

export const defaultColDef = {
    width: 250,
    sortable: true,
    filter: true,
    resizable: true,
};

export const transactionGridColumns = [
    {
        headerName: "Id",
        field: "id",
        editable: false,
        width: 100,
        checkboxSelection: true,
    },
    {
        headerName: "Model",
        field: "model_name",
        editable: false,
    },
    {
        headerName: "Request no.",
        field: "request_id",
        editable: false,
    },
    {
        headerName: "Action",
        field: "action",
        editable: false,
    },
    {
        headerName: "Current State",
        field: "current_state",
        editable: false,
    },
    {
        headerName: "Approver",
        field: "approver",
        editable: false,
    },
    {
        headerName: "Approver type",
        field: "approver_type",
        editable: false,
    },
    {
        headerName: "Next Approver",
        field: "next_approver",
        editable: false,
    },
    {
        headerName: "Next State",
        field: "next_state",
        editable: false,
    },
    {
        headerName: "Remarks",
        field: "remarks",
        editable: false,
    },
    {
        headerName: "Created date",
        field: "created_date",
        editable: false,
    },
];

export const transitionsGridColumns = [
    {
        headerName: "Id",
        field: "id",
        width: 100,
        editable: false,
        checkboxSelection: true,
    },
    {
        headerName: "Model",
        field: "model_name",
        editable: false,
    },
    {
        headerName: "Action",
        field: "action",
        editable: false,
    },
    {
        headerName: "Current State",
        field: "current_state",
        editable: false,
    },
    {
        headerName: "Next State",
        field: "next_state",
        editable: false,
    },
    {
        headerName: "Action Group",
        field: "action_group",
        editable: false,
    },
    {
        headerName: "Action User",
        field: "action_user",
        editable: false,
    },
    {
        headerName: "Approval Strength",
        field: "approval_strength",
        editable: false,
    },
    {
        headerName: "Last Transition",
        field: "is_last_transition",
        editable: false,
    },
];

export const permissionsColumnsDef = [
    {
        headerName: "Permission Id",
        field: "id",
        editable: false,
        checkboxSelection: true,
    },
    {
        headerName: "Permission name",
        field: "name",
        editable: false,
    },
    {
        headerName: "Permission code",
        field: "codename",
        editable: false,
    },
];

export const rowSelection = "multiple";
