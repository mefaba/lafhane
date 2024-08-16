import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ACTIVESERVER, // Backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const api_verify_token = () => {
    return axiosInstance.get(`${process.env.REACT_APP_ACTIVESERVER}/api/verify-token`);
}

export const api_get_game_data = async () => {
    return axiosInstance.get(`${process.env.REACT_APP_ACTIVESERVER}/api/gamedata`, {
        withCredentials: true,
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default, but added for clarity. Axios throws error if status is not between 200-299
        },
    });
};

export const api_post_send_answer = (answer) => {
    return axiosInstance.post(
        `${process.env.REACT_APP_ACTIVESERVER}/api/send_answer`,
        {
            answer: answer,
        },
        {
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default, but added for clarity. Axios throws error if status is not between 200-299
            },
        }
    );
};

export const api_login =  (username, password) => {
    return axiosInstance
        .post(
            `${process.env.REACT_APP_ACTIVESERVER}/login`,
            {
                username: username,
                password: password,
            },
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // default, but added for clarity. Axios throws error if status is not between 200-299
                },
            }
        )
        .then((res) => {
            setAuthToken(res.data["jwt-token"]);
            return res;
        })
        .catch((error) => {
            console.log("Error - api_login:", error)
            setAuthToken(null);
        });
};

export const api_register =  (username, password) => {
    return axiosInstance
        .post(
            `${process.env.REACT_APP_ACTIVESERVER}/register`,
            {
                username: username,
                password: password,
            },
            {
                withCredentials: true,
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // default, but added for clarity. Axios throws error if status is not between 200-299
                },
            }
        )
        .then((res) => {
            setAuthToken(res.data["jwt-token"]);
            return res;
        })
        .catch((error) => {
            console.log("Error - api_register:", error)
            setAuthToken(null);
            throw error;
        });
};

export const api_get_livedata = () => {
    return axiosInstance.get(`${process.env.REACT_APP_ACTIVESERVER}/api/livedata`);
}



const setAuthToken = (token) => {
    if (token) {
        cookies.set("jwt-token", token,{path:"/"});
    } else {
        cookies.remove("jwt-token");
    }
};


const getAuthToken = () => {
    return cookies.get("jwt-token");
}

export const removeAuthToken = () => {
    cookies.remove("jwt-token", {path:"/"});
}



