import { useRef, useState } from "react"

const useCounter = () => {
    const ref = useRef(0);
    const [count, setCount] = useState({current: 0, previous: 0});

    const increment = () => {
        const previous = ref.current;
        const current = previous + 1;
        
        setCount({
            previous,
            current
        })

        ref.current = current;
    }

    return {increment, ...count}

}

export default useCounter;