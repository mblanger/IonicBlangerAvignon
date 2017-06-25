# Plugins utilisés
- Google Maps
- Camera
- Geolocalisation
- File

# Présentation du projet

La page `Home` affiche toutes les photos enregistrées par l'application. Elle devait à terme afficher la google maps avec ses coordonnées mais par faute de temps nous n'avons pas pu implémenter cette fonctionnalité. Cependant, le fichier au format JSON portant le même nom que la photo existe dans le Stockage System.

La page `Camera` permet de :
- prendre une photo
- Donner un nom à la photo
- sauvegarder la photo (stockage externe dans le dossier pictures)
- sauvegarder les coordonnées de la photo en JSON (stockage externe dans le dossier picturesData)
- Afficher la position de la photo avec les coordonnées sur une Google Maps
