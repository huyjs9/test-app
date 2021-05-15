import Request from './Request'
import User from './Components/User'
import Host from './Components/Host'


/**
 * @constructs Zabbix
 *
 * @param {string} [host] - Set the host of Zabbix server.
 * @param {string} [user] - Set the username.
 * @param {string} [pass] - Set the password.
 */
class Zabbix {
    constructor(host, user, pass) {
        this.req = new Request(host || "localhost")
        this.apiversion = ''

        // TODO Auto login here when autologin is true on (host, user, pass, autologin = false)
        // TODO Login, logout shortcut
        this.version()

        this.user = new User(this.req, user, pass)
        this.host = new Host(this.req)
    }
    /**
     * This method allows to retrieve the version of the Zabbix API.
     *
     * @returns {Promise.<string>} Retrieve the version of the Zabbix API.
     */
    version() {
        return this.req.jsonrpc("apiinfo.version", [], false)
            .then((data) => {
                this.apiversion = data.result
                return data.result
            })
    }
    /**
     *	Execute a basic jsonrpc command.
     *
     * @param {Object} jsonrpc - JSON RPC that performs one specific task.
     * @param {Object} params - Parameters defining the desired output.
     * @returns {Promise.<string>} A promise to a result.
     */
    call(jsonrpc, params) {
        if (params) {
            const array = ['apiinfo.version', 'user.login']

            return this.req.jsonrpc(jsonrpc, params, (array.indexOf(jsonrpc) > -1) ? false : true)
                .then((data) => data.result)
        }

        return this.req.fetch(jsonrpc)
            .then((data) => data.result)
    }
}





export default Zabbix