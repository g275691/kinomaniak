const clickToServer = (query, command) => {
    document.querySelector(query).addEventListener("click", function() {
        console.log(command);
        fetch(`http://192.168.0.103:80/commandbase/${command}`);
    })
}