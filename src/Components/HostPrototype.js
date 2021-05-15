/**
* @constructs HostPrototype
*/
class HostPrototype {
    constructor(req) {
        this.req = req
    }
    /**
    * The method allows to retrieve host prototypes according to the given parameters.
    *
    * @param {Object} params - Parameters defining the desired output.
    * @returns {Promise<array>} Retrieve all host prototypes generated.
    */
    get(params = []) {
        return this.req.jsonrpc('hostprototype.get', params)
            .then(data => data.result)
    }
    /**
    **
    * This method allows to create new host prototype.
    *
    * @param {Object<array>} params - Host prototypes to create.
    * @returns {Promise<array>} Returns an object containing the IDs of the created host prototypes.
    */
    create(params) {
        return this.req.jsonrpc('hostprototype.create', params)
            .then(data => data.result)
    }
    /**
    * This method allows to delete host prototypes.
    *
    * @param {Object<array>} params - IDs of the host prototypes to delete.
    * @returns {Promise<array>} Returns an object containing the IDs of the deleted host prototypes.
    */
    delete(params) {
        return this.req.jsonrpc('hostprototype.delete', params)
            .then(data => data.result)
    }
    /**
    * This method allows to update existing host prototype.
    *
    * @param {Object<array>} params - Host prototype properties to be updated.
    * @returns {Promise<array>} Returns an object containing the IDs of the updated host prototypes.
    */
    update(params) {
        return this.req.jsonrpc('hostprototype.update', params)
            .then(data => data.result)
    }
}










export default HostPrototype