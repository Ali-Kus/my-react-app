package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Représente une entité de sous-traitance avec un nom, un coût et des informations de contact.
 * Ses attributs sont :
 *      - nom : Le nom de l'entité.
 *      - cout : Le prix qu'il faut payer pour appeler cette sous-traitance.
 *      - contact : Le moyen de contacter la sous-traitance.
 */
public class SousTraitance implements Serializable {
    // Attributs de la classe
    private String nom;
    private double cout;
    private Contact contact;

    private static Logger LOGGER = Logger.getLogger(SousTraitance.class.getPackageName());

    /**
     * Constructeur pour initialiser une sous-traitance avec son coût, nom et informations de contact.
     *
     * @param cout      Le coût de la sous-traitance.
     * @param nom       Le nom de la sous-traitance.
     * @param telephone Le numéro de téléphone de la sous-traitance.
     * @param eMail     L'email de la sous-traitance.
     * @throws NonPositifException si le coût est négatif.
     * @throws TelephoneInvalideException si le numéro de téléphone est invalide.
     */
    public SousTraitance(double cout, String nom, String telephone, String eMail)
            throws NonPositifException, TelephoneInvalideException {
        // Initialise le coût avec validation
        setCout(cout);
        // Initialise le contact, pouvant lancer une exception si le numéro de téléphone est invalide
        contact = new Contact(telephone, eMail);
        this.nom = nom;
        LOGGER.log(Level.INFO, "Appel du constructeur de la classe SousTraitance.");
    }

    // Getters
    public Contact getContact() {
        return contact;
    }
    public double getCout() {
        return cout;
    }
    public String getNom() {
        return nom;
    }

    /**
     * Méthode privée pour définir le coût avec validation.
     *
     * @param cout Le coût de la sous-traitance.
     * @throws NonPositifException si le coût est négatif.
     */
    private void setCout(double cout) throws NonPositifException {
        // Vérifie si le coût est positif ou nul
        if (cout >= 0) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setCout(" + cout + ") d'une sous-traitance.");
            this.cout = cout;

        } else {
            // Lance une exception si le coût est négatif
            LOGGER.log(Level.WARNING, "La valeur " + cout + " est strictement négative. Elle n'est donc pas valide. " +
                    "(méthode setCout(" + cout + ") d'une sous-traitance).");
            throw new NonPositifException("Vous avez essayé d'initialiser une valeur de prix négative pour une sous-traitance.");
        }
    }
}
