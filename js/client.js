const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var audio=new Audio('chatrington.mp3')

const append=(message,position)=>{
      const messageElement=document.createElement('div');
      messageElement.innerText=message;
      messageElement.classList.add('message');
      messageElement.classList.add(position);
      messageContainer.append(messageElement);
      if(position=='left'){
        audio.play();
      }
      
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevent reload page
    const message=messageInput.value
    append(`You:${message}`,'right')
    socket.emit('send',message);
    messageInput.value=''
})
const name=prompt("Enter your name to join");
//It gives the name into callback function when new user will join 
socket.emit('new-user-joined',name) 

socket.on('user-joined',name=>{
     append(`${name} Joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('left',data=>{
    append(`${name} left the chat`,'right')
})

