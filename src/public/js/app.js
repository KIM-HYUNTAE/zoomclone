const socket = new WebSocket(`ws://${window.location.host}`);

//서버와 연결
socket.addEventListener("open", () => {
  console.log("Connected to Server ✔️");
});

//서버에서 메세지 받았을 떄
socket.addEventListener("message", (message) => {
  console.log("Just got this message|| ", message.data, " ||from the Server.");
  let tagArea = document.getElementById("m_con");
  let new_pTag = document.createElement("p");
  new_pTag.setAttribute("class", "pTag");
  new_pTag.innerHTML = message.data;
  console.log(message.data);
  tagArea.appendChild(new_pTag);
});

//서버와 연결이 끊어졌을 때
socket.addEventListener("close", () => {
  console.log("Disconnected to Server ❌");
});

const btn = document.getElementById("s_btn");

btn.addEventListener("click", () => {
  const content = document.getElementById("c_text").value;
  console.log(content);
  socket.send(content);
  document.getElementById("c_text").value = "";
});
function transmission(event) {
  if (event.key === "Enter" && document.getElementById("c_text").value != "") {
    event.preventDefault();
    document.getElementById("s_btn").click();
  }
}