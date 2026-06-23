<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../../public/design/styleNavBar.css" rel="stylesheet">
    <title>NotaDomus</title>
</head>
<body>
<!-- Barre de navigation -->
<nav class="navBar">
    <ul>
        <li>
            <!-- Logo -->
            <a class="logo" href=""><img src="../../public/design/img/logo.png" alt="logo"></a>
            <!-- Bouton maison propriétaire -->
            <!-- <button class="maMaison">Ma maison d'illustre </button> -->
        </li>
        <li>
            <!-- Loupe + Barre de recherche -->
            <form action="" class="search">
                <input type="image" src="../../public/design/img/chercher.png" class="loupe">
                <input type="text" class="champ" placeholder="Entrez un mot clef">
            </form>
        </li>
        <li>
            <!-- Bouton notifications -->
            <button id="openPopupNotif" class="cloche">
                <svg version="1.1" width="36" height="36" fill="#731702" viewBox="0 0 36 36"
                     preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
                >
                    <title>notification-solid</title>
                    <path class="clr-i-solid clr-i-solid-path-1"
                          d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"></path>
                    <path class="clr-i-solid clr-i-solid-path-2" d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"></path>
                    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                </svg>
                <!-- Afficher le bon svg en fonction de si l'utilisateur a des notifications -->
                <!-- <svg version="1.1" width="36" height="36"  fill="#731702" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>notification-solid-badged</title>
                    <path class="clr-i-solid--badged clr-i-solid-path-1--badged" d="M18,34.28A2.67,2.67,0,0,0,20.58,32H15.32A2.67,2.67,0,0,0,18,34.28Z"></path><path class="clr-i-solid--badged clr-i-solid-path-2--badged" d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15a10.92,10.92,0,0,0-.16-1.79A7.5,7.5,0,0,1,22.5,6c0-.21,0-.42,0-.63a10.57,10.57,0,0,0-3.32-1V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"></path><circle class="clr-i-solid--badged clr-i-solid-path-3--badged clr-i-badge" cx="30" cy="6" r="5"></circle>
                    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                </svg> -->
            </button>
        </li>
    </ul>

</nav>
<div class="popupNotif" id="myPopupNotif">
    <div class="popup-content">
        <h2>Nouvel Ami !</h2>
        <p>pseudo vous a demandé en ami</p>
        <hr>
        <h2>Nouvel Ami !</h2>
        <p>pseudo vous a demandé en ami</p>
        <hr>
        <h2>Recommandation</h2>
        <p>pseudo vous recommande d'aller au château de Hautefort</p>
    </div>
</div>
<!-- Script Pop-up -->
<script src="../script/scriptNotif.js"></script>
</body>
</html>