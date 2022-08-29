import axios from "axios";

const coreApi = process.env.CORE_API;

const headers = {
    "Content-Type": "application/json",
    "X-App-ID": process.env.APP_ID,
    "X-App-Token": process.env.APP_TOKEN
}

const CoreService = {
    auth: {
        token: async (token: string) => {
            const response = await axios.get(`${coreApi}/auth/token/${token}`, {
                headers
            });
            return response
        }
    },
    users: {
        get: async (email?: string) => {
            let url = !email ? `${coreApi}/users` : `${coreApi}/users/${email}`;
            const response = await axios.get(url, {
                headers
            });
            return response;
        },
        post: async (user: any) => {
            const response = await axios.post(`${coreApi}/users`, JSON.stringify(user), {
                headers
            });
            return response;
        },
        put: async (user: any) => {
            const response = await axios.put(`${coreApi}/users/${user.email}`, JSON.stringify(user), {
                headers
            });
            return response;
        },
        delete: async (email: string) => {
            const response = await axios.delete(`${coreApi}/users/${email}`, {
                headers
            });
            return response;
        }
    },
    apps: {
        get: async (id?: string) => {
            let url = !id ? `${coreApi}/apps` : `${coreApi}/apps/${id}`;
            const response = await axios.get(url, {
                headers
            });
            return response;
        },
        post: async (app: any) => {
            const response = await axios.post(`${coreApi}/apps`, JSON.stringify(app), {
                headers
            });
            return response;
        },
        put: async (app: any) => {
            const response = await axios.put(`${coreApi}/apps/${app._id}`, JSON.stringify(app), {
                headers
            });
            return response;
        },
        delete: async (id: string) => {
            const response = await axios.delete(`${coreApi}/apps/${id}`, {
                headers
            });
            return response;
        }
    }
}

export default CoreService;