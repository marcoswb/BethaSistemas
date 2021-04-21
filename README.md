## Linguagens utilizadas

1. Java
1. TypeScript
1. CSS
1. HTML

## Tecnologias aplicadas

* Spring Boot
* MySQL
* Angular
* Bootstrap
* Docker

## Executar o Sistema

* Primeiro vamos verificar se as portas 3306, 8080 e 4200 da máquina estão livres, pois serão utilizadas pelo sistema
  * **Comandos linux:**
    * Para ver se algum serviço está utilizando a porta execute `sudo netstat -tlpn | grep <numero-da-porta>`.

    * Se o comando acima retornar algum serviço você deverá pará-lo para que o sistema execute normalmente usando `sudo service <nome-do-serviço> stop`, caso não retorne nada a porta está livre.
  
  * **Comandos Windows:**
    * Para ver se algum serviço está utilizando a porta execute `netstat -o -n –a`.

    * Verifique se algum dos serviços listados estão usando as portas necessárias para a aplicação. Se isso ocorrer execute o comando `net stop <nome-do-serviço>`

* Para executar o projeto você deverá ter o docker instalado, caso ainda não tenha faça o download diretamente do [site oficial](https://docs.docker.com/install/).

* Feito isso basta ir até a raíz do projeto e executar o comando `docker-compose up` para a aplicação ser inicializada.
