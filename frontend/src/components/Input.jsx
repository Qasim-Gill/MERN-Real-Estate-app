import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error = null,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                style={{ marginTop: '30px' }}
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`form-control ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && (
                <p className="text-danger small mt-1">{error.message}</p>
            )}
        </div>
    )
})

export default Input