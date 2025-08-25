import { useEffect, useState } from "react";

const EventLoopDemo = () => {
    const [logs, setLogs] = useState<Set<string>>(new Set());

    const addLogs = (log: string) => {
        setLogs((prev) => new Set(prev).add(log) );
        console.log(log);
    };

    // --- React's event loop test ---
    useEffect(() => {
        addLogs("React: Synchronous 1");

        setTimeout(() => {
        addLogs("React: SetTimeout");
        }, 0);

        Promise.resolve().then(() => {
        addLogs("React: Promise (Microtask)");
        });

        queueMicrotask(() => {
            addLogs("React: queueMicrotask");
        });

        addLogs("React: Synchronous 2");
    }, []);

    useEffect(() => {
        addLogs("React: useEffect executed");
    }, []);

    // --- Outside React (pure JS event loop) ---
    setTimeout(() => {
        console.log("Outside: SetTimeout");
    }, 0);

    Promise.resolve().then(() => {
        console.log("Outside: Promise (Microtask)");
    });

    queueMicrotask(() => {
        console.log("Outside: queueMicrotask");
    });

    return(
        <>
            {
                Array.from(logs).map((log: string, index: number) => (
                    <div key={index}>{log}</div>
                ))
            }
        </>
    )
}

export default EventLoopDemo;