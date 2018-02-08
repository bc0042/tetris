let bg = 'white'
let score = 0
let rows = 16
let cols = 10
let scale = 20
let itv = 0
let time = 500
let decr = -2

let curr = new block()
let next = new block()
let fixed = []

let cv = document.getElementById('cv')
cv.width = cols * scale
cv.height = rows * scale 
let cv2 = document.getElementById('cv2')
cv2.width = 4 * scale
cv2.height = rows * scale 

let g = cv.getContext('2d')
let g2 = cv2.getContext('2d')
refresh()
autoFall()

function autoFall(){
    if(decr){
        time += decr
        console.log('time: '+time)
    }
    clearInterval(itv)
    itv = setInterval(function(){
        down(1)
        refresh()
    }, time)
}

function refresh(){
    g.fillStyle = bg
    g.fillRect(0, 0, cv.width, cv.height)
    g2.fillStyle = bg
    g2.fillRect(0, 0, cv2.width, cv2.height)
    curr.drawMe(g)
    next.drawMe(g2, 'next')
    drawFixed()
    drawScore()
}

function drawScore(){
    g2.fillStyle = 'black'
    g2.font = '22px mono'
    g2.strokeRect(0, 4*scale, 4*scale, 3*scale)
    g2.fillText('Score', 0, 5*scale)
    g2.fillText(score+'', 0, 6*scale)
}

function drawFixed(){
    for(let i in fixed){
        let cell = fixed[i]
        g.fillStyle = cell.c
        g.fillRect(cell.x*scale, cell.y*scale, scale, scale)
    }
}

function rotate(){
    let t = curr.t
    curr.t = t+1 >= curr.b.length ? 0 : t+1
    curr.drawMe(g)
    if(curr.x > cols-curr.w-1){
        curr.t = t
    }
//     console.log(curr.t)
    refresh()
}

function left(){
    if(curr.x > 0 && !overlap(-1)){
        curr.x -= 1
        refresh()
    }
}

function right(){
    // console.log(curr.w)
    if(curr.x < cols-curr.w-1 && !overlap(1)){
        curr.x += 1
        refresh()
    }
}

function down(auto){
    if(curr.y < rows-curr.h-1 && !overlap(2)){
        curr.y += 1
        if(!auto) down()
    }else{
        fixCurr()
        curr = next
        next = new block()
        refresh()
    }
}

function overlap(dir){
    let cells = curr.validCells()
    for(let i in fixed){
        for(let j in cells){
            let c1 = fixed[i]
            let c2 = cells[j]
            let x = c2.x + dir % 2
            let y = c2.y + parseInt(dir / 2)
            if(c1.x==x && c1.y==y){
                return true
            }
        }
    }
    return false
}

function fixCurr(){
    // debugger
    let cells = curr.validCells()
    for(let i in cells){
        fixed.push(cells[i])
    }
    checkFixed()
    checkOver()
    // console.log(fixed.length)
}

function checkOver(){
    for(let i in fixed){
        let c = fixed[i]
        if(c.y == 0){
            alert('Game over! Socre: '+score)
            location.reload()
            return
        }
    }
}

function checkFixed(){
    let group = []
    for(let i in fixed){
        let c = fixed[i]
        let arr = group[c.y]
        if(!arr){
            arr = []
        }
        arr.push(c)
        group[c.y] = arr
    }
    let count = 0
    for(let i in group){
        let arr = group[i]
        if(arr.length == cols){
            count++
            fixed = fixed.filter(function(item){
                return item.y != i
            })
            fixedDown(i)
        }
    }
    scoring(count)
}

function scoring(rows){
    switch(rows){
        case 1:
            score += 1
            break
        case 2:
            score += 3
            break
        case 3:
            score += 5
            break
        case 4:
            score += 10
            break
        default:
            return
    }
    console.log('score: '+score)
    autoFall()
}

function fixedDown(row){
    for(let i in fixed){
        let c = fixed[i]
        if(c.y < row){
            c.y += 1
        }
    }
}

function removeByRow(row){
    for(let i in fixed){
        let c = fixed[i]
        if(c.y == row){
            fixed.remove(c)
        }
    }
}

addEventListener('keydown', function(e){
    // console.log(e)
    if(e.key=='w' || e.key=='ArrowUp'){
        rotate()
    }else if(e.key=='s' || e.key=='ArrowDown'){
        down()
    }else if(e.key=='a' || e.key=='ArrowLeft'){
        left()
    }else if(e.key=='d' || e.key=='ArrowRight'){
        right()
    }
})
