import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: ''
		}
	}
	onNameChange = (event) => {
		this.setState({ registerName: event.target.value })
	}
	onEmailChange = (event) => {
		this.setState({ registerEmail: event.target.value })
	}
	onPasswordChange = (event) => {
		this.setState({ registerPassword: event.target.value })
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token) // using browser api
		// window.localStorage.setItem('token', token); 
	}

	onSubmitRegister = () => {
		// console.log(this.state); // Input Then Click Register --> {registerName: "cam", registerEmail: "cam@gmail.com", registerPassword: "cam"}
		const { registerName, registerEmail, registerPassword } = this.state
		fetch('http://localhost:3001/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: registerName,
				email: registerEmail,
				password: registerPassword
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.userId && data.success === 'true') {
					this.saveAuthTokenInSession(data.token);
					// console.log('success we need to get user profile');
					fetch(`http://localhost:3001/profile/${data.userId}`, {
						method: 'get',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': data.token
						}
					})
					.then(resp => resp.json())
					.then(user => {
						// console.log(user)
						if (user && user.email) {
							this.props.loadUser(user);
							this.props.onRouteChange('home');
						}
					})
				}
			})
	}


	render() {
		return(
			<article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="name" id="name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      	onClick={this.onSubmitRegister}  
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Register" />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;