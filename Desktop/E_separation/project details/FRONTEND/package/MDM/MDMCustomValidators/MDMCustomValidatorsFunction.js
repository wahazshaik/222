/**
 * Validation details
 * @param {field-validators} : Field Level validator details
 * @param {form-validator} : Validations on form submit
 */
export const registrationDetais = {
    "Registration Details": {
        "field-validators": {
            "Number":
                [
                    {
                        validator:
                            (rule, value, callback) => {
                                if (value < 3) {
                                    callback("Not a valid Number");
                                } else {
                                    callback();
                                }
                            }
                    }
                ],
            "State":
                [
                    {
                        validator:
                            (rule, value, callback) => {
                                if (value == "A") {
                                    callback("Not a valid data");
                                } else {
                                    callback();
                                }
                            }
                    }, {
                    validator:
                        (rule, value, callback) => {
                            if (value == "BB") {
                                callback("Not a valid data");
                            } else {
                                callback();
                            }
                        }
                }

                ],
        },
        "form-validator": {
            validator: (res) => {
                /// code for form validation.
            }
        }
    },

};


export const antdDetails = {
    "Test Form": {
        "field-validators": {
            "Enter description":
                [
                    {
                        validator:
                            (rule, value, callback) => {
                                if (value == "A") {
                                    callback("Not a valid data");
                                } else {
                                    callback();
                                }
                            }
                    }, {
                    validator:
                        (rule, value, callback) => {
                            if (value == "BB") {
                                callback("Not a valid data");
                            } else {
                                callback();
                            }
                        }
                }

                ],
            "Enter big description":
                [
                    {
                        validator:
                            (rule, value, callback) => {
                                if (value == "A") {
                                    callback("Not a valid data");
                                } else {
                                    callback();
                                }
                            }
                    }, {
                    validator:
                        (rule, value, callback) => {
                            if (value == "BB") {
                                callback("Not a valid data");
                            } else {
                                callback();
                            }
                        }
                }

                ],
        },
        "form-validator": {
            validator: (res) => {
                if (res.name == "a") {
                    return ({
                        "fieldname": "name",
                        "error": "Please select proper country"
                    });
                }
                if (res.code == "ASD") {
                    return ({
                        "fieldname": "code",
                        "error": "Please select proper code"
                    });
                }
            }
        }
    }
};