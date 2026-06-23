package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * La classe Contact représente la notion de contact. Un contact représente un moyen de contacter une personne spécifique.
 * Un contact est définit par les attributs :
 * <ul>
 *      <li>eMail : L'adresse email de la personne.</li>
 *      <li>telephone : Le numéro de téléphone d'une personne.</li>
 * </ul>
 */
public class Contact implements Serializable {
    private String eMail;
    private String telephone;

    private static Logger LOGGER = Logger.getLogger(Contact.class.getPackageName());

    /**
     * Le onstructeur de la classe Contact. Il initialise tous les attributs.
     * @param telephone Le numéro de téléphone de la personne.
     * @param eMail L'adresse email de la personne.
     * @throws TelephoneInvalideException Si le numéro de téléphone n'est pas une suite de 10 chiffres.
     */
    public Contact(String telephone, String eMail) throws TelephoneInvalideException {
        this.eMail = eMail;
        setTelephone(telephone);
        LOGGER.log(Level.INFO, "Appel du constructeur de la classe Contact.");
    }

    /**
     * Renvoie l'adresse email de la personne.
     * @return L'adresse email de la personne.
     */
    public String getMail() {
        return eMail;
    }

    /**
     * Renvoie le numéro de téléphone de la personne.
     * @return Le numéro de téléphone de la personne.
     */
    public String getTelephone() {
        return telephone;
    }

    /**
     * Définit le numéro de téléphone d'une personne.
     * @param telephone Le numéro de téléphone dont l'attribut va prendre la valeur.
     * @throws TelephoneInvalideException Si le numéro de téléphone n'est pas une suite de 10 chiffres.
     */
    public void setTelephone(String telephone) throws TelephoneInvalideException {
        try {
            Long.parseLong(telephone);
            if (telephone.length() == 10) {
                LOGGER.log(Level.CONFIG, "Appel de la méthode setTelephone(" + telephone + ") de la classe Contact.");
                this.telephone = telephone;

            } else {
                LOGGER.log(Level.WARNING, "La valeur " + telephone + " n'est pas une suite de nombre à 10 chiffres. " +
                        "Ce n'est donc pas un numéro valide. (Méthode setTelephone(" + telephone + ") de la classe Contact)");
                throw new TelephoneInvalideException("Vous avez essayé d'initialiser un contact avec " +
                        "une valeur de téléphone invalide. Un téléphone doit être une suite de 10 chifres.");
            }
        } catch (NumberFormatException e) {
            LOGGER.log(Level.WARNING, "La valeur " + telephone + " n'est pas une suite de nombre à 10 chiffres. " +
                    "Ce n'est donc pas un numéro valide. (Méthode setTelephone(" + telephone + ") de la classe Contact)");
            throw new TelephoneInvalideException("Vous avez essayé d'initialiser un contact avec " +
                        "une valeur de téléphone invalide. Un téléphone doit être une suite de 10 chifres.");
        }
    }
}
