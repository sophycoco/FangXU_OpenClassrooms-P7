# OpenClassrooms Web Developer Project 7 -- To build an internal social network for a client company. 

-Client
Groupomania, un groupe spécialisé dans la grande distribution.

-Objectifs
Construire un réseau social interne pour les employés de Groupomania, pour faciliter les interactions entre collègues. 

-Prérequis

.Installer NodeJs et MySql.
.Creer un compte utilisateur mysql.
.CREATE USER 'user'@'localhost' IDENTIFIED BY 'mot_de_passe'; GRANT ALL PRIVILEGES ON groupomania.* TO 'user'@'localhost';
.Cloner le projet sur votre machine.
.Dans le fichier .env.exemple, completer les variables d'environnement par votre mot de passe, votre identifiant et votre localhost mysql. Il faudra aussi fournit un token. Renommer le fichier en ".env " .

-BDD
La base de données se trouve dans le dossier backend dans le fichier database.sql.

-Lancement de l'application
Allez dans le dossier backend de l'application :
  Installez les dépendances avec la commande suivante : npm install
  Lancez le serveur avec la commande suivante : nodemon server

Allez dans le dossier frontend de l'application :
  Installez les dépendances avec la commande suivante : npm install
  Lancez l'application avec la commande suivante : npm run serve (http://localhost:8080/)

