package fr.uga.iut2.genevent.modele;

/**
 * La classe DateInvalideException est une exception personnalisée utilisée pour indiquer qu'une date fournie est invalide.
 */
public class DateInvalideException extends Exception {
    public DateInvalideException() { super(); }
    public DateInvalideException(String message) { super(message); }
}
