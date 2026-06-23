package fr.uga.iut2.genevent.util;

import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.paint.Color;

/**
 * Classe utilitaire pour la validation des champs de texte en JavaFX.
 * Fournit des méthodes pour valider et indiquer visuellement les résultats de validation sur un {@link TextField}.
 */
public class FieldValidator {

    private final TextField textField;


    private Label label;

    /**
     * Construit une instance de {@code FieldValidator} pour un {@link TextField}.
     *
     * @param textField le champ de texte à valider
     */
    public FieldValidator(TextField textField) {
        this.textField = textField;
    }

    /**
     * Construit une instance de {@code FieldValidator} pour un {@link TextField} avec un {@link Label} associé.
     * La couleur du texte du label changera en fonction du résultat de la validation.
     *
     * @param textField le champ de texte à valider
     * @param label     le label associé au champ de texte pour indiquer l'état de validation
     */
    public FieldValidator(TextField textField, Label label) {
        this.textField = textField;
        this.label = label;
    }


    /**
     * Valide le champ de texte associé.
     * Applique une bordure rouge sur le champ de texte et change la couleur du texte du label en rouge si le champ de texte est vide.
     * Réinitialise le style du champ de texte et la couleur du texte du label à leur valeur par défaut si le champ de texte n'est pas vide.
     */
    public void validate() {
        if (textField.getText().isEmpty()) {
            textField.setStyle("-fx-border-color: rgb(200, 0, 0);");
            if (label != null) {
                label.setTextFill(Color.rgb(200, 0, 0));
            }
        } else {
            textField.setStyle(null);
            if (label != null) {
                label.setTextFill(Color.BLACK);
            }
        }
    }

}
