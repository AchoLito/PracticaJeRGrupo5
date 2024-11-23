class Humano {
    constructor(x, y, scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.direccion="0";//quieto
        this.velocidad=90;

        this.SpriteObject = scene.physics.add.image(x, y, "ESTATUA_FRONTAL");
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);

       // this.SpriteObject.setPosition(x,y);
       
    }

    desplazarse(direccion)
    {
        this.direccion = direccion;
        switch(direccion){
            case '0'://quieto
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                break;
            case 'UP':
                this.SpriteObject.setTexture('ESTATUA_ATRAS');
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.velocidad);
                break;
            case 'DOWN':
                this.SpriteObject.setTexture('ESTATUA_FRONTAL');
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.velocidad);
                break;
            case 'LEFT':
                this.SpriteObject.setTexture('ESTATUA_IZQUIERDA');
                this.body.setVelocityX(-this.velocidad);
                this.body.setVelocityY(0);
                break;
            case 'RIGHT':
                this.SpriteObject.setTexture('ESTATUA_DERECHA');
                this.body.setVelocityX(this.velocidad);
                this.body.setVelocityY(0);
                break;
            default:
                console.log("nee");
                break;
        }
        
    }

    input(input,control)
    { 
        //Teclas especiales
        if(input ==='INTERACT'){
            this.interacting = control;
        }
        //Movimieno
        else{
            if(control){
                this.desplazarse(input);
            }
            else if(this.direccion===input)
            {
                this.desplazarse('0');
            }
        }
    }
}

class Fantasma
{
    constructor(x, y,scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.direccion="0";//quieto
        this.velocidad=90;

        this.SpriteObject = scene.physics.add.image(x, y, 'ESTATUA_FRONTAL');
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
    }

    desplazarse(direccion)
    {
        this.direccion = direccion;
        switch(direccion){
            case '0'://quieto
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                break;
            case 'UP':
                this.SpriteObject.setTexture('ESTATUA_ATRAS');
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.velocidad);
                break;
            case 'DOWN':
                this.SpriteObject.setTexture('ESTATUA_FRONTAL');
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.velocidad);
                break;
            case 'LEFT':
                this.SpriteObject.setTexture('ESTATUA_IZQUIERDA');
                this.body.setVelocityX(-this.velocidad);
                this.body.setVelocityY(0);
                break;
            case 'RIGHT':
                this.SpriteObject.setTexture('ESTATUA_DERECHA');
                this.body.setVelocityX(this.velocidad);
                this.body.setVelocityY(0);
                break;
        }
        
    }
    
    input(input,control)
    { 
        //Teclas especiales
        if(input ==='INTERACT'){
            this.interacting = control;
        }
        //Movimieno
        else{
            if(control){
                this.desplazarse(input);
            }
            else if(this.direccion===input)
            {
                this.desplazarse('0');
            }
        }
    }
}

class Antorcha
{
    //Objeto estatico
    //Se puede encender estando cerca y con la tecla de interaccion pulsada

    constructor(x, y,scene)
    {
        this.encendida=false;
        this.cooldown=false;//indica si esta en espera para poder interactuar con ella

       // this.SpriteObject = scene.physics.add.image(x, y, 'ESTATUA_ATRAS');
        this.rect = scene.add.rectangle(x, y, 20, 20, 0x00cccc);
        this.SpriteObject =scene.physics.add.existing(this.rect); // Enable physics on the rectangle

        var radioInteraccion=30;
        this.circ = scene.add.circle(x, y, radioInteraccion, 0x000000,0);
        this.AreaInteraccion =scene.physics.add.existing(this.circ); 

        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.AreaInteraccion.body.setImmovable(true);

        
    }

    interactuar()//cada vez q interactuas cambia su estado
    {
        if(!this.cooldown)//si no hay cooldow
        {
            this.cooldown = true;
            if(this.encendida)//apagar
            {
                this.encendida = false;
                this.rect.setFillStyle(0x00cccc, 1);
                return false;
            }
            else//encender
            {
                this.encendida = true;
                this.rect.setFillStyle(0xffffff, 1);
                return true;
            }
        }
        return -1;
        //this.SpriteObject.setTexture('sprite encendida');
    }

    resetearCooldown()
    {
        this.cooldown = false;
    }


}
class Estatua
{
    constructor(x, y, scene, direccion)
    {
        this.direccion = direccion;

        this.SpriteObject = scene.physics.add.image(x, y, direccion);

        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    } 
}