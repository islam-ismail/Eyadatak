import React, { Component } from "react";
import Dropzone, { DropEvent } from "react-dropzone";
// import Button from '../UIComponents/Button'

interface CompProps {
    handleOnDrop: (acceptedFiles: File[], rejectedFiles: File[], event: DropEvent) => void;
}
class DropzoneInput extends Component<CompProps> {
    render() {
        const maxSize = 5242880;
        return (
            <Dropzone
                multiple
                accept={"image/*, application/pdf"}
                onDrop={this.props.handleOnDrop}
                minSize={0}
                maxSize={maxSize}
            >
                {({ getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    const isFileTooLarge =
                        rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                    return (
                        <>
                            <input {...getInputProps()} name="file" id="file" />
                            {isDragActive && !isDragReject && "ضع الملف هنا"}
                            {isDragReject && "نوع الملف غير مطابق"}
                            {isFileTooLarge && <p className="err-msg">حجم الملف أكبر من المسموح</p>}
                            <label htmlFor="file">تصفح الملفات</label>
                        </>
                    );
                }}
            </Dropzone>
        );
    }
}

export default DropzoneInput;
