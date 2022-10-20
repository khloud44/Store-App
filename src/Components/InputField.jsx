import React from 'react'

const InputField = ({type , register , placeholder ,errors ,defaultValue}) => {
    return (
        <div className="w-100">
                <input
                    defaultValue={defaultValue}
                    type={type}
                    {...register}
                    placeholder={placeholder}
                    className="form-control my-2"
                />
                <p className="text-danger pb-2  mb-2  ">
                    {errors?.message}
                </p>
            </div>
    )
}

export default InputField