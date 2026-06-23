<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Changer le mot de passe</title>
    <link rel="stylesheet" href="../../public/design/styleUpdateAccount.css">
    <link rel="script" href="../../view/script/passwordVerif.js">
    <link rel="script" href="../../view/script/passwordVerif.js">
    <link rel="icon" href="../../public/design/img/logo.png">
</head>

<body>
<div class="container">
    <div class="left-section">
        <div class="profile-section">
            <div class="profile-picture">
                <img src="../../public/design/img/user.png" alt="Photo de profil">
            </div>
            <h2>Nom d'utilisateur</h2>
            <p class="email">adresse@mail.com</p>
        </div>
    </div>
    <div class="right-section">
        <form class="password-change-form">
            <!-- Ancien MDP -->
            <label for="old-password">Ancien mot de passe :</label>
            <input type="password" id="old-password" placeholder="Entrez l'ancien mot de passe" required>


            <!-- Nouveau MDP -->
            <div class="nouvelMDP">
                <label for="new-password">Nouveau mot de passe :</label>
                <input type="password" id="new-password" placeholder="Entrez le nouveau mot de passe" required>

                <!-- Guide -->
                <p class="password-tips"> Votre mot de passe doit contenir : </p>
                <ul class="password-tips">
                    <li id="length">Au moins 8 caractères</li>
                    <li id="Letter-case">Des majuscules et minuscules</li>
                    <li id="number">Au moins un chiffre</li>
                    <li id="special">Au moins un caractère spécial</li>
                </ul>
                </p>

                <label for="confirm-password">Confirmez le mot de passe :</label>
                <input type="password" id="confirm-password" placeholder="Confirmez le mot de passe" required>
            </div>
            <button type="button" id="cancel">Annuler</button>
            <button type="submit">Enregistrer</button>
        </form>
    </div>
</div>
</body>

</html>