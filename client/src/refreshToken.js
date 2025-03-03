const refreshToken = async () => {
    let newToken;
    await fetch("http://localhost:3001/auth/refresh", {
        credentials: "include",
        method: "GET"
    })
    .then(data => data.json())
    .then(data => {
        localStorage.setItem("user", data.user)
        localStorage.setItem("AT", data.AT)
    })
    return newToken
}

export default refreshToken