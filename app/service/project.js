module.exports = app => {
    return class ProjectService {
        async getList() {
            return ['project1', 'project2', 'project3']
        }
    }
}
