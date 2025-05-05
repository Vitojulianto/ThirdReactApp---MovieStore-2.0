import React from 'react'

function Button({ children, onClick, className, type, ...props }) {
  
  return (
    <div>
      <button className={className}
      onClick={onClick}
      type={type}
      {...props}>{children}</button>
    </div>
  )
}

export default Button
