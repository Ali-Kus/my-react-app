<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../../public/design/styleMod.css" rel="stylesheet">

</head>

<body>
<input type="checkbox" id="mod_toggle" hidden>
<div class="mod_main">


    <!-- Logo Moderation -->
    <label for="mod_toggle" class="mod-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA" class="bi bi-megaphone-fill"
             viewBox="0 0 16 16">
            <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06"/>
        </svg>
    </label>

    <!-- Frame entière -->
    <div class="frame-mod">
        <!-- Rectangle rouge en css -->
        <div class="rectangle"></div>
        <div class="mod-form">

            <div class="type_sign">
                <button class="signal-button" id="signal-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA"
                         class="bi bi-megaphone-fill" viewBox="0 0 16 16">
                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06"/>
                    </svg>
                    Signalements
                </button>
                <button class="recent-button" id="recent-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4DFCA"
                         class="bi bi-megaphone-fill" viewBox="0 0 16 16">
                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06"/>
                    </svg>
                    Récents
                </button>
            </div>


            <div class="frame-coms-mod">
                <!-- Commentaires signalés -->
                <div class="coms-signal" id="coms-signal">
                    <!-- Squelette du commentaire -->
                    <article class="comment-signal">
                        <span class="com-part1-signal">
                            <p>User_Name</p>
                            <div class="ligne1_signal">
                                <span class="tiny_com_rating_mod">
                                    <input type="radio" id="tiny_com_star5_mod" name="star" value="5" hidden>
                                    <label for="star5">★</label>
                                    <input type="radio" id="tiny_com_star4_mod" name="star" value="4" hidden>
                                    <label for="star4">★</label>
                                    <input type="radio" id="tiny_com_star3_mod" name="star" value="3" hidden>
                                    <label for="star3">★</label>
                                    <input type="radio" id="tiny_com_star2_mod" name="star" value="2" hidden>
                                    <label for="star2">★</label>
                                    <input type="radio" id="tiny_com_star1_mod" name="star" value="1" hidden>
                                    <label for="star1">★</label>
                                </span>
                                <button class="dots-button" name="dots-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#731702"
                                         class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    </svg>
                                </button>
                                <div class="option-signal" name="option-signal">
                                    <button class="remove-button" id="remove-button">Supprimer</button>
                                    <button class="report-button" id="report-button">Signaler</button>
                                    <button class="see-button" id="see-button">Voir</button>
                                </div>
                            </div>
                        </span>
                        <div class="ligne2_signal">
                            <p class="house-name"> Maison d'illustre</p>

                        </div>
                        <p class="text-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <div class="popup-signCause">
                            <p class="title-signCause"> Cause du signalement :</p>
                            <p class="signCause">Il est méchant avec ma maman</p>
                            <p class="signaler"> Signalé par User_Name</p>
                        </div>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment-signal">
                        <span class="com-part1-signal">
                            <p>User_Name</p>
                            <div class="ligne1_signal">
                                <span class="tiny_com_rating_mod">
                                    <input type="radio" id="tiny_com_star5_mod" name="star" value="5" hidden>
                                    <label for="star5">★</label>
                                    <input type="radio" id="tiny_com_star4_mod" name="star" value="4" hidden>
                                    <label for="star4">★</label>
                                    <input type="radio" id="tiny_com_star3_mod" name="star" value="3" hidden>
                                    <label for="star3">★</label>
                                    <input type="radio" id="tiny_com_star2_mod" name="star" value="2" hidden>
                                    <label for="star2">★</label>
                                    <input type="radio" id="tiny_com_star1_mod" name="star" value="1" hidden>
                                    <label for="star1">★</label>
                                </span>
                                <button class="dots-button" name="dots-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#731702"
                                         class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    </svg>
                                </button>
                                <div class="option-signal" name="option-signal">
                                    <button class="remove-button" id="remove-button">Supprimer</button>
                                    <button class="report-button" id="report-button">Signaler</button>
                                    <button class="see-button" id="see-button">Voir</button>
                                </div>
                            </div>
                        </span>
                        <div class="ligne2_signal">
                            <p class="house-name"> Maison d'illustre</p>

                        </div>
                        <p class="text-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <div class="popup-signCause">
                            <p class="title-signCause"> Cause du signalement :</p>
                            <p class="signCause">Il est méchant avec ma maman</p>
                            <p class="signaler"> Signalé par User_Name</p>
                        </div>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment-signal">
                        <span class="com-part1-signal">
                            <p>User_Name</p>
                            <div class="ligne1_signal">
                                <span class="tiny_com_rating_mod">
                                    <input type="radio" id="tiny_com_star5_mod" name="star" value="5" hidden>
                                    <label for="star5">★</label>
                                    <input type="radio" id="tiny_com_star4_mod" name="star" value="4" hidden>
                                    <label for="star4">★</label>
                                    <input type="radio" id="tiny_com_star3_mod" name="star" value="3" hidden>
                                    <label for="star3">★</label>
                                    <input type="radio" id="tiny_com_star2_mod" name="star" value="2" hidden>
                                    <label for="star2">★</label>
                                    <input type="radio" id="tiny_com_star1_mod" name="star" value="1" hidden>
                                    <label for="star1">★</label>
                                </span>
                                <button class="dots-button" name="dots-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#731702"
                                         class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    </svg>
                                </button>
                                <div class="option-signal" name="option-signal">
                                    <button class="remove-button" id="remove-button">Supprimer</button>
                                    <button class="report-button" id="report-button">Signaler</button>
                                    <button class="see-button" id="see-button">Voir</button>
                                </div>
                            </div>
                        </span>
                        <div class="ligne2_signal">
                            <p class="house-name"> Maison d'illustre</p>

                        </div>
                        <p class="text-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                            Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                        <div class="popup-signCause">
                            <p class="title-signCause"> Cause du signalement :</p>
                            <p class="signCause">Il est méchant avec ma maman</p>
                            <p class="signaler"> Signalé par User_Name</p>
                        </div>
                    </article>
                    <!-- Fin squelette -->

                </div>

                <!-- Commentaires récents -->
                <div class="coms-recent" id="coms-recent">
                    <!-- Squelette du commentaire -->
                    <article class="comment-recent">
                            <span class="com-part1-recent">
                                <p>User_Name</p>
                                <div class="ligne1_recent">
                                    <span class="tiny_com_rating_mod">
                                        <input type="radio" id="tiny_com_star5_mod" name="star" value="5" hidden>
                                        <label for="star5">★</label>
                                        <input type="radio" id="tiny_com_star4_mod" name="star" value="4" hidden>
                                        <label for="star4">★</label>
                                        <input type="radio" id="tiny_com_star3_mod" name="star" value="3" hidden>
                                        <label for="star3">★</label>
                                        <input type="radio" id="tiny_com_star2_mod" name="star" value="2" hidden>
                                        <label for="star2">★</label>
                                        <input type="radio" id="tiny_com_star1_mod" name="star" value="1" hidden>
                                        <label for="star1">★</label>
                                    </span>
                                    <button class="dots-button" name="dots-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#731702"
                                             class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                        </svg>
                                    </button>
                                    <div class="option-recent" name="option-recent">
                                        <button class="remove-button" id="remove-button">Supprimer</button>
                                        <button class="report-button" id="report-button">Signaler</button>
                                        <button class="see-button" id="see-button">Voir</button>
                                    </div>
                                </div>
                                
                            </span>
                        <p> Maison d'illustre</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment-recent">
                            <span class="com-part1-recent">
                                <p>User_Name</p>
                                <div class="ligne1_recent">
                                    <span class="tiny_com_rating_mod">
                                        <input type="radio" id="tiny_com_star5_mod" name="star" value="5" hidden>
                                        <label for="star5">★</label>
                                        <input type="radio" id="tiny_com_star4_mod" name="star" value="4" hidden>
                                        <label for="star4">★</label>
                                        <input type="radio" id="tiny_com_star3_mod" name="star" value="3" hidden>
                                        <label for="star3">★</label>
                                        <input type="radio" id="tiny_com_star2_mod" name="star" value="2" hidden>
                                        <label for="star2">★</label>
                                        <input type="radio" id="tiny_com_star1_mod" name="star" value="1" hidden>
                                        <label for="star1">★</label>
                                    </span>
                                    <button class="dots-button" name="dots-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#731702"
                                             class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                        </svg>
                                    </button>
                                    <div class="option-recent" name="option-recent">
                                        <button class="remove-button" id="remove-button">Supprimer</button>
                                        <button class="report-button" id="report-button">Signaler</button>
                                        <button class="see-button" id="see-button">Voir</button>
                                    </div>
                                </div>
                                
                            </span>
                        <p> Maison d'illustre</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                    </article>
                    <!-- Fin squelette -->
                    <!-- Squelette du commentaire -->
                    <article class="comment-recent">
                        <span class="com-part1-recent">
                            <p>User_Name</p>
                            <div class="ligne1_recent">
                                <span class="tiny_com_rating_mod">
                                    <input type="radio" id="tiny_com_star5_mod" name="star" value="5" hidden>
                                    <label for="star5">★</label>
                                    <input type="radio" id="tiny_com_star4_mod" name="star" value="4" hidden>
                                    <label for="star4">★</label>
                                    <input type="radio" id="tiny_com_star3_mod" name="star" value="3" hidden>
                                    <label for="star3">★</label>
                                    <input type="radio" id="tiny_com_star2_mod" name="star" value="2" hidden>
                                    <label for="star2">★</label>
                                    <input type="radio" id="tiny_com_star1_mod" name="star" value="1" hidden>
                                    <label for="star1">★</label>
                                </span>
                                <button class="dots-button" name="dots-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#731702"
                                         class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                    </svg>
                                </button>
                                <div class="option-recent" name="option-recent">
                                    <button class="remove-button" id="remove-button">Supprimer</button>
                                    <button class="report-button" id="report-button">Signaler</button>
                                    <button class="see-button" id="see-button">Voir</button>
                                </div>
                            </div>
                            
                        </span>
                        <p> Maison d'illustre</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                            tortor, dignissim sit amet, adipiscing nec,
                            ultricies sed, dolor.</p>
                    </article>
                    <!-- Fin squelette -->

                </div>

            </div>
        </div>
    </div>

</div>

</div>
<!-- Pop-up -->
<!-- Supprimer -->
<div class="popup-removeMod" id="popup-removeMod">
    <div class="popup-content-removeMod" id="popup-content-removeMod">
        <p>Le commentaire à bien été supprimé</p>
        <button class="closePopup-removeMod" id="closePopup-removeMod" type="button">OK</button>
    </div>
</div>
<!-- Signaler -->
<div class="popup-signalMod" id="popup-signalMod">
    <div class="popup-content-signalMod" id="popup-content-signalMod">
        <form action="">
            <h2>Signalement</h2>
            <select id="categorie_signalement" name="categorie" placeholder="Raison">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
            </select>
            <!-- <p class="empty_option">Cette option doit être renseignée</p> -->

            <label for="explication_report">Explication :</label>
            <textarea id="explication_report" name="explication_report" rows="6" cols="20"></textarea>

            <div id="nav_report">
                <span class="closePopup-signalMod" id="closePopup-signalMod">Annuler</span>
                <span class="changeContent-signalMod" id="changeContent-signalMod">Envoyer</span>
            </div>
        </form>
    </div>
</div>
<div class="popup-thx-signalMod" id="popup-thx-signalMod">
    <div class="popup-content-thx-signalMod" id="popup-content-thx-signalMod">
        <p>Merci pour votre signalement, un modérateur le prendra en charge au plus vite</p>
        <button id="closePopup-thx-signalMod" type="button">OK</button>
    </div>
</div>

<script src="../script/mod.view.js"></script>
</body>

</html>