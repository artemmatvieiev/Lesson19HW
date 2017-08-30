import React from "react"
import InputComponent from "./Input"
import * as constants from "./constants"
import * as validations from "./Input/validations"

const inputs = [
  {
    placeholderText: "First Name",
    typeInput: "text",
		nameText: "Name",
		inputClass: "name",
		iconContainerClass: "icon1",
		iconClass: "fa-user",
    inputId: constants.INPUT_ID_FIRST_NAME,
    validation: validations.firstNameIsValid
  },
  {
    placeholderText: "Last Name",
    typeInput: "text",
		nameText: "Name",
		inputClass: "name2",
		iconContainerClass: "icon2",
		iconClass: "fa-user",
    inputId: constants.INPUT_ID_LAST_NAME,
    validation: validations.lastNameIsValid
  },
  {
    placeholderText: "Phone Number",
    typeInput: "text",
		nameText: "Number",
		inputClass: "name",
		iconContainerClass: "icon3",
		iconClass: "fa-phone",
    inputId: constants.INPUT_ID_PHONE,
    validation: validations.phoneIsValid
  },
  {
    placeholderText: "Email",
    typeInput: "text",
		nameText: "mail",
		inputClass: "mail",
		iconContainerClass: "icon4",
		iconClass: "fa-envelope",
    inputId: constants.INPUT_ID_EMAIL,
    validation: validations.emailIsValid
  },
  {
    placeholderText: "Password",
    typeInput: "password",
		nameText: "Password",
		inputClass: "pass",
		iconContainerClass: "icon5",
		iconClass: "fa-unlock",
    inputId: constants.INPUT_ID_PASSWORD,
    validation: validations.passwordIsValid
  },
  {
    placeholderText: "Confirm Password",
    typeInput: "password",
		nameText: "Password",
		inputClass: "pass",
		iconContainerClass: "icon6",
		iconClass: "fa-unlock",
    inputId: constants.INPUT_ID_CONFIRM_PASSWORD,
    validation: validations.confirmPasswordIsValid
  }
]

export default class RegisterContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  handleRegisterClick = async () => {
    const _errors = await Promise.all(inputs.map(async ({ inputId, validation }) => {
      try {
        const value = this[inputId].value
        switch (inputId) {
          case `${constants.INPUT_ID_CONFIRM_PASSWORD}`: {
            const passwordValue = this[constants.INPUT_ID_PASSWORD].value
            await validation(passwordValue, value)
            break
          }
          default: await validation(value)
        }
        return null
      } catch ({ message }) {
        return { [inputId]: message }
      }
    }))

    this.setState(() => {
      const errors = _errors.reduce((acc, error) => {
        if (error) acc = { ...acc, ...error }
        return acc
      }, {})
      return { errors }
    })
  }

  handlerInputBlur = async (value, inputId, isValid) => {
    try {
      switch (inputId) {
        case `${constants.INPUT_ID_CONFIRM_PASSWORD}`: {
          const passwordValue = this[constants.INPUT_ID_PASSWORD].value
          await isValid(passwordValue, value)
          break
        }
        default: await isValid(value)
      }
      this.setState(({ errors }) => {
        delete errors[inputId]
        return {
          errors: { ...errors }
        }
      })
    } catch ({ message }) {
      this.setState(({ errors }) => ({
        errors: {
          ...errors,
          [inputId]: message
        }
      }))
    }
  }

  render() {
    const { errors } = this.state
    const registerIsDisabled = Object.keys(errors).length

		return (
			<div>
				<div className="header-w3l">
					<h1>Flat Sign Up Form</h1>
				</div>

				<div className="main-agileits">
					<h2 className="sub-head">Sign Up</h2>
					<div className="sub-main">	
						<form action="#" method="post">
							{
								inputs.map(({ placeholderText, inputId, validation, typeInput, nameText, inputClass, iconContainerClass, iconClass }, index) => (
									<InputComponent
										key={index}
										functionRef={input => this[inputId] = input}
										handleBlur={this.handlerInputBlur}
										isValid={errors[inputId]}
										placeholderText={placeholderText}
										typeInput={typeInput}
										inputId={inputId}
										nameText={nameText}
										inputClass={inputClass}
										iconContainerClass={iconContainerClass}
										iconClass={iconClass}
										validation={validation}
									/>
								))
							}
							<input 
								type="submit" 
								value="sign up"
								onClick={this.handleRegisterClick}
      					disabled={registerIsDisabled}
							/>
						</form>
					</div>
					<div className="clear"></div>
				</div>

				<div className="footer-w3">
					<p>&copy; 2016 Flat Sign Up Form . All rights reserved | Design by <a href="http://w3layouts.com">W3layouts</a></p>
				</div>
			</div>
		)
  }
}