import React from 'react'
import { Field } from 'redux-form'
import TextInputRegular from '../../../form/TextInputRegular'

export const TextInputQuestion = (props) => {
  return (
    <>
      <Field
        key={props.question.id}
        name={`unanswered_case_questions[${props.question.id}]`}
        type="text"
        component={TextInputRegular}
        placeholder='اكتب إجابتك هنا...'
      />
    </>
  )
}