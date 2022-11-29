window.addEventListener('load',function (){
    const canvas =document.getElementById('canvas1');
    const ctx =canvas.getContext("2d");
    canvas.width =500;
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

        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 0.8)this.markedForDelection = true;
        }
        draw(context){
            context.fillStyle = 'yellow';
            context.fillRect(this.x,this.y,this.width,this.height)
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
            this.speedY =0;
           this.maxSpeed = 3;
           this.projectiles =[];
        }
        update(){
            if (this.game.keys.includes('ArrowUp'))this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown'))this.speedY =this.maxSpeed;
            else this.speedY =0;
            this.y +=this.speedY;
            //handle projectiles

            this.projectiles.forEach(projectile =>{
                projectile.update();

                });
            this.projectiles =this.projectiles.filter(projectile =>!projectile.markedForDelection);
        }
        draw(context){
            context.fillStyle = 'black';
            context.fillRect(this.x,this.y,this.width,this.height);
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
            this.lives = 5;
            this.score = this.lives
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDelection =true;
        }
        draw(context){
            context.fillStyle ='red';
            context.fillRect(this.x,this.y,this.width,this.height);
            context.fillStyle ='black';
            context.font ='20px Helvetica';
            context.fillText(this.lives, this.x,this.y);
        }
    }
    //sub class
    class Ang1 extends Enemy{
        constructor(game) {
            super(game);
            this.width =228 * 0.2;
            this.height =169 *0.2;
            this.y =Math.random()*(this.game.height * 0.9 - this.height);
        }

    }
    class layer{

    }
    class Background{

    }
    class UI{
        constructor(game) {
            this.game =game;
            this.fontSize =25;
            this.fontFamily = 'Helvetica';
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
                context.font ='50px' + this.fontFamily
                context.fillText(message1,this.game.width *0.5,this.game.height * 0.5 - 40);
                context.font ='25px' + this.fontFamily
                context.fillText(message2,this.game.width *0.5,this.game.height * 0.5 +40);
            }
            context.restore();
        }

    }
    class Game{

        constructor(width,height) {
            this.width =width;
            this.height =height;
            this.player = new Player(this);
            this.input =new InputHandler(this)
            this.ui =new UI(this)
            this.keys =[];
            this.enemies = [];
            this.enemytimer = 0;
            this.enemyInterval =1000;
            this.ammo =20;
            this.maxAmmo =50;
            this.ammotimer =0;
            this.ammoInterval =500;
            this.gameOver =false;
            this.score =0;
            this.winningScore = 10;
            this.gameTime =0;
            this.timeLimit = 5000;

        }
        update(deltaTime){
            if (!this.gameOver)this.gameTime +=deltaTime;
            if (this.gameTime >this.timeLimit)this.gameOver =true;
            this.player.update();
            if (this.ammotimer >this.ammoInterval){
                if (this.ammo< this.maxAmmo)this.ammo++;
                this.ammotimer =0;
            }else {
                this.ammotimer += deltaTime;
            }
            this.enemies.forEach(enemy =>{
                enemy.update();
                if (this.checkCollision(this. player,enemy)){
                    enemy.markedForDelection =true;
                }
                this.player.projectiles.forEach(projectile =>{
                    if(this.checkCollision(projectile,enemy)){
                        enemy.lives--;
                        projectile.markedForDelection =true;
                        if (enemy.lives <= 0){
                            enemy.markedForDelection =true;
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
            this.player.draw(context);
            this.ui.draw(context)
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
        }
        addEnemy(){
            this.enemies.push(new Ang1(this));
            console.log(this.enemies);
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
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);

    }
    animate(0);

});