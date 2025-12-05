export const commodityDetais = {
    "Commodity Master": {
        "field-validators": {
            "Enter request item":
                [
                    {
                        validator:
                            (rule, value, callback) => {
                                if (value === "a") {
                                    callback("Not a valid Number");
                                } else {
                                    callback();
                                }
                            }
                    }
                ],
            //  "Request reason":
            // [
            //   {
            //     validator:
            //       (rule, value, callback) => {
            //         if (value === "a") {
            //           callback("Not a valid Number");
            //         } else {
            //           callback();
            //         }
            //       }
            //   }
            // ],

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
                            (rule, value) => {
                                if (value === "A") {
                                    return Promise.reject('Not a valid data')
                                } else {
                                    return Promise.resolve();
                                }
                            }
                    }, {
                    validator:
                        (rule, value) => {
                            if (value === "BB") {
                                return Promise.reject('Not a valid data')
                            } else {
                                return Promise.resolve();
                            }
                        }
                }

                ],
            "Enter big description":
                [
                    {
                        validator:
                            (rule, value) => {
                                if (value === "A") {
                                    return Promise.reject('Not a valid data')
                                } else {
                                    return Promise.resolve();
                                }
                            }
                    }, {
                    validator:
                        (rule, value) => {
                            if (value === "BB") {
                                return Promise.reject('Not a valid data')
                            } else {
                                return Promise.resolve();
                            }
                        }
                }

                ],
        },
        // "form-validator": {
        //   validator: (res) => {
        //     if (res.name == "a") {
        //       return ({
        //         "fieldname": "name",
        //         "error": "Please select proper country"
        //       });
        //     }
        //     if (res.code == "ASD") {
        //       return ({
        //         "fieldname": "code",
        //         "error": "Please select proper code"
        //       });
        //     }
        //   }
        // }
    }
};