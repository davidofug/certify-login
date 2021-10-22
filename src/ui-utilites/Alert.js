import React from "react"
import "./utilities.css"

export default function Alert({children, variant}) {
    if(variant === 'danger')
        return (
            <div className="alert danger">
                {children}
            </div>
        )
    if(variant === 'success')
        return (
            <div className="alert success">
                {children}
            </div>
        )

    return <>Rendered Alert without settings</>
    
}
