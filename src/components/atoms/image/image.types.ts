import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { ImageProps as MantineImageProps } from '@mantine/core'

export type ImageProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
> &
    MantineImageProps
