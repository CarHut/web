const currentPublicIp = 'localhost' 
const Constants = {
    webAddress: `http://${currentPublicIp}:3000/`,

    baseAPIPath: `http://${currentPublicIp}:8080/api/`,
    baseAddressPath: `http://${currentPublicIp}:8080/`,

    socketAddress: `ws://${currentPublicIp}:8081/chat`,
    baseMessagingAPIPath: `http://${currentPublicIp}:8081/api/chat`
}

export default Constants;