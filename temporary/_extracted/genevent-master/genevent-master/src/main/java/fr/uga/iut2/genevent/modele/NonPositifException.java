package fr.uga.iut2.genevent.modele;

/**
 * Un NonPositifException est levé quand on essaie d'initialiser une valeur négative à un attribut qui doit être
 positif ou une valeur nulle ou négative à un attribut qui doit être strictement positif.
 */
public class NonPositifException extends Exception {
    public NonPositifException() { super(); }
    public NonPositifException(String s) { super(s); }

}
