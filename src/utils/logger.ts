const _log = (module: string, message: string) => console.log(module, message)
const _warn = (module: string, message: string) => console.warn(module, message)
const _error = (module: string, message: string) => console.error(module, message)

const logger = (moduleName = "") => ({
    log: (message: string) => _log(moduleName, message),
    warn: (message: string) => _warn(moduleName, message),
    error: (message: string) => _error(moduleName, message),
})

export default logger