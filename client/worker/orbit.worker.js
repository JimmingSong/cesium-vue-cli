onmessage = function (e) {
    console.log(3, e);
}
let msg = '工作线程想主线程发送消息';
postMessage(msg);
