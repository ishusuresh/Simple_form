import axios from 'axios';

const instance =axios.create({
    baseURL:'https://internform-4364b.firebaseio.com/internform.json'
});

export default instance;