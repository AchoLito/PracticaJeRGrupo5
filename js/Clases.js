class Humano {
    constructor(x, y, scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.direccion="0";//quieto
        this.velocidad=90;

        this.SpriteObject = scene.physics.add.image(x, y, "ESTATUA_ATRAS");
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
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.velocidad);
                break;
            case 'DOWN':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.velocidad);
                break;
            case 'LEFT':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(-this.velocidad);
                this.body.setVelocityY(0);
                break;
            case 'RIGHT':
               // this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
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
            else if(this.direccion===input){
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

        this.SpriteObject = scene.physics.add.image(x, y, 'ESTATUA_ATRAS');
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
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.velocidad);
                break;
            case 'DOWN':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.velocidad);
                break;
            case 'LEFT':
                //this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
                this.body.setVelocityX(-this.velocidad);
                this.body.setVelocityY(0);
                break;
            case 'RIGHT':
               // this.SpriteObject.setTexture('ESTATUA_ATRAS.png');
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
        this.SpriteObject = scene.physics.add.image(x, y, 'ESTATUA_ATRAS');
        this.body = this.SpriteObject.body;
        this.boolEncendido = false;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    interactuar()//cada vez q interactuas cambia su estado
    {
        if(this.boolEncendido)
        {
            this.boolEncendido = false;
            //this.SpriteObject.setTexture('sprite apagada');
        }
        else
        {
            this.boolEncendido = true;
            //this.SpriteObject.setTexture('sprite encendida');
        }

        //la clase del nivel se encarga de comprobar si todas estan encendidas
        //en ese caso llamara a una funcion de mostrar pistas
        //comprobara si todas estan encendidas tras encender una
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