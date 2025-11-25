// URL: https://app.bdkq.mingxuan.store/xcx-bjdxkqyy-wx@*



/// This func is called if the Request Checkbox is Enabled. You can modify the Request Data here before the request hits to the server
/// e.g. Add/Update/Remove: host, scheme, port, path, headers, queries, comment, color and body (json, form, plain-text, base64 encoded string)
///
/// Use global object `sharedState` to share data between Requests/Response from different scripts (e.g. sharedState.data = "My-Data")
///
async function onRequest(context, url, request) {
    // console.log(request);
    //console.log(url);

    // Update or Add new headers
    // request.headers["X-New-Headers"] = "My-Value";

    // Update or Add new queries
    // request.queries["name"] = "Proxyman";

    // Body
    // var body = request.body;
    // body["new-key"] = "new-value"
    // request.body = body;

    if (url.indexOf('/wechat/login') === -1) {
        var start_index = url.indexOf('xcx-bjdxkqyy-wx@');
        if (start_index !== -1) {
            var end_index = url.indexOf('/', start_index);
            var version = url.substring(start_index + 16, end_index);
            var access_token = request.headers["access_token"];
            writeToFile({
                version: version,
                access_token: access_token,
                timestamp: new Date().getTime()
            }, "~/Desktop/bjdxkqyy/auth.json")
        }
    }

    // Done
    return request;
}

/// This func is called if the Response Checkbox is Enabled. You can modify the Response Data here before it goes to the client
/// e.g. Add/Update/Remove: headers, statusCode, comment, color and body (json, plain-text, base64 encoded string)
///
async function onResponse(context, url, request, response) {
    // console.log(response);

    // Update or Add new headers
    // response.headers["Content-Type"] = "application/json";

    // Update status Code
    // response.statusCode = 500;

    // Update Body
    // var body = response.body;
    // body["new-key"] = "Proxyman";
    // response.body = body;

    // Or map a local file as a body
    // response.bodyFilePath = "~/Desktop/myfile.json"
    if (url.indexOf('/wechat/login') !== -1) {
        content = {
            request: {
                headers: request.headers,
                body: request.body
            },
            response: {},
            timestamp: new Date().getTime()
        }
        if ("data" in response.body && response.body.data.length > 200) {
            content.response.headers = response.headers
            content.response.body = response.body
        }
        writeToFile(content, "~/Desktop/bjdxkqyy/login.json")
    }

    // Done
    return response;
}