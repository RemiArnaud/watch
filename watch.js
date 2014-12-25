var fd = process.argv[2],
    port = 3333,
    ft = require('file-tail').startTailing(fd),
    connect = require("connect"),
    app = connect().use(connect.static(__dirname)).listen(port);
    io = require("socket.io").listen(app);

io.configure("development", function(){
    io.set("log level", 0);
});

io.sockets.on("connection", function(socket){
    var watch;

    socket.on("init", function(data){
        ft.on('line', function(line) {
            socket.emit("data", line);
        });        
    });

    socket.on("disconnect", function(){
        console.log("finishing watch");

        //watch.kill('SIGHUP');
    });
});



console.log('Server running at port %d',port);
