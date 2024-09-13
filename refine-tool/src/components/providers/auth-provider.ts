import { AuthProvider, OnErrorResponse } from "@refinedev/core";

 const authProvider: AuthProvider = {
    logout: async () => {
        localStorage.removeItem("my_access_token");
        localStorage. removeItem("role", );

        return { success: true };
    },


    
    login: async ({ name,email }) => {
        const response = await fetch("http://localhost:5000/task/login", {
            method: "POST",
            body: JSON.stringify({ name,email }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            localStorage.setItem("role", data.user.role);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
        const token = localStorage.getItem("my_access_token");

        if (token) {
            return { authenticated: true };
        }

        return { authenticated: false };
    },
    getPermissions: async () => {
        const role = localStorage.getItem("role");
        return { permissions: role ? [role] : [] };
    },
    
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    onError: function (error: any): Promise<OnErrorResponse> {
        throw new Error("Function not implemented.");
    }
};



export default authProvider