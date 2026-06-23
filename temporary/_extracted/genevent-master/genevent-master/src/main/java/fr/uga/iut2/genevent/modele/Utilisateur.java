package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.validator.routines.EmailValidator;


/**
 * Représente un utilisateur avec un email, un nom, un prénom, et les événements qu'il administre.
 * Implémente l'interface Serializable pour permettre la sérialisation de ses instances.
 */
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;  // nécessaire pour la sérialisation
    // Attributs de la classe
    private final String email;
    private String nom;
    private String prenom;
    private final Map<String, Evenement> evenementsAdministres;  // association qualifiée par le nom
    private final Map<String, Concert> concertsAdministres;  // association qualifiée par le nom du concert

    /**
     * Constructeur pour initialiser un utilisateur avec son email, nom et prénom.
     *
     * @param email   L'email de l'utilisateur.
     * @param nom     Le nom de l'utilisateur.
     * @param prenom  Le prénom de l'utilisateur.
     */
    public Utilisateur(String email, String nom, String prenom) {
        // Vérifie que l'email est valide
        assert EmailValidator.getInstance(false, false).isValid(email);
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.evenementsAdministres = new HashMap<>();
        this.concertsAdministres = new HashMap<>();
    }

    // Getters & Setters
    public String getEmail() {
        return this.email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    /**
     * Ajoute un événement administré par cet utilisateur.
     *
     * @param evt L'événement à ajouter.
     */
    public void ajouteEvenementAdministre(Evenement evt) {
        // Vérifie que l'événement n'est pas déjà administré par cet utilisateur
        assert !this.evenementsAdministres.containsKey(evt.getNom());
        // Ajoute l'événement à la carte des événements administrés
        this.evenementsAdministres.put(evt.getNom(), evt);
    }

    public void ajoutConcertAdministre(Concert concert) {
        // Vérifie que le concert n'est pas déjà administré par cet utilisateur
        assert !this.concertsAdministres.containsKey(concert.getNom());
        // Ajoute le concert à la carte des concerts administrés
        this.concertsAdministres.put(concert.getNom(), concert);
    }

}
