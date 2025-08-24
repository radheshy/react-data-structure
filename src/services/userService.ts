// Promise Way
const getUsersPromise = (): Promise<any> => {
    return fetch("https://jsonplaceholder.typicode.com/users").then((res) => {
        if(!res.ok) throw new Error("Network response was not ok");
        return res.json();
    }).catch((error) => {
        return Promise.reject(error.message || "Something is wrong");
    })
}

// Async/Await way
const getUsersAsync = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok) throw new Error("Network response was no ok");
        const data = await response.json();
        return data;
    } catch(error) {
        return error.message || "Something is wrong";
    }

}

export {getUsersAsync, getUsersPromise};