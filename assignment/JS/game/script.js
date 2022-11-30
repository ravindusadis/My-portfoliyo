window.addEventListener('load',function (){
    const canvas =document.getElementById('canvas1');
    const ctx =canvas.getContext("2d");
    canvas.width =1000;
    canvas.height =500;

    class InputHandler{
        constructor(game) {
            this.game =game;
            window.addEventListener('keydown',e => {
                if ((  (e.key === 'ArrowUp') ||
                    (e.key === 'ArrowDown')
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                } else if (e.key === ' '){
                    this.game.player.shootTop();
                }else if (e.key === 'd'){
                    this.game.debug =!this.game.debug;
                }

            });
            window.addEventListener('keyup',e =>{
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key),1);
                }

            });
        }

    }
    class Projectile{
        constructor(game,x,y) {
            this.game =game;
            this.x = x;
            this .y = y;
            this.width =10;
            this.height = 3;
            this.speed = 3;
            this.markedForDelection = false;
            this.image =document.getElementById('projecties');

        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 0.8)this.markedForDelection = true;
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y);
        }

    }
    class Particle{

    }
    class Player{
        constructor(game){
            this.game=game;
            this.width =120;
            this.height =190;
            this.x =20;
            this.y =100;
            this.frameX =0;
            this.frameY =0;
            this.speedY =0;
            this.maxSpeed = 3;
            this.projectiles =[];
            this.image =document.getElementById('player');
        }
        update(){
            if (this.game.keys.includes('ArrowUp'))this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown'))this.speedY =this.maxSpeed;
            else this.speedY =0;
            this.y +=this.speedY;
            //vertical boundaries
            if (this.y >this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5;
            else if (this.y < -this.height * 0.5)this.y = -this.height*0.5;
            //handle projectiles

            this.projectiles.forEach(projectile =>{
                projectile.update();

            });
            this.projectiles =this.projectiles.filter(projectile =>!projectile.markedForDelection);
        }
        draw(context){

            if (this.game.debug)context.strokeRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.frameX * this.width,this.frameY *this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);

            });
        }
        shootTop(){
            if (this.game.ammo > 0){
                this.projectiles.push(new Projectile(this .game,this.x +80,this.y+30));
                this.game.ammo--;
            }

        }


    }
    //super class
    class Enemy{
        constructor(game) {
            this.game =game;
            this.x =this.game.width;
            this.speedX =Math.random() * -1.5 -0.5;
            this.markedForDelection =false;
            this.frameX =0;
            this.frameY =0;
        }
        update(){
            this.x += this.speedX - this.game.speed;
            if (this.x + this.width < 0) this.markedForDelection =true;
        }
        draw(context){
            if (this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.frameX * this.width,this.frameY *this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            if (this.game.debug){
                context.font ='20px Bangers';
                context.fillText(this.lives, this.x,this.y);
            }
        }
    }
    //sub class
    class Ang1 extends Enemy{
        constructor(game) {
            super(game);
            this.width =228 ;
            this.height =169 ;
            this.y =Math.random()*(this.game.height * 0.95 - this.height);
            this.image =document.getElementById('Ang1');
            this.frameY =Math.floor(Math.random()*3);
            this.lives = 5;
            this.score = this.lives
        }

    }
    class Ang2 extends Enemy{
        constructor(game) {
            super(game);
            this.width =213 ;
            this.height =165 ;
            this.y =Math.random()*(this.game.height * 0.95 - this.height);
            this.image =document.getElementById('Ang2');
            this.frameY =Math.floor(Math.random()*2);
            this.lives = 6;
            this.score = this.lives;
        }

    }
    class Hivawhale extends Enemy{
        constructor(game) {
            super(game);
            this.width =400 ;
            this.height =230 ;
            this.y =Math.random()*(this.game.height * 0.95 - this.height);
            this.image =document.getElementById('hivawhale1');
            this.frameY =0;
            this.lives = 20;
            this.score = this.lives;
            this.type = 'hive';
            this.speedX =Math.random() * -1.2 -0.2;
        }

    }
    class layer{
        constructor(game,image,speedModifier) {
            this.game =game;
            this.image =image;
            this.speedModifier =speedModifier;
            this.width =1768;
            this.height =500;
            this.x =0;
            this.y =0;
        }
        update(){
            if (this.x <= - this.width)this.x =0;
            this.x -=this.game.speed * this.speedModifier;
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y);
            context.drawImage(this.image,this.x + this.width,this.y);
        }


    }
    class Background{
        constructor(game) {
            this.game =game;
            this.image1 =document.getElementById('layer1');
            this.image2 =document.getElementById('layer2');
            this.image3 =document.getElementById('layer3');
            this.image4 =document.getElementById('layer4');
            this.layer1 =new layer(this.game,this.image1,0.2);
            this.layer2 =new layer(this.game,this.image2,0.4);
            this.layer3 =new layer(this.game,this.image3,1);
            this.layer4 =new layer(this.game,this.image4,1.5);
            this.layers =[this.layer1,this.layer2,this.layer3,this.layer4];

        }
        update(){
            this.layers.forEach(layer => layer.update());
        }
        draw(context){
            this.layers.forEach(layer => layer.draw(context));


        }
    }
    class  Explosion{
        constructor(game,x,y) {
            this.game = game;
            this.frameX =0;
            this.spriteWidth =200;
            this.spriteHeight =200;
            this.width =this.spriteWidth;
            this.height =this.spriteHeight;
            this.x = x - this.width * 0.5;
            this.y =y - this.height * 0.5;
            this.fps =30;
            this.timer =0;
            this.interval = 1000/this.fps;
            this.markedForDeletion = false;
            this.maxframe =8;
        }
        update(deltaTime){
            this.x -= this.game.speed;
            if (this.timer > this.interval){
                this.frameX++;
                this.timer=0;
            }else {
                this.timer +=deltaTime;
            }

            if (this.frameX > this.maxframe)this.markedForDeletion =true;

        }
        draw(context){
            context.drawImage(this.image,this.frameX * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);

        }
    }
    class Smoke extends  Explosion{
        constructor(game,x,y) {
            super(game,x,y);
            this.image =document.getElementById('smoke');

        }

    }
    class Fire extends  Explosion{
        constructor(game,x,y) {
            super(game,x,y);
            this.image =document.getElementById('fire');

        }

    }
    class UI{
        constructor(game) {
            this.game =game;
            this.fontSize =25;
            this.fontFamily = 'Bangers';
            this.color = 'white';

        }
        draw(context){
            context.save();
            context.fillStyle =this.color;
            context.shadowOffsetX =2
            context.shadowOffsety =2
            context.shadowColor= 'black'
            context.font =this.fontSize +'px' + this.fontFamily;
            //Score
            context.fillText('Score:'+ this.game.score, 20, 40);

            //ammo
            for (let  i =0;i<this.game.ammo;i++){
                context.fillRect(20 +5 * i,50,3,20);
            }
            //timer
            const  fomattedtime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + fomattedtime,20,100);
            //game over masseage
            if(this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.score >this.game.winningScore){
                    message1 = 'You Win!';
                    message2 = 'Well Done!';
                }else {
                    message1 = 'you Lost!';
                    message2 = 'Try Again!';
                }
                context.font ='150px' + this.fontFamily
                context.fillText(message1,this.game.width *0.5,this.game.height * 0.5 - 40);
                context.font ='50px' + this.fontFamily
                context.fillText(message2,this.game.width *0.5,this.game.height * 0.5 +40);
            }
            context.restore();
        }

    }
    class Game{

        constructor(width,height) {
            this.width =width;
            this.height =height;
            this.background =new Background(this);
            this.player = new Player(this);
            this.input =new InputHandler(this);
            this.ui =new UI(this);
            this.keys =[];
            this.enemies = [];
            this.explosions = [];
            this.enemytimer = 0;
            this.enemyInterval =2500;
            this.ammo =20;
            this.maxAmmo =100;
            this.ammotimer =0;
            this.ammoInterval =350;
            this.gameOver =false;
            this.score =0;
            this.winningScore = 80;
            this.gameTime =0;
            this.timeLimit = 30000;
            this.speed =1;
            this.debug =false;

        }
        update(deltaTime){
            if (!this.gameOver)this.gameTime +=deltaTime;
            if (this.gameTime >this.timeLimit)this.gameOver =true;
            this.background.update();
            this.player.update();
            if (this.ammotimer >this.ammoInterval){
                if (this.ammo< this.maxAmmo)this.ammo++;
                this.ammotimer =0;
            }else {
                this.ammotimer += deltaTime;
            }
            this.explosions.forEach(explosion => explosion.update(deltaTime));
            this.explosions = this.explosions.filter(explosion =>!explosion.markedForDelection);
            this.enemies.forEach(enemy =>{
                enemy.update();
                if (this.checkCollision(this. player,enemy)){
                    enemy.markedForDelection =true;
                    this.addExplosion(enemy);


                }
                else if (!this.gameOver) this.score--;


                this.player.projectiles.forEach(projectile =>{
                    if(this.checkCollision(projectile,enemy)){
                        enemy.lives--;
                        projectile.markedForDelection =true;
                        if (enemy.lives <= 0){
                            enemy.markedForDelection =true;
                            this.addExplosion(enemy)
                            if (this.gameOver)this.score+= enemy.score;
                             if (this.score > this.winningScore)this.gameOver =true;

                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDelection);
            if (this.enemytimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemytimer =0;
            }else {
                this.enemytimer += deltaTime;
            }
        }
        draw(context){
            this.background.draw(context);
            this.ui.draw(context)
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.explosions.forEach(explosion =>{
                explosion.draw(context);
            });
        }
        addEnemy(){
            const randomize =Math.random();
            if (randomize< 0.3)this.enemies.push(new Ang1(this));
            else if (randomize< 0.6)this.enemies.push(new Ang2(this));
            else if (randomize< 0.8)this.enemies.push(new Hivawhale(this));

        }
        addExplosion(enemy) {
            const randomize = Math.random();
            if (randomize < 0.5) {
                this.explosions.push(new Smoke(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
            }else {
                this.explosions.push(new Fire(this,enemy.x + enemy.width *0.5,enemy.y +enemy.height *0.5));

            }
        }
        checkCollision(rect1,rect2){
            return(    rect1.x <rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y)
        }

    }
    const game =new Game(canvas.width,canvas.height);
    let lastTime =0;
    //animation loop

    function animate(timeStamp){
        const deltaTime = timeStamp -lastTime;
        lastTime =timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height),
            game.draw(ctx);
            game.update(deltaTime);

        requestAnimationFrame(animate);

    }
    animate(0);

});