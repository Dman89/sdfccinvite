import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../../actions';
import axios from 'axios';
const fieldsArray = ["email", "password2", "password", "first_name", "last_name", "start_date", "end_date"];


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
  }
  submitAction() {
    this.refs.submitButton.click();
  }
  handleFormSubmit(formProps){
    this.props.signupUser(formProps);
  }
  next1(n) {
    this.setState({step: this.state.step + 1})
  }
  back1(n) {
    this.setState({step: this.state.step - 1})
  }
  renderButtons(step, classes, btn) {
    let errorCheck = false;
    if (btn == "NEXT") {
      if (step == 0 && this.props.errors["email"]) {
        errorCheck = true;
      }
      else if (step == 1 && (this.props.errors["password"] || this.props.errors["password2"])) {
        errorCheck = true;
      }
      else if (step == 2 && (this.props.errors["first_name"] || this.props.errors["last_name"])) {
        errorCheck = true;
      }
      else if (step == 3 && (this.props.errors["start_date"] || this.props.errors["end_date"])) {
        errorCheck = true;
      }
    }
    if (btn == "NEXT" && step == 3) {
      return "hidden";
    }
    else if (btn == "NEXT" && errorCheck) {
      return `disabled ${classes}`;
    }
    else if (step == 0 && btn == "BACK") {
      return `disabled ${classes}`;
    }
    else if (btn == "SIGNUP" && step !== 3) {
      return "hidden";
    }
    else {
      return classes;
    }
  }
  renderStep(n, classes) {
    if (this.state.step == n) {
      return classes;
    }
    else {
      return `hidden ${classes}`
    }
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger Error">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const {handleSubmit, fields: {email, password2, password, first_name, last_name, start_date, end_date}} = this.props;
    return (
      <div className="panel panel-primary SignUp">
        <div className="panel-heading">
          <h4 className="panel-title">
            Sign Up
          </h4>
        </div>
        <div className="panel-body wrapper-xl">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="Signup">
            <fieldset className={this.renderStep(0, "form-group")}>
              <label>Email:</label>
              <input type="text" {...email} className="form-control SignupEmailInput"/>
              {email.error != null && email.touched && <div className="Error">{email.error}</div>}
              {email.error == null && email.touched && email.value.length > 8 && <div className="Success">Perfect</div>}
            </fieldset>
            <fieldset className={this.renderStep(1, "form-group")}>
              <label>Password:</label>
              <input type="password" {...password} className="form-control SignupPasswordInput1"/>
              {password.error != null && password.touched && <div className="Error">{password.error}</div>}
              {password.error == null && password.touched && password.value.length > 5 && <div className="Success">Perfect</div>}
            </fieldset>
            <fieldset className={this.renderStep(1, "form-group")}>
              <label>Password (Confirm):</label>
              <input type="password" {...password2} className="form-control SignupPasswordInput2"/>
              {password2.error != null && password2.touched && <div className="Error">{password2.error}</div>}
              {password2.error == null && password2.touched && password2.value.length > 5 && <div className="Success">Perfect</div>}
            </fieldset>
            <fieldset className={this.renderStep(2, "form-group")}>
              <label>First Name:</label>
              <input type="text" {...first_name} className="form-control SignupFirstNameInput"/>
              {first_name.error && first_name.touched && <div className="Error">{first_name.error}</div>}
            </fieldset>
            <fieldset className={this.renderStep(2, "form-group")}>
              <label>Last Name:</label>
              <input type="text" {...last_name} className="form-control SignupLastNameInput"/>
              {last_name.error && last_name.touched && <div className="Error">{last_name.error}</div>}
            </fieldset>
            <fieldset className={this.renderStep(3, "form-group")}>
              <label>Start Date:</label>
              <input type="text" {...start_date} placeholder="01/2017" className="form-control SignupStartDateInput"/>
              {start_date.error != null  && start_date.touched && <div className="Error">{start_date.error}</div>}
              {start_date.error == null && start_date.touched && start_date.value.length > 6 && <div className="Success">Perfect</div>}
            </fieldset>
            <fieldset className={this.renderStep(3, "form-group")}>
              <label>Goal Completed Date:</label>
              <input type="text" {...end_date} placeholder="01/2018" className="form-control SignupEndDateInput"/>
              {end_date.error != null  && end_date.touched && <div className="Error">{end_date.error}</div>}
              {end_date.error == null && end_date.touched && end_date.value.length > 5 && <div className="Success">Perfect</div>}
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="hidden btn btn-primary SubmitSignupButton" ref="submitButton">Sign Up</button>
          </form>
        </div>
        <div className="panel-footer">
          <div className="col-xs-6 col-sm-6 text-left">
            <button className={this.renderButtons(this.state.step, "btn btn-default", "BACK")} onClick={this.back1.bind(this)}>
              Back
            </button>
          </div>
          <div className="col-xs-6 col-sm-6 text-right">
            <button className={this.renderButtons(this.state.step, "btn btn-primary", "NEXT")} onClick={this.next1.bind(this)}>
              Next
            </button>
            <button className={this.renderButtons(this.state.step, "btn btn-primary", "SIGNUP")} onClick={this.submitAction.bind(this)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
  }
}
let check_for_change_in_email_global;
let global_email_message_error;
let global_password_message_error;
let global_password2_message_error;
let global_start_date_message_error;
let global_end_date_message_error;
function check_which_date_it_is_start_or_end(y, msg) {
  switch (y) {
    case 5:
      global_start_date_message_error = msg;
      break
    case 6:
      global_end_date_message_error = msg;
      break
  }
}
function validate(formProps) {
  const errors = {};
  const check_fields = [formProps.email,formProps.password,formProps.password2,formProps.first_name,formProps.last_name,formProps.start_date,formProps.end_date];
  let y = 0;
  check_fields.map(res=>{
    if (res) {
      if (y == 0) {
        if (check_for_change_in_email_global !== res) {
          check_for_change_in_email_global = res
          const email = res
          var at = res.search(/\@/), period = res.search(/\.[A-Za-z]{1,}$/);
          const first_check = at+2;
          const second_check = period+2;
          if (at > 2) {
            if (period > first_check) {
              if (res.length > second_check) {
                axios.get("/api/check_user/"+email).then(res=>{
                  if (res.data.ok == false) {
                    global_email_message_error="Email is in Use";
                  }
                  else {
                    global_email_message_error=null;
                  }
                }).catch(res=>{
                  global_email_message_error="Something Went Wrong... We are Working on it.";
                })
              }
              else {
                global_email_message_error="Please Enter an Valid Email";
              }
            }
            else {
              global_email_message_error="Please Enter an Valid Email";
            }
          }
        }
      }
      if (y >= 5) {
        let msg;
        msg = "Month/Year in xx/xxxx format, 03/3030";
        if (res.length == 7) {
          if (res.search(/\//) >= 0) {
            if (res.search(/([0-1]{1}[0-9]{1}[\/]{1}[0-9]{4})/) >= 0) {
              msg = "Perfect"
              check_which_date_it_is_start_or_end(y, null);
            }
            else {
              check_which_date_it_is_start_or_end(y, msg);
            }
          }
          else {
            check_which_date_it_is_start_or_end(y, msg);
          }
        }
        else {
          check_which_date_it_is_start_or_end(y, msg);
        }
      }
    }
    else {
      switch (y) {
        case 0:
          global_email_message_error="Please Enter an Email";
          break;
        case 1:
          global_password_message_error="Please Enter an Password";
          break;
        case 2:
          global_password2_message_error="Please Enter an Password";
          break;
        case 3:
          errors.first_name="Please Enter an First Name";
          break;
        case 4:
          errors.last_name="Please Enter an Last Name";
          break;
        case 5:
          global_start_date_message_error="Please Enter a Start Date";
          break;
        case 6:
          global_end_date_message_error="Please Enter a End Date";
          break;
      }
    }
    y+=1
  })
  if (formProps.password !== formProps.password2) {
    global_password_message_error = 'Passwords Must Match';
    global_password2_message_error = 'Passwords Must Match';
  }
  else {
    global_password_message_error = null;
    global_password2_message_error = null;
  }
  let pw = formProps.password;
  if (pw) {
    if (pw.length > 5) {
      if (pw.search(/[A-Z]/) >= 0) {
        if (pw.search(/[a-z]/) >= 0) {
          if (pw.search(/[0-9]/) >= 0) {
            if (pw.search(/[^a-zA-Z0-9\s]/) >= 0) {
              global_password_message_error=null;
            }
            else {
              global_password_message_error="Please Enter an Password (1 Special Symbol)";
            }
          }
          else {
            global_password_message_error="Please Enter an Password (1 Number)";
          }
        }
        else {
          global_password_message_error="Please Enter an Password (1 Lowercase Letter)";
        }
      }
      else {
        global_password_message_error="Please Enter an Password (1 Capital Letter)";
      }
    }
    else {
      global_password_message_error="Please Enter an Password (6 Characters Minimum)";
    }
  }
  errors.password = global_password_message_error;
  errors.password2 = global_password2_message_error;
  errors.email = global_email_message_error;
  errors.start_date = global_start_date_message_error;
  errors.end_date = global_end_date_message_error;
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}
export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'password2', 'first_name', 'last_name', 'start_date', 'end_date'],
  validate
}, mapStateToProps, actions)(Signup);
