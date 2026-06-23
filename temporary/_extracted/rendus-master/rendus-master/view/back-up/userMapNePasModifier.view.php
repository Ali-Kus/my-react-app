<?php
include 'navBarNePasModifier.view.php';
include 'filterNePasModifier.view.php';
include 'friendsNePasModifier.view.php';

?>
<!-- Vue des utilisateurs et des visiteurs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/design/styleMap.css">
    <title>NotaDomus</title>
</head>
<body>

<!-- Carte -->
<gmp-map class="map" center="47.2822678,2.4633453" zoom="6.4" map-id="DEMO_MAP_ID">
    <!-- Affichage des marqueurs sur la carte -->
    <gmp-advanced-marker position="48.461487,-2.0328" title="Mountain View, CA">
        <div class="marker" name="marker">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#731702" class="bi bi-geo-alt-fill"
                 viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>
        </div>
        <div class="houseMap" name="houseMap">
                <span>
                    <h2>Nom de la maison</h2>
                    <input type="checkbox" id="1favoriteMap" value="favorite" hidden>
                    <label for="1favoriteMap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grAy"
                             class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg>
                    </label>
                </span>
            <div class="ratingMap">
                <input type="radio" id="star5" name="1starMap" value="5" hidden disabled>
                <label for="star5">★</label>
                <input type="radio" id="star4" name="1starMap" value="4" hidden disabled>
                <label for="star4">★</label>
                <input type="radio" id="star3" name="1starMap" value="3" hidden disabled>
                <label for="star3">★</label>
                <input type="radio" id="star2" name="1starMap" value="2" hidden disabled checked>
                <label for="star2">★</label>
                <input type="radio" id="star1" name="1starMap" value="1" hidden disabled>
                <label for="star1">★</label>
            </div>
            <span>
                    <img src="https://maps.googleapis.com/maps/api/streetview?size=200x150&location=48.85287,2.343452&fov=80&heading=70&pitch=0&key=AIzaSyDmk9J8MGO3a8KzbHqkRxK7cUPNSYnoJs4"
                         alt="">
                    <div>
                        <p>Adresse</p>
                        <p>Region</p>
                        <p>Departement</p>
                        <span>
                            <button>Recommander</button>
                            <button>Voir plus</button>
                        </span>
                    </div>
                </span>
        </div>
    </gmp-advanced-marker>
    <gmp-advanced-marker position="46.461487,-3.0328" title="Mountain View, CA">
        <div class="marker" name="marker">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#731702" class="bi bi-geo-alt-fill"
                 viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>
        </div>
        <div class="houseMap" name="houseMap">
                <span>
                    <h2>Nom de la maison</h2>
                    <input type="checkbox" id="2favoriteMap" value="favorite" hidden>
                    <label for="2favoriteMap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grAy"
                             class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg>
                    </label>
                </span>
            <div class="ratingMap">
                <input type="radio" id="star5" name="1starMap" value="5" hidden disabled>
                <label for="star5">★</label>
                <input type="radio" id="star4" name="1starMap" value="4" hidden disabled>
                <label for="star4">★</label>
                <input type="radio" id="star3" name="1starMap" value="3" hidden disabled>
                <label for="star3">★</label>
                <input type="radio" id="star2" name="1starMap" value="2" hidden disabled checked>
                <label for="star2">★</label>
                <input type="radio" id="star1" name="1starMap" value="1" hidden disabled>
                <label for="star1">★</label>
            </div>
            <span>
                    <img src="https://maps.googleapis.com/maps/api/streetview?size=200x150&location=48.85287,2.343452&fov=80&heading=70&pitch=0&key=AIzaSyDmk9J8MGO3a8KzbHqkRxK7cUPNSYnoJs4"
                         alt="">
                    <div>
                        <p>Adresse</p>
                        <p>Region</p>
                        <p>Departement</p>
                        <span>
                            <button>Recommander</button>
                            <button>Voir plus</button>
                        </span>
                    </div>
                </span>
        </div>
    </gmp-advanced-marker>
</gmp-map>
<!-- Propositions -->
<input type="checkbox" id="closePH" hidden>
<div class="propositionHouse">
    <label for="closePH">
        <img src="../../public/design/img/x-lg.svg" alt="cross" width="10%" class="cross">
    </label>
    <span class="bubble">
            <p>N'hésitez pas à nous proposer de nouvelles maisons !</p>
            <div class="triangle"></div>
        </span>
    <span>
            <button id="openPopupProposition">+ Je propose !</button>
            <img src="../../public/design/img/jean-patrique.png" alt="jp" width="30%">
        </span>
</div>
<div class="popupProposition" id="myPopupProposition">
    <div class="popupContentProposition" id="popupContentProposition">
        <form>
            <h2>Proposez une nouvelle maison d'illustre</h2>
            <label for="nameOh">Nom de la maison* :</label>
            <input id="nameOh" type="text">
            <p class="verifContentProposition" id="verifContentNameOhProposition">Veuillez renseigner le nom de la
                maison</p>
            <label for="nameOutstanding">Nom de l'illustre* :</label>
            <input id="nameOutstanding" type="text">
            <p class="verifContentProposition" id="verifContentNameOutstandingProposition">Veuillez renseigner le nom de
                l'illustre</p>
            <label for="adressOh">Adresse de la maison* :</label>
            <input id="adressOh" type="text">
            <p class="verifContentProposition" id="verifContentAdressOhProposition">Veuillez renseigner l'adresse de la
                maison</p>
            <label for="choice">Expliquez-nous ce choix* :</label>
            <textarea id="choice" rows="5"></textarea>
            <p class="verifContentProposition" id="verifContentChoiceProposition">Veuillez renseigner une
                explication</p>
            <span>
                    <button id="closePopupProposition">Annuler</button>
                    <button id="changeContentProposition">Envoyer</button>
                </span>
        </form>
    </div>
    <div class="popupContentProposition2" id="popupContentProposition2">
        <p>Votre proposition a bien été envoyée</p>
        <button id="closePopupProposition2" type="button">OK</button>
    </div>
</div>
</body>
<!-- Script API -->
<script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmk9J8MGO3a8KzbHqkRxK7cUPNSYnoJs4&loading=async&libraries=maps,marker&v=beta"
        defer>
</script>
<!-- Script Pop-up -->
<script src="../script/scriptPropositions.js"></script>
<!-- Script Affichage carte -->
<script src="../script/scriptMarkerMap.js"></script>
</html>

