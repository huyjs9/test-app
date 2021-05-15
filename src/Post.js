import React from 'react';
import axios from 'axios';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            auth: null,
            result: '',
        }
    }

    componentDidMount() {
        axios.post(`http://192.168.0.4/zabbix/api_jsonrpc.php`, {
            jsonrpc: "2.0",
            method: "user.login",
            params: {
                user: "Admin",
                password: "zabbix"
            },
            id: 1,
            auth: null
        })
            .then(res => this.setState({auth: res.data}));
    };

    render() {
        const { auth } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Authentication</h5>
                <div className="card-body">
                    Returned Authentication: {JSON.stringify(auth)}
                </div>
            </div>
        );
    }
}