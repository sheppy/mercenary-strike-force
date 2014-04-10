class GraphicsManager

    @createCanvas: (width, height, appendTo) ->
        canvas = document.createElement "canvas"
        canvas.width = width
        canvas.height = height

        if appendTo then appendTo.appendChild canvas

        return canvas

    @createRenderer: (width, height, appendTo) ->
        renderer = {}
        renderer.canvas = GraphicsManager.createCanvas width, height, appendTo
        renderer.ctx = renderer.canvas.getContext "2d"
        return renderer

module.exports = GraphicsManager