##前言
Ajax跨域问题是前端常见的问题，每一个前端程序员都需要掌握跨域的解决方案，本文将讲述跨域的原因以及几种常见的解决方案。  
受浏览器同源策略的限制，我们的网站不能请求其他网站的数据，如果请求，那么就是跨域。需要注意的是跨域的请求是可以发出的，但是返回数据会被浏览器拦截。  
以下几种情况属于跨域：1.域名不同。2.协议不同。3.端口不同。  
注意：跨域的请求不是不能发送，而是数据返回的时候浏览器会拦截，也就是前端拿不到数据。通俗点的例子就是从国外的免税店带了一堆的东西，结果回国落地后在机场被海关查扣了。
## Ajax跨域请求方案之iframe
 a.test.com 与b.test.com 之间进行通信的话，可以用iframe进行。
iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。  
iframe可以在子域之间进行通信，比如上面两个就可以看做test.com的两个子域。
 http://b.test.com/cross_sub_domain.html 利用这个页面做中间人，这个页面是b的域的页面，所以可以与b域进行ajax通信，然后a域和这个中间人通过iframe进行通信，得到从b域得到的数据。、
 
 ```
 a.test.com 中
<iframe id="bfrm" style="display:none;" src="http://b.test.com/cross_sub_domain.html"></iframe>
<button class="btn-sm btn btn-primary" onclick="crossSubDomain();">跨子域请求</button>
<script>
function crossSubDomain() {
        document.domain = 'test.com'; // 提升域 关键操作
        window.frames['bfrm'].contentWindow.doAjax(function(data) {
            alert(data);
        });
    }
</script> 

http://b.test.com/cross_sub_domain.html 中
<script>
        document.domain = 'test.com';  //提升域 关键操作
        function doAjax(callback) {
            $.ajax('/test').done(function(data) {
                callback(data);//a域的回调函数可以得到b域的数据。
            });
        }
</script>
 ```
 iframe方式的问题：  
1、安全性，当一个站点（b.a.com）被攻击后，另一个站点（c.a.com）会引起安全漏洞。  
2、如果一个页面中引入多个iframe，要想能够操作所有iframe，必须都得设置相同domain。
## Ajax跨域请求方案之JSONP
jsonp原理：
本质上并不是ajax，只是执行了跨域的js。  
html中所有带src属性的标签都可以跨域 比如：script img iframe 。  所以，可以通过script加载其他域的一段动态脚本，这段脚本中将后端需要传递的数据通过函数参数的形式返回。也就是说前端会动态地在页面中添加一个script标签，src是后端的地址。同时还会添加一个函数，名字是前端自己定义的，这个函数的名字会添加到script标签的src属性中。

```
<script src="http://xxx.com/getData?callback=test"></script>
```
前端添加的函数是：

```
function test(data){
  console.log(data);
}

```
服务端收到请求后，会返回一个字符串：

```
test({a:1,b:2})
```
这样服务端返回的字符串就是调用前端的test函数，同时将数据传递到了test函数中。通过这种方式前端就拿到了服务端的数据。 
更详细的例子：
 
```
 jsonp.html
<script>//index.js中返回的是调用callback函数的字符串，所以我们要定义一个叫callback的函数 来获取数据。
function callback(data){
    console.log(data);            
}
</script>
<script src="http://b.test.com/testjsonp"></script>

要返回数据的index.js中
var express = require('express');
var router = express.Router();
router.all('/testjsonp', function(req, res) {   //利用express响应testjsonp路由，然后返回一个回调函数，并将要传输的数据写入回调函数的参数。
    res.setHeader('Content-Type', 'application/javascript'); //callback({a:1,b:2});
    res.send('callback(' + JSON.stringify({a:1, b:2}) + ')');
});
动态生成JavaScript标签的做法：
<button class="btn btn-primary btn-sm" onclick="calltest();">调用测试</button>

function jsonp(url, data, callback) {
    var script = document.createElement('script');
    document.body.appendChild(script);

    data = data || {};
    data.callback = 'cb' + new Date().getTime();
    window[data.callback] = callback;

    url += '?' + $.param(data);

    script.src = url;
    script.onload = function () {
        document.body.removeChild(script);
    }
}

function calltest() {
    jsonp('http://b.test.com/testjsonp2', {test: 'ok'}, function (data) {
        console.log(data);
    });
}
router.all('/testjsonp2', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript'); //cb123({a:1,b:2})
    res.send(req.query.callback + '(' + JSON.stringify({a:1, b:2}) + ')');
});
以上过程我们可以用jquery来实现，使用jquery 的getJSON方法 发起jsonp。
getJSON 方法的参数如下：
getJSON(url, data, callback);
<button class="btn btn-primary btn-sm" onclick="testGetJson();">test getJSON</button>
function testGetJson() {
    $.getJSON('http://b.test.com/testjsonp2?callback=?', {test: 'ok'}, function(data) {  //url中必须有 函数名称（如 ?callback=?名称任意）否则就不会被认为是跨域的请求
       console.log(data);
    });
}
还可以用jquery的ajax方法发起
<p>jsonp jsonpCallback 参数</p>
<button class="btn btn-primary btn-sm" onclick="testArgs();">test args</button>

function testArgs() {
    $.ajax('http://b.test.com/testjsonp3', {
        dataType: 'jsonp',
        jsonp: 'cbname',
        jsonpCallback: 'cbfun',
        cache: true,
        success: function(data) {
            console.log(data);
        }
    });
}

router.all('/testjsonp3', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(req.query.cbname + '(' + JSON.stringify({a:1, b:2}) + ')');
});

```
jsonp的缺点：  
1.只支持get方式。  
2.后端代码需要调整。  
## Ajax跨域请求方案之CORS
CORS原理:
上面提到跨域的请求不是不能发送，而是接收的数据被浏览器拦截了。cors的原理就是在返回的请求中增加一些头，让浏览器放行。通俗点就是从免税店买的东西被海关查扣后，亮出了某种通行证后，海关就给放行了。  
但是为了跨域安全，需要在服务器响应头部提供一些信息，供浏览器校验请求是否被允许。
以下是需要提供的响应头部信息：  
Access-Control-Allow-Origin  
Access-Control-Allow-Methods  
Access-Control-Allow-Headers  
其中：Access-Control-Allow-Origin是最重要的，也就是前端的域名，比如：'a.test.com'。也可以写\*,\*代表任意的前端域名都可以获取数据。  
看一个实际的例子：  

```
<button class="btn btn-primary btn-sm" onclick="crossAjax();">CORS TEST</button>
<script>
function crossAjax() {
    $.ajax('http://b.test.com/test', {
        type: 'GET',
        headers: {test: 'haha'}
    }).done(function(data) {
        alert(data);
    });
}
</script>

后端
router.all('/test', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://a.test.com');
    ////res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'test,other');

    res.send('ok');
});

```
更多CORS头信息通用设置方法：
http://enable-cors.org/server.html。

