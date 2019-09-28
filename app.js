let app = document.getElementsByTagName("APP-ROOT")[0];

class Container{
    constructor() {
        this.element = document.createElement('div')
        this.element.style.width = "600px"
        this.element.style.height = "600px"
        this.element.position = "absolute"
        this.element.itemLeft = 0
        this.element.itemTop = 0
    }
    insert(item){
        this.element.appendChild(item)
        item.style.left = "" + this.element.itemLeft + "px";
        item.style.top = "" + this.element.itemTop + "px";
        this.element.itemLeft += parseInt(item.style.width,10)
        if (this.element.childElementCount%3 == 0){
            this.element.itemLeft = 0;
            this.element.itemTop += parseInt(item.style.height,10)
            
        }
        console.log(item.style.left,item.style.top)
    }
}

class Box{
    constructor(contWidht,contHeight){
        this.element = document.createElement('div')
        this.element.style.width = "" + parseInt(contWidht,10)/3 + "px";
        this.element.style.height = "" + parseInt(contHeight,10)/3 + "px";
        this.element.style.boxSizing = "content-box"
        this.element.style.backgroundImage = "radial-gradient(circle, #ffffff, #f1f1f1, #e2e2e2, #d4d4d4, #c6c6c6)"
        this.element.style.position = "absolute"
        this.element.style.border = "solid white 2px"
        this.element.style.textAlign = "center"
        this.element.style.fontSize = "180px"
        this.element.style.userSelect = "none"
        this.element.style.cursor = "pointer"
    }
}

let con = new Container()
let box = new Box(parseInt(con.element.style.width,10),parseInt(con.element.style.height,10))
let isChangXO = true
let winCons = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

for (let i = 0; i < 9; i++){
    box.element.id = "" + i;
    con.insert(box.element.cloneNode())
    con.element.children[i].addEventListener("click",(event)=>{
        con.element.children[parseInt(event.target.id)].style.background = "white"
        if (isChangXO){
            con.element.children[parseInt(event.target.id)].innerHTML = "X"
            con.element.children[parseInt(event.target.id)].style.background = "white"
            con.element.replaceChild(event.target.cloneNode(true),event.target)
            isChangXO = false
            checkWin(con.element,"X")
        }  
        else{
            con.element.children[parseInt(event.target.id)].innerHTML = "O"
            con.element.children[parseInt(event.target.id)].style.background = "black"
            con.element.children[parseInt(event.target.id)].style.color = "white"
            con.element.replaceChild(event.target.cloneNode(true),event.target, )
            isChangXO = true
            checkWin(con.element,"O")
        }
        console.log(isChangXO)
    })
}

let checkWin=(Object,text)=>{
    for (let v of winCons){
        let win = 0
        for (let w of v){
            if(Object.children[w].innerHTML === text)
                win++
            if (win === 3){
                let winner = document.createElement("h")
                winner.innerHTML = "" + text + " win."
                app.appendChild(winner)
                let refreshBtn = document.createElement("button")
                refreshBtn.innerHTML = "Rematch"
                refreshBtn.addEventListener("click",()=>{
                    for (let v of Object.children){
                        v.innerHTML = ""
                    }
                })
                app.appendChild(refreshBtn)
                
            }
        }        
    }

}
app.style.width = "600px"
app.style.height = "600px"
app.style.position = 'relative'
document.body.appendChild(app)
app.appendChild(con.element)
