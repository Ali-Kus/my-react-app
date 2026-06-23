package fr.iut2.saeprojet.api;

import androidx.annotation.NonNull;

public enum EtatCandidatureEnum {
    OFFRE_RETENUE("/api/etat_candidatures/1", "Offre retenue"),
    ATTENTE_REPONSE("/api/etat_candidatures/2", "En attente de réponse"),
    REFUSEE("/api/etat_candidatures/3", "Refusée"),
    ATTENTE_RDV("/api/etat_candidatures/4", "En attente de RDV"),
    ATTENTE_ENTRETIEN("/api/etat_candidatures/5", "En attente d'entretien"),
    ACCEPTEE("/api/etat_candidatures/6", "Acceptée");

    private final String _id;
    private final String label;

    EtatCandidatureEnum(String _id, String label) {
        this._id = _id;
        this.label = label;
    }

    public String get_id() {
        return this._id;
    }

    public String getLabel() {
        return this.label;
    }

    @NonNull
    @Override
    public String toString() {
        return this.label;
    }
}
