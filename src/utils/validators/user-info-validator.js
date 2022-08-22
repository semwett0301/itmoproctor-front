import id_validator from "./id-validator"

export default {
    // Проверяет формат: 19.01.2001
    isStandardDate: (date) => {
        return date.match(/^\d{2}(.)\d{2}\1\d{4}$/)
    },

    // Проверяет формат: 2019-03-26T14:32:24.435Z
    isFullDate: (date) => {
        return date.match(/^\d{4}(-)\d{2}\1\d{2}\w\d{2}(:)\d{2}\2\d{2(.)\d{3}\w$/)
    },
    isDocumentNumber: (number) => {
        return number.match(/^\d{4}\s\d{6}$/)
    },
    isEmail: (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    },
    isGender: (gender) => {
        return gender === "male" || gender === "female"
    },
    isProvider: (provider) => {
        let providers = ["local", "openedu"];

        return providers.includes(provider);
    },
    isRole: (role) => {
        let roles = [1, 2, 3, 10];
        return roles.includes(role);
    },
    isOrganization: (organization) => {
        let result = {
            correct: true,
            errors: []
        }

        let checker = (property) => {
            if (!(property in organization && typeof organization[property] === "string")) {
                result.errors.push(property)
                return false;
            }
            return true;
        }

        if (checker("_id") && !id_validator(organization["_id"])) {
            result.errors.push("_id")
        }

        checker("code");

        if (result.errors.length !== 0) {
            result.correct = false;
        }

        return result;
    }
}
