export const USERS_APP_NAME = process.env.REACT_APP_RBAC_USER_APP;
export const USERS_MODEL_NAME = process.env.REACT_APP_RBAC_USER_MODEL;

/* Types of button */
export const buttonTypes = {
    primary: "primary",
    button: "button",
};

/* Predefined vales for button */
export const buttonValue = {
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    versions: "Versions",
    manage: "Manage",
};

/* Notification message type */
export const openNotificationType = {
    error: "error",
    success: "success",
    warning: "warning",
    info: "info",
};

/* Notification message title*/
export const notificationTitle = {
    api: "API",
    delete: "DELETE",
    edit: "EDIT",
    version: "VERSIONS",
    success: "SUCCESS",
    export: "EXPORT",
};

/* Notification message */
export const notificationMessage = {
    selectRowsForExport: "Please select rows to export.!",
    exportSuccess: "Successfully Exported to Excel.!",
    exportError: "Error Exporting Data to Excel.!",
    exportExcelWait: "Please wait, excel file will download shortly!",
    formSubmitSuccess: "Data Added Successfully !",
    formSubmitError: "ERROR Inserting the data! Check",
    formUpdateSuccess: "Data Updated Successfully",
    formUpdateError: "ERROR Updating the data! Check",
    listDeleteSuccess: "Data Deleted Successfully",
    listDeleteError: "ERROR Deleting the data! Check",
    listMultipleDeleteSuccess: "Multiple Data Deleted Successfully",
    listDeleteDataNotSelected: "Please select rows to delete",
    listEditDataNotSelected: "Please select rows to edit",
    listMultipleEditDataSelected: "Only single row can be edited",
    apiConnectionError: "Cannot Make connection to API",
    versionCheckDataNotSelected: "Please select row data to check Versions !",
    versionCheckMultipleDataSelected:
        "Only single row data Versions can be Check !",
};

export const restrictFields = {
    created_by: "created_by",
    created_date: "created_date",
    last_updated_by: "last_updated_by",
    last_updated_date: "last_updated_date",
};
