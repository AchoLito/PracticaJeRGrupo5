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
        this.humano = new Humano(20,40, this);

        //FANTASMA
        this.fantasma = new Fantasma(70,40, this);

        this.antorchas_Array = Array(3);
        for(var i=0;i<this.antorchas_Array.length;i++)
        {
            this.antorchas_Array[i] = new Antorcha(160*i+200,200, this);
        }
        
        
/*
        var estatuasGO = Array(6);
        var estatua = Array(6);
        //ESTATUA   
        crearEstatuas(estatuasGO);
*/
        this.inicializarControlesHumano();
        this.inicializarControlesFantasma();

        this.inicializarColisiones();
       
    }

    // Función llamada cuando los objetos colisionan
    
    
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

    
    inicializarControlesHumano(){
        
        //MOVIMIENTO
        this.input.keyboard.on('keydown-W', () => { this.humano.input('UP');});
        this.input.keyboard.on('keyup-W', () => { this.humano.input('Y_NONE');});

        this.input.keyboard.on('keydown-S', () => { this.humano.input('DOWN'); });
        this.input.keyboard.on('keyup-S', () => { this.humano.input('Y_NONE');});
        
        this.input.keyboard.on('keydown-A', () => { this.humano.input('LEFT');});
        this.input.keyboard.on('keyup-A', () => {this.humano.input('X_NONE');});

        this.input.keyboard.on('keydown-D', () => {this.humano.input('RIGHT');});
        this.input.keyboard.on('keyup-D', () => {this.humano.input('X_NONE');});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-E',  () => {this.humano.input('INTERACT');});
        this.input.keyboard.on('keyup-E',  () => {this.humano.input('I_NONE');});
    }

    inicializarControlesFantasma(){
        //MOVIMIENTO
        this.input.keyboard.on('keydown-UP', () => { this.fantasma.input('UP');});
        this.input.keyboard.on('keyup-UP', () => { this.fantasma.input('Y_NONE');});

        this.input.keyboard.on('keydown-DOWN', () => { this.fantasma.input('DOWN'); });
        this.input.keyboard.on('keyup-DOWN', () => { this.fantasma.input('Y_NONE');});
        
        this.input.keyboard.on('keydown-LEFT', () => { this.fantasma.input('LEFT');});
        this.input.keyboard.on('keyup-LEFT', () => {this.fantasma.input('X_NONE');});

        this.input.keyboard.on('keydown-RIGHT', () => {this.fantasma.input('RIGHT');});
        this.input.keyboard.on('keyup-RIGHT', () => {this.fantasma.input('X_NONE');});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-ENTER',  () => {this.fantasma.input('INTERACT');});
        this.input.keyboard.on('keyup-ENTER',  () => {this.fantasma.input('I_NONE');});
    }

    inicializarColisiones(){
        //const grupoEstatuas = scene.physics.add.group();
        //
        //grupo.addMultiple(array con spriteobjects de todas las estatuas);
        //array de grupos?

        //se añaden colisiones entre parejas de objetos, o entre objetos y grupos

        //manejo de colisiones por defecto, (se puede usar entre jugadores y otros objetos estaticos)
        //this.physics.add.collider(this.humano.SpriteObject , grupoEstatuas);
         //this.physics.add.collider(this.fantasma.SpriteObject , grupoEstatuas);

        //esta la hacemos diferente por que necesitamos manejar las colisiones de otra forma
        this.physics.add.collider(this.humano.SpriteObject, this.fantasma.SpriteObject, this.manejoDeColisionJugadores);

        const grupoAntorchas = scene.physics.add.group();


        
    
    }

    manejoDeColisionJugadores(humanoObj, fantasmaObj) 
    {
        console.log("tocao");
        //se contrarrestan sus velocidades ()
        var vx= humanoObj.body.velocity.x + fantasmaObj.body.velocity.x;
        var vy= humanoObj.body.velocity.y + fantasmaObj.body.velocity.y;

        humanoObj.setVelocityX(0);
        humanoObj.setVelocityY(0);
        fantasmaObj.setVelocityX(0);
        fantasmaObj.setVelocityY(0);
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
}
