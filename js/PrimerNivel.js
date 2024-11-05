class PantallaInicio extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PrimerNivel"});
    }

    preload()
    {
       
    }

    create()
    {
        //HUMANO
        this.humano = this.physics.add.sprite(40, 40, 'NOMBRE SPRITEEEEE');
        this.humano.body.setImmovable(true);
        this.humano.body.setAllowGravity(false);

        //FANTASMA
        this.fantasma = this.physics.add.sprite(40, 40, 'NOMBRE SPRITEEEEE');
        this.fantasma.body.setImmovable(true);
        this.fantasma.body.setAllowGravity(false);

        this.inicializarControlesHumano();
        this.inicializarControlesFantasma();
    }

    update()
    {

    }

    inicializarControlesHumano() {
        
        //MOVIMIENTO
        this.input.keyboard.on('keydown-W', humanoInput('UP'));
        this.input.keyboard.on('keyup-W', humanoInput('Y_NONE'));

        this.input.keyboard.on('keydown-S', humanoInput('DOWN'));
        this.input.keyboard.on('keyup-S', humanoInput('Y_NONE'));
        
        this.input.keyboard.on('keydown-A', humanoInput('LEFT'));
        this.input.keyboard.on('keyup-A', humanoInput('X_NONE'));

        this.input.keyboard.on('keydown-D', humanoInput('RIGHT'));
        this.input.keyboard.on('keyup-D', humanoInput('X_NONE'));

        //TECLAS ESPECIALES
    }
    inicializarControlesFantasma() {
        
        //MOVIMIENTO
        this.input.keyboard.on('keydown-UP', fantasmaInput('UP'));
        this.input.keyboard.on('keyup-UP', fantasmaInput('Y_NONE'));

        this.input.keyboard.on('keydown-DOWN', fantasmaInput('DOWN'));
        this.input.keyboard.on('keyup-DOWN', fantasmaInput('Y_NONE'));
        
        this.input.keyboard.on('keydown-LEFT', fantasmaInput('LEFT'));
        this.input.keyboard.on('keyup-LEFT', fantasmaInput('X_NONE'));

        this.input.keyboard.on('keydown-RIGHT', fantasmaInput('RIGHT'));
        this.input.keyboard.on('keyup-RIGHT', fantasmaInput('X_NONE'));

        //TECLAS ESPECIALES
    }

    humanoInput(control){
        var velocidad=3;
        switch(control)
        {
            //EJE Y
            case 'UP':
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(velocidad);
                break;
            case 'DOWN':
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(-velocidad);
                break;
            case 'Y_NONE':
                this.humano.body.setVelocityY(0);
                break;
            //EJE X
            case 'LEFT':
                this.humano.body.setVelocityX(-velocidad);
                this.humano.body.setVelocityY(0);
                break;
            case 'RIGHT':
                this.humano.body.setVelocityX(velocidad);
                this.humano.body.setVelocityY(0);
                break;
            case 'X_NONE':
                this.humano.body.setVelocityX(0);
                break;
        }
    }

    

    fantasmaInput(control){
        var velocidad=3;
        switch(control)
        {
            //EJE Y
            case 'UP':
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(velocidad);
                break;
            case 'DOWN':
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(-velocidad);
                break;
            case 'Y_NONE':
                this.humano.body.setVelocityY(0);
                break;
            //EJE X
            case 'LEFT':
                this.humano.body.setVelocityX(-velocidad);
                this.humano.body.setVelocityY(0);
                break;
            case 'RIGHT':
                this.humano.body.setVelocityX(velocidad);
                this.humano.body.setVelocityY(0);
                break;
            case 'X_NONE':
                this.humano.body.setVelocityX(0);
                break;
        }
        
    }
}