require('module-alias/register')

const JcCore = require('@/jc-crud-core')

JcCore.start({
    name: 'JcCrud',
    homePath: '/'
})
