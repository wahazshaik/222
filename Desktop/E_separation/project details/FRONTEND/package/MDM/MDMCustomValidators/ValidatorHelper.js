export function lengthChecker(value, maxLength) {
    return (String(value).length > maxLength)
}

export function minLengthChecker(value, minLength) {
    return (String(value).length < minLength)
}

export function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}

export function minLengthErrorMsg(fieldName, minLength) {
    return (`${fieldName} length should not be less than ${minLength}`);
}

export function lengthErrorMsg(fieldName, maxLength) {
    return (`${fieldName} length should not be more than ${maxLength}`);
}

export function allCapsChecker(value) {
    return !(String(value) === String(value).toUpperCase());
}

export function allCapsErrorMsg(fieldName) {
    return (`${fieldName} should be in capital letters`);
}

export function noSpecialCharChecker(value) {
    return /[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(String(value));
}

export function noSpecialCharErrorMsg(fieldName) {
    return (`${fieldName} should not contain any special characters`);
}

export function numericChecker(value) {
    return !/^\d+$/.test(String(value));
}

export function numericErrorMsg(fieldName) {
    return (`${fieldName} should be numeric`);
}

export function alphabeticChecker(value) {
    return !/^[a-zA-Z() ]+$/.test(String(value));
}

export function alphabeticErrorMsg(fieldName) {
    return (`${fieldName} should only have alphabets`);
}
