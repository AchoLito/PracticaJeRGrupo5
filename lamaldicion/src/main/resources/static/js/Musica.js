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



    }

    setVolume(nuevoVolumen) {
        // Cambia el volumen de la música
        this.musica.setVolume(nuevoVolumen);
        this.registry.set('Volumen', nuevoVolumen); 
    }

    getVolume() {
        return this.registry.get('Volumen');
    }


}