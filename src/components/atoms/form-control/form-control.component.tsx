'use client'
import { memo } from 'react'
import { FormControlProps } from './form-control.types'
import { Controller } from 'react-hook-form'

const FormControlComponent: React.FC<FormControlProps> = ({ children, control, name, rules }) => {
    return <Controller name={name} control={control} rules={rules} render={children} />
}

export const FormControl = memo(FormControlComponent)
