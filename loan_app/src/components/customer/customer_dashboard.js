import React from 'react';
import axios from 'axios';

export class CustomerDashboard extends React.Component{

    constructor(props){
        super(props);
        this.userData=[];
        this.rowCount=0;
        this.state={
             userData: this.userData
        };

        this.isDataPresent=false;
    }

    componentWillMount(){

        console.log('state initial is', this.state);
        console.log('compinent will mount of CustomerDashboar called');
        axios.get('http://localhost:1234/newLoan', {

       params: {
        email: localStorage.getItem('email'),
        sessionId: localStorage.getItem('sessionId'),
        withCredentials: true
        }
        }).then(data=>{

            if(data.data.isAuth=='false'){

                this.props.history.push('/');
                localStorage.clear();
            }
            else{
                var response=data.data.data;
                console.log('gg data', response);

                this.userData=response;
                console.log('userData', this.userData[0].loans);
                this.setState({userData: this.userData},()=>{
                    this.isDataPresent=true;
                    console.log('state is now', this.state);
                    this.setState({userData: this.userData});
                });

            }
        });
       
    }

    render(){

        console.log('render called...');

        if(this.isDataPresent==true){

        return (<div>
            customer dashboard
            <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
              <th scope="col">sno</th> 
                <th scope="col">Loan id</th>
                <th scope="col">Amount</th>
                <th scope="col">description</th>
                <th scope="col">status</th>
              </tr>
            </thead>

           
            <tbody>
            {
                this.state.userData[0].loans.map((data)=>{
                    return <tr key={this.rowCount}>
                   <td>{this.rowCount+1}</td>
                   <td>{data.loanid}</td>
                   <td>{data.amount}</td>
                   <td>{data.description}</td>
                   <td>{data.status}</td>
                   </tr>
                
                })

                
            }
            </tbody>
          </table>

<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Register for new loan
</button>


<div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Register New Loan</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="pb-3"><input type="text" className="form-control" name="" placeholder="enter amount" ref="amount" /></div>
      <div className="pb-3"><input type="text" className="form-control" name="" placeholder="enter description" ref="description"/></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.requestNewLoan.bind(this)}>Request Loan</button>
      </div>
    </div>
  </div>
</div>
          </div>);
    }

    else{

        return <div>retreiving data...please wait</div>
    }
}

}