const currentPublicIp = 'localhost' 
const Constants = {
    proxyBasePath: `http://${currentPublicIp}:8080`,
    carHutApiBasePath: `http://${currentPublicIp}:8001/carhut-api`,
    webAddress: `http://${currentPublicIp}:3000/`,

    baseAPIPath: `http://${currentPublicIp}:8001/api/`,
    baseAddressPath: `http://${currentPublicIp}:8001/`,

    socketAddress: `ws://${currentPublicIp}:8081/chat`,
    baseMessagingAPIPath: `http://${currentPublicIp}:8081/api/chat`
}

export default Constants;