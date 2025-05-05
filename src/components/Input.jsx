import React from 'react'

function Input({type, placeholder,value, className, ...props}) {
  return (
    <div>
      <input type={type} placeholder={placeholder} className={className} {...props} />
    </div>
  )
}

export default Input
