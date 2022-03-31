import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

export const Loading = () => {
    return (
        <div>
            <ScaleLoader
                color={'#000'}
                size={30}
            />
        </div>
    )
}

