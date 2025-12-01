# Utilise une image Apache + PHP prête à l’emploi
FROM php:8.2-apache

# Active les modules Apache nécessaires
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copie ton projet dans le dossier du serveur web
COPY . /var/www/html/

# Donne les permissions à Apache
RUN chown -R www-data:www-data /var/www/html

# Expose le port utilisé par Apache
EXPOSE 80

# Lancement du serveur
CMD ["apache2-foreground"]
