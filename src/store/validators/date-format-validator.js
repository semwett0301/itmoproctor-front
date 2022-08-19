export default {
    // Проверяет формат: 19.01.2001
    isStandard: (date) => {
        return date.match(/^\d{2}(.)\d{2}\1\d{4}$/)
    },

    // Проверяет формат: 2019-03-26T14:32:24.435Z
    isFullDate: (date) => {
        return date.match(/^\d{4}(-)\d{2}\1\d{2}\w\d{2}(:)\d{2}\2\d{2}\2(.)\d{3}\w$/)
    }
}
