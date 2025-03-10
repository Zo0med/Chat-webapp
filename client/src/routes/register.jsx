import { useState } from "react";
import Nav from "../components/nav";
import { useEffect } from "react";
const Register = () => {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [id, updateId] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 500);
    }, []);
    const registerRequest = async () => {
        if (id !== "" && email !== "" && password !== "") {
            updateEmail(email.toLocaleLowerCase())
            try {
                const response = await fetch("http://localhost:3001/auth/register", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id, email, password }),
                });
    
                if (response.status === 409) {
                    alert("User already exists. Please try a different email or username.");
                    return;
                }
    
                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message || "Registration failed"}`);
                    return;
                }
    
                // Clear input fields on successful registration
                updateEmail("");
                updatePassword("");
                updateId("");
                alert("Registration successful!");
            } catch (error) {
                console.error("Error during registration:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent default form submission
        registerRequest();
    };

    return (
        <main>
            <Nav />
            {loading ?(
                <div className="app-container">
                    <div className="spinner"></div>
                </div>
            ): (
                <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <input
                        className="input"
                        type="text"
                        value={id}
                        onChange={(event) => updateId(event.target.value)}
                        onKeyDown={(event) => {
                            event.key === "Enter" && registerRequest();
                        }}
                        placeholder="Visualized name"
                    />
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(event) => updateEmail(event.target.value)}
                        onKeyDown={(event) => {
                            event.key === "Enter" && registerRequest();
                        }}
                        placeholder="email"
                    />
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(event) => updatePassword(event.target.value)}
                        onKeyDown={(event) => {
                            event.key === "Enter" && registerRequest();
                        }}
                        placeholder="password"
                    />
                    <input
                        type="Submit"
                        className="SubmitBtn"
                        value="Submit"
                        onSubmit={registerRequest}
                    />
                </form>
            </div>  
            )}
        </main>
    );
};

export { Register };
