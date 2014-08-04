Display = require './view/Display.coffee'
class AWDR 

    constructor: (container) ->
        console.log "AWDR" , container

        @display = new Display(container)







module.exports = AWDR
