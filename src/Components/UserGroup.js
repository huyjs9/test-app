/**
* @constructs UserGroup
*/
class UserGroup {
    constructor(req) {
        this.req = req
    }
    /**
    * The method allows to retrieve user groups according to the given parameters.
    *
    * @param {Object} params - Parameters defining the desired output.
    * @returns {Promise<array>} Retrieve all enabled user groups.
    */
    get(params = []) {
        return this.req.jsonrpc('usergroup.get', params)
            .then(data => data.result)
    }
    /**
    **
    * This method allows to create new user groups.
    *
    * @param {Object<array>} params - User groups to create.
    * @returns {Promise<array>} Returns an object containing the IDs of the created user groups.
    */
    create(params) {
        return this.req.jsonrpc('usergroup.create', params)
            .then(data => data.result)
    }
    /**
    * This method allows to delete user groups.
    *
    * @param {Object<array>} params - IDs of the user groups to delete.
    * @returns {Promise<array>} Returns an object containing the IDs of the deleted user groups.
    */
    delete(params) {
        return this.req.jsonrpc('usergroup.delete', params)
            .then(data => data.result)
    }
    /**
    * This method allows to update existing group.
    *
    * @param {Object<array>} params - User groups properties to be updated.
    * @returns {Promise<array>} Returns an object containing the IDs of the updated user groups.
    */
    update(params) {
        return this.req.jsonrpc('usergroup.update', params)
            .then(data => data.result)
    }
}










module.exports = UserGroup