// Project : Socket io practice with small project that chating app
// Referance of this project is tutorial point


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req,res){
    res.sendfile('index.html');
});


//=====================================Socket.IO - Broadcasting ==================================================
// var clinets = 0
// io.on('connection', function(socket){
//     clinets ++;
//     // io.sockets.emit('broadcast', { descripion: clinets + ''});
//     socket.emit('newClientConnected', { descripion: ' Hey Welcome'});
//     socket.broadcast.emit('newClientConnected', { descripion: clinets + ' clinets connected' });
//     socket.on('disconnect', function(){
//         clinets --;
//         // The message was send everyone
//         // io.sockets.emit('broadcast', { descripion: clinets + ' client connectd '}); 

//         // The meassage send to new client
//         socket.broadcast.emit('newClientConnected', { descripion: clinets + ' clinets connected' });    


//     });
// });
//========================================Broadcasting end ===================================================

//====================================================Event handling ================================
// //Whenever someone connects this gets executed
// io.on('connection',function(socket){
//     console.log('A user connected');

//     //Send a message after a timeout of 4seconds
//     setTimeout(function(){
//         // socket.send('Sent a message 4 second after connection') // This event is provided by api
//         socket.emit('testerEvent', { descripion: 'A custom event named testerEvent '});
//     }, 4000);

//     // geting event from client side
//     socket.on('clientEvent', function(data){
//         console.log(data)
//     });
//     // whenever someone disconnects this piece of code excuted
//     socket.on('disconnect',function(){
//         console.log('A user disconnected');
//     });
// });
//==========================================================Event Handling is end =====================================================

//===========================================================Socket.IO - Namespaces ===============================================
// Custom namespace

// var nsp = io.of('/myNameSpace');
// nsp.on('connection', function(socket){
//     console.log('someone connected');
//     nsp.emit('hi', 'hellow everyone!');
// });

//============================================================Socket.IO - Namespaces end=======================================

//===========================================================Socket.IO - Rooms- Namespaces===============================================

// var roomNo = 1;
// io.on('connection', function(socket){
//     //Increase roomno 2 clients are present in a room.
//     if(io.nsps['/'].adapter.rooms["room-"+roomNo] && io.nsps['/'].adapter.rooms["room-"+roomNo].length > 1) roomNo++;
//     socket.join("room-"+roomNo);
//     console.log('you are join the room',roomNo);

//     // For leave room we will use this
//     // socket.leave("room-"+roomNo);

//     // Send this event to everyone in the room.
//     io.sockets.in("room-"+roomNo).emit('connectTheRoom', "you are in room no."+roomNo);
// });

//============================================================Socket.IO - Rooms end=======================================


//===========================================================Socket.IO - Chat Application start ==============================================
    users = [];
    io.on('connection', function(socket){
        // connecting user
        console.log('A user connected');
        // insert user in users array
        socket.on('setUserName', function(data){
            console.log(data)
            // if username is not present in users array
            if(users.indexOf(data) > -1){
                socket.emit('userExists', data + ' username is taken !  please try some other username');
            } else{
                // if user alredy in array then rasie this event
                users.push(data);
                console.log(users);
                socket.emit('userSet', { userName : data });
            }
        });

        socket.on('msg', function(data){
            // Send message to everyone
            console.log(data);
            io.sockets.emit('newmsg', data);
        });
    });

//===========================================================Socket.IO - Chat Application ends ==============================================

http.listen(3000, function(){
    console.log('listing on *:3000');
});