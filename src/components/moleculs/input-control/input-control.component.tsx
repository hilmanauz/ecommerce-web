'use client'
import React, { memo, useMemo } from 'react'
import { InputControlProps, InputType } from './input-control.types'
import { FormControl, PasswordInput, Select, TextInput } from '../../atoms'
import { capitalize } from 'lodash'
import { FieldValues, useFormContext } from 'react-hook-form'
import { InputRules } from '@/components/atoms/form-control/form-control.types'
import { handlePreventAlphabet, classNames as utilsClassNames } from '@/utils'

const InputControlComponent: React.FC<InputControlProps<any, InputType>> = ({
    type,
    control,
    name,
    label,
    rules,
    required,
    placeholder,
    classNames,
    leftIcon,
    radius,
    options,
    size,
    readOnly,
    disabled,
    onBlur,
    onFocus,
    onKeyDown,
    onChange,
}) => {
    const methods = useFormContext<FieldValues, any, Record<string, any>>()
    const { validation, ...opt } = options
    const Component = useMemo(() => {
        switch (type) {
            case 'text':
                return TextInput
            case 'password':
                return PasswordInput
            case 'select':
                return Select
            default:
                return TextInput
        }
    }, [type])

    const rulesType: InputRules = useMemo(() => {
        let defaultRule: InputRules = required
            ? {
                  required:
                      typeof required === 'object'
                          ? required.message
                          : `${capitalize(name.split('_').join(' '))} is required`,
              }
            : {}
        switch (type) {
            case 'text':
                if (options && options.format === 'email') {
                    defaultRule.pattern = {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'invalid email address',
                    }
                }
                break
            case 'password':
                if (!validation) {
                    defaultRule.validate = undefined
                    defaultRule.minLength = undefined
                    defaultRule.maxLength = undefined
                    break
                }
                defaultRule.validate = (value) => {
                    // /[#?!@$%^&*-]/g.test(value)  //special characters
                    return !(/[a-z]/g.test(value) && /[A-Z]/g.test(value) && /[0-9]/g.test(value))
                        ? 'A combination of uppercase letters, lowercase letters, numbers, and symbols.'
                        : undefined
                }
                defaultRule.minLength = {
                    value: 8,
                    message: 'At least 8 characters long but 16 is maximum.',
                }
                defaultRule.maxLength = {
                    value: 16,
                    message: 'At least 8 characters long but 16 is maximum.',
                }
                break
        }
        return { ...rules, ...defaultRule }
    }, [required, name, type, rules, opt])

    return (
        <FormControl name={name} control={control} rules={rulesType}>
            {({ field, fieldState }) => (
                <Component
                    {...field}
                    {...opt}
                    {...(type === 'checkbox' ? { checked: field.value } : {})}
                    onChange={(e) => {
                        onChange ? onChange(e, field.onChange, methods) : field.onChange(e)
                    }}
                    onFocus={() => {
                        onFocus?.()
                    }}
                    onBlur={() => {
                        field.onBlur()
                        onBlur?.()
                    }}
                    onKeyDown={
                        type === 'text' && opt.format === 'number'
                            ? handlePreventAlphabet
                            : onKeyDown
                    }
                    key={`${name}-${type}`}
                    label={label}
                    placeholder={placeholder}
                    required={!!required}
                    readOnly={readOnly}
                    disabled={disabled}
                    radius={radius}
                    error={fieldState.error?.message}
                    leftSection={leftIcon}
                    checked={field.value}
                    classNames={{
                        ...classNames,
                        ...opt.classNames,
                        label: utilsClassNames(classNames?.label || '!font-semibold'),
                    }}
                    size={size || opt.size || 'sm'}
                    suppressHydrationWarning
                />
            )}
        </FormControl>
    )
}

export const InputControl = memo(InputControlComponent)
