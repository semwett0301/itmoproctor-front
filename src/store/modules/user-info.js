import dateValidator from '../validators/date-format-validator'

export const user_info = {
    state: () => ({
        active: false,
        address: "",
        attach: [],
        birthday: "",
        citizenship: "",
        created: "",
        description: "",
        documentIssueDate: "",
        documentNumber: "",
        documentType: "",
        email: "",
        expert: false,
        firstname: "",
        gender: "",
        lastname: "",
        middlename: "",
        organization:
            {_id: "", code: ""},
        code: "",
        provider: "",
        role: -1,
        username: "",
        __v: -1,
        _id: "5c9a37f883c3731251b8b512"
    }),

    mutations: {
        setActive(state, active) {
            if (typeof active === "boolean") {
                state.active = active;
            } else {
                throw new TypeError;
            }
        },
        setAddress(state, address) {
            if (typeof address === "string") {
                state.address = address;
            } else {
                throw new TypeError;
            }
        },
        setAttach(state, attach) {
            if (Array.isArray(attach)) {
                state.attach = attach;
            } else {
                throw new TypeError;
            }
        },
        setBirthday(state, birthday) {
            if (typeof birthday === "string") {
                if (dateValidator.isStandard(birthday)) {
                    state.birthday = birthday;
                } else {
                    throw "DateFormatError"
                }
            } else {
                throw new TypeError;
            }
        },
        setCitizenship(state, citizenship) {
            if (typeof citizenship === "string") {
                state.citizenship = citizenship;
            } else {
                throw new TypeError;
            }
        },
        setCreated(state, created) {
            if (typeof created === "string") {
                if (dateValidator.isFullDate(created)) {
                    state.created = created;
                } else {
                    throw "DateFormatError"
                }
            } else {
                throw new TypeError;
            }
        },
        setDescription(state, description) {
            if (typeof description === "string") {
                state.description = description;
            } else {
                throw new TypeError;
            }
        },
        setDocumentIssueDate(state, documentIssueDate) {
            if (typeof documentIssueDate === "string") {
                if (dateValidator.isStandard(documentIssueDate)) {
                    state.documentIssueDate = documentIssueDate;
                } else {
                    throw "DateFormatError"
                }
            } else {
                throw new TypeError;
            }
        },

    },

    actions: {},

    namespaced: true
}

