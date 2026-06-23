# bo-stages — Installation et démarrage (prêt à copier-coller)

Docker Desktop démarré. Composer n'est pas nécessaire localement car nous utilisons Composer fourni dans le conteneur `php`.

Étapes rapides (copier-coller) :

1. Construire et démarrer les conteneurs

```bash
docker-compose up -d --build
```

2. Installer les dépendances PHP depuis le service `php` (exécute Composer dans le conteneur)

```bash
docker-compose exec php composer install --no-interaction --prefer-dist --optimize-autoloader
```

3. Si vous voyez l'erreur « Symfony Runtime is missing » exécutez :

```bash
docker-compose exec php composer require symfony/runtime --no-interaction --with-all-dependencies
```

4. S'assurer qu'un fichier `.env` existe à la racine du projet (créé avec ces lignes exactes)

```bash
cat > .env <<'EOF'
APP_ENV=dev
APP_DEBUG=1
APP_SECRET=change_me
DATABASE_URL=postgresql://app-stages:app-stages@database:5432/app-stages?serverVersion=18&charset=utf8
CORS_ALLOW_ORIGIN=^https?://localhost(:[0-9]+)?$
EOF
```

5. Vider le cache Symfony (à lancer si les conteneurs sont up)

```bash
docker-compose exec php php bin/console cache:clear --env=prod --no-warmup
docker-compose exec php php bin/console cache:clear --env=dev --no-warmup
```

6. Importer le dump SQL dans la base (depuis la racine du projet)

Méthode recommandée (stream) :

```bash
docker-compose exec -T database psql -U app-stages -d app-stages < dump_BD.sql
```

Alternative (copier puis importer) :

```bash
CONTAINER=$(docker-compose ps -q database)
docker cp dump_BD.sql $CONTAINER:/tmp/dump_BD.sql
docker-compose exec database psql -U app-stages -d app-stages -f /tmp/dump_BD.sql
```

7. Accéder à l'application

- Application : http://localhost:8000/
- Documentation API : http://localhost:8000/api/docs/

8. Arrêter et supprimer conteneurs et volumes

```bash
docker-compose down -v
```

Dépannage (commandes prêtes à copier-coller)

- Manque `vendor/autoload_runtime.php` ou le dossier `vendor/` ?

  Lancez :

  ```bash
    docker-compose exec php composer install --no-interaction --prefer-dist --optimize-autoloader
  ```

- Erreur « Symfony Runtime is missing » :

  Lancez :

  ```bash
    docker-compose exec php composer require symfony/runtime --no-interaction --with-all-dependencies
  ```

- Erreur : "Unable to read the "/var/www/html/.env" environment file." :

  Assurez-vous que le fichier `.env` existe sur l'hôte (voir étape 4), ou créez-le dans le conteneur :

  ```bash
    docker-compose exec php sh -lc 'cat > /var/www/html/.env <<"EOF"\nAPP_ENV=dev\nAPP_DEBUG=1\nAPP_SECRET=change_me\nDATABASE_URL=postgresql://app-stages:app-stages@database:5432/app-stages?serverVersion=18&charset=utf8\nCORS_ALLOW_ORIGIN="^https?://localhost(:[0-9]+)?$"\nEOF'
  ```

- Si `composer` n'est pas trouvé dans le conteneur `php` : le Dockerfile du projet copie Composer dans `/usr/bin/composer`. Les commandes `docker-compose exec php composer ...` doivent fonctionner.

Remarques et conseils

- Exécutez toutes les commandes depuis la racine du projet.
- Si vous modifiez des fichiers sur macOS et qu'ils n'apparaissent pas dans le conteneur, vérifiez que le projet est bien monté dans le service `php`. Pour le développement, un bind-mount est recommandé ; je peux ajouter un `docker-compose.override.yml` si vous le souhaitez.
- Clés JWT (si utilisées) : générez-les avec `php bin/console lexik:jwt:generate-keypair --overwrite` et assurez-vous que `config/jwt` est lisible par l'utilisateur `www-data` (utiliser `setfacl` si nécessaire).

Si vous le souhaitez, je peux aussi :

- Ajouter le fichier `.env` au dépôt (il est déjà créé localement),
- Ajouter un `docker-compose.override.yml` pour les mounts en développement,
- Exécuter les commandes ci‑dessus pour vous.

---

Généré pour la classe : copiez-collez les commandes dans l'ordre depuis la racine du projet sur macOS.
