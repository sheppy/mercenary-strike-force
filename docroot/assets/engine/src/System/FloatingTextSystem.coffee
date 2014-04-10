System = require "../System.coffee"
EntityManager = require "../Manager/EntityManager.coffee"

class FloatingTextSystem extends System
    THROTTLE_VALUE: 16


    onUpdate: (dt) =>

        textEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["ShowFloatingText", "RenderableText"]
        for entity in textEntities
            text = EntityManager.getComponentOfType entity, "RenderableText"
            floating = EntityManager.getComponentOfType entity, "ShowFloatingText"

            if floating.hideTime <= 0
                # TODO: Remove entity
            else if floating.showTime > 0
                floating.showTime -= dt
                floating.alpha = 1 - (floating.showTime / 750)
            else if floating.displayTime > 0
                floating.displayTime -= dt
            else
                floating.hideTime -= dt
                floating.alpha = floating.hideTime / 750

            text.colour = "rgba(" + floating.rgb + "," + floating.alpha + ")"

        return null

module.exports = FloatingTextSystem