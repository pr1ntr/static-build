
class Display

    constructor: (container, width, height, scale) ->
        @width = width
        @height = height
        @scale = 1 or scale

        @container = document.getElementById container

        @stage = new PIXI.Stage 0x535353
        @renderer = new PIXI.autoDetectRenderer()

        @container.appendChild @renderer.view
        @resize()
        requestAnimationFrame @render
        window.addEventListener "resize" , @resize


    resize: =>
        @container.style.width = (@width or window.innerWidth) + "px"
        @container.style.height = (@height or window.innerHeight) + "px"
        @renderer.resize @container.clientWidth , @container.clientHeight


    render: =>
        requestAnimationFrame @render 
        @renderer.render @stage



 


module.exports = Display