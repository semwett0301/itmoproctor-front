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
        fullName: "",
        shortName: "",
        code: ""
    },
    provider: "",
    role: -1,
    username: "",
    _id: ""
}

export const user_info = {
    state: () => ({
        user: {
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
                fullName: "",
                shortName: "",
                code: ""
            },
            provider: "",
            role: -1,
            username: "",
            _id: ""
        }
    }),

    mutations: {
        set_id(state, id) {
            if (typeof id === "string") {
                if (id_validator(id)) {
                    state.user._id = id;
                } else {
                    throw "User id isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setActive(state, active) {
            if (typeof active === "boolean") {
                state.user.active = active;
            } else {
                throw new TypeError;
            }
        },
        setAddress(state, address) {
            if (typeof address === "string") {
                state.user.address = address;
            } else {
                throw new TypeError;
            }
        },
        setAttach(state, attach) {
            if (Array.isArray(attach)) {
                state.user.attach = attach;
            } else {
                throw new TypeError;
            }
        },
        setBirthday(state, birthday) {
            if (typeof birthday === "string") {
                if (validator.disStandardDate(birthday)) {
                    state.user.birthday = birthday;
                } else {
                    throw "Birthday date isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setCitizenship(state, citizenship) {
            if (typeof citizenship === "string") {
                state.user.citizenship = citizenship;
            } else {
                throw new TypeError;
            }
        },
        setCreated(state, created) {
            if (typeof created === "string") {
                if (validator.isFullDate(created)) {
                    state.user.created = created;
                } else {
                    throw "Date of creation isn't correct"
                }
            } else {
                throw new TypeError;
            }
        },
        setDescription(state, description) {
            if (typeof description === "string") {
                state.user.description = description;
            } else {
                throw new TypeError;
            }
        },
        setDocumentIssueDate(state, documentIssueDate) {
            if (typeof documentIssueDate === "string") {
                if (validator.isStandardDate(documentIssueDate)) {
                    state.user.documentIssueDate = documentIssueDate;
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
                    state.user.documentNumber = documentNumber;
                } else {
                    throw "Document number isn't correct"
                }
            } else {
                throw TypeError;
            }
        },
        setDocumentType(state, documentType) {
            if (typeof documentType === "string") {
                state.user.documentType = documentType;
            } else {
                throw new TypeError;
            }
        },
        setEmail(state, email) {
            if (typeof email === "string") {
                if (validator.isEmail(email)) {
                    state.user.email = email;
                } else {
                    throw "Email isn't correct"
                }
            } else {
                throw TypeError;
            }
        },
        setExpert(state, expert) {
            state.user.expert = Boolean(expert)
        },
        setFirstName(state, name) {
            if (typeof name === "string") {
                state.user.firstName = name;
            } else {
                throw new TypeError;
            }
        },
        setGender(state, gender) {
            if (typeof gender === "string") {
                if (validator.isGender(gender)) {
                    state.user.gender = gender;
                } else {
                    throw "Gender doesn't exist"
                }
            } else {
                throw TypeError;
            }
        },
        setLastName(state, name) {
            if (typeof name === "string") {
                state.user.lastName = name;
            } else {
                throw new TypeError;
            }
        },
        setMiddleName(state, name) {
            if (typeof name === "string") {
                state.user.middleName = name;
            } else {
                throw new TypeError;
            }
        },
        setProvider(state, provider) {
            if (typeof provider === "string" || provider === "") {
                if (validator.isProvider(provider)) {
                    state.user.provider = provider;
                } else {
                    throw "Provider doesn't exist"
                }
            } else {
                throw TypeError;
            }
        },
        setRole(state, role) {
            if (typeof role === "string") {
                if (validator.isRole(role) || role === -1) {
                    state.user.role = role;
                } else {
                    throw "Role doesn't exist"
                }
            } else {
                throw TypeError;
            }
        },
        setUsername(state, username) {
            if (typeof username === "string") {
                state.user.username = username;
            } else {
                throw new TypeError;
            }
        },
        setOrganization(state, organization) {
            if (typeof organization === "object") {
                let validationResult = validator.isOrganization(organization);
                if (validationResult["correct"]) {
                    state.user.organization = organization;
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
        }
    },

    actions: {
        setDefaultUserInfo({state}) {
            Object.assign(state.user, defaultUser)
        },

        setUserInfo({state, commit}, newUserInfo) {
            Object.keys(newUserInfo).forEach(
                elem => {
                    if (elem in state.user) {
                        let commitName = "set";
                        commitName += (elem.charAt(0).toUpperCase() + elem.slice(1));
                        console.log(commitName)
                        commit(commitName, newUserInfo[elem])
                    }
                }
            )
            console.log(state.user);
        },

        async updateUserInfo({dispatch, state}) {
            const newUserInfo = await request.profile.getProfile(state.user._id);

            dispatch('setUserInfo', newUserInfo);
        },

        async sendUserInfo({state}) {
            await request.profile.updateProfile(state.user._id, state.user)
        }
    },

    namespaced: true
}

