import React from "react"

export default ({
  nameText,
	inputClass,
	iconContainerClass,
	iconClass,
  placeholderText,
  typeInput,
  handleBlur,
  isValid,
  inputId,
  validation,
  functionRef
}) => {
  return (
    <div>
			<input
				ref={functionRef}
				className={`${inputClass} ${!isValid ? null : "is-danger"}`} 
				type={typeInput} 
				placeholder={placeholderText}
				name={nameText}
				required={""} 
				onBlur={({ target: { value }}) => handleBlur(value, inputId, validation)}
			/>
			<span className={iconContainerClass}>
				<i 
					className={`fa ${iconClass}`} 
					aria-hidden={"true"}
				>
				</i>
			</span>
      {
        !isValid ? null : (<p className="is-danger">{isValid}</p>)
      }
			<br />
    </div>
  )
}