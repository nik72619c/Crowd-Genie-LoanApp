import React from 'react';
import axios from 'axios';

export class AdminDashboard extends React.Component{

    constructor(props){

        super(props);
    }

    componentWillMount(){
        console.log('front end session id', localStorage.getItem('sessionId'));
        console.log('admin dashboard component will mount called...');
       
        axios.post(('http://localhost:1234/test'),{
          
            data: "hey this is some data", 
            sessionId: localStorage.getItem('sessionId'),
           
        },{ withCredentials: true}).then(data=>console.log('data',data)).catch(err=>console.log('error',err));

    }

    render(){

        return (
          <div>
            <h1 className="text-danger">Admin Dashboard</h1>
            <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          </div>
        )
    }
}