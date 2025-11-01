class Controller {
    constructor(ctx) {
        console.log('custom service 实例化')
    }
}

module.exports = app => {
    return Controller
}
