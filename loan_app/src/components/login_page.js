import React from "react";

export class Login extends React.Component {
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

	  userObject = JSON.stringify(userObject);
      fetch("http://localhost:1234/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:userObject
      })
        .then(data => data.json())
		.then(data => {
			console.log("data obtained", data);
		  })
        .catch(err => console.log("err occured", err));
    }
  }

  render() {
    return (
      <div className="container">
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
      </div>
    );
  }
}
