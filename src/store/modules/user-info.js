import validator from '@/utils/validators/user-info-validator'
import id_validator from '@/utils/validators/id-validator'
import request from "@/api/axios/request";

const defaultUser = {
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
    organization: {
        _id: "",
        // fullName: "",
        // shortName: "",
        code: ""
    },
    provider: "",
    role: -1,
    username: "",
    _id: "",
}

export const user_info = {
    state: () => ({
        user_info: {
            ...defaultUser,
            isDefault: true
        }
    }),

    mutations: {
        set_id(state, id) {
            if (typeof id === "string") {
                if (id_validator(id)) {
                    state.user_info._id = id;
                } else {
                    throw "User id isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setActive(state, active) {
            if (typeof active === "boolean") {
                state.user_info.active = active;
            } else {
                throw new TypeError;
            }
        },
        setAddress(state, address) {
            if (typeof address === "string") {
                state.user_info.address = address;
            } else {
                throw new TypeError;
            }
        },
        setAttach(state, attach) {
            if (Array.isArray(attach)) {
                state.user_info.attach = attach;
            } else {
                throw new TypeError;
            }
        },
        setBirthday(state, birthday) {
            if (typeof birthday === "string") {
                if (validator.isStandardDate(birthday)) {
                    state.user_info.birthday = birthday;
                } else {
                    throw "Birthday date isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setCitizenship(state, citizenship) {
            if (typeof citizenship === "string") {
                state.user_info.citizenship = citizenship;
            } else {
                throw new TypeError;
            }
        },
        setCreated(state, created) {
            if (typeof created === "string") {
                if (validator.isFullDate(created)) {
                    state.user_info.created = created;
                } else {
                    throw "Date of creation isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setDescription(state, description) {
            if (typeof description === "string") {
                state.user_info.description = description;
            } else {
                throw new TypeError;
            }
        },
        setDocumentIssueDate(state, documentIssueDate) {
            if (typeof documentIssueDate === "string") {
                if (validator.isStandardDate(documentIssueDate)) {
                    state.user_info.documentIssueDate = documentIssueDate;
                } else {
                    throw "Date of document issue isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setDocumentNumber(state, documentNumber) {
            if (typeof documentNumber === "string") {
                if (validator.isDocumentNumber(documentNumber)) {
                    state.user_info.documentNumber = documentNumber;
                } else {
                    throw "Document number isn't correct"
                }
            } else {
                throw TypeError;
            }
        },
        setDocumentType(state, documentType) {
            if (typeof documentType === "string") {
                state.user_info.documentType = documentType;
            } else {
                throw new TypeError;
            }
        },
        setEmail(state, email) {
            if (typeof email === "string") {
                if (validator.isEmail(email)) {
                    state.user_info.email = email;
                } else {
                    throw "Email isn't correct"
                }
            } else {
                throw TypeError;
            }
        },
        setExpert(state, expert) {
            state.user_info.expert = Boolean(expert)
        },
        setFirstname(state, name) {
            if (typeof name === "string") {
                state.user_info.firstName = name;
            } else {
                throw new TypeError;
            }
        },
        setGender(state, gender) {
            if (typeof gender === "string") {
                if (validator.isGender(gender)) {
                    state.user_info.gender = gender;
                } else {
                    throw "Gender doesn't exist"
                }
            } else {
                throw TypeError;
            }
        },
        setLastname(state, name) {
            if (typeof name === "string") {
                state.user_info.lastname = name;
            } else {
                throw new TypeError;
            }
        },
        setMiddlename(state, name) {
            if (typeof name === "string") {
                state.user_info.middlename = name;
            } else {
                throw new TypeError;
            }
        },
        setProvider(state, provider) {
            if (typeof provider === "string" || provider === "") {
                if (validator.isProvider(provider)) {
                    state.user_info.provider = provider;
                } else {
                    throw "Provider doesn't exist"
                }
            } else {
                throw TypeError;
            }
        },
        setRole(state, role) {
            if (typeof role === "number") {
                if (validator.isRole(role) || role === -1) {
                    state.user_info.role = role;
                } else {
                    throw "Role doesn't exist"
                }
            } else {
                throw TypeError;
            }
        },
        setUsername(state, username) {
            if (typeof username === "string") {
                state.user_info.username = username;
            } else {
                throw new TypeError;
            }
        },
        setOrganization(state, organization) {
            if (typeof organization === "object") {
                let validationResult = validator.isOrganization(organization);
                if (validationResult["correct"]) {
                    state.user_info.organization = organization;
                } else {
                    let errorMessage = "Organization object isn't correct. These properties don't exist or aren't valid:\n";
                    validationResult["errors"].forEach(
                        error => {
                            errorMessage += error
                            errorMessage += "  "
                        }
                    )
                    throw errorMessage;
                }
            } else {
                throw TypeError
            }
        },
        setIsDefault(state, isDefault) {
            if (typeof isDefault === "boolean") {
                state.user_info.isDefault = isDefault
            } else {
                throw TypeError
            }
        }
    },

    actions: {
        setUserInfo({state, commit}, newUserInfo) {
            Object.keys(newUserInfo).forEach(
                elem => {
                    if (elem in state.user_info) {
                        let commitName = "set";
                        commitName += (elem.charAt(0).toUpperCase() + elem.slice(1));
                        try {
                            commit(commitName, newUserInfo[elem])
                        } catch (e) {
                            if (e === TypeError) {
                                console.log(`Неправильный тип поля ${elem}`)
                            } else {
                                console.log(`Обработка поля ${elem} была прервана по причине:\n${e}`)
                            }
                        }
                    }
                }
            )
            commit('setIsDefault', false)
        },

        async updateUserInfo({dispatch}) {
            await request.profile.getProfileBySession()
                .then(r => {
                    dispatch('setUserInfo', r.data);
                })
                .catch(() => {
                    console.log("Данные не были обновлены")
                    dispatch('dropUserInfo')
                })
        },

        dropUserInfo({commit, state}) {
            Object.assign(state.user_info, defaultUser);
            commit('setIsDefault', false)
        }

    },

    namespaced: true
}

