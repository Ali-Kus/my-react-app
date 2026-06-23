package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;


/**
 * Représente un gestionnaire d'événements qui contient des utilisateurs et des événements.
 * Implémente l'interface Serializable pour permettre la sérialisation de ses instances.
 */
public class GenEvent implements Serializable {

    private static final long serialVersionUID = 1L;  // nécessaire pour la sérialisation
    // Attributs de la classe
    private final Map<String, Utilisateur> utilisateurs;  // association qualifiée par l'email
    private final Map<String, Evenement> evenements;  // association qualifiée par le nom
    private final Map<String, Concert> concerts;  // association qualifiée par le nom du concert

    /**
     * Constructeur pour initialiser les cartes d'utilisateurs et d'événements.
     */
    public GenEvent() {
        this.utilisateurs = new HashMap<>();
        this.evenements = new HashMap<>();
        this.concerts = new HashMap<>();
    }


    /**
     * Ajoute un utilisateur.
     *
     * @param email   L'email de l'utilisateur.
     * @param nom     Le nom de l'utilisateur.
     * @param prenom  Le prénom de l'utilisateur.
     * @return true si l'utilisateur a été ajouté avec succès, false s'il existe déjà.
     */
    public boolean ajouteUtilisateur(String email, String nom, String prenom) {
        // Vérifie si l'utilisateur existe déjà
        if (this.utilisateurs.containsKey(email)) {
            return false;// Utilisateur déjà présent
        } else {
            // Ajoute le nouvel utilisateur à la carte
            this.utilisateurs.put(email, new Utilisateur(email, nom, prenom));
            System.out.println("Ajout de l'utilisateur");
            return true;// Utilisateur ajouté avec succès
        }
    }

    /**
     * Renvoie la carte des événements.
     *
     * @return La carte des événements.
     */
    public Map<String, Evenement> getEvenements() {
        return this.evenements;
    }

    /**
     * Crée et ajoute un nouvel événement.
     *
     * @param nom       Le nom de l'événement.
     * @param dateDebut La date de début de l'événement.
     * @param dateFin   La date de fin de l'événement.
     * @param adminEmail L'email de l'administrateur de l'événement.
     */
    public void nouvelEvenement(String nom, LocalDate dateDebut, LocalDate dateFin, String adminEmail) {
        // Vérifie que l'événement n'existe pas déjà et que l'administrateur est un utilisateur existant
        assert !this.evenements.containsKey(nom); // Vérifie que l'événement n'existe pas déjà
        assert this.utilisateurs.containsKey(adminEmail);  // Vérifie que l'admin existe dans les utilisateurs

        // Récupère l'administrateur par son email
        Utilisateur admin = this.utilisateurs.get(adminEmail);

        // Initialise un nouvel événement avec l'administrateur
        Evenement evt = Evenement.initialiseEvenement(this, nom, dateDebut, dateFin, admin);

        // Ajoute le nouvel événement à la carte des événements
        this.evenements.put(nom, evt);
    }

    public void nouveauConcert(Concert concert) {
        // Vérifie que le concert n'existe pas déjà et que l'administrateur est un utilisateur existant
        assert !this.concerts.containsKey(concert.getNom()); // Vérifie que le concert n'existe pas déjà
        assert this.utilisateurs.containsKey("email@gmail.com");  // Vérifie que l'admin existe dans les utilisateurs

        // Récupère l'administrateur par son email
        Utilisateur admin = this.utilisateurs.get("email@gmail.com");
        admin.ajoutConcertAdministre(concert);


        // Ajoute le nouveau concert à la carte des concerts
        concerts.put(concert.getNom(), concert);
    }

    public void suppressionConcert(String nomConcert) {
        concerts.remove(nomConcert);
    }

    public Map<String, Concert> getConcerts() {
        return this.concerts;
    }

}
