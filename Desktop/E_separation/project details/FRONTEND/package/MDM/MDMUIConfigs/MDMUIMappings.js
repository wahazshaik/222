/* Routing mode */
export const routeMode = {
    new: "new",
    edit: "edit",
    versions: "versions",
};

/* Form view values type */
export const dataValues = {
    date: "date",
    timePicker: "timepicker",
    textbox: "textbox",
};

/* Formats for date and time */
export const dateTimeFormat = {
    date: "YYYY-MM-DD",
    time: "HH:mm:ss",
};

/* Labels for form view */
export const formViewLabels = {
    sectionLabel: "sectionlabel",
    formValidator: "form-validator",
    fieldValidator: "field-validators",
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
    form: "FORM",
    edit: "EDIT",
    version: "VERSIONS",
    permissions: "PERMISSIONS",
    login: "LOGIN",
    approve: "APPROVE",
    reject: "REJECT",
    already_exists: "Already Exists",
    forgot_password: "Forgot Password"
};

/* Notification message */
export const notificationMessage = {
    agreement: "Please accept Terms and Conditions before submitting Form",
    formSubmitSuccess: "Data Added Successfully !",
    formSubmitError: "ERROR Inserting the data!",
    fileSizeExceeded: "File size is too large!",
    fileLimitExceeded: "Maximum limit exceeded for uploading files",
    fileTypeNotAllowed: "Uploaded type of file is not allowed",
    formUpdateSuccess: "Data Updated Successfully for ID: ",
    formUpdateError: "ERROR Updating the data! Check",
    listDeleteSuccess: "Data Deleted Successfully",
    listDeleteError: "ERROR Deleting the data! Check",
    listMultipleDeleteSuccess: "Multiple Data Deleted Successfully",
    listDeleteDataNotSelected: "Please select rows to delete",
    listEditDataNotSelected: "Please select rows to edit",
    listMultipleEditDataSelected: "Only single row can be edited",
    apiConnectionError:
        "Internal Server Error, Please contact our team on email@email.com ",
    excelImportError:
        "Your table is not registered for uploading data via excel import",
    excelImportSuccess:
        "Your excel data is added/updated successfully",
    excelImportWait:
        "Please wait while excel data is added/updated",
    versionCheckDataNotSelected: "Please select row data to check Versions !",
    versionCheckMultipleDataSelected:
        "Only single row data Versions can be Check !",
    nopermissions: "Access Denied, You do not have sufficient permissions",
    approve: "Request Approve Successfully",
    reject: "Request Reject Successfully",
    remarks: "Please enter remarks before Approve/Reject",
    userDetailFetchError: "Could not fetch users Email Id & Contact No",
    already_exists: "Object with this Value Already Exists, Kindly restore it, by contacting Admin."
};

/* MDM Api call details */
export const apiCall = {
    formViewOptionsCall: "?set=formview",
    listViewCall: "/list",
    listViewOptionsCall: "?set=listview",
    mainOptionsCall: "?set=appmeta",
    dropDownCall: "?is_active=True",
    headerCall: "?set=listview&filterColumn=True",
};

/* MDM Wrapper class decoratortypes */
export const decoratorTypes = {
    number: "number",
    email: "email",
    object: "object",
    password: "password",
    confirmpassword: "confirmpassword",
    button: "button",
    array: "array",
    inbox: "inbox",
    upload: "upload",
};

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
    excel: "Export",
};

/* Value prop name */
export const valuePropName = {
    fileList: "fileList",
};

/* Wrapper class form view field error message */
export const fieldErrorMessage = {
    emailMessage: "The input is not valid E-mail!",
    numberMessage: "This field can only have numbers!",
    passwordMessage: "Two passwords that you enter is inconsistent!",
};

/* Wrapper call */
export const wrapperCall = {
    gridView: "gridview",
};

/* Upload call function */
export const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
