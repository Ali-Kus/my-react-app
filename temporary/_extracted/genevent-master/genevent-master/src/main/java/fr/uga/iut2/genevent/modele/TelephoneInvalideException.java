package fr.uga.iut2.genevent.modele;

/**
 * Un TelephoneInvalideException est levé quand on essaie d'initialiser un numéro de téléphone
 avec une valeur impossible.
 */
public class TelephoneInvalideException extends Exception {
    public TelephoneInvalideException() { super(); }
    public TelephoneInvalideException(String s) { super(s); }
}
