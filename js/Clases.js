class Humano {
    constructor(x, y, scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.SpriteObject = scene.physics.add.image(x, y, "ESTATUA_ATRAS");
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
       // this.SpriteObject.setPosition(x,y);
       
    }

    cambiarDireccion(direccion)
    {
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

    input(control){
        var velocidad=90;
        switch(control)
        {
            //EJE Y
            case 'UP':
                this.body.setVelocityX(0);
                this.body.setVelocityY(-velocidad);
                this.cambiarDireccion(control);
                break;
            case 'DOWN':
                this.body.setVelocityX(0);
                this.body.setVelocityY(velocidad);
                this.cambiarDireccion(control);
                break;
            case 'Y_NONE':
                this.body.setVelocityY(0);
                break;
            //EJE X
            case 'LEFT':
                this.body.setVelocityX(-velocidad);
                this.body.setVelocityY(0);
                this.cambiarDireccion(control);
                break;
            case 'RIGHT':
                this.body.setVelocityX(velocidad);
                this.body.setVelocityY(0);
                this.cambiarDireccion(control);
                break;
            case 'X_NONE':
                this.body.setVelocityX(0);
                break;
            case 'INTERACT':
                this.interacting =true;
                break;
            case 'I_NONE':
                this.interacting =false;
                break;
            default:
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                break;
        }
    }
}

class Fantasma
{
    constructor(x, y,scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.SpriteObject = scene.physics.add.image(x, y, 'ESTATUA_ATRAS');
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
    }

    cambiarDireccion(direccion){
        switch(direccion){
            case 'UP':
                    //this.SpriteObject.setTexture('NOMBRETEXT');
                break;
            case 'DOWN':
                   // this.SpriteObject.setTexture('NOMBRETEXT');
                break;
            case 'LEFT':
                    //this.SpriteObject.setTexture('NOMBRETEXT');
                break;
            case 'RIGHT':
                   // this.SpriteObject.setTexture('NOMBRETEXT');
                break;
        }
        
    }

    input(control){
        var velocidad=90;
        switch(control)
        {
            //EJE Y
            case 'UP':
                this.body.setVelocityX(0);
                this.body.setVelocityY(-velocidad);
                this.cambiarDireccion(control);
                break;
            case 'DOWN':
                this.body.setVelocityX(0);
                this.body.setVelocityY(velocidad);
                this.cambiarDireccion(control);
                break;
            case 'Y_NONE':
                this.body.setVelocityY(0);
                break;
            //EJE X
            case 'LEFT':
                this.body.setVelocityX(-velocidad);
                this.body.setVelocityY(0);
                this.cambiarDireccion(control);
                break;
            case 'RIGHT':
                this.body.setVelocityX(velocidad);
                this.body.setVelocityY(0);
                this.cambiarDireccion(control);
                break;
            case 'X_NONE':
                this.body.setVelocityX(0);
                break;
            case 'INTERACT':
                this.interacting =true;
                break;
            case 'I_NONE':
                this.interacting =false;
                break;
            default:
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                break;
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