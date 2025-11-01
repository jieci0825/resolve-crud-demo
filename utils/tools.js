function createNestedObject(keys, value) {
    return keys.reduceRight((prev, cur) => ({ [cur]: prev }), value)
}

module.exports = {
    createNestedObject
}
