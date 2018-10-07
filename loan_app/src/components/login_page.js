import React from "react";
import axios from 'axios';

export class Login extends React.Component {

	constructor(props){

    super(props);
    this.isShow=false;
 
	}
  loginUSer() {
    let selectOptions = document.getElementsByClassName("roleSelect")[0];

    var userObject = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      role: selectOptions.options[selectOptions.selectedIndex].value
	};
	
    console.log("userOject", userObject);
	

    if (!userObject.email || !userObject.password) {

	  alert("kindly fill all the credentials to login");

	} 

	else {

      axios.post("http://localhost:1234/loginUser", {
   
	  userObject:userObject
   
      })
    
		.then(data => {
      console.log("data obtained", data.data);
      var response=data.data;

        if(data.data.isUserAdded==true){
          console.log('inside main if...');
          document.getElementById('hidden').setAttribute("id","show");
        }
      
      
			else if(response.content[0] && response.content[0].role=="admin"){

        localStorage.sessionId=response.sessionID;
        localStorage.email=response.content[0].email;
				this.props.history.push('/admin/dashboard');

      }

      else if(response.content[0] && response.content[0].role=="customer"){
        console.log('response.sessionId', response.sessionID);
        console.log('inside cusstomer if login');
        localStorage.sessionId=response.sessionID;
        localStorage.email=response.content[0].email;
				this.props.history.push('/customer/dashboard');
      }

      else if(response.content[0] && response.content[0].role=="lender"){

        console.log('response.sessionId', response.sessionID);
        console.log('inside lender if login');
        localStorage.sessionId=response.sessionID;
        localStorage.email=response.content[0].email;
        this.props.history.push('/lender/dashboard');
        
      }
    

		  })
        .catch(err => console.log("err occured", err));
	}
	
  }

  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please sign in</h3>
              </div>
              <div className="panel-body">
                <form role="form">
                  <fieldset>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="E-mail"
                        name="email"
                        type="text"
                        ref="email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        ref="password"
                        name="password"
                        type="password"
                      />
                    </div>
                    <div className="form-group">
                      <select className="custom-select roleSelect">
                        <option value="admin">admin</option>
                        <option value="lender">lender</option>
                        <option value="customer">customer</option>
                      </select>
                    </div>

                    <a
                      className="btn btn-lg btn-success btn-block"
                      onClick={this.loginUSer.bind(this)}
                    >
                      Login
                    </a>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg bg-warning text-red mt-4" id="hidden">We couldnt find you so you were registered...Login again to continue !</div>
      </div>
    );
  }
}
