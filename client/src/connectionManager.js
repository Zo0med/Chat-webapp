const ConnectionManager = (socket, connect) => {
    !connect ? socket.connect() : socket.disconnect();
}

export default ConnectionManager;