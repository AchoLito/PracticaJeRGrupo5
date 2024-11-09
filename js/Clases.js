class Humano {
    constructor(x, y, direccion, scene)
    {
        this.direccion = direccion;
        this.interacting = false;

        this.SpriteObject = scene.physics.add.image(40, 40, "ESTATUA_ATRAS");
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
        this.SpriteObject.setPosition(x,y);
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
    constructor(x, y, direccion,scene)
    {
        this.direccion = direccion;
        this.interacting = false;

        this.SpriteObject = scene.physics.add.image(40, 40, 'ESTATUA_ATRAS');
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
        this.SpriteObject.setPosition(x,y);
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

    constructor(x, y, direccion,scene)
    {
        this.direccion = direccion;
        this.interacting = false;

        this.SpriteObject = scene.physics.add.image(40, 40, 'ESTATUA_ATRAS');
        this.body = this.SpriteObject.body;

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
        this.SpriteObject.setPosition(x,y);
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