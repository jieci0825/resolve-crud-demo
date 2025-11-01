class Controller {
    constructor(ctx) {
        console.log('custom controller 实例化')
    }
}

module.exports = app => {
    return Controller
}
