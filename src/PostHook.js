import React, { useEffect } from 'react';
import axios from 'axios';

export default function Post() {
    useEffect(() => {
        let API_URL = '192.168.0.5';
        axios.post(`http://${API_URL}/zabbix/api_jsonrpc.php`, {
            jsonrpc: "2.0",
            method: "user.login",
            params: {
                user: "Admin",
                password: "zabbix"
            },
            id: 1,
            auth: null
        })
            .then(res =>  localStorage.setItem('token', JSON.stringify(res.data.result)));
        axios.post(`http://${API_URL}/zabbix/api_jsonrpc.php`, {
            jsonrpc: "2.0",
            method: "host.get",
            params: {
                filter: {
                    host: [
                        "Zabbix server",
                        "Linux server"
                    ]
                }
            },
            auth: JSON.parse(localStorage.getItem('token')),
            id: 1
        })
            .then(res =>  localStorage.setItem('hostdata', JSON.stringify(res.data)));
    }, []);
    let data = JSON.parse(localStorage.getItem('token'));
    let data2 = JSON.parse(localStorage.getItem('hostdata'));    
    return (
        <div className="card text-center m-3">
        <h1 className="card-header">Authentication</h1>
        <div className="card-body">
            Returned Authentication: {JSON.stringify(data)};
        </div>
        <p></p>
        <div>
            <h3>host.get:</h3> 
            <p>"hostid": {JSON.stringify(data2.result[0].hostid)}</p>
            <p>"host": {JSON.stringify(data2.result[0].host)}</p>
        </div>
    </div>
    );
}