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
        this.body.setImmovable(false);

        this.cooldown = false;
    } 

    girarEstatua()
    {

    }
}

class Dialogo 
{
    constructor(scene) 
    {
        this.scene = scene;
        this.cuadroDialogo = null;
        this.imagenPersonaje = null;
        this.texto = null;
        this.isVisible = false;
        this.dialogos = [];
        this.indiceDialogo = 0;
        this.teclaEspacio = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Tecla espacio
        this.puedeAvanzar = true;
    }

    // Método para configurar los diálogos
    configurarDialogos(dialogos) 
    {
        this.dialogos = dialogos;
        this.mostrarDialogo(this.dialogos[this.indiceDialogo]);
    }

    // Mostrar el cuadro de diálogo, la imagen del personaje y el texto
    mostrarDialogo(dialogo) 
    {
        // Crear o actualizar el cuadro de diálogo
        if (!this.cuadroDialogo) 
        {
            this.cuadroDialogo = this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 100, 'cuadro_dialogo');
            this.cuadroDialogo.setDepth(10);
        }

        // Crear o actualizar la imagen del personaje
        if (!this.imagenPersonaje) 
        {
            this.imagenPersonaje = this.scene.add.image(this.scene.cameras.main.centerX - 200, this.scene.cameras.main.centerY + 50, dialogo.imagenPersonaje);
            this.imagenPersonaje.setDepth(11);
        }
        else 
        {
            this.imagenPersonaje.setTexture(dialogo.imagenPersonaje);
        }

        // Crear o actualizar el texto
        if (!this.texto) 
        {
            this.texto = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY + 50, dialogo.mensaje, {
                font: '18px Arial',
                fill: '#ffffff',
                wordWrap: { width: 600, useAdvancedWrap: true }
            });
            this.texto.setDepth(11);
        } 
        else 
        {
            this.texto.setText(dialogo.mensaje);
        }

        this.setVisible(true);
    }

    // Cambiar la visibilidad del diálogo
    setVisible(visible) 
    {
        if (this.cuadroDialogo) this.cuadroDialogo.setVisible(visible);
        if (this.imagenPersonaje) this.imagenPersonaje.setVisible(visible);
        if (this.texto) this.texto.setVisible(visible);
        this.isVisible = visible;
    }

    // Avanzar al siguiente diálogo
    avanzarDialogo() 
    {
        if (!this.puedeAvanzar) return; 

        this.puedeAvanzar = false; 

        this.indiceDialogo++;

        // Verificar si hay más diálogos
        if (this.indiceDialogo < this.dialogos.length) 
        {
            this.mostrarDialogo(this.dialogos[this.indiceDialogo]);
        } 
        else 
        {
            this.ocultarDialogo();
        }

        setTimeout(() => {
            this.puedeAvanzar = true; 
        }, 1000);
    }

    // Ocultar el diálogo
    ocultarDialogo() 
    {
        this.setVisible(false);
    }

    // Comprobar si presiona la tecla espacio
    actualizar() 
    {
        if (this.teclaEspacio.isDown && this.puedeAvanzar) 
        {
            this.avanzarDialogo();
        }
    }
}