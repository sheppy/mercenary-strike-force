class Util
    @loadJSON: (url) -> Util.load(url).then(JSON.parse)

    @load: (url) ->
        promise = new Promise (resolve, reject) ->
            xhr = new XMLHttpRequest()
            #xhr.responseType = "application/json"
            xhr.open "GET", url, true
            xhr.addEventListener "readystatechange", ->
                if xhr.readyState is 4
                    if xhr.status in [200, 304]
                        resolve xhr.responseText
                    else
                        reject "error"
            xhr.send()
        return promise

module.exports = Util