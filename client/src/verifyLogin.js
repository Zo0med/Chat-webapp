const vLogIn = async () => {
    try {
        const response = await fetch("http://localhost:3001/auth/verify", {
            method: "GET",
            credentials: "include", // Required to send cookies
        });

        if (!response.ok) {
            return false; // Login failed
        }

        return true; // Successfully logged in
    } catch (error) {
        console.error("Login check failed:", error);
        return false;
    }
};

export default vLogIn;
