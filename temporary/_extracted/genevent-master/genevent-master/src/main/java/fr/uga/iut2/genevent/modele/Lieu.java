package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * La classe Lieu représente un lieu où un événement peut avoir lieu.
 * Ses attributs sont :
 * <ul>
 *      <li>nom : Le nom de l'endroit.</li>
 *      <li>adresse : L'adresse.</li>
 *      <li>capacite : Le nombre maximal de spectateurs.</li>
 *      <li>prix : Le prix de location.</li>
 *      <li>contact : Le contact pour le lieu (téléphone et email).</li>
 * </ul>
 */
public class Lieu implements Serializable {
    private String nom;
    private Adresse adresse;
    private int capacite;
    private double prix;
    private Contact contact;

    private static Logger LOGGER = Logger.getLogger(Lieu.class.getPackageName());

    /**
     * Constructeur de la classe Lieu avec tous les attributs.
     * @param nom Le nom du lieu.
     * @param capacite La capacité maximale du lieu.
     * @param prix Le prix de location du lieu.
     * @param adresse L'adresse du lieu.
     * @param contact Le contact pour le lieu (téléphone et email).
     * @throws NonPositifException Si la capacité ou le prix sont négatifs.
     * @throws TelephoneInvalideException Si le téléphone du contact est invalide.
     */
    public Lieu(String nom, int capacite, double prix, Adresse adresse, Contact contact)
            throws NonPositifException, TelephoneInvalideException {
        this.nom = nom;
        this.capacite = capacite;
        this.prix = prix;
        this.adresse = adresse;
        this.contact = contact;
        LOGGER.log(Level.INFO, "Appel du constructeur de la classe Lieu.");
    }

    /**
     * Renvoie le nom du lieu.
     * @return Le nom du lieu.
     */
    public String getNom() {
        return nom;
    }

    /**
     * Renvoie le moyen de contacter le lieu.
     * @return Le moyen de contacter le lieu.
     */
    public Contact getContact() {
        return contact;
    }

    /**
     * Renvoie le prix de location du lieu.
     * @return Le prix de location du lieu.
     */
    public double getPrix() {
        return prix;
    }

    /**
     * Renvoie l'adresse du lieu.
     * @return L'adresse du lieu.
     */
    public Adresse getAdresse() {
        return adresse;
    }

    /**
     * Définit le prix de location du lieu.
     * @param prix Le nouveau prix de location.
     * @throws NonPositifException Si le prix est négatif.
     */
    public void setPrix(double prix) throws NonPositifException {
        if (prix >= 0) {
            this.prix = prix;
            LOGGER.log(Level.CONFIG, "Appel de la méthode setPrix(" + prix + ") d'un lieu.");

        } else {
            LOGGER.log(Level.WARNING, "La valeur " + prix + " est strictement négative. Elle n'est donc pas valide. " +
                    "(méthode setPrix(" + prix + ") d'un lieu).");
            throw new NonPositifException("Vous avez essayé de donner une valeur négative au prix de location d'un lieu.");
        }
    }

    /**
     * Renvoie la capacité maximale du lieu.
     * @return La capacité maximale du lieu.
     */
    public int getCapacite() {
        return capacite;
    }

    /**
     * Définit la capacité maximale du lieu.
     * @param capacite La nouvelle capacité maximale.
     * @throws NonPositifException Si la capacité est négative.
     */
    private void setCapacite(int capacite) throws NonPositifException {
        if (capacite < 0) {
            LOGGER.log(Level.WARNING, "La valeur " + capacite + " est strictement négative. Elle n'est donc pas valide. " +
                    "(méthode setCapacite(" + capacite + ") d'un lieu).");
            throw new NonPositifException("Vous avez essayé de donner une valeur négative a la capacité en spectateur d'un lieu.");

        } else {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setCapacite(" + capacite + ") d'un lieu.");
            this.capacite = capacite;
        }
    }
}
