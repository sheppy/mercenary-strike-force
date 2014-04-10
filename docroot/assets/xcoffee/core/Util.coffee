Q = require "../../vendor/q/q.js"

Util =
    AJAX: (file) ->
        deferred = Q.defer()
        req = new XMLHttpRequest()

        req.addEventListener "readystatechange", ->
            if req.readyState is 4 # ReadyState Compelte
                successResultCodes = [200, 304]
                if req.status in successResultCodes
                    deferred.resolve JSON.parse req.responseText
                else
                    deferred.reject "Error loading " + file

        req.open "GET", file, false
        req.send()

        deferred.promise


module.exports = Util