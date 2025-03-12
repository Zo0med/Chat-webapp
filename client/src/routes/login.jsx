import Nav from "../components/nav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 500);
    }, []);
    const loginRequest = async () => {
        if (email !== "" && password !== "") {
            updateEmail(email.toLocaleLowerCase())
            try{
                await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                })
                .then((data) => data.json())
                .then((data) => {
                    console.log(data);
                    if(data.status==401 || data.status==404) throw new Error(data.err);
                    alert(`Successfully logged in as ${data.user}`);
                    localStorage.setItem("user", data.user);
                    localStorage.setItem("AT", data.AT);
                });
                updateEmail("");
                updatePassword("");
            }catch(err){
                console.error(err);
                alert(err);
                return;
            }
        }else{
            alert("Please fill in all fields")
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission
        loginRequest();
    };
    return (
        <main>
            <Nav activeTab={2}/>
            {loading ? (
                <div className="app-container">
                    <div className="spinner"></div>
                </div>
            ):(
                <div className="form-container">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                updateEmail(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                event.key === "Enter" && loginRequest();
                            }}
                            placeholder="email"
                        />
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                updatePassword(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                event.key === "Enter" && loginRequest();
                            }}
                            placeholder="password"
                        />
                        <input
                            type="submit"
                            className="SubmitBtn"
                            value="Submit"
                            placeholder="Invia"
                        ></input>
                        <p className="form-text">Not Signed-up? <Link to="/register" className="form-link">Sign up</Link></p>
                    </form>
                </div>
            )}
        </main>
    );
};

export { Login};
