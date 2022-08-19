export default {
    isDocumentNumber: (number) => {
        number.match(/^\d{4}\s\d{6}$/)
    }
}
