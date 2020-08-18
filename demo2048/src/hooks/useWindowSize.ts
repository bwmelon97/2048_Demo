import { useState, useEffect } from 'react'


type WindowSize = {
    windowHeight: number;
    windowWidth: number;
}

const useWindowSize = (): WindowSize => {

    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const updateWindowSize = ():void => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', updateWindowSize);

        return () => { window.removeEventListener('resize', updateWindowSize); }
    }, [])

    return { windowHeight, windowWidth }
}

export default useWindowSize;