package fr.uga.iut2.genevent.modele;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.Serializable;
import java.util.HashMap;

/**
 * La classe Concert représente la notion de concert.
 * Ses attributs sont :
 * <ul>
 *     <li>serialVersionUID : Sert simplement à marquer cette classe comme une classe sérialisable.</li>
 *     <li>nom : Le nom du concert.</li>
 *     <li>date : La date du concert. {"JJ/MM/AA" ou "JJ/MM/AAAA"}</li>
 *     <li>prixBillet : Le prix du billet. {0 <= prixBillet}</li>
 *     <li>heureDebut : L'heure de début du concert. {0 <= heureDebut < 24}</li>
 *     <li>minuteDebut : La minute à laquelle le concert débute. {0 <= minuteDebut < 60}</li>
 *     <li>duree : La durée du concert, en minutes. {0 < duree}</li>
 *     <li>coutTotal : Le coût total de l'organisation du concert.</li>
 *     <li>lieu : Le lieu du concert.</li>
 *     <li>artiste : L'artiste du concert.</li>
 *     <li>sousTraitances : Les sous-traitances.</li>
 * </ul>
 */
public class Concert implements Serializable {
    private static final long serialVersionUID = 1L;
    private String nom;
    private String date;
    private double prixBillet;
    private Integer heureDebut;
    private Integer minuteDebut;
    private Integer duree;
    private double coutTotal;
    private Lieu lieu;
    private Artiste artiste;
    private HashMap<String, SousTraitance> sousTraitances;
    // Récupération du logger

    private static Logger LOGGER = Logger.getLogger(Concert.class.getPackageName());

    /**
     * Le constructeur de la classe concert se contente de déclarer le vecteur sousTraitance. Les attributs
     seront initialisés séparément.
     */
    public Concert() {
        LOGGER.log(Level.INFO, "Création d'un concert.");
        sousTraitances = new HashMap<>();
    }

    /**
     * La méthode getHeureComplete() renvoie l'heure complète.
     * @return Heure et minute au format HHhMM.
     */
    public String getHeureComplete() {
        if (heureDebut == null) {
            LOGGER.log(Level.INFO, "Appel de la méthode getHeureComplete() sans attribut d'heure.");
            return "Heure inconnue";

        } else if (minuteDebut == null && heureDebut > 1) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode getHeureComplete() sans attribut de minute");
            return heureDebut + " heures 00";

        } else if (heureDebut > 1){
            LOGGER.log(Level.CONFIG, "Appel de la méthode getHeureComplete()");
            return heureDebut + " heures " + minuteDebut;

        } else if (minuteDebut == null) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode getHeureComplete() sans attribut de minute");
            return heureDebut + " heure 00";

        } else {
            LOGGER.log(Level.CONFIG, "Appel de la méthode getHeureComplete()");
            return heureDebut + " heure " + minuteDebut;
        }
    }

    /**
     * La méthode getDateComplete() renvoie dates et heures de début et de fin avec des adaptations si certains attributs sont null.
     * @return Les dates et les heures de début et de fin. (Ex : Début le 02/02/25 à 23 heures 15, fin le 03/02/25 à 2 heures 45)
     */
    public String getDateComplete() {
        String dateComplete = "Début";
        String date = getDate();
        String heure = getHeureComplete();

        if (date != null && !date.isEmpty()) {
            dateComplete = dateComplete.concat(" le " + date);
        }

        if (heure.compareTo("Heure inconnue") != 0) {
            dateComplete = dateComplete.concat(" à " + heure);
        }

        if (duree != null && heure.compareTo("Heure inconnue") != 0) {
            int heureFin = heureDebut;
            int minuteFin;

            if (minuteDebut == null) {
                minuteFin = duree;
            } else {
                minuteFin = minuteDebut + duree;
            }

            heureFin = (heureFin + (minuteFin / 60)) % 24;
            minuteFin = minuteFin % 60;

            if (heureFin < 2) {   // On met heure au pluriel seulement si > 1
                dateComplete = dateComplete.concat(", fin à " + heureFin + " heure " + minuteFin);
            } else {
                dateComplete = dateComplete.concat(", fin à " + heureFin + " heures " + minuteFin);
            }
        }

        if (dateComplete.compareTo("Début") == 0) {
            LOGGER.log(Level.INFO, "Appel de la méthode getDateComplete() sans qu'il n'y ait de date, d'heure ou de durée.");
            return "Date inconnue";
        } else {
            LOGGER.log(Level.CONFIG, "Appel de getDateComplete()");
            return dateComplete;
        }
    }

    /**
     * Le setteur de l'heure du début.
     * @param heureDebut : La nouvelle heure de début. Si l'utilisateur essaie de lui donner la valeur 24, elle est initialisée à 0.
     * @throws HeureInvalideException : Si l'heure n'est pas strictement incluse entre 0 et 24.
     */
    public void setHeureDebut(int heureDebut) throws HeureInvalideException {
        if (heureDebut >= 0 && heureDebut < 24) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setHeureDebut(" + heureDebut + ").");
            this.heureDebut = heureDebut;

        } else if (heureDebut == 24) {
            LOGGER.log(Level.INFO, "Appel de la méthode setHeureDebut(" + heureDebut + "). La valeur passe de 24 à 0.");
            this.heureDebut = 0;

        } else {
            LOGGER.log(Level.WARNING, "La valeur " + heureDebut + " n'est pas entre 0 et 24. Ce n'est donc pas " +
                    "une heure de début valide. (Méthode setHeureDebut(" + heureDebut + ") de la classe Concert).");
            throw new HeureInvalideException("Vous avez essayé de donner une valeur d'heure négative ou " +
                    "supérieure à 24 à une intervention");
        }
    }

    /**
     * Définit la durée du concert.
     * @param duree La durée du concert en minutes.
     * @throws NonPositifException Si la durée est nulle ou négative.
     */
    public void setDuree(int duree) throws NonPositifException {
        if (duree > 0) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setDuree(" + duree + ")");
            this.duree = duree;
        } else {
            LOGGER.log(Level.WARNING, "La valeur " + duree + " n'est pas >= 0. Ce n'est donc pas une durée valide. " +
                    "(Méthode setDuree(" + duree + ") de la classe Concert).");
            throw new NonPositifException("Vous avez essayé de donner une valeur de durée nulle ou négative à une intervention.");
        }
    }

    /**
     * Définit la minute de début du concert.
     * @param minuteDebut La minute de début.
     * @throws MinuteInvalideException Si la minute n'est pas entre 0 et 59.
     */
    public void setMinuteDebut(int minuteDebut) throws MinuteInvalideException {
        if (minuteDebut >= 0 && minuteDebut <= 59) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setMinuteDebut(" + minuteDebut + ")");
            this.minuteDebut = minuteDebut;
        } else {
            LOGGER.log(Level.WARNING, "La valeur " + duree + " n'est pas entre 0 et 59. Ce n'est donc pas une minute de début valide.");
            throw new MinuteInvalideException("Vous avez essayé de donner une valeur de minute à une intervention " +
                    "qui n'est pas entre 0 et 59.");
        }
    }

    /**
     * Le setteur qui initialise la date.
     * @param jour : Le numéro du jour dans le mois.
     * @param mois : Le numéro du mois de l'année.
     * @param annee : L'année.
     * @throws DateInvalideException Si la date n'est pas valide.
     */
    public void setDate(int jour, int mois, int annee) throws DateInvalideException {
        if (annee < 24 || annee > 99 && annee < 2024 || annee >= 10000) {
            LOGGER.log(Level.WARNING, "La valeur " + annee + " n'est pas une année valide. " +
                    "(méthode setDate(" + jour + ", " + mois + ", " + annee + "))");
            throw new DateInvalideException("Vous avez essayé d'initialiser une valeur de date inférieure " +
                    "à la date de création de LiveSet pour votre concert. \n" +
                    "Veuillez nous excuser, mais LiveSet est un logiciel d'organisation de concerts. Si vous voulez " +
                    "entrer des données concernant les concerts passés, vous feriez mieux d'utiliser une base de données.");

        } else if (mois > 12 || mois <= 0) {
            LOGGER.log(Level.WARNING, "La valeur " + mois + " n'est pas entre 1 et 12. Ce n'est donc pas une année " +
                    "valide. (méthode setDate(" + jour + ", " + mois + ", " + annee + "))");
            throw new DateInvalideException("Vous avez essayé d'initialiser une valeur de mois qui n'est pas " +
                    "entre 1 et 12 pour la date de votre concert.");

        } else if (jour < 1 || jour > 31) {
            LOGGER.log(Level.WARNING, "La valeur " + jour + " n'est pas entre 1 et 31. " +
                    "(méthode setDate(" + jour + ", " + mois + ", " + annee + "))");
            throw new DateInvalideException("Vous avez essayé d'initialiser une valeur de jour impossible " +
                    "pour la date de votre concert.");

        } else if (jour == 31 && (mois == 4 || mois == 6 || mois == 9 || mois == 11) || jour > 29 && mois == 2) {
            LOGGER.log(Level.WARNING, "La valeur " + jour + " n'est pas valide pour le mois " + mois + ". " +
                    "(méthode setDate(" + jour + ", " + mois + ", " + annee + "))");
            throw new DateInvalideException("Vous avez essayé d'initialiser une valeur de jour impossible pour la date " +
                    "de votre concert. L'erreur peut aussi venir du mois qui n'inclut pas cette valeur de jour.");

        } else if (annee % 4 != 0 && mois == 2 && jour == 29) {
            LOGGER.log(Level.WARNING, "La valeur de date n'est pas valide. (méthode setDate(" + jour + ", " + mois + ", " + annee + "))");
            throw new DateInvalideException("Vous avez essayé d'initialiser une valeur de date " +
                    "un 29 Février d'une année non bissextile pour votre concert.");

        } else {
            if (jour >= 10 && mois >= 10) {
                LOGGER.log(Level.CONFIG, "Appel de la méthode setDate(" + jour + ", " + mois + ", " + annee +") de concert");
                this.date = jour + "/" + mois + "/" + annee;

            } else if (jour >= 10 && mois < 10) {
                LOGGER.log(Level.CONFIG, "Appel de la méthode setDate(" + jour + ", " + mois + ", " + annee +") " +
                        "de concert et ajout d'un 0 devant le mois.");
                this.date = jour + "/0" + mois + "/" + annee;

            } else if (jour < 10 && mois >= 10) {
                LOGGER.log(Level.CONFIG, "Appel de la méthode setDate(" + jour + ", " + mois + ", " + annee +") " +
                        "de concert et ajout d'un 0 devant le jour.");
                this.date = "0" + jour + "/" + mois + "/" + annee;

            } else {
                LOGGER.log(Level.CONFIG, "Appel de la méthode setDate(" + jour + ", " + mois + ", " + annee +") " +
                        "de concert et ajout d'un 0 devant le jour et le mois.");
                this.date = "0" + jour + "/0" + mois + "/" + annee;
            }
        }
    }

    /**
     * Renvoie le nom du concert.
     * @return Le nom du concert.
     */
    public String getNom() {
        return nom;
    }

    /**
     * Définit le nom du concert.
     * @param nom Le nom du concert.
     */
    public void setNom(String nom) {
        this.nom = nom;
    }

    /**
     * Renvoie la date du concert.
     * @return La date du concert.
     */
    public String getDate() {
        return date;
    }

    private void ajouterCoutTotal(double cout) {
        coutTotal = coutTotal + cout;
    }

    private void soustraireCoutTotal(double cout) {
        coutTotal = coutTotal - cout;   // Les méthodes de calcul de coût des autre classes se chargent du fait que le coût total ne soit pas négatif.
    }

    /**
     * Définit le prix du billet.
     * @param prixBillet Le prix du billet.
     * @throws NonPositifException Si le prix est négatif.
     */
    public void setPrixBillet(double prixBillet) throws NonPositifException {
        if (prixBillet >= 0) {
            LOGGER.log(Level.CONFIG, "Appel de la méthode setPrixBillet(" + prixBillet + ") d'un concert.");
            this.prixBillet = prixBillet;

        } else {
            LOGGER.log(Level.WARNING, "La valeur de prixBillet n'est pas valide. (méthode setPrixBillet(" + prixBillet +
                    ") d'un concert)");
            throw new NonPositifException("Vous avez essayé d'insérer une valeur négative pour le prix du billet.");
        }
    }

    /**
     * La méthode addSousTraitance() ajoute une sous-traitance et ajoute son coût dans coutTotal.
     * @param type : Le type de sous-traitance
     * @param sousTraitance : La sous-traitance.
     */
    public void addSousTraitance(String type, SousTraitance sousTraitance) {
        ajouterCoutTotal(sousTraitance.getCout());
        sousTraitances.put(type, sousTraitance);
    }


    /**
     * Supprime une sous-traitance.
     * @param type Le type de sous-traitance à supprimer.
     */
    public void removeSousTraitance(String type) {
        sousTraitances.remove(type);
    }


    /**
     * Définit le lieu du concert.
     * @param nom Le nom du lieu.
     * @param numero Le numéro de rue du lieu.
     * @param rue La rue du lieu.
     * @param pays Le pays du lieu.
     * @param commune La commune du lieu.
     * @param capacite La capacité du lieu.
     * @param prix Le prix du lieu.
     * @param eMail L'email du lieu.
     * @param telephone Le téléphone du lieu.
     * @throws NonPositifException Si le prix est négatif.
     * @throws TelephoneInvalideException Si le téléphone est invalide.
     */
    public void setLieu(String nom, int numero, String rue, String pays, String commune, int capacite, double prix,
                        String eMail, String telephone) throws NonPositifException, TelephoneInvalideException {
        if (lieu != null) {
            soustraireCoutTotal(lieu.getPrix());
        }
        lieu = new Lieu(nom, capacite, prix, new Adresse(numero, rue, pays, commune), new Contact(telephone, eMail));
        ajouterCoutTotal(prix);
        LOGGER.log(Level.CONFIG, "Appel de la méthode setLieu() d'un concert.");
    }


    /**
     * Définit l'artiste du concert.
     * @param nomScene Le nom de scène de l'artiste.
     * @param cout Le coût de l'artiste.
     * @param telephone Le téléphone de l'artiste.
     * @param eMail L'email de l'artiste.
     * @param nomManager Le nom du manager de l'artiste.
     * @param prenomManager Le prénom du manager de l'artiste.
     * @throws NonPositifException Si le coût est négatif.
     * @throws TelephoneInvalideException Si le téléphone est invalide.
     */
    public void setArtiste(String nomScene, double cout, String telephone, String eMail, String nomManager, String prenomManager)
            throws NonPositifException, TelephoneInvalideException {
        if (artiste != null) {
            soustraireCoutTotal(artiste.getCout());
        }
        artiste = new Artiste(new Contact(telephone, eMail), nomManager, prenomManager, nomScene, cout);
        ajouterCoutTotal(cout);
        LOGGER.log(Level.CONFIG, "Appel de la méthode setArtiste() d'un concert.");
    }

    /**
     * Renvoie le prix du billet.
     * @return Le prix du billet.
     */
    public double getPrixBillet() {
        return prixBillet;
    }

    /**
     * Renvoie l'heure de début du concert.
     * @return L'heure de début du concert.
     */
    public int getHeureDebut() {
        return heureDebut;
    }

    /**
     * Renvoie la minute de début du concert.
     * @return La minute de début du concert.
     */
    public int getMinuteDebut() {
        return minuteDebut;
    }

    /**
     * Renvoie la durée du concert.
     * @return La durée du concert.
     */
    public int getDuree() {
        return duree;
    }

    /**
     * Renvoie le coût total de l'organisation du concert.
     * @return Le coût total de l'organisation du concert.
     */
    public double getCoutTotal() {
        return coutTotal;
    }

    /**
     * Renvoie le lieu du concert.
     * @return Le lieu du concert.
     */
    public Lieu getLieu() {
        return lieu;
    }

    /**
     * Renvoie l'artiste du concert.
     * @return L'artiste du concert.
     */
    public Artiste getArtiste() {
        return artiste;
    }

    /**
     * Renvoie les sous-traitances du concert.
     * @return Les sous-traitances du concert.
     */
    public HashMap<String, SousTraitance> getSousTraitances() {
        return sousTraitances;
    }

    /**
     * Renvoie le jour du début du concert.
     * @return Le jour du début du concert.
     */
    public int getJourDebut() { return Integer.parseInt(date.substring(0, 2)); }


    /**
     * Renvoie le mois dans lequel le concert se déroule.
     * @return Le mois dans lequel le concert se déroule.
     */
    public int getMoisDebut() { return Integer.parseInt(date.substring(3, 5)); }


    /**
     * Renvoie l'année dans laquelle le concert se déroule.
     * @return L'année dans laquelle le concert se déroule.
     */
    public int getAnneeDebut() { return Integer.parseInt(date.substring(6)); }
}
