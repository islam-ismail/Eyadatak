import React from 'react'
import CheckboxGroup from '../../../form/CheckboxGroup'

export const CheckboxInputQuestion = (props) => {
  const checkBoxesOptions = props.question.question_template.question_options_ar.map(
    (value, key) => ({
      label: value,
      value: value
    })
  )
  return (
    <>
      <div className='checkbox-group'>
        <CheckboxGroup
          name={`unanswered_case_questions[${
            props.question.id
            }]`}
          options={checkBoxesOptions}
        />
      </div>
    </>
  )
}