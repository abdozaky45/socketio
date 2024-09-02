const socket = io("http://localhost:5000",{autoConnect:false});
document.querySelector("#namesubmit").addEventListener("click",()=>{
   const name = document.querySelector("#sender").value;
    socket.auth={name}
    socket.connect();
})
socket.on("connect", () => {
    console.log("connected to socket BE");

});
const msg = document.querySelector('#msg');
const msgBtn = document.querySelector('#msgBtn');
msgBtn.addEventListener("click", () => {
    socket.emit("clientTOserver", msg.value)
    socket.on("b to f", (message) => {
        console.log(`b to c ${message}`);

    })
})