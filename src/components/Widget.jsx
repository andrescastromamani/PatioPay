import React from 'react'

export const Widget = ({ type, title, icon, mount }) => {
    return (
        <div className="shadow-sm p-3 mb-3 bg-body rounded">
            <div className="row">
                <div className="col-8">
                    <div>
                        <span className="text-capitalize">{type}</span>
                        <p className="text-sm mb-0 text-uppercase fw-bold">{title}</p>
                        <span>{mount}</span>
                    </div>
                </div>
                <div className="col-4 d-flex justify-content-end d-flex align-items-center">
                    <div
                        className="rounded bg-green text-white p-2 text-center"
                        style={
                            { width: 40, height: 40 }}
                    >
                        <i className={`fa ${icon} fa-2x fs-5`}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
