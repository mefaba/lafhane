import axios from "axios";


export const api_get_game_data = async () => {
    return axios.get(`${process.env.REACT_APP_ACTIVESERVER}/api/gamedata`, {
        headers: {
            "Authorization": `Bearer 12345`,
            "Access-Control-Allow-Origin": "*",
        },
    })
};


export const api_post_check_answer = async (answer) => {
    axios
        .post(`${process.env.REACT_APP_ACTIVESERVER}/api/check_answer`, {
            answer: answer,
        }, {
            
            headers: {
                "Authorization": `Bearer 12345`,
                "Access-Control-Allow-Origin": "*",
            },
        })
}

