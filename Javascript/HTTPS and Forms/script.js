// HTTP and Forms

// THE PROTOCOL
// if you type eloquentjavascript.net/18_http.html in your browser's address bar, the browser first looks up the address of the server associated with eloquentjavascript.net and tries to open a TCP connection to it in port 80 (the default port for HTTP traffic)

// if the server exist and accepts the connection, the browser(client) might send something like this.

/*
GET /18_http.html HTTP/1.1
Host: eloquentjavascript.net
User-Agent: Browser's name
*/

// then the server responds, through that same connection.

/*
HTTP/1.1 200 OK
Content-Length: 87320
Content-Type: text/html
Last-Modified: Fri, 13 Oct 2023 10:05:41 GMT


<!doctype html>
- rest of document -
*/

// the browser then takes part of the response after the blank line (starting from <!doctype html>) and display it as an HTML document.

// CLIENT OR BROWSER INFO / REQUEST
// The information sent by the client (browser) is called REQUEST

/* GET /18_http.html HTTP/1.1 */

// the word "GET" is a method of request - it means that we want to get the specified resources.

// other request method includes DELETE (to delete a resources), PUT (to create or replace a resource) and POST (to send information to it)

// The server is not obliged to carry out every request it gets. If for example you tell a random website to DELETE it mains page, it will refuse.

/*
The part of the request method is the url path of the resources the request applies to.

A resource is a file on a server. A resource may also be anything that can be transferred as if it a file.

Many server generate the response they produce on a fly. For example if you open https:github.com/marijnh, the server looks in it data base for a user named "marijnh" and if it finds one, it will generate a profile page for that user.
*/

/*
After the resources url path, the HTTP/1.1  indicate the version of the HTTP protocol it is using.

Browser will automatically switch to the appropriate protocol version when talking to a server. Since version 1.1 is easier to play around with, we will use that to illustrate the protocol
*/

// SERVER RESPONSE
/*
the server response starts with a HTTP protocol version as well. followed by the status code and then a readable string

HTTP/1.1 200 OK


status code starting with a 2 indicate that the request was successful. Code starting with 4 means that something was wrong with the request. Code starting with 5 means that an error happened in the server and nothing is wrong with the request.


the most popular status code, 404 means that the resource could not be found.
*/

/*
the server response is always followed by a number of headers in the form "name: value" that sepcify extra info about the request and it response.

Content-Length: 87320 - tells us type and size of the doc.
Content-Type: text/html - it is an HTML doc of 87,32p bytes
Last-Modified: Fri, 13 - tells us when last the docs was modified.


After the headers(extra info), both requests and responses may include a blank line followed by a body, which contains the actual HTML doc being sent. 



GET and DELETE do not send along any data, but PUT and POST request does.

some response types such as error also doesnt send a body
*/

// BROWSERS AND HTTP
/*
As explained earlier, a browser will make a request when we enter a URL in its addresss bar. When the resulting HTML page references other file such as images and js files, it will retrieve those as well.



A moderately complicated website can easily include between 10 - 200 resources. To be able to fetch those quickly, browsers will make several GET requests simultaenously rather than waiting for the responses one at a time.
*/

/*
HTML pages may include forms, which allow the user to fill the information and sent it to the serevr. 

An example of a form is illustrated in the HTML file


When the form element method's attribute is GET, the info in the form is added to the end of the "action" URL as a query string


http://127.0.0.1:5500/example/message.html?name=lekan&message=i+love+my+life

the question mark indicate the end of the url path and start of the query(request) - An ampersand (&) is used to seperate the different inputs.

sometimes an actual message may be encoded in the URl like "Yes?" which might appear as "Yes%3F" - it is way for the broswer to escape character.
*/

/*
If we change the method of the form element to "POST", the HTTP request made to submit the form will use the POST method. and will put the query string in the body of the request rather than adding it to the URL

http://127.0.0.1:5500/example/message.html
*/

// WHEN TO USE GET OR POST
/*
GET request should be used for requests that do not have side effects but simply ask for information.


Then request that change something on a server for example creating a new account or posting a message - POST should be sused in such instances.


Browser knows that it shouldnt make POST request except explicitly told to. but it will implicitly make GET request to prefetch resources it believes the user will soon need.

*/

// FETCH
/*
Js make HTTP request through an interface called "fetch"
*/

fetch("example/data.txt").then((response) => {
  console.log(response.status);
  console.log(response.headers.get("Content-Type"));
});

/*
Calling fetch returns a promise that resolves to a Response object holding information about the server's response such as it status code and headers.


promise returned by fetch resolves successfully even if the server responded with an error code. The promise may not resolves successfully if there is a network error or if the server to which that the request is addressed can't be found.
*/

/*
the first argument to fetch is the URL. when that URL doesnt start with a protocol (http:), it is treated as relative to the current document. when it start with a slash(/), it replaces the current path, which is the part after the server name.



when it doesnt start with a slash(/), the part of the current path up to and including its last slash character is put in front of the relative URL.
*/

fetch("example/data.txt")
  .then((resp) => resp.text())
  .then((text) => console.log(text));

/*
to get the actual content of a response, you can use its text method. Because the initial promise is resolved as soon as the response's header have been received.
*/
/*
fetch("example/data.txt")
  .then((resp) => resp.json())
  .then((resp) => console.log(resp));
*/

// a similar method called json returns a promise that resolves to the value you get when parsing the body as JSON or rejects if it's not valid JSON.

// by default, fetch uses the GET method to make its request and does not include a request body. But we can configure it by passing a 2nd option to fetch

fetch("example/data.txt", { method: "DELETE" }).then((resp) => {
  console.log(resp.status);
  // returns a 405 status code which means method not allowed.
});

// to add a request body for a PUT or post request, we can add another option.

fetch("example/data.txt", { headers: { Range: "bytes=8-19" } })
  .then((resp) => resp.text())
  .then((data) => console.log(data));

// to set headers, there's the headers option.
// For example, this request includes a Range header, which
// instruct the server to return only part of a doc.

// Adding your own headers is often useful to include things
// such as authentication information or to tell the server
// which file format you'd like to receive

/*


// APPRECIATING HTTP
when building systems that requires communication between 
the client side (js program running in the browser) and the 
server side(a program on the server), there are different 
ways to model this communication.




// 1
a commonl used model is that of REMOTE PROCEDURE CALLS. In
this model, communication follows the pattern of normal 
function calls, except that the function is actually running 
on another machine.


Calling it involves making a request to the server that includes the function's name and arguments. The response contains the returned value.


in the model, HTTP is the vehicle for communication, and we will most likely write an abstraction layer that hides it entirely.





// 2
Another approach is to build the communication around the concept of resources and HTTP methods. instead of a remote procedure called addUser, we use a PUT request to /users/larry. instead of encoding that user's props in a function argument. we define a JSON doc that represent a user. 



A resource is fetched by making a GET request to the resource's URL, for example (/users/larry), which again returns the doc representing the resource.




the second approach makes it easier to use some of the features that HTTP provides, such as support for caching resources (Keeping a copy of a resources on the client side for fast access). The concept used in HTTP, which are well deisgned can provide a helpful set of principles to design our server interace around.
*/
