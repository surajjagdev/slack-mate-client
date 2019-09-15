import React from 'react';
import Dropzone from 'react-dropzone';

const FileUpload = ({ children, disableClick }) => (
  <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
    {({ getRootProps, getInputProps }) => (
      <div
        {...getRootProps({
          onClick: event => {
            if (disableClick === true) {
              return event.stopPropagation();
            }
          }
        })}
      >
        {children}
        <input type="hidden" {...getInputProps()} />
      </div>
    )}
  </Dropzone>
);
export default FileUpload;
