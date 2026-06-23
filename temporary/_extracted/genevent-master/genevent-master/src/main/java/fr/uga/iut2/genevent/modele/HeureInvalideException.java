package fr.uga.iut2.genevent.modele;

/**
 * Une HeureInvalideException est levée quand l'utilisateur essaie d'initialiser un attribut d'heure
 qui n'est pas entre 0 et 24.
 */
public class HeureInvalideException extends Exception {
    public HeureInvalideException() {
    }
    public HeureInvalideException(String message) {
        super(message);
    }
}
