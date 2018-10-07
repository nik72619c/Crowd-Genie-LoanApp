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

            if(data.data.isAuth===false){

        console.log('sessionChecker returned isAtug..');
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

    requestNewLoan(){

        console.log('requestNewLoan called..');
        if(this.refs.amount.value && this.refs.description.value ){

            console.log('inside if..');
            axios.post('http://localhost:1234/requestNewLoan',{

            email: localStorage.getItem('email'),
            amount: this.refs.amount.value,
            description: this.refs.description.value,
            sessionId: localStorage.getItem('sessionId')

            },{withCredentials: true}).then(data=>{
                console.log('data', data);
                if(data.data.isAuth==false){
                    console.log('sessionChecker returned isAtug..');
                    this.props.history.push('/');
                    localStorage.clear();
                }

                else if(data.data.isAdded==true){


                    console.log('data.data', data.data);
                    let loanObject= data.data.loanObject;
                    console.log('data.data.aloanObject', loanObject);
                   this.userData[0].loans.push(loanObject);
                   console.log('new userData', this.userData);
                   this.setState({userData: this.userData},()=>{
                       console.log('updated the userData');
                   });


                }

                else{

                    alert('oops !loan could not be added');
                }
            
            });
        }

        else{

            alert('kindly fill all the credentials properly..');
        }

    }

    logOut(){
        this.props.history.push('/');
        localStorage.clear();

    }

    render(){

        console.log('render called...');

        if(this.isDataPresent==true){

        return (<div>
            <h1 className="text-danger">Customer Dashboard</h1>
<div><h1>YOUR VALLET: {this.state.userData[0].vallet}</h1></div>
            <div className="mb-3 mt-3"><a href="#" className="p-2 bg-primary text-white" onClick={this.logOut.bind(this)}>LOGOUT</a></div>
            <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
              
                <th scope="col">Loan id</th>
                <th scope="col">Amount</th>
                <th scope="col">description</th>
                <th scope="col">status</th>
              </tr>
            </thead>

           
            <tbody>
            {
                localStorage.getItem('sessionId')? this.state.userData[0].loans.map((data)=>{
                    return <tr key={this.rowCount}>
                   
                   <td>{data.loanid}</td>
                   <td>{data.amount}</td>
                   <td>{data.description}</td>
                   <td>{data.status}</td>
                   </tr>
                
                }) : this.props.history.push('/')

                
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