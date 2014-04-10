Util = require "../Util.coffee"

class AssetManager
    @assets = {}
    @numAssets = 0
    @assetsLoaded = 0

    @load: (manifest, cb) ->
        promise = new Promise (resolve, reject) ->
            console.log "AssetManager > load > #{manifest}"
            loadManifest = Util.loadJSON manifest
            loadManifest.then (json) ->
                for i,group of json.groups
                    for asset in group
                        AssetManager.numAssets++

                for i,group of json.groups
                    for asset in group
                        do (asset) ->
                            assetLoad = Util.load json.root + asset
                            assetLoad.then (data) ->
                                AssetManager.assets[asset] = asset
                                AssetManager.assetsLoaded++
                                AssetManager.onAssetLoad asset, data
                                AssetManager.onProgress()

                                if AssetManager.assetsLoaded is AssetManager.numAssets
                                    AssetManager.onLoaded()
                                    resolve()
        return promise

    @onAssetLoad: (asset, data) ->
    @onAssetError: (asset) ->
    @onProgress: ->
    @onLoaded: ->

    @get: (asset) -> AssetManager.assets[asset]


module.exports = AssetManager