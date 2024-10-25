import React from 'react'

interface BoxProps {
    children: React.ReactNode
    className?: string
}

export default function Box({children, className}: BoxProps): React.ReactElement {
    return (
        <div className={className}>
            {children}
        </div>
    )
}
