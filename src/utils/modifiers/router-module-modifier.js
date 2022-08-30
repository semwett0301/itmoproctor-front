export default (module, parent) => {
    module.forEach(
        elem => {
            elem.name = parent + "/" + elem.path
        }
    )
    return module
}
