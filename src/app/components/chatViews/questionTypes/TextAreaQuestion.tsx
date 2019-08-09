import React from 'react'
import { Field } from 'redux-form'
import TextAreaRegular from '../../../form/TextAreaRegular'

export const TextAreaQuestion = (props) => {
  return (
    <>
      <Field
        key={props.question.id}
        name={`unanswered_case_questions[${props.question.id}]`}
        type="text"
        component={TextAreaRegular}
        placeholder='اكتب إجابتك هنا...'
      />
    </>
  )
}