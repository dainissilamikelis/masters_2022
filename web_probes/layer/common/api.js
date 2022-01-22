const axios = require('axios');

const get_api_request = async(url) => {
    return axios.get(url);
}

module.exports.GET_API_REQUEST = get_api_request ;
