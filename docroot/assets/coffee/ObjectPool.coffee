class ObjectPool
    pool: []
    ObjectType: null

    constructor: (@ObjectType) ->

    allocate: ->
        if @pool.length == 0
            # Instantiate a new object if none available
            obj = new @ObjectType
        else
            # Get the available object from the pool
            obj = @pool.pop()

        # Create the new object
        obj.create.apply obj, arguments

        return obj

    preallocate: (num) -> @pool.push new ObjectType for x in [1...num]

    free: (obj) ->
        # Destroy the object
        obj.destroy()

        # Put the free object into the pool
        @pool.push obj

module.exports = ObjectPool