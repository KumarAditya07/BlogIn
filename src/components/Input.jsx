import React, {useId} from 'react'

/*
forwardRef is a feature in React that allows components to accept and 
forward ref attributes to their child components, enabling direct access 
to the underlying DOM nodes or React elements.
*/
const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props  //we use this if we want to add extra props rather than above it will make copy and add
 
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input