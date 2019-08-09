import React from 'react'
import RadioGroup from '../../../form/RadioGroup'
import { Field } from 'redux-form'

export const RadioInputQuestion = (props) => {
  const radioOptions = props.question.question_template.question_options_ar.map(
    (value, key) => ({
      label: value,
      value: value,
      key: key
    })
  )
  return (
    <>
      <div className='radio-group'>
        <Field
          component={RadioGroup}
          name={`unanswered_case_questions[${
            props.question.id
            }]`}
          required={true}
          options={radioOptions}
        />
      </div>
    </>
  )
}