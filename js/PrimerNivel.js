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

        //ANTORCHAS
        this.antorchas_Array = [];
        this.NUM_ANTORCHAS = 4;
        this.numeroAntorchasEncendidas=0;
        for(var i=0;i<this.NUM_ANTORCHAS;i++)
        {
            this.antorchas_Array.push(new Antorcha(160*i+200,200, this));
        }
        

        //FUNCIONES DE RESPUESTA
        this.inicializarControlesHumano();
        this.inicializarControlesFantasma();
        this.inicializarColisiones();
       /*
        var estatuasGO = Array(6);
        var estatua = Array(6);
        //ESTATUA   
        crearEstatuas(estatuasGO);
*/
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
        this.input.keyboard.on('keydown-W', () => { this.humano.input('UP',true);});
        this.input.keyboard.on('keyup-W', () => { this.humano.input('UP',false);});

        this.input.keyboard.on('keydown-S', () => { this.humano.input('DOWN',true); });
        this.input.keyboard.on('keyup-S', () => { this.humano.input('DOWN',false);});
        
        this.input.keyboard.on('keydown-A', () => { this.humano.input('LEFT',true);});
        this.input.keyboard.on('keyup-A', () => {this.humano.input('LEFT',false);});

        this.input.keyboard.on('keydown-D', () => {this.humano.input('RIGHT',true);});
        this.input.keyboard.on('keyup-D', () => {this.humano.input('RIGHT',false);});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-E',  () => {this.humano.input('INTERACT',true);});
        this.input.keyboard.on('keyup-E',  () => {this.humano.input('INTERACT',false);});
    }

    inicializarControlesFantasma(){
        //MOVIMIENTO
        this.input.keyboard.on('keydown-UP', () => { this.fantasma.input('UP',true);});
        this.input.keyboard.on('keyup-UP', () => { this.fantasma.input('UP',false);});

        this.input.keyboard.on('keydown-DOWN', () => { this.fantasma.input('DOWN',true); });
        this.input.keyboard.on('keyup-DOWN', () => { this.fantasma.input('DOWN',false);});
        
        this.input.keyboard.on('keydown-LEFT', () => { this.fantasma.input('LEFT',true);});
        this.input.keyboard.on('keyup-LEFT', () => {this.fantasma.input('LEFT',false);});

        this.input.keyboard.on('keydown-RIGHT', () => {this.fantasma.input('RIGHT',true);});
        this.input.keyboard.on('keyup-RIGHT', () => {this.fantasma.input('RIGHT',false);});

        //TECLAS ESPECIALES
        this.input.keyboard.on('keydown-ENTER',  () => {this.fantasma.input('INTERACT',true);});
        this.input.keyboard.on('keyup-ENTER',  () => {this.fantasma.input('INTERACT',false);});
    }

    inicializarColisiones(){
        //Colision entre jugadores, hacemos q se frenen tras colisionar
        this.physics.add.collider(this.humano.SpriteObject, this.fantasma.SpriteObject, this.manejoDeColisionJugadores);

        /*const grupoAntorchas = this.physics.add.group({immovable: true});
        for(var i=0;i<this.antorchas_Array.length;i++){
            grupoAntorchas.add(this.antorchas_Array[i].SpriteObject);
        }
        this.physics.add.collider(this.humano.SpriteObject,grupoAntorchas,() => {});// Llama al método m() cuando ocurre la colisión*/

        for(let i=0;i<this.antorchas_Array.length;i++){
            
            this.physics.add.collider(this.humano.SpriteObject,this.antorchas_Array[i].SpriteObject);
            this.physics.add.overlap(this.humano.SpriteObject,this.antorchas_Array[i].AreaInteraccion,() => {
                if(this.humano.interacting)
                {
                    var resultadoInteraccion=this.antorchas_Array[i].interactuar();
                    if(resultadoInteraccion===-1){}//no se pudo por cooldown
                    else if(resultadoInteraccion===true)//se encendió
                    {
                        this.numeroAntorchasEncendidas++;
                        if(this.numeroAntorchasEncendidas===this.NUM_ANTORCHAS)
                        {
                            this.activarPistasAntorchas();
                        }
                    }
                    else if(resultadoInteraccion===false)//se apagó
                    {
                        this.numeroAntorchasEncendidas--;
                        if(this.numeroAntorchasEncendidas+1 ===this.NUM_ANTORCHAS)
                        {
                            this.desActivarPistasAntorchas();
                        }
                    }
                }
                else
                {
                    this.antorchas_Array[i].resetearCooldown();
                }
            });
        }
    }

    manejoDeColisionJugadores(humanoObj, fantasmaObj) 
    {
        humanoObj.setVelocityX(0);
        humanoObj.setVelocityY(0);
        fantasmaObj.setVelocityX(0);
        fantasmaObj.setVelocityY(0);
    }

    activarPistasAntorchas()//se llama cuando se encienden todas las antorchas
    {
        for(var i=0;i<this.NUM_ANTORCHAS;i++)
        {
            this.antorchas_Array[i].rect.setFillStyle(0x0011ff, 1);
        }
    }
    desActivarPistasAntorchas()
    {
        for(var i=0;i<this.NUM_ANTORCHAS;i++)
        {
            if( this.antorchas_Array[i].encendida){
                this.antorchas_Array[i].rect.setFillStyle(0xffffff, 1);
            }
        }
    }

/*    girarEstatua(){
        var sigue = true;
        for(var i = 0; i < estatua.length && sigue; i++)
        {
        //no recorrer array (bombardeen el tiempo lineal)
            if(Math.abs(estatua[i].x - this.humano.x) < 1 && Math.abs(estatua[i].y - this.humano.y) < 1)
            { 
            //usar colisiones en vez de if con distancias
                switch(estatua[i].direccion)
                {
                //no usar add si no texture
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
    }*/
}
