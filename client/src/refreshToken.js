const refreshToken = async () => {
    try{
        await fetch("http://localhost:3001/auth/refresh", {
            credentials: "include",
            method: "GET"
        })
        .then(data => data.json())
        .then(data => {
            localStorage.setItem("user", data.user);
            localStorage.setItem("AT", data.AT);
            console.log("New access token", data.AT);
            return data.AT;
        })
    }catch(err){
        console.log(err)
    }
}

export default refreshToken