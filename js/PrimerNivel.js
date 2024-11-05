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

        var estatuasGO = Array(6);
        var estatua = Array(6);
        //ESTATUA   
        crearEstatuas(estatuasGO);

        this.inicializarControlesHumano();
        this.inicializarControlesFantasma();
    }    

    crearEstatua(estatua){
        estatua[0] = this.physics.add.sprite(80, 80, 'ESTATUA_ATRAS');
        estatua[0].body.setImmovable(true);
        estatua[0].body.setAllowGravity(false);
        this.estatua[0] = new Estatua(80,80,'ESTATUA_ATRAS');

        estatua[1] = this.physics.add.sprite(90, 80, 'ESTATUA_ATRAS');
        estatua[1].body.setImmovable(true);
        estatua[1].body.setAllowGravity(false);
        this.estatua[1] = new Estatua(90,80,'ESTATUA_ATRAS');

        estatua[2] = this.physics.add.sprite(80, 90, 'ESTATUA_ATRAS');
        estatua[2].body.setImmovable(true);
        estatua[2].body.setAllowGravity(false);
        this.estatua[2] = new Estatua(80,90,'ESTATUA_ATRAS');

        estatua[3] = this.physics.add.sprite(70, 80, 'ESTATUA_ATRAS');
        estatua[3].body.setImmovable(true);
        estatua[3].body.setAllowGravity(false);
        this.estatua[3] = new Estatua(70,80,'ESTATUA_ATRAS');

        estatua[4] = this.physics.add.sprite(80, 70, 'ESTATUA_ATRAS');
        estatua[4].body.setImmovable(true);
        estatua[4].body.setAllowGravity(false);
        this.estatua[4] = new Estatua(80,70,'ESTATUA_ATRAS');

        estatua[5] = this.physics.add.sprite(100, 100, 'ESTATUA_ATRAS');
        estatua[5].body.setImmovable(true);
        estatua[5].body.setAllowGravity(false);
        this.estatua[5] = new Estatua(100,100,'ESTATUA_ATRAS');
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
        this.input.keyboard.on('keydown-E', humanoInput('E'));
        this.input.keyboard.on('keyup-E', humanoInput('X_NONE'));
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

    girarEstatua(){
        var sigue = true;
        for(var i = 0; i < estatua.length && sigue; i++)
        {
            if(Math.abs(estatua[i].x - this.humano.x) < 1 && Math.abs(estatua[i].y - this.humano.y) < 1)
            {
                switch(estatua[i].direccion)
                {
                    case 'ESTATUA_ATRAS':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_DERECHA');
                        break;
                    case 'ESTATUA_DERECHA':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_FRONTAL');
                        break;
                    case 'ESTATUA_IZQ':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_ATRAS');
                        break;
                    case 'ESTATUA_FRONTAL':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_IZQ');
                        break; 
                }
                
                sigue = false;
            }
        }       
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
            case 'E':
                girarEstatua();
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

class Estatua
{
    constructor(x, y, direccion)
    {
        this.x = x;
        this.y = y;
        this.direccion = direccion;
    }
}