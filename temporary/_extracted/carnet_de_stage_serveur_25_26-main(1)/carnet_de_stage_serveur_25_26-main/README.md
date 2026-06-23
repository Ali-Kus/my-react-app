# Installation de bo-stages (BackOffice Stages)

Pour installer l'application sur une machine disposant de :
- PHP version >= 8.1
- Docker
- PhpStorm

suivre les étapes suivantes :

## Installer composer et symfony CLI sur votre machine
https://symfony.com/doc/current/setup.html

##  Se positionner dans le répertoire du projet
cd bo-stages

##  Installer les packages symfony
composer install

## Installer une nouvelle paire de clés pour JWT
### Attention : OPENSSL doit être sur votre système (à installer pour Windows)
php bin/console lexik:jwt:generate-keypair --overwrite

## Si Linux (ou Mac ?), installer le package acl (apt install acl) et donner les bons droits sur les clés SSL :
- setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt
- setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt

## Lancer un conteneur Docker pour exécuter PostGres
docker compose up -d

##  Peupler la base de données avec dump_BD.sql (Uniquement la 1ère fois)
- docker cp ./dump_BD.sql bo-stages-database-1:/tmp
- docker exec -it bo-stages-database-1 psql -U app-stages -d postgres -f /tmp/dump_BD.sql

##  Lancer le serveur de dev de symfony depuis PHPStorm
- Clic sur la petite flèche verte en haut à droit de PHPStorm pour lancer bo-stages

##  Naviguer vers l'application 
http://localhost:8000/

##  Connexion
L'administrateur a le login **fontenae**, mot de passe : **eric**
Les étudiants créés par défaut ont pour mot de passe leur **prenom** (sans majuscule mais avec les accents sauf sur le 1er car.)

##  Consulter la doc de l'API REST (et la tester !)
http://localhost:8000/api/docs/

## Tester l'API REST avec Postman
Le fichier exemples-requetes-API...json est une collection de requêtes à charger depuis PostMan

##  A la fin, arrêter le serveur et le conteneur PostGres
- Clic sur le petit carré rouge en haut à droite de PHP Storm
- docker compose down