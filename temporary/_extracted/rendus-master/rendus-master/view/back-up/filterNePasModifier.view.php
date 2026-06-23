<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../../public/design/styleFilter.css" rel="stylesheet">
</head>
<body>
<input type="checkbox" id="toggle" hidden>
<div class="main-filter">

    <input type="checkbox" id="toggleFiltre" hidden>
    <!-- Logo filtre -->
    <label for="toggle" class="filtre-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFE" class="bi bi-funnel-fill"
             viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
        </svg>
    </label>

    <!-- Frame entière -->
    <div class="frame-filtre">
        <div class="filtre-form">
            <label for="toggleFiltre" class="bouton-filtres">Filtrer par ⮂</label>
            <!-- Rectangle rouge en css -->
            <div class="rectangle-filter"></div>
            <!-- Formulaire des filtres -->
            <form action="../controller/userMap.ctrl.php" class="filtres" method="POST">
                <div class="social">
                    <div class="social-recom">
                        <label for="recommande">Recommandées par des amis</label>
                        <input type="checkbox" class="check" id="recommande">
                    </div>
                    <div class="social-fav">
                        <label for="favoris">Favoris</label>
                        <input type="checkbox" class="check" id="favoris">
                    </div>
                </div>
                <div class="era">
                    <legend>Époque de l'illustre :</legend>
                    <div class="range_container">
                        <div class="sliders_control">
                            <input id="fromSlider" type="range" value="14" min="14" max="21"/>
                            <input id="toSlider" type="range" value="21" min="14" max="21"/>
                        </div>
                        <div class="form_control">
                            <div class="form_control_container">
                                <div class="form_control_container__time">Siècle min</div>
                                <input class="form_control_container__time__input" type="number" id="fromInput"
                                       value="14" min="14" max="21"/>
                            </div>
                            <div class="form_control_container">
                                <div class="form_control_container__time">Siècle max</div>
                                <input class="form_control_container__time__input" type="number" id="toInput"
                                       value="21" min="14" max="21"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <legend>Localisation :</legend>
                    <div class="loca">
                            <span>
                                <p>Régions :</p>
                                <button class="btnReset" type="button" id="btnResetReg">Remettre à zéro</button>
                            </span>
                        <div class="locaChoice">
                                <span>
                                    <label for="reg1">Region1</label>
                                    <input type="checkbox" id="reg1" name="reg">
                                </span>
                        </div>
                    </div>
                    <div class="loca">
                            <span>
                                <p>Départements :</p>
                                <button class="btnReset" type="button" id="btnResetDep">Remettre à zéro</button>
                            </span>
                        <div class="locaChoice">
                                <span>
                                    <label for="dep1">Département1</label>
                                    <input type="checkbox" id="dep1" name="dep">
                                </span>
                        </div>
                    </div>
                </div>
                <div>
                    <legend>Note des maisons :</legend>
                    <div class="notes">
                        <div class="note">
                            <input type="checkbox" class="check" id="stars_1">
                            <label for="stars_1">1★</label>
                        </div>
                        <div class="note">
                            <input type="checkbox" class="check" id="stars_2">
                            <label for="stars_2">2★</label>
                        </div>
                        <div class="note">
                            <input type="checkbox" class="check" id="stars_3">
                            <label for="stars_3">3★</label>
                        </div>
                        <div class="note">
                            <input type="checkbox" class="check" id="stars_4">
                            <label for="stars_4">4★</label>
                        </div>
                        <div class="note">
                            <input type="checkbox" class="check" id="stars_5">
                            <label for="stars_5">5★</label>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btnFilter">Filtrer</button>
            </form>
        </div>
        <div class="houses">
            <!-- Affichage des maisons -->
            <!-- TO DO :
                    - ATTENTION IL INCREMENTER LES FAVORIS DES MAISONS SINON ILS SONT TOUS CONNECTÉS
                    IL FAUT INCRÉMENTER L'ATTRIBUT ID DE L'INPUT FAVORIS ET L'ATTRIBUT FOR DU LABEL QUI SUIT
                    - ATTENTION IL FAUT INCREMENTER LES ÉTOILES DES MAISONS SINON C'EST JUSTE LA DERNIÈRE QUI VA PRENDRE LA NOTE
                    IL FAUT DONC MODIFIER LES ATTRIBUTS NAME DE CHAQUE INPUT
            -->
            <div class="house">
                    <span>
                        <h2>Nom de la maison</h2>
                        <div>
                            <input class="favorite" type="checkbox" id="1favorite" value="favorite" hidden>
                            <label for="1favorite">
                                <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grAy"
                                     class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </label>
                            <input type="radio" id="1locate" value="" hidden>
                            <label for="1locate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#731702"
                                     class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                            </label>
                        </div>
                    </span>
                <div class="rating">
                    <input type="radio" id="star5" name="1star" value="5" hidden disabled>
                    <label for="star5">★</label>
                    <input type="radio" id="star4" name="1star" value="4" hidden disabled>
                    <label for="star4">★</label>
                    <input type="radio" id="star3" name="1star" value="3" hidden disabled>
                    <label for="star3">★</label>
                    <input type="radio" id="star2" name="1star" value="2" hidden disabled checked>
                    <label for="star2">★</label>
                    <input type="radio" id="star1" name="1star" value="1" hidden disabled>
                    <label for="star1">★</label>
                </div>
                <span>
                        <img src="https://maps.googleapis.com/maps/api/streetview?size=150x112&location=48.85287,2.343452&fov=80&heading=70&pitch=0&key=AIzaSyDmk9J8MGO3a8KzbHqkRxK7cUPNSYnoJs4"
                             alt="">
                        <div>
                            <p>Adresse</p>
                            <p>Region</p>
                            <p>Departement</p>
                            <button name="openPopupComment">Commenter</button>
                        </div>
                    </span>
            </div>
            <div class="house">
                    <span>
                        <h2>Nom de la maison</h2>
                        <div>
                            <input class="favorite" type="checkbox" id="2favorite" value="favorite" hidden>
                            <label for="2favorite">
                                <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gray"
                                     class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </label>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#731702"
                                 class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                            </svg>
                        </div>
                    </span>
                <div class="rating">
                    <input type="radio" id="star5" name="2star" value="5" hidden disabled>
                    <label for="star5">★</label>
                    <input type="radio" id="star4" name="2star" value="4" hidden disabled checked>
                    <label for="star4">★</label>
                    <input type="radio" id="star3" name="2star" value="3" hidden disabled>
                    <label for="star3">★</label>
                    <input type="radio" id="star2" name="2star" value="2" hidden disabled>
                    <label for="star2">★</label>
                    <input type="radio" id="star1" name="2star" value="1" hidden disabled>
                    <label for="star1">★</label>
                </div>
                <span>
                        <img src="https://maps.googleapis.com/maps/api/streetview?size=150x112&location=48.85287,2.343452&fov=80&heading=70&pitch=0&key=AIzaSyDmk9J8MGO3a8KzbHqkRxK7cUPNSYnoJs4"
                             alt="">
                        <div>
                            <p>Adresse</p>
                            <p>Region</p>
                            <p>Departement</p>
                            <button name="openPopupComment">Commenter</button>
                        </div>
                    </span>
            </div>
        </div>
    </div>
</div>
<!-- Formulaire pour poster un commentaire -->
<div class="popupComment" id="myPopupComment">
    <form class="popupContentComment" id="popupContentComment" action="">
        <h2>Proposez votre commentaire</h2>
        <span>
                <p>Note* : </p>
                <div class="ratingComment">
                    <input type="radio" id="starComment1" name="starComment" value="1" hidden>
                    <label for="starComment1">★</label>
                    <input type="radio" id="starComment2" name="starComment" value="2" hidden>
                    <label for="starComment2">★</label>
                    <input type="radio" id="starComment3" name="starComment" value="3" hidden>
                    <label for="starComment3">★</label>
                    <input type="radio" id="starComment4" name="starComment" value="4" hidden>
                    <label for="starComment4">★</label>
                    <input type="radio" id="starComment5" name="starComment" value="5" hidden>
                    <label for="starComment5">★</label>
                </div>
            </span>
        <p class="verifContentComment" id="verifContentRateComment">Veuillez renseigner une note</p>
        <p>Commentaire* :</p>
        <p class="verifContentComment" id="verifContentTextComment">Veuillez renseigner un commentaire</p>
        <textarea rows="6" id="commentText"></textarea>
        <span>
                <button id="closePopupComment">Annuler</button>
                <button id="changeContentComment" type="button">Envoyer</button>
            </span>
    </form>
    <div class="popupContentComment2" id="popupContentComment2">
        <p>Votre commentaire a bien été enregistré</p>
        <button id="closePopupComment2" type="button">OK</button>
    </div>
</div>

</body>
<!-- Script pour les filtres -->
<script src="../script/filter.view.js"></script>
<!-- Script pour le pop-up de commentaire -->
<script src="../script/scriptComment.js"></script>
</html>