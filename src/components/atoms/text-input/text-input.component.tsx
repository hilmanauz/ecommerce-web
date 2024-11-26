import { ForwardRefRenderFunction, forwardRef, memo } from 'react'
import { TextInput as MantineTextInput } from '@mantine/core'
import { TextInputProps } from './text-input.types'

const TextInputComponent: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
    { id, ...props },
    ref
): JSX.Element => {
    return (
        <MantineTextInput
            {...props}
            id={id}
            ref={ref}
            size={props.size || 'xs'}
            onFocus={(e) => {
                if (props.type === 'number') return
                e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                )
                props.onFocus?.(e)
            }}
        />
    )
}

export const TextInput = memo(forwardRef(TextInputComponent))
