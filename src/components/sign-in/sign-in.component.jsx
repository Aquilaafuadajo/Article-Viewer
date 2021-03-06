import React, {Component} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        email: '',
        password: ''
      }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {email, password} = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    }catch(error){console.log(error.message)}
    this.setState({email:'', password: ''})
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  render() { 
    return ( 
        <div>
          <h1>I have an account</h1>
          <span>Sign in with your email and password</span>
          <form onSubmit={this.handleSubmit}>
            <FormInput name='email' label='email' type='email' value={this.state.email} handleChange={this.handleChange} required/>
            <FormInput name='password' label='password' type='password' value={this.state.password} handleChange={this.handleChange} required/>
            <div className='buttons'>
              <CustomButton type='submit'>Sign In</CustomButton>
              <CustomButton onClick={signInWithGoogle} isGoogleSignIn>{' '}Sign In With Google{' '}</CustomButton>
            </div>
          </form>
        </div>
      );
  }
}

export default SignIn;