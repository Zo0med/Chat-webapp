const refreshToken = async () => {
    try{
        const response = await fetch("http://localhost:3001/auth/refresh", {
            credentials: "include",
            method: "GET"
        })

        if(!response.ok){
            alert("Log in again")
            throw new Error("Log in again");
        }

        localStorage.setItem("AT", response.json())
        return response.json();
    }catch(err){
        console.log(err)
    }
}

export default refreshToken