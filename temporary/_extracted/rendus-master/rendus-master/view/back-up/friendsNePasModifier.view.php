<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../../public/design/styleFriends.css" rel="stylesheet">

</head>

<body>
<input type="checkbox" id="toggle-friends" hidden>
<div class="main">


    <!-- Logo filtre -->
    <label for="toggle-friends" class="friends-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA" class="bi bi-person-fill"
             viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
    </label>

    <!-- Frame entière -->
    <div class="frame-friends">
        <!-- Rectangle rouge en css -->
        <div class="rectangle"></div>
        <div class="friends-form">

            <div class="profil">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                <p>monPseudo</p>
                <button class="modif">Modifier le compte</button>
            </div>

            <div class="friend">
                <div class="friend-title">
                    <legend>Amis (nb)</legend>
                    <button class="addFriend" id="addFriend">+ Ajouter un ami</button>
                </div>
                <div class="friend-list">

                    <!-- Ajouter les amis ici -->
                    <!-- Squelette ami -->
                    <div class="div-aFriend">
                        <button class="aFriend" name="aFriend">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00"
                                 class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            <p>Truc muche</p>
                        </button>
                        <!-- Bouton pop-up -->
                        <button class="removeFriend" name="removeFriend">
                            Retirer l'ami
                        </button>
                    </div>
                    <!-- Fin squelette ami -->
                    <!-- Squelette ami -->
                    <div class="div-aFriend">
                        <button class="aFriend" name="aFriend">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00"
                                 class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            <p>Truc muche</p>
                        </button>
                        <!-- Bouton pop-up -->
                        <button class="removeFriend" name="removeFriend">
                            Retirer l'ami
                        </button>
                    </div>
                    <!-- Fin squelette ami -->
                    <!-- Squelette ami -->
                    <div class="div-aFriend">
                        <button class="aFriend" name="aFriend">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00"
                                 class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            <p>Truc muche</p>
                        </button>
                        <!-- Bouton pop-up -->
                        <button class="removeFriend" name="removeFriend">
                            Retirer l'ami
                        </button>
                    </div>
                    <!-- Fin squelette ami -->


                </div>

            </div>

            <div class="frame-coms">
                <legend>Commentaires récents de vos amis</legend>
                <div class="coms">
                    <!-- Squelette du commentaire -->
                    <article class="comment">
                        <span class="com-part1">
                            <p>Nom maison d'illustre</p>
                            <span class="tiny_com_rating">
                                <input type="radio" id="tiny_com_star5" name="star" value="5" hidden>
                                <label for="star5">★</label>
                                <input type="radio" id="tiny_com_star4" name="star" value="4" hidden>
                                <label for="star4">★</label>
                                <input type="radio" id="tiny_com_star3" name="star" value="3" hidden>
                                <label for="star3">★</label>
                                <input type="radio" id="tiny_com_star2" name="star" value="2" hidden>
                                <label for="star2">★</label>
                                <input type="radio" id="tiny_com_star1" name="star" value="1" hidden>
                                <label for="star1">★</label>
                            </span>
                            
                        </span>
                        <p> pseudo</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <span class="grade">
                            <!-- Avis des commentaires -->
                            <input class="btnUp" type="radio" id="thumbsUp1" name="thumbs1" value="thumbsUp1" hidden>
                            <label class="labelUp" for="thumbsUp1">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsUp" viewBox="0 0 16 16">
                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                </svg>20</p>
                            </label>
                            <input class="btnDown" type="radio" id="thumbsDown1" name="thumbs1" value="thumbsDown1"
                                   hidden>
                            <label class="labelDown" for="thumbsDown1">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsDown" viewBox="0 0 16 16">
                                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                                </svg>10</p>
                            </label>
                        </span>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment">
                        <span class="com-part1">
                            <p>Nom maison d'illustre</p>
                            <span class="tiny_com_rating">
                                <input type="radio" id="tiny_com_star5" name="star" value="5" hidden>
                                <label for="star5">★</label>
                                <input type="radio" id="tiny_com_star4" name="star" value="4" hidden>
                                <label for="star4">★</label>
                                <input type="radio" id="tiny_com_star3" name="star" value="3" hidden>
                                <label for="star3">★</label>
                                <input type="radio" id="tiny_com_star2" name="star" value="2" hidden>
                                <label for="star2">★</label>
                                <input type="radio" id="tiny_com_star1" name="star" value="1" hidden>
                                <label for="star1">★</label>
                            </span>
                            
                        </span>
                        <p> pseudo</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <span class="grade">
                            <!-- Avis des commentaires -->
                            <input class="btnUp" type="radio" id="thumbsUp2" name="thumbs2" value="thumbsUp2" hidden>
                            <label class="labelUp" for="thumbsUp2">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsUp" viewBox="0 0 16 16">
                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                </svg>20</p>
                            </label>
                            <input class="btnDown" type="radio" id="thumbsDown2" name="thumbs2" value="thumbsDown2"
                                   hidden>
                            <label class="labelDown" for="thumbsDown2">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsDown" viewBox="0 0 16 16">
                                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                                </svg>10</p>
                            </label>
                        </span>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment">
                        <span class="com-part1">
                            <p>Nom maison d'illustre</p>
                            <span class="tiny_com_rating">
                                <input type="radio" id="tiny_com_star5" name="star" value="5" hidden>
                                <label for="star5">★</label>
                                <input type="radio" id="tiny_com_star4" name="star" value="4" hidden>
                                <label for="star4">★</label>
                                <input type="radio" id="tiny_com_star3" name="star" value="3" hidden>
                                <label for="star3">★</label>
                                <input type="radio" id="tiny_com_star2" name="star" value="2" hidden>
                                <label for="star2">★</label>
                                <input type="radio" id="tiny_com_star1" name="star" value="1" hidden>
                                <label for="star1">★</label>
                            </span>
                            
                        </span>
                        <p> pseudo</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <span class="grade">
                            <!-- Avis des commentaires -->
                            <input class="btnUp" type="radio" id="thumbsUp3" name="thumbs3" value="thumbsUp3" hidden>
                            <label class="labelUp" for="thumbsUp3">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsUp" viewBox="0 0 16 16">
                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                </svg>20</p>
                            </label>
                            <input class="btnDown" type="radio" id="thumbsDown3" name="thumbs3" value="thumbsDown3"
                                   hidden>
                            <label class="labelDown" for="thumbsDown3">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsDown" viewBox="0 0 16 16">
                                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                                </svg>10</p>
                            </label>
                        </span>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment">
                        <span class="com-part1">
                            <p>Nom maison d'illustre</p>
                            <span class="tiny_com_rating">
                                <input type="radio" id="tiny_com_star5" name="star" value="5" hidden>
                                <label for="star5">★</label>
                                <input type="radio" id="tiny_com_star4" name="star" value="4" hidden>
                                <label for="star4">★</label>
                                <input type="radio" id="tiny_com_star3" name="star" value="3" hidden>
                                <label for="star3">★</label>
                                <input type="radio" id="tiny_com_star2" name="star" value="2" hidden>
                                <label for="star2">★</label>
                                <input type="radio" id="tiny_com_star1" name="star" value="1" hidden>
                                <label for="star1">★</label>
                            </span>
                            
                        </span>
                        <p> pseudo</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <span class="grade">
                            <!-- Avis des commentaires -->
                            <input class="btnUp" type="radio" id="thumbsUp4" name="thumbs4" value="thumbsUp4" hidden>
                            <label class="labelUp" for="thumbsUp4">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsUp" viewBox="0 0 16 16">
                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                </svg>20</p>
                            </label>
                            <input class="btnDown" type="radio" id="thumbsDown4" name="thumbs4" value="thumbsDown4"
                                   hidden>
                            <label class="labelDown" for="thumbsDown4">
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey"
                                     class="thumbsDown" viewBox="0 0 16 16">
                                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                                </svg>10</p>
                            </label>
                        </span>
                    </article>
                    <!-- Fin squelette -->


                </div>
            </div>


        </div>

    </div>

</div>
<!-- Pop-up ajout amis -->
<div class="popup-addFriend" id="popup-addFriend">
    <div class="popup-content-addFriend" id="popup-content-addFriend">
        <form class="form-friend" action="">
            <label for="nameFriend">Nom d'utilisateur de l'ami :</label>
            <input id="nameFriend" type="text">
            <p class="empty-name" id="empty-name">Veuillez renseigner un nom</p>
            <span>
                    <button class="closePopup-addFriend" id="closePopup-addFriend">Annuler</button>
                    <button class="changeContent-addFriend" id="changeContent-addFriend">Envoyer</button>
                </span>
        </form>
    </div>
</div>
<div class="popup-sendFriend" id="popup-sendFriend">
    <div class="popup-content-sendFriend" id="popup-content-sendFriend">
        <p>Une demande d'amis à été envoyé à "Nom_User"</p>
        <button class="closePopup-sendFriend" id="closePopup-sendFriend" type="button">OK</button>

    </div>
</div>
<!-- Pop-up retirer amis -->
<div class="popup-sureRemove" id="popup-sureRemove">
    <div class="popup-content-sureRemove" id="popup-content-sureRemove">
        <form class="form-sureRemove" action="">
            <p>Êtes-vous sûr⸱e de vouloir retirer "User_Name" de vos amis ?</p>
            <span>
                    <button class="closePopup-sureRemove" id="closePopup-sureRemove">Annuler</button>
                    <button class="changeContent-sureRemove" id="changeContent-sureRemove">Retirer</button>
                </span>
        </form>
    </div>
</div>
<div class="popup-removeFriend" id="popup-removeFriend">
    <div class="popup-content-removeFriend" id="popup-content-removeFriend">
        <p>"User_Name" a été retiré de votre liste d'amis</p>
        <button class="closePopup-removeFriend" id="closePopup-removeFriend" type="button">OK</button>

    </div>
</div>

<script src="../script/friend.view.js"></script>
</body>

</html>