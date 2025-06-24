import React from 'react'
//error message
const ErrorMessage:React.FC<{error:string}> = ({error}) => {
  return (
    <React.Fragment>
        {error && error.length > 0 && <p className="text-red-500">{error}</p>}
    </React.Fragment>
  )
}

export default ErrorMessage