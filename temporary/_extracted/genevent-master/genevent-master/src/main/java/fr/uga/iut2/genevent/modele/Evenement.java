package fr.uga.iut2.genevent.modele;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;


/**
 * Représente un événement avec un nom, une date de début, une date de fin et des administrateurs.
 * Implémente l'interface Serializable pour permettre la sérialisation de ses instances.
 */
public class Evenement implements Serializable {

    private static final long serialVersionUID = 1L;  // nécessaire pour la sérialisation
    // Attributs de la classe
    private final GenEvent genevent;
    private final String nom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private final Map<String, Utilisateur> administrateurs;  // association qualifiée par l'email

    // Invariant de classe : !dateDebut.isAfter(dateFin)
    //     On utilise la négation ici pour exprimer (dateDebut <= dateFin), ce
    //     qui est équivalent à !(dateDebut > dateFin).

    /**
     * Méthode statique pour initialiser un événement avec un administrateur.
     *
     * @param genevent  Le gestionnaire d'événements associé.
     * @param nom       Le nom de l'événement.
     * @param dateDebut La date de début de l'événement.
     * @param dateFin   La date de fin de l'événement.
     * @param admin     L'administrateur de l'événement.
     * @return L'événement initialisé.
     */
    public static Evenement initialiseEvenement(GenEvent genevent, String nom, LocalDate dateDebut, LocalDate dateFin, Utilisateur admin) {
        // Création d'une nouvelle instance d'Evenement
        Evenement evt = new Evenement(genevent, nom, dateDebut, dateFin);
        // Ajout de l'administrateur à l'événement
        evt.ajouteAdministrateur(admin);
        // Renvoie l'événement initialisé
        return evt;
    }

    /**
     * Constructeur pour initialiser un événement.
     *
     * @param genevent  Le gestionnaire d'événements associé.
     * @param nom       Le nom de l'événement.
     * @param dateDebut La date de début de l'événement.
     * @param dateFin   La date de fin de l'événement.
     */
    public Evenement(GenEvent genevent, String nom, LocalDate dateDebut, LocalDate dateFin) {
        // Vérification de l'invariant : dateDebut doit être avant ou égale à dateFin
        assert !dateDebut.isAfter(dateFin);
        this.genevent = genevent;
        this.nom = nom;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.administrateurs = new HashMap<>();
    }

    // Getters & Setters
    public String getNom() {
        return this.nom;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }


    public void setDateDebut(LocalDate dateDebut) {
        assert !dateDebut.isAfter(this.dateFin);
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        assert !this.dateDebut.isAfter(dateFin);
        this.dateFin = dateFin;
    }

    /**
     * Ajoute un administrateur à l'événement.
     *
     * @param admin L'administrateur à ajouter.
     */
    public void ajouteAdministrateur(Utilisateur admin) {
        // Vérification que l'administrateur n'est pas déjà dans la liste
        assert !this.administrateurs.containsKey(admin.getEmail());
        // Ajout de l'administrateur à la carte des administrateur
        this.administrateurs.put(admin.getEmail(), admin);
        // Ajout de l'événement à la liste des événements administrés par cet utilisateur
        admin.ajouteEvenementAdministre(this);
    }
}
