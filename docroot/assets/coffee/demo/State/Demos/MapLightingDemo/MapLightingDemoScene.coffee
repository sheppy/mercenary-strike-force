AssetManager = require "../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
GraphicsManager = require "../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
EntityManager = require "../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"
InputManager = require "../../../../../vendor/iki-engine/src/Manager/InputManager.coffee"

Scene = require "../../../../../vendor/iki-engine/src/Scene.coffee"
Map = require "../../../../../vendor/iki-engine/src/Map.coffee"
GraphicsSystem = require "../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee"
MapLightingInputSystem = require "./MapLightingInputSystem.coffee"


class MapLightingScene extends Scene
    init: ->
        @GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
        @meter = new FPSMeter graph: 1
        @mapLoaded = false

        @addSystem new MapLightingInputSystem

        # Add graphics system to handle rendering
        gfx = @addSystem new GraphicsSystem
        gfx.init GraphicsManager.renderer
        gfx.onBeforeDraw = @onBeforeDraw.bind @
        gfx.onAfterDraw = @onAfterDraw.bind @

        @debug =
            lightBoxFlag: false
            lightRayFlag: false
            light1: true
            light2: true
            mouseLight: true
            colouredLights: true
            lightSize: 300
            ambient: 0.3
            ambientColour: [0, 0, 11]
            softShadows: false
            softShadowCount: 2
            lightIntensity: 0.5

        @calculateSoftShadowPositions()


        # For rendering lighting
        @rendererShadows = GraphicsManager.cloneRenderer GraphicsManager.renderer
        @rendererLights = GraphicsManager.cloneRenderer GraphicsManager.renderer
        @rendererAmbient = GraphicsManager.cloneRenderer GraphicsManager.renderer

        @lightCircle = GraphicsManager.createRenderer 250, 250
        @lightCircleRed = GraphicsManager.createRenderer 250, 250
        @lightCircleGreen = GraphicsManager.createRenderer 250, 250

        # Create gradient
        grd = @lightCircle.ctx.createRadialGradient 125, 125, 0, 125, 125, 125
        grd.addColorStop 0, "rgba(255,255,255,0.6)"
        grd.addColorStop 0.4, "rgba(255,255,255,0.5)"
        grd.addColorStop 1, "rgba(255,255,150,0)"
        @lightCircle.ctx.fillStyle = grd
        @lightCircle.ctx.fillRect 0, 0, @lightCircle.canvas.width, @lightCircle.canvas.height

        grd2 = @lightCircleRed.ctx.createRadialGradient 125, 125, 0, 125, 125, 125
        grd2.addColorStop 0, "rgba(255,0,0,0.6)"
        grd2.addColorStop 0.4, "rgba(255,0,0,0.5)"
        grd2.addColorStop 1, "rgba(255,0,0,0)"
        @lightCircleRed.ctx.fillStyle = grd2
        @lightCircleRed.ctx.fillRect 0, 0, @lightCircleRed.canvas.width, @lightCircleRed.canvas.height

        grd3 = @lightCircleGreen.ctx.createRadialGradient 125, 125, 0, 125, 125, 125
        grd3.addColorStop 0, "rgba(0,255,0,0.6)"
        grd3.addColorStop 0.4, "rgba(0,255,0,0.5)"
        grd3.addColorStop 1, "rgba(0,255,0,0)"
        @lightCircleGreen.ctx.fillStyle = grd3
        @lightCircleGreen.ctx.fillRect 0, 0, @lightCircleGreen.canvas.width, @lightCircleGreen.canvas.height

        @lights = []

        @lights.push {
            x: 550
            y: 200
            canvas: @lightCircle.canvas
        }

        @lights.push {
            x: 650
            y: 440
            canvas: @lightCircleRed.canvas
        }

        @viewport = {
            type: "Position"
            x: 32
            y: 32
        }

        @viewportEntity = EntityManager.createEntity "viewport", false
        EntityManager.addComponent @viewportEntity, @viewport

    calculateSoftShadowPositions: ->
        @shadowChanges = []

        samples = @debug.softShadowCount
        radius = 16
        for s in [0..samples - 1]
            a = s * @GOLDEN_ANGLE
            r = Math.sqrt(s/samples) * radius
            @shadowChanges.push
                x: (Math.cos(a) * r)
                y: (Math.sin(a) * r)

    activate: ->
        EntityManager.addEntity @viewportEntity

        # Load the map
        @map = new Map()
        loading = @map.loadMap "assets/map/test4.json"
        loading.then () =>
            @corners = @findCorners @map

            width = @map.width * @map.tileWidth
            height = @map.height * @map.tileHeight

            @rendererShadows.canvas.width = width
            @rendererShadows.canvas.height = height

            @rendererLights.canvas.width = width
            @rendererLights.canvas.height = height

            @rendererAmbient.canvas.width = width
            @rendererAmbient.canvas.height = height

            @mapLoaded = true

        # Debugging
        @debug.lightFolder = window.gui.addFolder "Light Debug"
        @debug.lightFolder.open()

        @debug.lightFolder.add @debug, "lightBoxFlag"
        @debug.lightFolder.add @debug, "lightRayFlag"

        @debug.lightFolder.add @debug, "light1"
        @debug.lightFolder.add @debug, "light2"
        @debug.lightFolder.add @debug, "mouseLight"
        @debug.lightFolder.add @debug, "colouredLights"

        @debug.lightFolder.add @debug, "lightSize", 50, 1000

        @debug.lightFolder.add @debug, "softShadows"
        softShadowCountSelector = @debug.lightFolder.add(@debug, "softShadowCount", 1, 50).step(1)
        @debug.lightFolder.add(@debug, "lightIntensity", 0, 1).step(0.05)

        @debug.lightFolder.add(@debug, "ambient", 0, 1).step(0.05)
        @debug.lightFolder.addColor @debug, "ambientColour"

        softShadowCountSelector.onFinishChange => @calculateSoftShadowPositions()

    deactivate: ->
        EntityManager.removeEntity @viewportEntity
        window.gui.removeFolder "Light Debug"

    onBeforeDraw: (ctx) ->
        @meter.tickStart()
        @drawMap ctx

    onAfterDraw: ->
        @meter.tick()

    drawMap: (ctx) ->
        if @mapLoaded
            @map.drawMapRect ctx,
                @viewport.x, @viewport.y,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

            @drawLighting ctx


    drawLighting: (ctx) ->
        r = parseInt @debug.ambientColour[0], 10
        g = parseInt @debug.ambientColour[1], 10
        b = parseInt @debug.ambientColour[2], 10

        @rendererAmbient.ctx.fillStyle = "rgba(#{r},#{g},#{b},#{1-@debug.ambient})"
        @rendererAmbient.ctx.clearRect 0, 0, @rendererLights.canvas.width, @rendererLights.canvas.height
        @rendererAmbient.ctx.fillRect 0, 0, @rendererLights.canvas.width, @rendererLights.canvas.height

        @rendererShadows.ctx.fillStyle = "#000"
        @rendererShadows.ctx.fillRect 0, 0, @rendererShadows.canvas.width, @rendererShadows.canvas.height

        @rendererLights.ctx.clearRect 0, 0, @rendererLights.canvas.width, @rendererLights.canvas.height


        if @debug.light1 then @lightTest @lights[0]
        if @debug.light2 then @lightTest @lights[1]

#        for light in @lights
#            @lightTest light, ctx
#
        if @debug.mouseLight
            @lightTest {
                x: InputManager.mouse.x + @viewport.x
                y: InputManager.mouse.y + @viewport.y
                canvas: @lightCircleGreen.canvas
            }, ctx

        ctx.drawImage @rendererAmbient.canvas, 0 - @viewport.x, 0 - @viewport.y

    lightTest: (light) ->
        @rendererShadows.ctx.fillStyle = "#000"
        @rendererShadows.ctx.fillRect 0, 0, @rendererShadows.canvas.width, @rendererShadows.canvas.height
        @rendererLights.ctx.clearRect 0, 0, @rendererLights.canvas.width, @rendererLights.canvas.height

        # Shadow cast

        intensity = @debug.lightIntensity
        if @debug.softShadows then intensity = @debug.lightIntensity / @debug.softShadowCount

        @rendererShadows.ctx.globalCompositeOperation = "destination-out"
        @rendererShadows.ctx.fillStyle = "rgba(255,255,255,#{intensity})"

        if @debug.softShadows
            for change in @shadowChanges
                @renderRay light.x + change.x, light.y + change.y, @rendererShadows.ctx
        else
            @renderRay light.x, light.y, @rendererShadows.ctx

        @rendererShadows.ctx.globalCompositeOperation = "source-over"

        # Light Rendering
        @renderLight light, @rendererLights.ctx

        # Remove shadows from light
        @rendererLights.ctx.globalCompositeOperation = "destination-out"
        @rendererLights.ctx.drawImage @rendererShadows.canvas, 0, 0
        @rendererLights.ctx.globalCompositeOperation = "source-over"

        # Cut the light out of ambient
        @rendererAmbient.ctx.globalCompositeOperation = "destination-out"
        @rendererAmbient.ctx.drawImage @rendererLights.canvas, 0, 0
        @rendererAmbient.ctx.globalCompositeOperation = "source-over"

        # Add the light colour?
        if @debug.colouredLights
#            @rendererAmbient.ctx.globalCompositeOperation = "darken"
            @rendererAmbient.ctx.globalAlpha = "0.4"
            @rendererAmbient.ctx.drawImage @rendererLights.canvas, 0, 0
            @rendererAmbient.ctx.globalAlpha = "1"
#            @rendererAmbient.ctx.globalCompositeOperation = "source-over"

    renderLight: (light, ctx) ->
        halfLightSize = (@debug.lightSize / 2)
        ctx.drawImage light.canvas,
            0, 0,
            250, 250,
            light.x - halfLightSize, light.y - halfLightSize,
            @debug.lightSize, @debug.lightSize

        # Debug drawing
        if @debug.lightBoxFlag
            @renderCorner light, "#ff0"
            GraphicsManager.renderer.ctx.strokeStyle = "#ff0"
            GraphicsManager.renderer.ctx.strokeRect light.x - halfLightSize - @viewport.x,
                light.y - halfLightSize - @viewport.y,
                @debug.lightSize, @debug.lightSize

    renderCorner: (corner, color = "#0f0") ->
        GraphicsManager.renderer.ctx.fillStyle = color
        GraphicsManager.renderer.ctx.beginPath()
        GraphicsManager.renderer.ctx.arc corner.x - @viewport.x, corner.y - @viewport.y, 3, 0, Math.PI * 2
        GraphicsManager.renderer.ctx.fill()


    renderRay: (vX, vY, ctx) ->
        intersections = []

        for corner in @corners
#            @renderCorner corner
            angle = 0.02
            @rayTraceByAngle vX, vY, corner.x, corner.y, 0 - angle, @map, intersections
            @rayTrace vX, vY, corner.x, corner.y, @map, intersections
            @rayTraceByAngle vX, vY, corner.x, corner.y, angle, @map, intersections

        # Calculate angles
        for intersection in intersections
            dX = vX - intersection.x
            dY = vY - intersection.y
            intersection.angle = Math.atan2 dX, dY
            if @debug.lightRayFlag
                @renderCorner intersection, "#ff0"
                GraphicsManager.renderer.ctx.strokeStyle = "#fff"
                GraphicsManager.renderer.ctx.beginPath()
                GraphicsManager.renderer.ctx.moveTo vX - @viewport.x, vY - @viewport.y
                GraphicsManager.renderer.ctx.lineTo intersection.x - @viewport.x, intersection.y - @viewport.y
                GraphicsManager.renderer.ctx.stroke()

        # Sort by angle
        intersections.sort (a, b) -> a.angle - b.angle

        # Draw triangles
        ctx.beginPath()
        ctx.moveTo intersections[0].x, intersections[0].y
        m = intersections.length
        for intersection, i in intersections
            if i == 0
                ctx.lineTo intersections[m - 1].x, intersections[m - 1].y
            else
                ctx.lineTo intersections[i - 1].x, intersections[i - 1].y
        ctx.fill()


    findCorners: (map) ->
        corners = []

        # Map edges in case its an open map
        corners.push
            x: 0
            y: 0
        corners.push
            x: 0
            y: map.height * map.tileHeight
        corners.push
            x: map.width * map.tileWidth
            y: 0
        corners.push
            x: map.width * map.tileWidth
            y: map.height * map.tileHeight
#
        # Get light blocking layer
        layerIndex = map.getLayerIndexWithProperty "blocks-light", "true"
        layer = map.layers[layerIndex].data

        if !layer then return corners

        for y in [0..map.height-1]
            for x in [0..map.width-1]
                # Skip edges?
                unless y == 0 || x == 0 || y == map.height - 1 || x == map.width - 1

                    # Check top left
                    if (
                        (layer[y][x] && !layer[y][x-1] && !layer[y-1][x] && !layer[y-1][x-1]) ||
                        (!layer[y][x] && layer[y-1][x] && layer[y][x-1] && layer[y-1][x-1])
                    )
                        corners.push
                            x: x * map.tileWidth
                            y: y * map.tileHeight

                    # Check top right
                    if (
                            (layer[y][x] && !layer[y][x+1] && !layer[y-1][x] && !layer[y-1][x+1]) ||
                            (!layer[y][x] && layer[y-1][x] && layer[y][x+1] && layer[y-1][x+1])
                    )
                        corners.push
                            x: (x+1) * map.tileWidth
                            y: y * map.tileHeight

                    # Check bottom left
                    if (
                            (layer[y][x] && !layer[y][x-1] && !layer[y+1][x] && !layer[y+1][x-1]) ||
                            (!layer[y][x] && layer[y+1][x] && layer[y][x-1] && layer[y+1][x-1])
                    )
                        corners.push
                            x: x * map.tileWidth
                            y: (y+1) * map.tileHeight

                    # Check bottom right
                    if (
                            (layer[y][x] && !layer[y][x+1] && !layer[y+1][x] && !layer[y+1][x+1]) ||
                            (!layer[y][x] && layer[y+1][x] && layer[y][x+1] && layer[y+1][x+1])
                    )
                        corners.push
                            x: (x+1) * map.tileWidth
                            y: (y+1) * map.tileHeight

        return corners


    rayTraceByAngle: (x0, y0, x1, y1, angle, map, intersections) ->
        px = Math.cos(angle) * (x1 - x0) - Math.sin(angle) * (y1 - y0) + x0
        py = Math.sin(angle) * (x1 - x0) + Math.cos(angle) * (y1 - y0) + y0
        @rayTrace x0, y0, px, py, map, intersections


    rayTrace: (x0, y0, x1, y1, map, intersections) ->
        dx = Math.abs x1 - x0
        dy = Math.abs y1 - y0
        x = x0
        y = y0
#        n = 1 + dx + dy;
        n = 1200 # @debug.lightSize     # max draw distance
        xInc = if x1 > x0 then 1 else -1
        yInc = if y1 > y0 then 1 else -1
        error = dx - dy
        dx = dx * 2
        dy = dy * 2

        # Get light blocking layer
        layerIndex = map.getLayerIndexWithProperty "blocks-light", "true"
        layer = map.layers[layerIndex].data

        if !layer then return null

        while n > 0
            mX = Math.floor(x / map.tileWidth)
            mY = Math.floor(y / map.tileHeight)

            if layer[mY] && layer[mY][mX] then break

            if error > 0
                x += xInc
                error -= dy
            else
                y += yInc
                error += dx

            --n

        intersections.push
            x: x
            y: y
        return null

module.exports = MapLightingScene