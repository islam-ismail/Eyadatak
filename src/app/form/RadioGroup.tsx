import React from "react"

const RadioGroup = ({ input, label, meta: { touched, error }, options }) => {
  return (
    <>
      {input.name === 'specialityOrDoctor'
        ? <div className="radio-group">
          {options.map(option => (
            <div
              key={option.value}
              className='radio'
            >
                <input
                  type="radio"
                  {...input}
                  value={option.value}
                  checked={option.value === input.value}
                />
                <span>{option.title}</span>
            </div>
          ))}
          {touched && !!error && <span className="err-msg">{error}</span>}
        </div>
        : <>
          {options.map(option => (
            <div
              key={option.key}
              className="radio"
            >
              <input
                type="radio"
                {...input}
                value={option.value}
                checked={option.value === input.value}
              />
              <span className="check-mark">
                {option.value}
              </span>
              </div>
          ))}
          {touched && !!error && <span className="err-msg">{error}</span>}
        </>
      }
    </>
  )
}

export default RadioGroup
