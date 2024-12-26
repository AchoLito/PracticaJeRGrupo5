class Musica extends Phaser.Scene
{
    constructor()
    {
        super({ key: "Musica", active: true});
    }

    preload()
    {

        this.load.audio("musicaInicio", "audio/MusicaFondo.mp3"); // sonido música fondo 
   

    }

    create()
    {

        this.musica = this.sound.add("musicaInicio", { volume: 0.2 });
        this.musica.loop = true;
        if (!this.musica.isPlaying) {
            this.musica.play();
        }

        this.registry.set('Volumen', 0.5);

        this.nombreUsuario="";

        this.esHumano=null;
        //true->humano
        //false->fantasma

    }

    setVolume(nuevoVolumen) {
        // Cambia el volumen de la música
        this.musica.setVolume(nuevoVolumen);
        this.registry.set('Volumen', nuevoVolumen); 
    }

    getVolume() {
        return this.registry.get('Volumen');
    }

    setUsuario(nuevoUsuario){
        this.nombreUsuario = nuevoUsuario;
    }

    getUsuario()
    {
        return this.nombreUsuario;
    }

    setEsHumano(boolEsHumano){
        this.esHumano = boolEsHumano;
    }

    getEsHumano(){
        return this.esHumano;
    }

}