package fr.uga.iut2.genevent.modele;

/**
 * Une MinuteInvalideException est levée quand l'utilisateur essaie d'initialiser un attribut de minute
 qui n'est pas entre 0 et 59.
 */
public class MinuteInvalideException extends Exception {
    public MinuteInvalideException() {
    }

    public MinuteInvalideException(String message) {
        super(message);
    }
}
