let block1 = [
    '1100110000000000'
]
let block2 = [
    '1111000000000000',
    '1000100010001000'
]
let block3 = [
    '1100011000000000',
    '0100110010000000'
]
let block4 = [
    '0110110000000000',
    '1000110001000000'
]
let block5 = [
    '1000111000000000',
    '1100100010000000',
    '1110001000000000',
    '0100010011000000'
]
let block6 = [
    '0010111000000000',
    '1000100011000000',
    '1110100000000000',
    '1100010001000000'
]
let block7 = [
    '0100111000000000',
    '1000110010000000',
    '0000111001000000',
    '0100110001000000'
]

let blocks = [block1, block2, block3, block4, block5, block6, block7,]
let colors = ['black', 'grey', 'pink', 'blue', 'green', 'lime', 'navy']

function block(){
    function validCells(next){
        this.w = 0
        this.h = 0
        let cells = []
        let str = this.b[this.t]
        for(let i in str){
            let ch = str.charAt(i)
            let r = parseInt(i / 4)
            let c = i % 4
            if(ch=='1'){
                this.w = c > this.w ? c : this.w
                this.h = r > this.h ? r : this.h
                let x = next ? 0 : this.x
                cells.push({
                    x: x + c,
                    y: this.y + r,
                    c: this.c
                })
            }
        }
        return cells
    }

    function drawMe(g, next){
        if(next){
            g.strokeRect(0, 0, 4*scale, 4*scale)
        }
        g.fillStyle=this.c
        let cells = this.validCells(next)
        for(let i in cells){
            let c = cells[i]
            g.fillRect(c.x*scale, c.y*scale, scale, scale)
        }
    }
    
    let idx = parseInt(Math.random()*blocks.length)
    let b = blocks[idx]
    let t = parseInt(Math.random()*b.length)
    idx = parseInt(Math.random()*colors.length)
    let c = colors[idx]
    return {
        x: parseInt((cols-4)/2),
        y: 0,
        b: b,
        t: t,
        c: c,
        drawMe: drawMe,
        validCells: validCells
    }
}

