import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Input, createField } from '../../Common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import {connect} from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom'    
import classes from '../../Common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required], Input)}
            {/* <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                validate={[required]}/>
            </div> */}

            {createField("Password", "password", [required], Input, {type: "password"})}

            {/* <div>
                <Field placeholder={"Password"} name={"password"} type={"password"} 
                component={Input} validate={[required]}/>
            </div> */}

            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            {/* <div>
                <Field component={Input} type={"checkbox"} name={"rememberMe"}/> remember me
            </div> */}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl &&  createField("Tipe sumbols from picture here", "captcha", [required], Input, {}, {} ) }

            { error && <div className={classes.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
        )
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)



const Login = (props) => {

const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to={"/Profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl ,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);