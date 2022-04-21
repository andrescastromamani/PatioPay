import React from 'react'

export const Widget = ({ title, icon, mount }) => {
    return (
        <div className="border p-3 shadow rounded">
            <p className="d-flex justify-content-between">
                <span>{title}</span>
                <i className={`fa ${icon}`}></i>
            </p>
            <span>{mount}</span>
        </div>
    )
}
