import React from 'react';
import axios from 'axios';

export class AdminDashboard extends React.Component{


  constructor(props){
    super(props);
    this.loanData=[];
    this.loans=[];
    this.items=[];
    this.state={
        loanData: this.loanData,loans: this.loans,items: this.items
    }
}

componentWillMount(){

    axios.get('http://localhost:1234/getLoans',{
     params: {
         sessionId: localStorage.getItem('sessionId'),
         withCredentials: true
        
     }
    }).then(data=>{
        console.log('data obtained in lender componentWillMount is', data);
        if(data.data.isAuth===false){

            console.log('sessionChecker returned isAtug..');
                    this.props.history.push('/');
                    localStorage.clear();
                }

                else{


                    let response=data.data.content;
                    console.log('response got' ,response);
                    this.loanData=response;
                    this.setState({loanData: this.loanData,loans: this.loans,items: this.items},(()=>{

                        this.setState({loanData: this.loanData,loans: this.loans,items: this.items});
                        this.state.loanData.forEach(element=>{
                            this.loans.push(element.loans);
                        })
                            console.log('this.loans', this.loans);
                            this.setState({loanData: this.loanData,loans: this.loans,items: this.items},()=>{
                                this.setState({loanData: this.loanData,loans: this.loans,items: this.items});
                                this.state.loans.forEach(element=>{
                                    element.forEach(item=>{
                                        this.items.push(item);

                                    })
                                });
                                console.log('this.items', this.items);
                                this.setState({loanData: this.loanData,loans: this.loans,items: this.items},()=>{
                                    this.setState({loanData: this.loanData,loans: this.loans,items: this.items});
                                })
                                
                            })
                       

                    }))


                }
    
    });
}

approveLoan(event){

    let amount=event.target.getAttribute('amount');
   console.log('amount', amount); 
    console.log('event', event.target.parentNode.parentNode.getAttribute("id"));
    let myevent=event.target.parentNode.parentNode;
    axios.post('http://localhost:1234/approveLoan',{
        loanid: event.target.parentNode.parentNode.getAttribute("id"),
        sessionId: localStorage.getItem('sessionId'),
        amount: document.getElementById(event.target.parentNode.parentNode.getAttribute("id")).getAttribute('amount')
        
    
    },{withCredentials: true}).then(data=>{
        console.log('data for approve', data);
        if(data.data.isAuth===false){

            console.log('sessionChecker returned isAtug..');
                    this.props.history.push('/');
                    localStorage.clear();
                }

                else if(data.data.isApproved==true){

                    console.log('inside else if of approve loan');
                    this.items.forEach(element=>{
                        if(element.loanid==myevent.getAttribute("id")){

                            element.status="approved";
                        }
                    });
                    this.setState({loanData: this.loanData,loans: this.loans,items: this.items},()=>{
                        this.setState({loanData: this.loanData,loans: this.loans,items: this.items});
                    });
                    
                }

    
    });
    

}

rejectLoan(event){

    let myevent=event.target.parentNode.parentNode;
    console.log('event', event.target.parentNode.parentNode.getAttribute("id"));
    axios.post('http://localhost:1234/rejectLoan',{
        loanid: event.target.parentNode.parentNode.getAttribute("id"),
        sessionId: localStorage.getItem('sessionId')
    
    },{withCredentials: true}).then(data=>{
        console.log('data for reject', data);
        if(data.data.isAuth===false){

            console.log('sessionChecker returned isAtug..');
                    this.props.history.push('/');
                    localStorage.clear();
                }

                else if(data.data.isRejected==true){

                    console.log('inside else if of reject loan');
                    this.items.forEach(element=>{
                        if(element.loanid==myevent.getAttribute("id")){

                            element.status="rejected"
                        }
                    });
                    this.setState({loanData: this.loanData,loans: this.loans,items: this.items},()=>{
                        this.setState({loanData: this.loanData,loans: this.loans,items: this.items});
                    });
                    
                }

    
    });
}

logOut(){
    this.props.history.push('/');
    localStorage.clear();

}

render(){

    return(
        <div>
            <h1 className="text-danger">Admin Dashboard</h1>
            <div className="mb-3 mt-3"><a href="#" className="p-2 bg-primary text-white" onClick={this.logOut.bind(this)}>LOGOUT</a></div>
        <table className="table">
        <thead className="thead-dark">
          <tr>
            
            <th scope="col">loanid</th>
            <th scope="col">amount</th>
            <th scope="col">status</th>
            <th scope="col">description</th>
            <th scope="col">operation</th>
            <th scope="col">operation</th>
          </tr>
        </thead>
        <tbody>

             {
            localStorage.getItem('sessionId')? this.state.items.map((data)=>{
                return <tr key={this.rowCount} amount={data.amount} id={data.loanid} className={data.status=="rejected" ? "bg-danger": data.status=="approved"? "bg-success": "bg-secondary"} >
               
               <td>{data.loanid}</td>
               <td id={data.amount}>{data.amount}</td>
               <td>{data.status}</td>
               <td>{data.description}</td>
               <td><button className="btn btn-success" onClick={this.approveLoan.bind(this)} disabled={data.status=="pending"?false:true}>approve</button></td>
               <td><button className="btn btn-danger" onClick={this.rejectLoan.bind(this)} disabled={data.status=="pending"?false:true}>reject</button></td>
               </tr>
            
            }) : this.props.history.push('/')

            
        }
         
        </tbody>
      </table>
      </div>
    )
}
}