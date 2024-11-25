import { classNames } from '@/utils'
import { MainLayoutProps } from './main-layout'

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
    return (
        <main
            {...props}
            className={classNames(
                'h-screen w-screen flex flex-col flex-wrap bg-slate-50',
                props.className || ''
            )}
        />
    )
}
