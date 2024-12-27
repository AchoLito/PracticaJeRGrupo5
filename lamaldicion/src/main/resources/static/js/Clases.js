class Humano {
    constructor(x, y, scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.direccion="0";//quieto
        this.velocidad=90;

        this.SpriteObject = scene.physics.add.image(x, y, "BANDIDO_FRONTAL");
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
                this.SpriteObject.setTexture('BANDIDO_ATRAS');
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.velocidad);
                break;
            case 'DOWN':
                this.SpriteObject.setTexture('BANDIDO_FRONTAL');
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.velocidad);
                break;
            case 'LEFT':
                this.SpriteObject.setTexture('BANDIDO_IZQUIERDA');
                this.body.setVelocityX(-this.velocidad);
                this.body.setVelocityY(0);
                break;
            case 'RIGHT':
                this.SpriteObject.setTexture('BANDIDO_DERECHA');
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

        return this.direccion;//se la pasamos por websokets al otro cliente
    }

    getPos() {
        return { x: this.body.x, y: this.body.y };
    }
    setPos({ x, y }) {
        this.body.setPosition(x, y);
    }
}

class Fantasma
{
    constructor(x, y,scene)
    {
        this.interacting = false; //indica si pulsas la tecla de interaccion

        this.direccion="0";//quieto
        this.velocidad=90;

        this.SpriteObject = scene.physics.add.image(x, y, 'FANTASMA_FRONTAL');
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
                this.SpriteObject.setTexture('FANTASMA_ATRAS');
                this.body.setVelocityX(0);
                this.body.setVelocityY(-this.velocidad);
                break;
            case 'DOWN':
                this.SpriteObject.setTexture('FANTASMA_FRONTAL');
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.velocidad);
                break;
            case 'LEFT':
                this.SpriteObject.setTexture('FANTASMA_IZQUIERDA');
                this.body.setVelocityX(-this.velocidad);
                this.body.setVelocityY(0);
                break;
            case 'RIGHT':
                this.SpriteObject.setTexture('FANTASMA_DERECHA');
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

        return this.direccion;//se la pasamos por websokets al otro cliente
    }

    getPos() {
        return { x: this.body.x, y: this.body.y };
    }
    setPos({ x, y }) {
        this.body.setPosition(x, y);
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

        //this.SpriteObject = scene.physics.add.image(x, y, 'ESTATUA_ATRAS');
       
        this.SpriteObject = scene.physics.add.image(x, y, 'ANTORCHA_APAGADA');


        var radioInteraccion=30;
        this.circ = scene.add.circle(x, y, radioInteraccion, 0x000000,0);
        this.AreaInteraccion =scene.physics.add.existing(this.circ); 

        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.AreaInteraccion.body.setImmovable(true);
    }

    getEncendida(){
        return this.encendida;
    }

    setEncendida(enc){
        this.encendida = enc;
        if(enc){
            this.SpriteObject.setTexture('ANTORCHA_ENCENDIDA');
        }
        else{
            
            this.SpriteObject.setTexture('ANTORCHA_APAGADA');
        }
    }

    interactuar()//cada vez q interactuas cambia su estado
    {
        if(!this.cooldown)//si no hay cooldow
        {
            this.cooldown = true;
            if(this.encendida)//apagar
            {
                this.encendida = false;
                this.SpriteObject.setTexture('ANTORCHA_APAGADA');
                return false;
            }
            else//encender
            {
                this.encendida = true;
                this.SpriteObject.setTexture('ANTORCHA_ENCENDIDA');
                return true;
            }
        }
        return -1;
    }

    resetearCooldown()
    {
        this.cooldown = false;
    }


}

class Pista
{
    constructor(x, y,scene, direccion)
    {
        this.encendida=false;

       this.SpriteObject = scene.physics.add.image(x, y, direccion);

        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.SpriteObject.setVisible(false);
    }
}

class Estatua
{
    constructor(x, y, scene, direccion, pos)
    {
        this.direccion = direccion;

        this.SpriteObject = scene.physics.add.image(x, y, direccion);

        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.cooldown = false;

        this.circ = scene.add.rectangle(x, y, 130, 160, 0x000000,0);
        this.AreaInteraccion =scene.physics.add.existing(this.circ);

        this.posCorrecta = pos;
        this.correcta = false;
    } 
    getDireccion(){
        return this.direccion;
    }
    setDireccion(dir){
        this.direccion = dir;
        this.SpriteObject.setTexture(dir);
    }

    girarEstatua()
    {
        if(!this.cooldown)//si no hay cooldow
        {
            this.cooldown = true;
            switch(this.direccion)
            {
                case 'ESTATUA_ATRAS':
                    this.setDireccion('ESTATUA_DERECHA');
                    break;
                case 'ESTATUA_FRONTAL':
                    this.setDireccion('ESTATUA_IZQUIERDA');
                    break;
                case 'ESTATUA_DERECHA':
                    this.setDireccion('ESTATUA_FRONTAL');
                    break;
                case 'ESTATUA_IZQUIERDA':
                    this.setDireccion('ESTATUA_ATRAS');
                    break;
            }
            return 1;
        }
        return -1;
    }

    resetearCooldown()
    {
        this.cooldown = false;
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
     //   this.teclaEspacio = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Tecla espacio
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
            this.cuadroDialogo = this.scene.add.image(this.scene.cameras.main.centerX- 20, this.scene.cameras.main.centerY + 325, 'CAJA_DIALOGO');
            this.cuadroDialogo.setDepth(10);
            this.cuadroDialogo.setScale(1.5, 1);
        }

        // Crear o actualizar la imagen del personaje
        if (!this.imagenPersonaje) 
        {
            this.imagenPersonaje = this.scene.add.image(this.scene.cameras.main.centerX - 260, this.scene.cameras.main.centerY + 325, dialogo.imagenPersonaje);
            this.imagenPersonaje.setDepth(11);
            this.imagenPersonaje.setScale(0.70, 0.70);
        }
        else 
        {
            this.imagenPersonaje.setTexture(dialogo.imagenPersonaje);
        }

        // Crear o actualizar el texto
        if (!this.texto) 
        {
            this.texto = this.scene.add.text(this.scene.cameras.main.centerX - 180, this.scene.cameras.main.centerY + 290 , dialogo.mensaje, {
                font: '18px Sans Serif',
                fill: '#000000',
                wordWrap: { width: 430, useAdvancedWrap: true }
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
      //  if (this.teclaEspacio.isDown && this.puedeAvanzar) 
       // {
            this.avanzarDialogo();
        //}
    }
}

class Puerta
{
    constructor(x, y, scene,cerrada,abierta)
    {
        this.x = x;
        this.y = y;
        this.scene = scene;

        this.tipoPuerta = cerrada;
        this.puertaCerrada = scene.physics.add.image(x, y, cerrada);
        

        if(this.tipoPuerta==='PUERTA_LATERAL_CERRADA')
        {
            this.puertaAbierta = scene.physics.add.image(x+32, y-30, abierta);
        }
        else{
            this.puertaAbierta = scene.physics.add.image(x-22, y-31, abierta);
        }
        this.puertaAbierta.setVisible(false);

        this.puertaAbierta.setImmovable(true);
        this.puertaCerrada.setImmovable(true);
        this.puertaAbierta.body.setAllowGravity(false);
        this.puertaCerrada.body.setAllowGravity(false);

        //Area de interacción
        var radioInteraccion=30;
        this.circ = scene.add.circle(x, y, radioInteraccion, 0x000000,0);
        this.AreaInteraccion = scene.physics.add.existing(this.circ); 
        this.AreaInteraccion.body.setImmovable(true);

        this.cooldown = false;
        
    }

    interactuar(completado)
    {
        if( !this.puertaAbierta.visible && completado)
        {
            this.puertaAbierta.setVisible(true);
            this.puertaCerrada.setVisible(false);

            

            return true;
        }
        else
        {
            this.puertaAbierta.setVisible(false);
            this.puertaCerrada.setVisible(true);

            return false;
        }

    }

    resetearCooldown()
    {
        this.cooldown = false;
    }
}

class PalancaInventario {
    constructor(x, y, scene) {
        this.SpriteObject = scene.physics.add.image(x, y, 'PALANCA');

        var radioInteraccion=30;
        this.circ = scene.add.circle(x, y, radioInteraccion, 0x000000,0);
        this.AreaInteraccion =scene.physics.add.existing(this.circ); 


        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.AreaInteraccion.body.setImmovable(true);
    
       
    }

    interactuar(p)//cada vez q interactuas cambia su estado
    {       
        p.meterInventario('PALANCA');   
        this.body.x=10000;
        this.AreaInteraccion.body.x=10000;
       
    }

}

class PalancaPared {
    constructor(x, y, scene, estado) {
        this.SpriteObject = scene.physics.add.image(x, y, 'BASE_PALANCA');

        var radioInteraccion=30;
        this.circ = scene.add.circle(x, y, radioInteraccion, 0x000000,0);
        this.AreaInteraccion =scene.physics.add.existing(this.circ); 

        this.cooldown = true;
        this.body = this.SpriteObject.body;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.AreaInteraccion.body.setImmovable(true);

        this.usada = false;
        
        this.metida = false;

        if(estado){
            this.meter();
        }
    }

    meter(){
        this.metida=true;
        this.SpriteObject.setTexture('ARRIBA_PALANCA');
    }
    
    usar(){
        this.usada = true;
        this.SpriteObject.setTexture('ABAJO_PALANCA');
    }

    moverEstatua(estatua){
        estatua.body.x -= 20;
        estatua.SpriteObject.x = estatua.body.x;

        this.usada = true;
        
    }

}


class Inventario{
    constructor(x, y, scene) 
    {
        this.scene=scene;
        this.x=x;
        this.y=y;
        this.inventario = scene.add.image(x,y ,'INVENTARIO');
        this.inventario_objetos_Array = [0,0,0];

    }       
    getHerramienta(i)
    {
        return this.inventario_objetos_Array[i];
    }

    meterInventario( nombre )
    {
        for(var i=0; i<3; i++)
        {
            if( this.inventario_objetos_Array [i]== 0)
            {
                this.inventario_objetos_Array [i]= nombre;
                this.cambioImagen(i, nombre);
                        
            }

           break;

        }  

    }

    cambioImagen(i, nombre)
    {
        this.SpriteObject = this.scene.physics.add.image(this.x-73+i*73, this.y+4, nombre);
    }

}

class FondoNivel1{
    constructor(x, y, scene) 
    {
        
        this.img = scene.add.image(x,y ,'FONDO_SP_SB');

    }

    cambioFondo(pasillo,pistas){

        if(pasillo && pistas){
           
            this.img.setTexture('FONDO_CP_CB');
        }
        else if(pasillo && !pistas){
            this.img.setTexture('FONDO_CP_SB');
        }
        else if(!pasillo && pistas){
            this.img.setTexture('FONDO_SP_CB');
        }else{
            this.img.setTexture('FONDO_SP_SB');
        }
    }
}

class FinNivel{
    constructor(x, y, scene) {

        this.rect = scene.add.rectangle(x, y, 30,200, 0x000000,0);
        this.AreaInteraccion =scene.physics.add.existing(this.rect);
    }
}



