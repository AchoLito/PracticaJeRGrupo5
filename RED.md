En el proyecto se han implementado las siguientes funcionalidades con API REST usando los diferentes métodos:  

### LOGIN 
***  

Nos permite gestionar la creación, modificación y eliminación de los usuarios, así como mantener esos datos en el sistema para poder iniciar sesión.  
Los métodos utilizados para conseguir esto han sido:  

**GET:** Obtiene los datos de un usuario ya registrado.  
**POST:** Añade nuevos usuarios con sus correspondientes contraseñas.  
**PUT:** Modifica la contraseña de un usuario ya registrado.  
**DELETE:** Borra los datos de un usuario ya registrado.  

### CHAT  
***  

Nos permite enviar y recibir mensajes de diferentes usuarios que se encuentren conectados.  
Los métodos utilizados han sido:  

**GET:** Obtiene los mensajes mandados por los usuarios.  
**POST:** Crea y envía un nuevo mensaje del usuario.  

### USUARIOS CONECTADOS  
***  

**GET:** Obtiene el número de usuarios conectados en el chat en ese momento.
