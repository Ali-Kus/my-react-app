package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Représente une adresse avec un numéro, une rue, un pays et une commune.
 * Une adresse est définie par :
 * <ul>
 *     <li>numero : Le numéro devant la rue.</li>
 *     <li>rue : Le nom de la rue.</li>
 *     <li>pays : Le pays.</li>
 *     <li>commune : La commune.</li>
 * </ul>
 */
public class Adresse implements Serializable {
    private int numero;
    private String rue;
    private String pays;
    private String commune;

    private static Logger LOGGER = Logger.getLogger(Adresse.class.getPackageName());

    /**
     * Constructeur pour initialiser une adresse.
     *
     * @param numero  Le numéro de la rue.
     * @param rue     Le nom de la rue.
     * @param pays    Le pays de l'adresse.
     * @param commune La commune de l'adresse.
     * @throws NonPositifException si le numéro de la rue est nul ou négatif.
     */
    public Adresse(int numero, String rue, String pays, String commune) throws NonPositifException {
        // Appel de la méthode setNumero pour vérifier et initialiser le numéro de rue
        setNumero(numero);
        this.rue = rue;
        this.pays = pays;
        this.commune = commune;
        LOGGER.log(Level.INFO, "Appel du constructeur de la classe Adresse.");
    }

    // Getters
    public int getNumero() {
        return numero;
    }
    public String getRue() {
        return rue;
    }
    public String getPays() {
        return pays;
    }
    public String getCommune() {
        return commune;
    }

    // Méthode pour définir le numéro de rue avec vérification
    private void setNumero(int numero) throws NonPositifException {
        // Vérifie si le numéro de rue est positif
        if (numero <= 0) {
            LOGGER.log(Level.WARNING, "La valeur " + numero + " est strictement négative. Elle n'est donc pas valide. " +
                    "(méthode setNumero(" + numero + ") d'une adresse).");
            // Lance une exception si le numéro de rue est nul ou négatif
            throw new NonPositifException("Vous avez essayé de créer une adresse avec un numéro de rue nul ou négatif");

        } else {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setNumero(" + numero + ") d'une adresse.");
            // Si le numéro est positif, l'initialise
            this.numero = numero;
        }
    }
}
