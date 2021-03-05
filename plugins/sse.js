module.exports = function (req, res, next) {
    res.sseSetup = function() {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.flushHeaders()
        res.write("retry: 1000\n\n");
    }

    res.sseSend = function(data) {
        res.write("data: " + JSON.stringify(data) + "\n\n");

    }

    next()
}
