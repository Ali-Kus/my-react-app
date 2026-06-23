<?php
require_once 'navBarNePasModifier.view.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/design/styleHouse.css">
    <title>NotaDomus</title>
</head>

<body id="bodyHouse">
<!-- Informations de la maison -->
<div class="infoHouse">
        <span class="title">
            <p>Nom Maison ★★★★★</p>
                <div class="heart">
                <input type="checkbox" id="favorite" value="favorite" hidden>
                <label class="favorite" for="favorite">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gray" class="bi bi-heart-fill"
                         viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                </label>
                <button class="house-setting" id="house-setting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                         class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    </svg>
                </button>
                </div>
                <div class="popup-house-setting" id="popup-house-setting">
                    <button class="modify" id="modify">Modifier les informations</button>
                    <button class="recom" id="recom">Recommander</button>
                </div>
        </span>
    <p>Maison d'illustre depuis 2011</p>
    <span class="content">
            <img src="https://maps.googleapis.com/maps/api/streetview?size=400x300&location=48.85287,2.343452&fov=80&heading=70&pitch=0&key=AIzaSyDmk9J8MGO3a8KzbHqkRxK7cUPNSYnoJs4"
                 alt="">
            <span>
                <p>Découvrez Nom de l'illustre</p>
                <p>13 rue Nicolas Parant 389150 Chambery</p>
                <p>Auvergne-Rhône-Alpes, Isère</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, 
                ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, 
                orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, 
                ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, 
                orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, 
                ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, 
                orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, 
                ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, 
                orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            </span>
        </span>
    <span class="links">
            <p>Besoins de + d'infos ?</p>
            <span>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#F4DFCA"
                         class="bi bi-house-exclamation-fill" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                        <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 1 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                    </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#F4DFCA"
                         class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                      </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#F4DFCA" class="bi bi-facebook"
                         viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                    </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#F4DFCA"
                         class="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                    </svg>
                </a>
            </span>
        </span>
    <input id="openPopupDonate" class="donation" type="button" value="Faire une donation">
</div>
<hr>
<div class="comments">
    <!-- Commentaires des ami(e)s -->
    <article>
        <h2>Vos amis</h2>
        <!-- Formulaire pour poster un commentaire -->
        <form onsubmit="return checkFormComment()" class="postComment" action="">
            <h3>Proposez votre commentaire</h3>
            <span>
                    <p>Note* : </p>
                    <div class="rating">
                        <input type="radio" id="star1" name="star" value="1" hidden>
                        <label for="star1">★</label>
                        <input type="radio" id="star2" name="star" value="2" hidden>
                        <label for="star2">★</label>
                        <input type="radio" id="star3" name="star" value="3" hidden>
                        <label for="star3">★</label>
                        <input type="radio" id="star4" name="star" value="4" hidden>
                        <label for="star4">★</label>
                        <input type="radio" id="star5" name="star" value="5" hidden>
                        <label for="star5">★</label>
                    </div>
                </span>
            <p class="verifContentComment" id="verifContentRateComment">Veuillez renseigner une note</p>
            <p>Commentaire* :</p>
            <textarea id="commentText" rows="6"></textarea>
            <p class="verifContentComment" id="verifContentTextComment">Veuillez renseigner un commentaire</p>
            <input type="submit" value="Envoyer">
        </form>
        <!-- Squelette commentaire amis -->
        <article class="comment">
                <span>
                    <p>★★★★★ pseudo</p>
                    <button class="commentFriend-setting" id="commentFriend-setting" name="commentFriend-setting">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA"
                             class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                    <div class="friendComment-setting" id="friendComment-setting">
                        <button class="friendComment-signal" id="friendComment-signal">Signaler</button>
                    </div>
                </span>
            <p>Test commentaire</p>
            <span>
                    <!-- Avis des commentaires -->
                    <input class="btnUp" type="radio" id="thumbsUp1" name="thumbs1" value="thumbsUp1" hidden>
                    <label class="labelUp" for="thumbsUp1">
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="thumbsUp"
                             viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>20</p>
                    </label>
                    <input class="btnDown" type="radio" id="thumbsDown1" name="thumbs1" value="thumbsDown1" hidden>
                    <label class="labelDown" for="thumbsDown1">
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="thumbsDown"
                             viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                        </svg>10</p>
                    </label>
                </span>
        </article>
        <!-- Fin squelette commentaire amis -->
    </article>
    <!-- Commentaires généraux -->
    <article>
        <h2>Tous les commentaires</h2>
        <article class="comment">
                <span>
                    <p>★★★★★ pseudo</p>
                    <button class="comment-setting" id="comment-setting" name="comment-setting">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA"
                             class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                    <div class="myComment-setting" id="myComment-setting">
                        <button class="myComment-delete" id="myComment-delete">Supprimer</button>
                        <button class="myComment-modify" id="myComment-modify">Modifier</button>
                    </div>
                    <div class="otherComment-setting" id="otherComment-setting">
                        <button class="otherComment-signal" id="otherComment-signal">Signaler</button>
                        <button class="otherComment-addFriend" id="otherComment-addFriend">Ajouter en ami</button>
                    </div>
                </span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec,
                ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue,
                euismod non, mi. Proin porttitor,
                orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            <span>
                    <!-- Avis descommentaires -->
                <!-- ATTENTION !!!!!!!!!!
                 IL FAUT BIEN METTRE A JOUR LE NOM DES ATTRIBUTS DE L'INPUT ET DU LABEL :
                 - ID, NAME ET VALUE POUR L'INPUT
                 - FOR POUR LE LABEL
                 IL FAUT LES INCREMENTER A CHAQUE NOUVEAU COMMENTAIRE !-->
                    <input class="btnUp" type="radio" id="thumbsUp2" name="thumbs2" value="thumbsUp2" hidden>
                    <label class="labelUp" for="thumbsUp2">
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="thumbsUp"
                             viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>20</p>
                    </label>
                    <input class="btnDown" type="radio" id="thumbsDown2" name="thumbs2" value="thumbsDown2" hidden>
                    <label class="labelDown" for="thumbsDown2">
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="thumbsDown"
                             viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                        </svg>10</p>
                    </label>
                </span>
        </article>
        <article class="comment">
                <span>
                    <p>★★★★★ pseudo</p>
                    <button class="comment-setting" id="comment-setting" name="comment-setting">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA"
                             class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                    <div class="myComment-setting" id="myComment-setting">
                        <button class="myComment-delete" id="myComment-delete">Supprimer</button>
                        <button class="myComment-modify" id="myComment-modify">Modifier</button>
                    </div>
                    <div class="otherComment-setting" id="otherComment-setting">
                        <button class="otherComment-signal" id="otherComment-signal">Signaler</button>
                        <button class="otherComment-addFriend" id="otherComment-addFriend">Ajouter en ami</button>
                    </div>
                </span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec,
                ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue,
                euismod non, mi. Proin porttitor,
                orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            <span>
                    <!-- Avis descommentaires -->
                    <input class="btnUp" type="radio" id="thumbsUp3" name="thumbs3" value="thumbsUp3" hidden>
                    <label class="labelUp" for="thumbsUp3">
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="thumbsUp"
                             viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>20</p>
                    </label>
                    <input class="btnDown" type="radio" id="thumbsDown3" name="thumbs3" value="thumbsDown3" hidden>
                    <label class="labelDown" for="thumbsDown3">
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="thumbsDown"
                             viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                        </svg>10</p>
                    </label>
                </span>
        </article>
    </article>
</div>
<div class="popupDonate" id="myPopupDonate">
    <div class="popupContentDonate">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#731702" class="bi bi-cone-striped"
             viewBox="0 0 16 16">
            <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9s-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12m-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4s1.2-.036 1.725-.098m4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257z"/>
        </svg>
        <h3>Cette fonctionnalité n'est pas encore disponible</h3>
        <p>Mais nous comptons sur vous pour cliquer de nouveau une fois que se sera fait. ☻</p>
        <button id="closePopupDonate">OK</button>
    </div>
</div>
<!---------------------- Popup -------------------------------->
<!------ Signaler ------->
<div class="popup-signalMod-com" id="popup-signalMod-com">
    <div class="popup-content-signalMod-com" id="popup-content-signalMod-com">
        <form action="">
            <h2>Signalement</h2>
            <select id="categorie_signalement_com" name="categorie-com" placeholder="Raison">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
            </select>

            <label for="explication_report_com">Explication :</label>
            <textarea id="explication_report_com" name="explication_report_com" rows="6" cols="20"></textarea>

            <div id="nav_report_com">
                <span class="closePopup-signalMod-com" id="closePopup-signalMod-com">Annuler</span>
                <span class="changeContent-signalMod-com" id="changeContent-signalMod-com">Envoyer</span>
            </div>
        </form>
    </div>
</div>
<!-- Remerciement signalement -->
<div class="popup-thx-signalMod-com" id="popup-thx-signalMod-com">
    <div class="popup-content-thx-signalMod-com" id="popup-content-thx-signalMod-com">
        <p>Merci pour votre signalement, un modérateur le prendra en charge au plus vite</p>
        <button id="closePopup-thx-signalMod-com" type="button">OK</button>
    </div>
</div>

<!------- Supprimer ----->
<div class="popup-delete-myCom" id="popup-delete-myCom">
    <div class="popup-content-delete-myCom">
        <p>Êtes-vous sûr·e de vouloir supprimer votre commentaire ?</p>
        <div>
            <button class="closePopup-cancel-myCom" id="closePopup-cancel-myCom">
                Annuler
            </button>
            <button class="closePopup-delete-myCom" id="closePopup-delete-myCom">
                Supprimer
            </button>
        </div>
    </div>
</div>
<!-- Suppression effectuée -->
<div class="popup-deleteDone-myCom" id="popup-deleteDone-myCom">
    <div class="popup-content-deleteDone-myCom" id="popup-content-deleteDone-myCom">
        <p>Votre commentaire à bien été supprimé</p>
        <button id="closePopup-deleteDone-myCom" type="button">OK</button>
    </div>
</div>

<!-------- Modifier ------->
<div class="popup-modify-myCom" id="popup-modify-myCom">
    <form class="popup-content-modify-myCom" id="popup-content-modify-myCom">
                <span>
                    <p>Note* : </p>
                    <div class="popup-rating">
                        <input type="radio" id="star1" name="star" value="1" hidden>
                        <label for="star1">★</label>
                        <input type="radio" id="star2" name="star" value="2" hidden>
                        <label for="star2">★</label>
                        <input type="radio" id="star3" name="star" value="3" hidden>
                        <label for="star3">★</label>
                        <input type="radio" id="star4" name="star" value="4" hidden>
                        <label for="star4">★</label>
                        <input type="radio" id="star5" name="star" value="5" hidden>
                        <label for="star5">★</label>
                    </div>
                </span>
        <p class="popup-verifContentComment" id="popup-verifContentRateComment">Veuillez renseigner une note</p>
        <p>Commentaire* :</p>
        <textarea id="popup-commentText" rows="6"></textarea>
        <p class="popup-verifContentComment" id="popup-verifContentTextComment">Veuillez renseigner un commentaire</p>
        <div class="button_row">
            <input type="button" class="closePopup-cancelModify-myCom" id="closePopup-cancelModify-myCom"
                   value="Annuler">
            <input type="button" class="closePopup-updateModify-myCom" id="closePopup-updateModify-myCom"
                   value="Enregistrer">
        </div>
    </form>
</div>
<!-- Modification effectuée -->
<div class="popup-modifyDone-myCom" id="popup-modifyDone-myCom">
    <div class="popup-content-modifyDone-myCom" id="popup-content-modifyDone-myCom">
        <p>Votre commentaire à bien été modifié</p>
        <button id="closePopup-modifyDone-myCom" type="button">OK</button>
    </div>
</div>
</body>
<!-- Script Vérification du formulaire -->
<script src="../script/scriptFormCommentHouse.js"></script>
<!-- Script Pop-up donation -->
<script src="../script/scriptDonation.js"></script>
<!-- Script Pop-up setting -->
<script src="../script/scriptHouseSetting.js"></script>
</html>