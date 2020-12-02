var gs='start',edges
var e=200,lvl=1,lvs=3
var rg,lg

function preload(){
    bi=loadImage('assets/block.png')
    si=loadImage('assets/slab.png')
    pi=loadImage('assets/jack.png')
    pi2=loadImage('assets/jackl.png')
    play=loadImage('assets/play.png')
    reset=loadImage('assets/reset.png')
}

function setup(){
    createCanvas(windowWidth-20,windowHeight-20)
    edges=createEdgeSprites()
    rg=createGroup()
    lg=createGroup()
    g=createSprite(width/2,height/2+300,width,height/7.2)
    g.addImage(si)
    r=createSprite(width/2,height/2-300,width,height/7.2)
    r.addImage(si)
    p=createSprite(width/2-700,height/2+200,width/30.42,width/30.42)
    p.addImage(pi)
    pb=createSprite(width/2,height/2+50,100,100)
    pb.addImage(play)
    b1=new Rock(width/2-500,height/2+200)
    rg.add(b1.sprite)
    b2=new Rock(width/2-400,height/2+100)
    rg.add(b2.sprite)
    b3=new Rock(width/2,height/2+200)
    rg.add(b3.sprite)
    b4=new Rock(width/2+100,height/2+200)
    rg.add(b4.sprite)
    b5=new Rock(width/2+400,height/2+100)
    rg.add(b5.sprite)
    b6=new Rock(width/2+500,height/2+200)
    rg.add(b6.sprite)

    l1=new Lava(width/2-250,height/2+200,400,100)
    lg.add(l1.sprite)
    l2=new Lava(width/2+300,height/2+200,300,100)
    lg.add(l2.sprite)
    
    b1.sprite.visible=false
    b2.sprite.visible=false
    b3.sprite.visible=false
    b4.sprite.visible=false
    b5.sprite.visible=false
    b6.sprite.visible=false

    l1.sprite.visible=false
    l2.sprite.visible=false
    //l3.sprite.visible=false
}

function draw(){
    background(10,10,25)
    textFont('Georgia')
    if(gs==='start'){
        textSize(100)
        text('JACKs ODYSSEY',width/2-400,height/2-100)
        if(mousePressedOver(pb)){
            gs='play'
        }
    }
    if(gs==='play'){
        textSize(30)
        text('level:'+lvl,width/2-700,height/2-200)
        text('energy:'+e,width/2-600,height/2-200)
        text('lives:'+lvs,width/2-400,height/2-200)
        pb.visible=false
        controls()
        if(lvs===0){
            gs='end'
        }
        if(lvl===3){
            textSize(100)
            text('YOU WIN!!',width/2-100,height/2-200)
        }
        if(p.x>width/2+700){
            lvl+=1
            p.x=width/2-700
            p.y=height/2+200
        }
        if(lvl===1){
            b1.sprite.visible=true
            b2.sprite.visible=true
            b3.sprite.visible=true
            b4.sprite.visible=true
            b5.sprite.visible=true
            b6.sprite.visible=true
            
            l1.sprite.visible=true
            l2.sprite.visible=true
        }
        if(lvl===2){
            b1.sprite.x=width/2-600
            if(frameCount%5===0){
                l3=new Lava(random(200,1000),-20,20,20)
                lg.add(l3.sprite)
                l3.sprite.velocityY=25
                l3.lifetime=200
                l4=new Lava(random(200,1000),-20,20,20)
                lg.add(l4.sprite)
                l4.sprite.velocityY=25
                l4.lifetime=200
                l5=new Lava(random(200,1000),-20,20,20)
                lg.add(l5.sprite)
                l5.sprite.velocityY=25
                l5.lifetime=200
            }
            b2.sprite.x=width/2+600
            b2.sprite.y=height/2+200
            b3.sprite.destroy()
            b4.sprite.destroy()
            b5.sprite.destroy()
            b6.sprite.destroy()
            l1.sprite.destroy()
            l2.sprite.destroy()
        }
    }
    if(gs==='end'){
        p.visible=false
        textSize(100)
        text('GameOver',width/2-200,height/2-100)
        pb.visible=true
        pb.addImage(reset)
        pb.x=width/2
        if(mousePressedOver(pb)){
            location.reload()
        }
    }
    drawSprites()
} 

function controls(){
    p.y+=5
    p.bounceOff(g)
    p.bounceOff(r)
    p.bounceOff(edges)
    p.bounceOff(rg)
    if(p.isTouching(lg)){
        p.x=width/2-700
        p.y=height/2+200
        lvs-=1
        e=200
    }
    if(keyDown('up')&&e>0){
        p.y-=10
        e-=6
    }else{
        e+=2
    }
    if(e>=200){
        e=200
    }
    if(keyDown('right')){
        p.x+=10
        p.addImage(pi)
    }
    if(keyDown('left')){
        p.x-=10
        p.addImage(pi2)
    }
}