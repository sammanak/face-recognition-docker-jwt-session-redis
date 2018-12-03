import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon'

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
	
	if(isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
				{/* <p onClick={() => onRouteChange('signout') }  className='f5 link dim black underline pa2 pointer'>Sign Out</p> */}
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')}  className='f5 link dim black underline pa2 pointer'>Sign in</p>
				<p onClick={() => onRouteChange('register')}  className='f5 link dim black underline pa2 pointer'>Register</p>
			</nav>
		);
	}

}

export default Navigation;