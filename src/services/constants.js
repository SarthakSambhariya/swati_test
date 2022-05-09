export function whatsAppApi (number){
    return `https://api.whatsapp.com/send?phone=91${number}&text=Hi%2C+Greetings`
}
export default {
    api: process.env.REACT_APP_API_URL,
    apiurl: process.env.REACT_APP_URL,
    whatsAppApi
}

