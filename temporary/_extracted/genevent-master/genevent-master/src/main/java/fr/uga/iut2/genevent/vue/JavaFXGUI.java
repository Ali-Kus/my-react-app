package fr.uga.iut2.genevent.vue;

import fr.uga.iut2.genevent.Main;
import fr.uga.iut2.genevent.controleur.Controleur;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CountDownLatch;
import java.util.logging.Level;
import java.util.logging.Logger;

import fr.uga.iut2.genevent.modele.*;
import fr.uga.iut2.genevent.util.FieldValidator;
import fr.uga.iut2.genevent.util.Persisteur;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;
import org.apache.commons.validator.routines.EmailValidator;


/**
 * La classe JavaFXGUI est responsable des interactions avec
 * l'utilisa·teur/trice en mode graphique.
 * <p>
 * Attention, pour pouvoir faire le lien avec le
 * {@link fr.uga.iut2.genevent.controleur.Controleur}, JavaFXGUI n'est pas une
 * sous-classe de {@link javafx.application.Application} !
 * <p>
 * Le démarrage de l'application diffère des exemples classiques trouvés dans
 * la documentation de JavaFX : l'interface est démarrée à l'initiative du
 * {@link fr.uga.iut2.genevent.controleur.Controleur} via l'appel de la méthode
 * {@link #demarrerInteraction()}.
 */
public class JavaFXGUI extends IHM {

    private final Controleur controleur;
    private final CountDownLatch eolBarrier;  // /!\ ne pas supprimer /!\ : suivi de la durée de vie de l'interface

    Concert concert = new Concert();
    GenEvent genevent;

    private boolean modification = false;
    private String modifacationNom;

    // éléments vue nouvel·le utilisa·teur/trice
    @FXML private TextField newUserForenameTextField;
    @FXML private TextField newUserSurnameTextField;
    @FXML private TextField newUserEmailTextField;
    @FXML private Button newUserOkButton;
    @FXML private Button newUserCancelButton;


    @FXML private Button btnCreer;
    @FXML private Button btnGerer;
    @FXML private Label labelNbConcerts;
    @FXML private Button btnRetourGerer;

    @FXML private Button btnSupprimerAnnuler;

    // éléments vue create.fxml
    @FXML private Button btnNext1;
    @FXML private Button btnNext2;
    @FXML private Button btnNext3;
    @FXML private Button btnNext4;

    @FXML private Button btnBack2;
    @FXML private Button btnBack3;
    @FXML private Button btnBack4;
    @FXML private Button btnBack5;


    // --------------- create1.fxml ----------------
    @FXML private Label labelNomConcert;
    @FXML private TextField tfNomConcert;
    @FXML private Label labelPrixBillet;
    @FXML private TextField tfPrixBillet;
    @FXML private Label labelDateJour;
    @FXML private TextField tfDateJour;
    @FXML private Label labelDateMois;
    @FXML private TextField tfDateMois;
    @FXML private Label labelDateAnnee;

    @FXML private TextField tfDateAnnee;
    @FXML private Label labelHeureDebut;
    @FXML private TextField tfHeureDebut;
    @FXML private Label labelMinuteDebut;
    @FXML private TextField tfMinuteDebut;
    @FXML private Label labelDuree;
    @FXML private TextField tfDuree;

    // --------------- create2.fxml ----------------
    @FXML private TextField tfNomLieu;
    @FXML private TextField tfNumeroLieu;
    @FXML private TextField tfRueLieu;
    @FXML private TextField tfCommuneLieu;
    @FXML private TextField tfPaysLieu;
    @FXML private TextField tfPlaceMaxi;
    @FXML private TextField tfPrixLieu;
    @FXML private TextField tfEmailLieu;
    @FXML private TextField tfTelLieu;


    // --------------- create3.fxml ----------------
    @FXML private ComboBox cbxMateriels;
    @FXML private ComboBox cbxSecurite;
    @FXML private ComboBox cbxSecours;
    @FXML private ComboBox cbxPublicite;
    @FXML private ComboBox cbxStands;


    // --------------- create4.fxml ----------------
    @FXML private TextField tfNomSceneArtiste;
    @FXML private TextField tfPrenomArtiste;
    @FXML private TextField tfNomArtiste;
    @FXML private TextField tfCachetArtiste;
    @FXML private TextField tfEmailArtiste;
    @FXML private TextField tfTelephoneArtiste;

    // --------------- create4.fxml ----------------
/*    @FXML private Label labelNomConcert;
    @FXML private Label labelPrixBillet;*/
    @FXML private Label labelDateConcert;
    @FXML private Label labelAdresseLieu;
    @FXML private Label labelPlaceMaxi;
    @FXML private Label labelPrixLieu;
    @FXML private Label labelEmailLieu;
    @FXML private Label labelTelLieu;
    @FXML private Label labelMaterielsNom;
    @FXML private Label labelMaterielsPrix;
    @FXML private Label labelSecuriteNom;
    @FXML private Label labelSecuritePrix;
    @FXML private Label labelSecoursNom;
    @FXML private Label labelSecoursPrix;
    @FXML private Label labelPubliciteNom;
    @FXML private Label labelPublicitePrix;
    @FXML private Label labelStandsNom;
    @FXML private Label labelStandsPrix;
    @FXML private Label labelNomSceneArtiste;
    @FXML private Label labelCachetArtiste;
    @FXML private Label labelPrenomArtiste;
    @FXML private Label labelNomArtiste;
    @FXML private Label labelEmailArtiste;
    @FXML private Label labelTelephoneArtiste;

    // --------------- gerer.fxml ----------------
    @FXML private VBox containerGerer;


    private static Logger LOGGER = Logger.getLogger(JavaFXGUI.class.getPackageName());




    /**
     * Constructeur de la classe JavaFXGUI.
     *
     * @param controleur le contrôleur de l'application.
     */
    public JavaFXGUI(Controleur controleur) {
        this.controleur = controleur;
        this.genevent = controleur.getGenevent();
        this.eolBarrier = new CountDownLatch(1);  // /!\ ne pas supprimer /!\
    }

    /**
     * Point d'entrée principal pour le code de l'interface JavaFX.
     *
     * @param primaryStage stage principale de l'interface JavaFX, sur laquelle
     *     définir des scenes.
     *
     * @throws IOException si le chargement de la vue FXML échoue.
     *
     * @see javafx.application.Application#start(Stage)
     */
    private void start(Stage primaryStage) throws IOException {
        FXMLLoader mainViewLoader = new FXMLLoader(getClass().getResource("home.fxml"));
        mainViewLoader.setController(this);
        Scene mainScene = new Scene(mainViewLoader.load());

        primaryStage.setTitle("LiveSet - Gestion de concerts");
        primaryStage.setScene(mainScene);
        primaryStage.show();
    }

//-----  Page home.fxml  -------------------------------------------------

    /**
     * Action appelée lors du clic sur le bouton "Créer" de la page d'accueil.
     *
     * @throws IOException si le chargement de la vue FXML échoue.
     */
    @FXML
    private void onActionBtnCreer() throws IOException {
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create1.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnCreer.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton créer a été géré avec succès.");
    }

    /**
     * Action appelée lors du clic sur le bouton "Gérer" de la page d'accueil.
     *
     * @throws IOException si le chargement de la vue FXML échoue.
     */
    @FXML
    private void onActionBtnGerer() throws IOException {
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("gerer.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnGerer.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        onLoadConcert();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton gérer a été géré avec succès.");
    }

//-----  create.fxml  -------------------------------------------------
    // -----------------------------------------------------

    /**
     * Charge les informations de la première étape de création d'un concert.
     */
    @FXML
    private void loadCreate1() {
        tfNomConcert.setText(concert.getNom());
        tfPrixBillet.setText(String.valueOf(concert.getPrixBillet()));
        tfDateJour.setText(String.valueOf(concert.getJourDebut()));
        tfDateMois.setText(String.valueOf(concert.getMoisDebut()));
        tfDateAnnee.setText(String.valueOf(concert.getAnneeDebut()));
        tfHeureDebut.setText(String.valueOf(concert.getHeureDebut()));
        tfMinuteDebut.setText(String.valueOf(concert.getMinuteDebut()));
        tfDuree.setText(String.valueOf(concert.getDuree()));

        LOGGER.log(Level.INFO, "Le chargement de la fenêtre create1 a été géré avec succès.");
    }

    /**
     * Charge les informations de la deuxième étape de création d'un concert.
     */
    @FXML
    private void loadCreate2() {
        if(concert.getLieu() != null){
            tfNomLieu.setText(concert.getLieu().getNom());
            tfNumeroLieu.setText(String.valueOf(concert.getLieu().getAdresse().getNumero()));
            tfRueLieu.setText(concert.getLieu().getAdresse().getRue());
            tfCommuneLieu.setText(concert.getLieu().getAdresse().getCommune());
            tfPaysLieu.setText(concert.getLieu().getAdresse().getPays());
            tfPlaceMaxi.setText(String.valueOf(concert.getLieu().getCapacite()));
            tfPrixLieu.setText(String.valueOf(concert.getLieu().getPrix()));
            tfEmailLieu.setText(concert.getLieu().getContact().getMail());
            tfTelLieu.setText(concert.getLieu().getContact().getTelephone());

            LOGGER.log(Level.INFO, "Le chargement de la fenêtre create2 a été géré avec succès.");
        }
    }

    /**
     * Charge les informations de la troisième étape de création d'un concert.
     */
    @FXML
    private void loadCreate3() {
        if(!concert.getSousTraitances().isEmpty()){
            cbxMateriels.getSelectionModel().select(concert.getSousTraitances().get("Materiels").getNom());
            cbxSecurite.getSelectionModel().select(concert.getSousTraitances().get("Sécurité").getNom());
            cbxSecours.getSelectionModel().select(concert.getSousTraitances().get("Secours").getNom());
            cbxPublicite.getSelectionModel().select(concert.getSousTraitances().get("Publicité").getNom());
            cbxStands.getSelectionModel().select(concert.getSousTraitances().get("Stands").getNom());

            LOGGER.log(Level.INFO, "Le chargement de la fenêtre create3 a été géré avec succès.");
        }
    }

    /**
     * Charge les informations de la quatrième étape de création d'un concert.
     */
    @FXML
    private void loadCreate4() {
        if(concert.getArtiste() != null){
            tfNomSceneArtiste.setText(concert.getArtiste().getNomScene());
            tfPrenomArtiste.setText(concert.getArtiste().getPrenomManager());
            tfNomArtiste.setText(concert.getArtiste().getNomManager());
            tfCachetArtiste.setText(String.valueOf(concert.getArtiste().getCout()));
            tfEmailArtiste.setText(concert.getArtiste().getContact().getMail());
            tfTelephoneArtiste.setText(concert.getArtiste().getContact().getTelephone());

            LOGGER.log(Level.INFO, "Le chargement de la fenêtre create4 a été géré avec succès.");
        }
    }

    /**
     * Charge les informations récapitulatives de la création d'un concert.
     */
    @FXML
    private void loadCreate5() {
        labelNomConcert.setText(concert.getNom());
        labelPrixBillet.setText(concert.getPrixBillet() + " €");
        labelDateConcert.setText(concert.getDateComplete());
        labelAdresseLieu.setText(concert.getLieu().getAdresse().getNumero() + " " + concert.getLieu().getAdresse().getRue() + " " + concert.getLieu().getAdresse().getCommune() + " " + concert.getLieu().getAdresse().getPays());
        labelPlaceMaxi.setText(String.valueOf(concert.getLieu().getCapacite()));
        labelPrixLieu.setText(concert.getLieu().getPrix() + " €");
        labelEmailLieu.setText(concert.getLieu().getContact().getMail());
        labelTelLieu.setText(concert.getLieu().getContact().getTelephone());
        labelMaterielsNom.setText(concert.getSousTraitances().get("Materiels").getNom());
        labelMaterielsPrix.setText("1 746 €");
        labelSecuriteNom.setText(concert.getSousTraitances().get("Sécurité").getNom());
        labelSecuritePrix.setText("2 137 €");
        labelSecoursNom.setText(concert.getSousTraitances().get("Secours").getNom());
        labelSecoursPrix.setText("0");
        labelPubliciteNom.setText(concert.getSousTraitances().get("Publicité").getNom());
        labelPublicitePrix.setText("3 222 €");
        labelStandsNom.setText(concert.getSousTraitances().get("Stands").getNom());
        labelStandsPrix.setText("988 €");
        labelNomSceneArtiste.setText(concert.getArtiste().getNomScene());
        labelCachetArtiste.setText(concert.getArtiste().getCout() + " €");
        labelPrenomArtiste.setText(concert.getArtiste().getPrenomManager());
        labelNomArtiste.setText(concert.getArtiste().getNomManager());
        labelEmailArtiste.setText(concert.getArtiste().getContact().getMail());
        labelTelephoneArtiste.setText(concert.getArtiste().getContact().getTelephone());

        LOGGER.log(Level.INFO, "Le chargement de la fenêtre create5 a été géré avec succès.");
    }

    // -----------------------------------------------------


    /**
     * Méthode appelée lors du clic sur le bouton "Annuler".
     * @throws IOException
     */
    @FXML
    private void onActionBtnAnnuler() throws IOException {
        FXMLLoader newEventViewLoader;
        if(!modification) {
            newEventViewLoader = new FXMLLoader(getClass().getResource("home.fxml"));
        } else {
            newEventViewLoader = new FXMLLoader(getClass().getResource("gerer.fxml"));
        }
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnNext1.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        concert = new Concert();
        if(!modification) onLoadConcert();
        newEventWindow.show();

        LOGGER.log(Level.INFO, "Le clic sur le bouton Annuler a été géré avec succès.");
    }

    // -----------------------------------------------------

    /**
     * Méthode appelée lors du clic sur le bouton "Suivant". Ajoute les données de la page dans notre objet concert
     * @throws IOException
     */
    @FXML
    private void onActionNext1() throws IOException, DateInvalideException, NonPositifException, HeureInvalideException, MinuteInvalideException {
        FieldValidator nomConcertValidator = new FieldValidator(tfNomConcert, labelNomConcert);
        FieldValidator prixBilletValidator = new FieldValidator(tfPrixBillet, labelPrixBillet);
        FieldValidator dateJourValidator = new FieldValidator(tfDateJour, labelDateJour);
        FieldValidator dateMoisValidator = new FieldValidator(tfDateMois, labelDateMois);
        FieldValidator dateAnneeValidator = new FieldValidator(tfDateAnnee, labelDateAnnee);
        FieldValidator dateHeureDebutValidator = new FieldValidator(tfHeureDebut,labelHeureDebut);
        FieldValidator dateMinuteDebutValidator = new FieldValidator(tfMinuteDebut);
        FieldValidator dateDuree = new FieldValidator(tfDuree, labelDuree);


        nomConcertValidator.validate();
        prixBilletValidator.validate();
        dateJourValidator.validate();
        dateMoisValidator.validate();
        dateAnneeValidator.validate();
        dateHeureDebutValidator.validate();
        dateMinuteDebutValidator.validate();
        dateDuree.validate();

        if(this.tfNomConcert.getText().isEmpty() || this.tfPrixBillet.getText().isEmpty() || this.tfHeureDebut.getText().isEmpty() || this.tfDuree.getText().isEmpty() || this.tfDateJour.getText().isEmpty() || this.tfDateMois.getText().isEmpty() || this.tfDateAnnee.getText().isEmpty()){
            this.informerUtilisateur("Veuillez remplir tous les champs", false);
        } else {
            try {
                concert.setNom(this.tfNomConcert.getText());
                concert.setPrixBillet(Double.parseDouble(this.tfPrixBillet.getText()));
                concert.setDate(Integer.parseInt(this.tfDateJour.getText()), Integer.parseInt(this.tfDateMois.getText()), Integer.parseInt(this.tfDateAnnee.getText()));
                concert.setHeureDebut(Integer.parseInt(this.tfHeureDebut.getText()));
                concert.setMinuteDebut(Integer.parseInt(this.tfMinuteDebut.getText()));
                concert.setDuree(Integer.parseInt(this.tfDuree.getText()));
                FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create2.fxml"));
                newEventViewLoader.setController(this);
                Scene newEventScene = new Scene(newEventViewLoader.load());

                Stage newEventWindow = (Stage) this.btnNext1.getScene().getWindow();
                newEventWindow.setScene(newEventScene);
                loadCreate2();
                newEventWindow.show();

                LOGGER.log(Level.INFO, "Le clic sur le bouton Suivant a été géré avec succès.");

            } catch (DateInvalideException e) {
                this.informerUtilisateur("La date est invalide", false);
            } catch (NonPositifException e) {
                this.informerUtilisateur("Veuillez entrer un nombre positif", false);
            } catch (HeureInvalideException e) {
                this.informerUtilisateur("L'heure est invalide", false);
            } catch (MinuteInvalideException e) {
                this.informerUtilisateur("La minute est invalide", false);
            } catch (NumberFormatException e) {
                this.informerUtilisateur("Veuillez entrer un nombre", false);
            }
        }
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Suivant". Ajoute les données de la page dans notre objet concert
     * @throws IOException
     */
    @FXML
    private void onActionNext2() throws IOException, NonPositifException, TelephoneInvalideException {
        if(this.tfNomLieu.getText().isEmpty() || this.tfNumeroLieu.getText().isEmpty() || this.tfRueLieu.getText().isEmpty() || this.tfCommuneLieu.getText().isEmpty() || this.tfPaysLieu.getText().isEmpty() || this.tfPlaceMaxi.getText().isEmpty() || this.tfPrixLieu.getText().isEmpty() || this.tfEmailLieu.getText().isEmpty() || this.tfTelLieu.getText().isEmpty()){
            this.informerUtilisateur("Veuillez remplir tous les champs", false);
            LOGGER.log(Level.WARNING, "Des champs nécessaires n'ont pas été remplis.");

        } else {
            try {
                concert.setLieu(this.tfNomLieu.getText(), Integer.parseInt(this.tfNumeroLieu.getText()), this.tfRueLieu.getText(), this.tfCommuneLieu.getText(), this.tfPaysLieu.getText(), Integer.parseInt(this.tfPlaceMaxi.getText()), Double.parseDouble(this.tfPrixLieu.getText()), this.tfEmailLieu.getText(), this.tfTelLieu.getText());
                FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create3.fxml"));
                newEventViewLoader.setController(this);
                Scene newEventScene = new Scene(newEventViewLoader.load());

                Stage newEventWindow = (Stage) this.btnNext2.getScene().getWindow();
                newEventWindow.setScene(newEventScene);
                loadCreate3();
                newEventWindow.show();

                LOGGER.log(Level.INFO, "Le clic sur le bouton Suivant a été géré avec succès.");

            } catch (NumberFormatException e) {
                LOGGER.log(Level.WARNING, "Impossible de convertir la valeur en nombre.");
                this.informerUtilisateur("Veuillez entrer un nombre", false);
            } catch (TelephoneInvalideException e) {
                this.informerUtilisateur("Veuillez entrer un numéro de téléphone valide", false);
            } catch (NonPositifException e) {
                this.informerUtilisateur("Veuillez entrer un nombre positif", false);
            }
        }
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Suivant". Ajoute les données de la page dans notre objet concert
     * @throws IOException
     */
    @FXML
    private void onActionNext3() throws IOException, NonPositifException, TelephoneInvalideException {
        if (this.cbxMateriels.getValue() == null || this.cbxSecurite.getValue() == null || this.cbxSecours.getValue() == null || this.cbxPublicite.getValue() == null || this.cbxStands.getValue() == null){
            this.informerUtilisateur("Veuillez remplir tous les champs", false);
            LOGGER.log(Level.WARNING, "Des champs nécessaires n'ont pas été remplis.");

        } else {
            try {
                concert.addSousTraitance("Materiels", new SousTraitance(0, (String) this.cbxMateriels.getValue(), "0781646204", "Matériels"));
                concert.addSousTraitance("Sécurité", new SousTraitance(0, (String) this.cbxSecurite.getValue(), "0781646204", "Sécurité"));
                concert.addSousTraitance("Secours", new SousTraitance(0, (String) this.cbxSecours.getValue(), "0781646204", "Secours"));
                concert.addSousTraitance("Publicité", new SousTraitance(0, (String) this.cbxPublicite.getValue(), "0781646204", "Publicité"));
                concert.addSousTraitance("Stands", new SousTraitance(0, (String) this.cbxStands.getValue(), "0781646204", "Stands"));
                FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create4.fxml"));
                newEventViewLoader.setController(this);
                Scene newEventScene = new Scene(newEventViewLoader.load());

                Stage newEventWindow = (Stage) this.btnNext3.getScene().getWindow();
                newEventWindow.setScene(newEventScene);
                loadCreate4();
                newEventWindow.show();

                LOGGER.log(Level.INFO, "Le clic sur le bouton Suivant a été géré avec succès.");

            } catch (NonPositifException e) {
                this.informerUtilisateur("Veuillez entrer un nombre positif", false);
            } catch (TelephoneInvalideException e) {
                this.informerUtilisateur("Veuillez entrer un numéro de téléphone valide", false);
            } catch (NumberFormatException e) {
                LOGGER.log(Level.WARNING, "Impossible de convertir la valeur en nombre.");
                this.informerUtilisateur("Veuillez entrer un nombre", false);
            }
        }
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Suivant". Ajoute les données de la page dans notre objet concert
     * @throws IOException
     */
    @FXML
    private void onActionNext4() throws IOException, NonPositifException, TelephoneInvalideException {
        if(this.tfNomSceneArtiste.getText().isEmpty() || this.tfPrenomArtiste.getText().isEmpty() || this.tfNomArtiste.getText().isEmpty() || this.tfCachetArtiste.getText().isEmpty() || this.tfEmailArtiste.getText().isEmpty() || this.tfTelephoneArtiste.getText().isEmpty()){
            this.informerUtilisateur("Veuillez remplir tous les champs", false);
            LOGGER.log(Level.WARNING, "Des champs nécessaires n'ont pas été remplis.");

        } else {
            try {
                concert.setArtiste(this.tfNomSceneArtiste.getText(), Double.parseDouble(this.tfCachetArtiste.getText()), this.tfTelephoneArtiste.getText(), this.tfEmailArtiste.getText(), this.tfNomArtiste.getText(), this.tfPrenomArtiste.getText());
                FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create5.fxml"));
                newEventViewLoader.setController(this);
                Scene newEventScene = new Scene(newEventViewLoader.load());

                Stage newEventWindow = (Stage) this.btnNext4.getScene().getWindow();
                newEventWindow.setScene(newEventScene);
                loadCreate5();
                newEventWindow.show();

                LOGGER.log(Level.INFO, "Le clic sur le bouton Suivant a été géré avec succès.");

            } catch (NumberFormatException e) {
                this.informerUtilisateur("Veuillez entrer un nombre", false);
            } catch (TelephoneInvalideException e) {
                this.informerUtilisateur("Veuillez entrer un numéro de téléphone valide", false);
            } catch (NonPositifException e) {
                LOGGER.log(Level.WARNING, "Impossible de convertir la valeur en nombre.");
                this.informerUtilisateur("Veuillez entrer un nombre positif", false);
            }
        }
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Terminer". Permettant la sauvegarde d'un événement dans la bdd
     * @throws IOException
     * @throws NonPositifException
     * @throws TelephoneInvalideException
     */
    @FXML
    private void onActionTerminerCreate() throws IOException, NonPositifException, TelephoneInvalideException {
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("gerer.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnBack5.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        if(!modification) {
            genevent.nouveauConcert(concert);
        } else {
            genevent.suppressionConcert(modifacationNom);
            genevent.nouveauConcert(concert);
            modification = false;
        }
        concert = new Concert();
        try {
            Persisteur.sauverEtat(genevent);
            LOGGER.log(Level.INFO, "Les données ont été sauvegardées avec succès.");
        }
        catch (IOException ignored) {
            LOGGER.log(Level.SEVERE, "Erreur irrécupérable pendant la sauvegarde de l'état : fin d'exécution !");
            System.err.flush();
            System.exit(Main.EXIT_ERR_SAVE);
        }
        onLoadConcert();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Terminer a été géré avec succès.");
    }

    // --------- Méthode de retour pour les pages create.fxml --------------------------------------------
    /**
     * Méthode appelée lors du clic sur le bouton "Retour".
     * @throws IOException
     */
    @FXML
    private void onActionBack2() throws IOException{
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create1.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnBack2.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        loadCreate1();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Retour a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Retour".
     * @throws IOException
     */
    @FXML
    private void onActionBack3() throws IOException{
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create2.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnBack3.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        loadCreate2();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Retour a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Retour".
     * @throws IOException
     */
    @FXML
    private void onActionBack4() throws IOException{
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create3.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnBack4.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        loadCreate3();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Retour a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Retour".
     * @throws IOException
     */
    @FXML
    private void onActionBack5() throws IOException{
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create4.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnBack5.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        loadCreate4();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Retour a été géré avec succès.");
    }

// ---- Gérer.fxml --------------------------------------------------------------------------------------------------

    /**
     * Méthode appelée lors du chargement de la page "Gérer". Elle ajoute les concerts à la liste.
     */
    public void onLoadConcert(){
        if(genevent.getConcerts() == null){
            labelNbConcerts.setText("Aucun concert");
        } else {
            labelNbConcerts.setText("Vos concerts ("+genevent.getConcerts().size()+")");
        }
        if(genevent.getConcerts() != null){
            containerGerer.getChildren().clear();
            Set<String> concerts = genevent.getConcerts().keySet();
            System.out.println(concerts);
            for(String concert : concerts){
                Concert concertTemp = genevent.getConcerts().get(concert);
                HBox hbox = new HBox();
                HBox hboxRight = new HBox();
                VBox vbox = new VBox();
                Button buttonModifier = new Button();
                Button buttonSupprimer = new Button();
                buttonModifier.setText("Modifier");
                buttonModifier.setId("btnGModifier"+concertTemp.getNom());
                buttonModifier.setOnAction(e -> {
                    try {
                        onActionBtnModifier(e);
                    } catch (IOException ioException) {
                        ioException.printStackTrace();
                    }
                });
                buttonSupprimer.setText("Supprimer");
                buttonSupprimer.setId("btnGSupprimer"+concertTemp.getNom());
                buttonSupprimer.setOnAction(e -> {
                    try {
                        onActionBtnSupprimer(e);
                    } catch (IOException ioException) {
                        ioException.printStackTrace();
                    }
                });
                hboxRight.getChildren().addAll(buttonModifier, buttonSupprimer);
                Node concertNomLabel = new Label(concertTemp.getNom());
                concertNomLabel.setStyle("-fx-font-weight: bold;");
                Node concertDateLabel = new Label(concertTemp.getDate());
                vbox.getChildren().addAll(concertNomLabel, concertDateLabel);
                hbox.getChildren().addAll(vbox, hboxRight);
                hbox.setStyle("-fx-border-color: #eee; -fx-border-width: 1px; -fx-padding: 5px; -fx-border-radius: 5px;");
                VBox.setMargin(hbox, new javafx.geometry.Insets(10, 0, 0, 0));
                containerGerer.getChildren().add(hbox);
            }
        }
        LOGGER.log(Level.INFO, "Le chargement de la page gérer a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Retour".
     * Cette méthode permet de revenir à l'écran d'accueil.
     *
     * @throws IOException si le fichier FXML ne peut pas être chargé
     */
    @FXML
    private void onActionBtnRetourHome() throws IOException {
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("home.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnRetourGerer.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Retour a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Modifier".
     * Cette méthode permet de passer à l'écran de modification d'un événement.
     *
     * @throws IOException si le fichier FXML ne peut pas être chargé
     */
    @FXML
    private void onActionBtnModifier(ActionEvent event) throws IOException {
        // récupérer l'id du bouton
        String id = ((Button) event.getSource()).getId();
        System.out.println(id);
        // extraire le nom du concert
        String nomConcert = id.substring(12);
        // récupérer le concert
        concert = genevent.getConcerts().get(nomConcert);
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("create/create1.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = (Stage) this.btnRetourGerer.getScene().getWindow();
        newEventWindow.setScene(newEventScene);
        modification = true;
        modifacationNom = nomConcert;
        loadCreate1();
        newEventWindow.show();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Modifier a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Supprimer".
     * Cette méthode permet d'ouvrir une fenêtre modale pour supprimer un événement.
     *
     * @throws IOException si le fichier FXML ne peut pas être chargé
     */
    @FXML
    private void onActionBtnSupprimer(ActionEvent event) throws IOException {
        // récupérer l'id du bouton
        String id = ((Button) event.getSource()).getId();
        // extraire le nom du concert
        String nomConcert = id.substring(13);
        // récupérer le concert
        concert = genevent.getConcerts().get(nomConcert);
        FXMLLoader newEventViewLoader = new FXMLLoader(getClass().getResource("supprimer.fxml"));
        newEventViewLoader.setController(this);
        Scene newEventScene = new Scene(newEventViewLoader.load());

        Stage newEventWindow = new Stage();
        newEventWindow.setTitle("Supprimer un événement");
        newEventWindow.initModality(Modality.APPLICATION_MODAL);
        newEventWindow.setScene(newEventScene);

        newEventWindow.showAndWait(); // Affiche la fenêtre et attend qu'elle soit fermée
        LOGGER.log(Level.INFO, "Le clic sur le bouton Supprimmer a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Annuler" de la fenêtre de suppression.
     * Cette méthode permet de fermer la fenêtre de suppression.
     *
     * @throws IOException si le fichier FXML ne peut pas être chargé
     */
    @FXML
    private void onActionBtnSupprimerAnnuler() throws IOException {
        Stage newEventWindow = (Stage) this.btnSupprimerAnnuler.getScene().getWindow();
        newEventWindow.close();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Annuler a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Valider" de la fenêtre de suppression.
     * Cette méthode doit implémenter la logique de validation de la suppression.
     *
     * @throws IOException si une erreur d'entrée/sortie se produit
     */
    @FXML
    private void onActionBtnSupprimerValider() throws IOException {
        genevent.suppressionConcert(concert.getNom());
        Stage newEventWindow = (Stage) this.btnSupprimerAnnuler.getScene().getWindow();
        onLoadConcert();
        newEventWindow.close();
        LOGGER.log(Level.INFO, "Le clic sur le bouton Valider a été géré avec succès.");
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Visualiser".
     * Cette méthode doit implémenter la logique de visualisation d'un événement.
     *
     * @throws IOException si une erreur d'entrée/sortie se produit
     */
    @FXML
    private void onActionBtnVisualiser() throws IOException {
        //
    }


//-----  Éléments du dialogue  -------------------------------------------------

    /**
     * Méthode pour notifier la fin de vie de l'interface JavaFX.
     */
    private void exitAction() {
        // fermeture de l'interface JavaFX : on notifie sa fin de vie
        this.eolBarrier.countDown();
    }

    // menu principal  -----

    /**
     * Méthode appelée lors du clic sur le menu "Nouvel Utilisateur".
     * Cette méthode permet d'ouvrir le formulaire de saisie d'un nouvel utilisateur.
     */
    @FXML
    private void newUserMenuItemAction() {
        this.controleur.saisirUtilisateur();
    }

    /**
     * Méthode appelée lors du clic sur le menu "Quitter".
     * Cette méthode permet de quitter l'application.
     */
    @FXML
    private void exitMenuItemAction() {
        Platform.exit();
        this.exitAction();
    }

    // vue nouvel·le utilisa·teur/trice  -----

    /**
     * Méthode appelée lors de la validation de la création d'un nouvel utilisateur.
     * Cette méthode récupère les informations saisies et crée un nouvel utilisateur.
     */
    @FXML
    private void createNewUserAction() {
        IHM.InfosUtilisateur data = new IHM.InfosUtilisateur(
                this.newUserEmailTextField.getText().strip().toLowerCase(),
                this.newUserSurnameTextField.getText().strip(),
                this.newUserForenameTextField.getText().strip()
        );
        this.controleur.creerUtilisateur(data);
        this.newUserOkButton.getScene().getWindow().hide();
    }

    /**
     * Méthode appelée lors du clic sur le bouton "Annuler" de la création d'un nouvel utilisateur.
     * Cette méthode permet de fermer le formulaire de création.
     */
    @FXML
    private void cancelNewUserAction() {
        this.newUserCancelButton.getScene().getWindow().hide();
    }

    /**
     * Méthode pour valider les champs de texte du formulaire de création d'un nouvel utilisateur.
     * Cette méthode vérifie que tous les champs obligatoires sont remplis et valides.
     */
    @FXML
    private void validateTextFields() {
        boolean isValid = true;

        isValid &= validateNonEmptyTextField(this.newUserForenameTextField);
        isValid &= validateNonEmptyTextField(this.newUserSurnameTextField);
        isValid &= validateEmailTextField(this.newUserEmailTextField);

        this.newUserOkButton.setDisable(!isValid);
    }

    /**
     * Marque le statut de validation d'un champ de texte.
     *
     * @param textField le champ de texte à valider
     * @param isValid   le statut de validation
     */
    private static void markTextFieldErrorStatus(TextField textField, boolean isValid) {
        if (isValid) {
            textField.setStyle(null);
        } else {
            textField.setStyle("-fx-control-inner-background: f8d7da");
        }
    }

    /**
     * Valide qu'un champ de texte n'est pas vide.
     *
     * @param textField le champ de texte à valider
     * @return true si le champ n'est pas vide, false sinon
     */
    private static boolean validateNonEmptyTextField(TextField textField) {
        boolean isValid = textField.getText().strip().length() > 0;

        markTextFieldErrorStatus(textField, isValid);

        return isValid;
    }

    /**
     * Valide qu'un champ de texte contient une adresse email valide.
     *
     * @param textField le champ de texte à valider
     * @return true si le champ contient une adresse email valide, false sinon
     */
    private static boolean validateEmailTextField(TextField textField) {
        EmailValidator validator = EmailValidator.getInstance(false, false);
        boolean isValid = validator.isValid(textField.getText().strip().toLowerCase());

        markTextFieldErrorStatus(textField, isValid);

        return isValid;
    }

//-----  Implémentation des méthodes abstraites  -------------------------------

    /**
     * Implémentation des interactions de l'interface utilisateur graphique pour GenEvent.
     * Cette classe gère les interactions utilisateur basées sur JavaFX sans étendre {@link javafx.application.Application}.
     * <p>
     * Le démarrage de l'application diffère des exemples JavaFX typiques :
     * l'interface démarre lors de l'appel de {@link fr.uga.iut2.genevent.controleur.Controleur} à {@link #demarrerInteraction()}.
     */
    @Override
    public void demarrerInteraction() {
        // démarrage de l'interface JavaFX
        Platform.startup(() -> {
            Stage primaryStage = new Stage();
            primaryStage.setOnCloseRequest((WindowEvent t) -> this.exitAction());
            try {
                this.start(primaryStage);
            }
            catch (IOException exc) {
                throw new RuntimeException(exc);
            }
        });

        // attente de la fin de vie de l'interface JavaFX
        try {
            this.eolBarrier.await();
        }
        catch (InterruptedException exc) {
            System.err.println("Erreur d'exécution de l'interface.");
            System.err.flush();
        }
    }

    /**
     * Affiche une alerte pour informer l'utilisateur d'un événement ou d'une condition.
     *
     * @param msg le message à afficher dans l'alerte
     * @param succes true pour une alerte d'information, false pour une alerte d'avertissement
     */
    @Override
    public void informerUtilisateur(String msg, boolean succes) {
        final Alert alert = new Alert(
                succes ? Alert.AlertType.INFORMATION : Alert.AlertType.WARNING
        );
        alert.setTitle("GenEvent");
        alert.setContentText(msg);
        alert.showAndWait();
    }

    /**
     * Ouvre une fenêtre modale pour créer un nouvel utilisateur.
     *
     * @throws RuntimeException si une IOException se produit lors du chargement du FXML
     */
    @Override
    public void saisirUtilisateur() {
        try {
            FXMLLoader newUserViewLoader = new FXMLLoader(getClass().getResource("new-user-view.fxml"));
            newUserViewLoader.setController(this);
            Scene newUserScene = new Scene(newUserViewLoader.load());

            Stage newUserWindow = new Stage();
            newUserWindow.setTitle("Créer un·e utilisa·teur/trice");
            newUserWindow.initModality(Modality.APPLICATION_MODAL);
            newUserWindow.setScene(newUserScene);
            newUserWindow.showAndWait();
        } catch (IOException exc) {
            throw new RuntimeException(exc);
        }
    }

    /**
     * Pas encore pris en charge. Lève une exception UnsupportedOperationException.
     *
     * @param nomsExistants l'ensemble des noms d'événements existants
     * @throws UnsupportedOperationException toujours levée, car la méthode n'est pas prise en charge
     */
    @Override
    public void saisirNouvelEvenement(Set<String> nomsExistants) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
