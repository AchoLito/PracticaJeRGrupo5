class PrimerNivel extends Phaser.Scene
{
    constructor()
    {
        super({ key: "PrimerNivel"});
    }

    preload()
    {
        this.load.image('ESTATUA_ATRAS','imagenes/ESTATUA_ATRAS.png');
    }

    create()
    {
        
        //HUMANO
        this.humano = new Humano(10,10,'DOWN', this);
        /*
        //FANTASMA
        this.fantasma = new Fantasma(15,10,'DOWN');
        

        var estatuasGO = Array(6);
        var estatua = Array(6);
        //ESTATUA   
        crearEstatuas(estatuasGO);
*/
        this.inicializarControlesHumano();
        //this.inicializarControlesFantasma();
        
    }    
    update()
    {

    }

    crearEstatua(estatua){
        estatua[0] = this.physics.add.sprite(80, 80, 'ESTATUA_ATRAS.png');
        estatua[0].body.setImmovable(true);
        estatua[0].body.setAllowGravity(false);
        this.estatua[0] = new Estatua(80, 80,'ESTATUA_ATRAS.png');

        estatua[1] = this.physics.add.sprite(90, 80, 'ESTATUA_ATRAS.png');
        estatua[1].body.setImmovable(true);
        estatua[1].body.setAllowGravity(false);
        this.estatua[1] = new Estatua(90, 80,'ESTATUA_ATRAS.png');

        estatua[2] = this.physics.add.sprite(80, 90, 'ESTATUA_ATRAS.png');
        estatua[2].body.setImmovable(true);
        estatua[2].body.setAllowGravity(false);
        this.estatua[2] = new Estatua(80, 90,'ESTATUA_ATRAS.png');

        estatua[3] = this.physics.add.sprite(70, 80, 'ESTATUA_ATRAS.png');
        estatua[3].body.setImmovable(true);
        estatua[3].body.setAllowGravity(false);
        this.estatua[3] = new Estatua(70, 80,'ESTATUA_ATRAS.png');

        estatua[4] = this.physics.add.sprite(80, 70, 'ESTATUA_ATRAS.png');
        estatua[4].body.setImmovable(true);
        estatua[4].body.setAllowGravity(false);
        this.estatua[4] = new Estatua(80, 70,'ESTATUA_ATRAS.png');

        estatua[5] = this.physics.add.sprite(100, 100, 'ESTATUA_ATRAS.png');
        estatua[5].body.setImmovable(true);
        estatua[5].body.setAllowGravity(false);
        this.estatua[5] = new Estatua(100, 100,'ESTATUA_ATRAS.png');
    }

    
    inicializarControlesHumano() {
        
        var velocidad = 90;
        //MOVIMIENTO
        this.input.keyboard.on('keydown-W', () => { this.humano.body.setVelocityY(-velocidad);
            this.humano.cambiarDireccion(control);});
        
        this.input.keyboard.on('keyup-W', () => {this.humano.body.setVelocityY(0);});

        this.input.keyboard.on('keydown-S', () => { this.humano.body.setVelocityY(velocidad);
            this.humano.cambiarDireccion(control);});

        this.input.keyboard.on('keyup-S', () => {this.humano.body.setVelocityY(0);});
        
        this.input.keyboard.on('keydown-A', () => {this.humano.body.setVelocityX(-velocidad);
                this.humano.cambiarDireccion(control);});
        this.input.keyboard.on('keyup-A', () => {this.humano.body.setVelocityX(0);});

        this.input.keyboard.on('keydown-D', () => {this.humano.body.setVelocityX(velocidad);
            this.humano.cambiarDireccion(control);});
        this.input.keyboard.on('keyup-D', () => {this.humano.body.setVelocityX(0);});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-E', this.humanoInput('E'));
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
                    case 'ESTATUA_ATRAS.png':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_DERECHA.png');
                        break;
                    case 'ESTATUA_DERECHA.png':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_FRONTAL.png');
                        break;
                    case 'ESTATUA_IZQ.png':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_ATRAS.png');
                        break;
                    case 'ESTATUA_FRONTAL.png':
                        estatuaGO[i] = this.physics.add.sprite(estatuaGO[i].x, estatuaGO[i].y, 'ESTATUA_IZQ.png');
                        break; 
                }
                
                sigue = false;
            }
        }       
    }

    humanoInput(control){
        var velocidad=90;
        switch(control)
        {
            //EJE Y
            case 'UP':
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(-velocidad);
                this.humano.cambiarDireccion(control);
                break;
            case 'DOWN':
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(velocidad);
                this.humano.cambiarDireccion(control);
                break;
            case 'Y_NONE':
                this.humano.body.setVelocityY(0);
                break;
            //EJE X
            case 'LEFT':
                this.humano.body.setVelocityX(-velocidad);
                this.humano.body.setVelocityY(0);
                this.humano.cambiarDireccion(control);
                break;
            case 'RIGHT':
                this.humano.body.setVelocityX(velocidad);
                this.humano.body.setVelocityY(0);
                this.humano.cambiarDireccion(control);
                break;
            case 'E':
                girarEstatua();
                break;
            case 'X_NONE':
                this.humano.body.setVelocityX(0);
                break;
            default:
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(0);
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
            default:
                this.humano.body.setVelocityX(0);
                this.humano.body.setVelocityY(0);
                break;

        }       
    }
}
class Humano {
    constructor(x, y, direccion, scene)
    {
        this.x = x;
        this.y = y;
        this.direccion = direccion;

        //scene.load.image("ESTATUA_ATRAS", "js/ESTATUA_ATRAS.png");

        this.SpriteObject = scene.physics.add.image(80, 80, "ESTATUA_ATRAS");
        this.body = this.SpriteObject.body;

        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }

    cambiarDireccion(direccion){
        switch(direccion){
            case 'UP':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                break;
            case 'DOWN':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                break;
            case 'LEFT':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                break;
            case 'RIGHT':
               // this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                break;
        }
        
    }
}

class Fantasma
{
    constructor(x, y, direccion)
    {
        this.x = x;
        this.y = y;
        this.direccion = direccion;

        this.SpriteObject = this.physics.add.sprite(40, 40, 'NOMBRE SPRITEEEEE');
        this.body = SpriteObject.body;

        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }

    cambiarDireccion(direccion){
        switch(direccion){
            case 'UP':
                    this.SpriteObject.setTexture('NOMBRETEXT');
                break;
            case 'DOWN':
                    this.SpriteObject.setTexture('NOMBRETEXT');
                break;
            case 'LEFT':
                    this.SpriteObject.setTexture('NOMBRETEXT');
                break;
            case 'RIGHT':
                    this.SpriteObject.setTexture('NOMBRETEXT');
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