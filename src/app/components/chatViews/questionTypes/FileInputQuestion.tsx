import React, { Component } from 'react'
import { Field } from 'redux-form'
import DropzoneInput from '../../../form/DropzoneInput'

class FileInputQuestion extends Component {
  render() {
    return (
      <>
        <div className='file-input'>
          <Field
            name={`unanswered_case_questions[${
              this.props.question.id
              }]`}
            type='file'
            component={() =>
              <DropzoneInput
                handleOnDrop={(acceptedFiles, rejectedFiles) => this.props.handleOnDrop(
                  acceptedFiles,
                  rejectedFiles,
                  this.props.questionId
                )}
              />
            }
          />
        </div>
        {this.props.uploadedFiles[this.props.questionId] &&
          this.props.uploadedFiles[this.props.questionId].map(file => (
            <div key={file.name} className='attache'>
              <i>
                {file.name}
                <span
                  onClick={() => this.props.removeFile(file, this.props.questionId)}
                >
                </span>
              </i>
            </div>
          ))}
      </>
    )
  }
}

export default FileInputQuestion