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
        @meter = new FPSMeter graph: 1
        @mapLoaded = false

        @addSystem new MapLightingInputSystem

        # Add graphics system to handle rendering
        gfx = @addSystem new GraphicsSystem
        gfx.init GraphicsManager.renderer
        gfx.onBeforeDraw = @onBeforeDraw.bind @
        gfx.onAfterDraw = @onAfterDraw.bind @

        @darkness = GraphicsManager.cloneRenderer GraphicsManager.renderer
        @lightRenderer = GraphicsManager.cloneRenderer GraphicsManager.renderer
        @lightCircle = GraphicsManager.createRenderer 250, 250
        @lightCircle2 = GraphicsManager.createRenderer 250, 250

        # Create gradient
        grd = @lightCircle.ctx.createRadialGradient 125, 125, 0, 125, 125, 125
        grd.addColorStop 0, 'rgba(255, 255, 215, 1)'
        grd.addColorStop 1, 'rgba(255, 255, 215, 0)'
        @lightCircle.ctx.fillStyle = grd
        @lightCircle.ctx.fillRect 0, 0, @lightCircle.canvas.width, @lightCircle.canvas.height

        grd2 = @lightCircle2.ctx.createRadialGradient 125, 125, 0, 125, 125, 125
        grd2.addColorStop 0, 'rgba(255, 0, 0, 0.6)'
        grd2.addColorStop 1, 'rgba(255, 0, 0, 0)'
        @lightCircle2.ctx.fillStyle = grd2
        @lightCircle2.ctx.fillRect 0, 0, @lightCircle2.canvas.width, @lightCircle2.canvas.height

        @viewport = {
            type: "Position"
            x: 0
            y: 0
        }

        @viewportEntity = EntityManager.createEntity "viewport", false
        EntityManager.addComponent @viewportEntity, @viewport


    activate: ->
        EntityManager.addEntity @viewportEntity

        # Load the map
        @map = new Map()
        loading = @map.loadMap "assets/map/test3.json"
        loading.then () =>
            @corners = @findCorners @map
            @mapLoaded = true


    deactivate: -> EntityManager.removeEntity @viewportEntity

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

            # Ambient dark light
            @darkness.ctx.fillStyle = "rgba(0,0,11,0.7)"
            @darkness.ctx.clearRect 0, 0, @darkness.canvas.width, @darkness.canvas.height
            @darkness.ctx.fillRect 0, 0, @darkness.canvas.width, @darkness.canvas.height

            # Remove ambient darkness where a lights should be
            @darkness.ctx.globalCompositeOperation = "destination-out"

            @darkness.ctx.drawImage @lightCircle.canvas,
                0, 0,
                250, 250,
                300 - 50, 300 - 50,
                300, 300

            @darkness.ctx.drawImage @lightCircle.canvas,
                0, 0,
                250, 250,
                InputManager.mouse.x - 100, InputManager.mouse.y - 150,
                300, 300

            # Add light colours
            @darkness.ctx.globalCompositeOperation = "source-over"
            @darkness.ctx.drawImage @lightCircle2.canvas,
                0, 0,
                250, 250,
                300 - 50, 300 - 50,
                300, 300

            # TODO: Add obstacles - needs ray casting?
            @lightRenderer.ctx.fillStyle = "#000"
            @lightRenderer.ctx.fillRect 0, 0, @lightRenderer.canvas.width, @lightRenderer.canvas.height
            @renderRay 400, 400, @lightRenderer.ctx
            @renderRay InputManager.mouse.x, InputManager.mouse.y, @lightRenderer.ctx

            # Draw lighting
            @darkness.ctx.globalCompositeOperation = "destination-out"
            @darkness.ctx.drawImage @lightRenderer.canvas, 0, 0
            @darkness.ctx.globalCompositeOperation = "source-over"


            @lightRenderer.ctx.globalCompositeOperation = "source-in"
            @lightRenderer.ctx.fillStyle = "rgba(0,0,11,0.7)"
            @lightRenderer.ctx.fillRect 0, 0, @lightRenderer.canvas.width, @lightRenderer.canvas.height
            @lightRenderer.ctx.globalCompositeOperation = "source-over"

            GraphicsManager.renderer.ctx.drawImage @darkness.canvas, 0, 0
            GraphicsManager.renderer.ctx.drawImage @lightRenderer.canvas, 0, 0
#            GraphicsManager.renderer.ctx.drawImage @lightRenderer.canvas, 0, 0


    renderCorner: (corner, color = "#0f0") ->
        GraphicsManager.renderer.ctx.fillStyle = color
        GraphicsManager.renderer.ctx.beginPath()
        GraphicsManager.renderer.ctx.arc corner.x, corner.y, 3, 0, Math.PI * 2
        GraphicsManager.renderer.ctx.fill()


    renderRay: (vX, vY, ctx) ->
        intersections = []

        for corner in @corners
            angle = 0.1
            @renderCorner corner, "#0f0"
            @rayTraceByAngle vX, vY, corner.x, corner.y, 0 - angle, @map, intersections
            @rayTrace vX, vY, corner.x, corner.y, @map, intersections
            @rayTraceByAngle vX, vY, corner.x, corner.y, angle, @map, intersections

        # Calculate angles
        for intersection in intersections
            dX = vX - intersection.x
            dY = vY - intersection.y
            intersection.angle = Math.atan2 dX, dY

#            @renderCorner intersection, "#ff0"
#            GraphicsManager.renderer.ctx.strokeStyle = "#fff"
#            GraphicsManager.renderer.ctx.beginPath()
#            GraphicsManager.renderer.ctx.moveTo vX, vY
#            GraphicsManager.renderer.ctx.lineTo intersection.x, intersection.y
#            GraphicsManager.renderer.ctx.stroke()

        # Sort by angle
        intersections.sort (a, b) -> a.angle - b.angle

        # Draw triangles
        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = "#fff"
        ctx.beginPath()
        ctx.moveTo intersections[0].x, intersections[0].y

        m = intersections.length
        for intersection, i in intersections
            if i == 0
                ctx.lineTo(intersections[m - 1].x, intersections[m - 1].y)
            else
                ctx.lineTo(intersections[i - 1].x, intersections[i - 1].y)
        ctx.fill()
        ctx.globalCompositeOperation = "source-over"
    ###

    for (var i = 0, m = intersections.length; i < m; i++) {
        if (i === 0) {
            lightMapCtx.lineTo(intersections[m-1].x, intersections[m-1].y);
        } else {
            lightMapCtx.lineTo(intersections[i-1].x, intersections[i-1].y);
        }
    }

    lightMapCtx.fill();
    //shadowMapCtx.globalCompositeOperation = "source-over";

    ###














    isTileBlockLight: (tile) ->
        if tile then return true
        return false

    findCorners: (map) ->
        corners = []

        corners.push
            x: 0
            y: 0
        corners.push
            x: 0
            y: GraphicsManager.renderer.height - 1
        corners.push
            x: GraphicsManager.renderer.width - 1
            y: 0
        corners.push
            x: GraphicsManager.renderer.width - 1
            y: GraphicsManager.renderer.height - 1

#        return corners

        # TODO: All layers?
        layer = map.layers[1].data

        for y in [0..map.height-1]
            for x in [0..map.width-1]
                # Skip edges?
                unless y == 0 || x == 0 || y == map.height - 1 || x == map.width - 1

                    # Check top left
                    if (
                            (@isTileBlockLight(layer[y][x]) && !@isTileBlockLight(layer[y][x - 1]) && !@isTileBlockLight(layer[y - 1][x]) && !@isTileBlockLight(layer[y - 1][x - 1])) ||
                            (!@isTileBlockLight(layer[y][x]) && @isTileBlockLight(layer[y - 1][x]) && @isTileBlockLight(layer[y][x - 1]) && @isTileBlockLight(layer[y - 1][x - 1]))
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
        n = 300    # max draw distance
        xInc = if x1 > x0 then 1 else -1
        yInc = if y1 > y0 then 1 else -1
        error = dx - dy
        dx = dx * 2
        dy = dy * 2

        while n > 0
            mX = Math.floor(x / map.tileWidth)
            mY = Math.floor(y / map.tileHeight)

            # TODO: Use all layers - or a light specific one
            layer = map.layers[1].data

            if layer[mY] && layer[mY][mX]
#                intersections.push
#                    x: x
#                    y: y
                break

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