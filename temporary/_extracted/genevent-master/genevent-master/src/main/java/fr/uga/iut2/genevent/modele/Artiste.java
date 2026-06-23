package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * La classe Artiste représente la notion d'artiste. Il peut s'agir d'un groupe ou d'un individu.
 * Il y a un artiste par concert.
 * Ses attributs sont :
 *      <ul>
 *          <li>nomScene : Le nom de scène de l'artiste.</li>
 *          <li>nomManager : Le nom du manager de l'artiste.</li>
 *          <li>prenomManager : Le prénom du manager de l'artiste.</li>
 *          <li>cout : Le prix pour lequel l'artiste accepte de participer au concert {0 <= cout}.</li>
 *          <li>contact : Le contact de l'artiste (téléphone et eMail).</li>
 *      </ul>
 */
public class Artiste implements Serializable {
    private String nomScene;
    private String nomManager;
    private String prenomManager;
    private double cout;
    private Contact contact;

    private static Logger LOGGER = Logger.getLogger(Artiste.class.getPackageName());

    /**
     * Le constructeur de la classe Artiste initialise tous les attributs.
     * @param contact : Le téléphone et le mail à utiliser pour contacter l'artiste.
     * @param nomManager : Le nom de famille du manager.
     * @param prenomManager : Le prénom du manager.
     * @param nomScene : Le nom de scène de l'artiste (le nom sous lequel il est connu).
     * @param cout : Le prix pour lequel l'artiste accepte de venir.
     * @throws NonPositifException : Si l'utilisateur essaye d'insérer un coût négatif.
     */
    public Artiste(Contact contact, String nomManager, String prenomManager, String nomScene, double cout)
            throws NonPositifException {
        this.contact = contact;
        this.nomManager = nomManager;
        this.prenomManager = prenomManager;
        this.nomScene = nomScene;
        setCout(cout);
        LOGGER.log(Level.INFO, "Appel du constructeur de la classe Artiste.");
    }

    /**
     * Définit le coût pour lequel l'artiste accepte de participer au concert.
     *
     * @param cout Le prix de l'artiste.
     * @throws NonPositifException Si le coût est négatif.
     */
    public void setCout(double cout) throws NonPositifException {
        if (cout >= 0) {
            this.cout = cout;
            LOGGER.log(Level.CONFIG, "Appel de la méthode setCout(" + cout + ") d'un artiste.");

        } else {
            LOGGER.log(Level.WARNING, "La valeur " + cout + " est strictement négative. Elle n'est donc pas valide. " +
                    "(méthode setCout(" + cout + ") d'un artiste).");
            throw new NonPositifException("Vous avez essayé d'initialiser un artiste avec un prix négatif. Nous nous " +
                    "excusons, mais notre application ne prend pas en compte les artistes qui payent pour venir.");
        }
    }

    /**
     * Renvoie le nom du manager de l'artiste.
     *
     * @return Le nom du manager.
     */
    public String getNomManager() {
        return nomManager;
    }

    /**
     * Renvoie le prénom du manager de l'artiste.
     *
     * @return Le prénom du manager.
     */
    public String getPrenomManager() {
        return prenomManager;
    }

    /**
     * Renvoie le contact de l'artiste.
     *
     * @return Le contact de l'artiste.
     */
    public Contact getContact() {
        return contact;
    }

    /**
     * Renvoie le nom de scène de l'artiste.
     *
     * @return Le nom de scène de l'artiste.
     */
    public String getNomScene() {
        return nomScene;
    }

    /**
     * Renvoie le coût de l'artiste.
     *
     * @return Le coût de l'artiste.
     */
    public double getCout() {
        return cout;
    }
}
