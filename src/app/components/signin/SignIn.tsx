import React, { Component } from 'react';
import SignInForm from './SignInForm';

interface CompOwnProps {
  switchScreens: (screenName: string) => void;
}

type CompProps = CompOwnProps;

export default class SignIn extends Component<CompProps> {
  render() {
    return (
      <div className="login-form">
        <div className="title">
          <h1>تسجيل الدخول</h1>
        </div>
        <SignInForm switchScreens={this.props.switchScreens} />
      </div>
    );
  }
}
