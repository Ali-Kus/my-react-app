package fr.iut2.saeprojet;

import androidx.appcompat.app.AlertDialog;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.AdapterView;

import com.google.android.material.datepicker.MaterialDatePicker;
import com.google.android.material.datepicker.MaterialPickerOnPositiveButtonClickListener;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.EtatCandidatureEnum;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.CandidatureRequest;

public class CandidatureEditActivity extends CandidatureBaseActivity {

    public static final String CANDIDATURE_KEY = CandidatureBaseActivity.EXTRA_CANDIDATURE;

    // Data
    private Candidature candidature;

    private ArrayAdapter<EtatCandidatureEnum> adapter;

    // View
    private TextView retourCandidaturesView;
    private TextView headerLabelView;
    private TextView intituleView;
    private Button annulerView;
    private Button validerView;

    private Button abandonView;
    private Spinner etatsCandidatureView;
    private EditText dateActionView;
    private Button dateActionButton;
    private boolean etatSpinnerInitialized = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_candidature_edit);

        // Data
        candidature = getCandidatureFromIntent();

        // Init view
        retourCandidaturesView = findViewById(R.id.retourCandidatures);
        headerLabelView = findViewById(R.id.headerLabel);
        intituleView = findViewById(R.id.intitule);
        annulerView = findViewById(R.id.annuler);
        validerView = findViewById(R.id.valider);
        abandonView = findViewById(R.id.abandonCandidature);
        etatsCandidatureView = findViewById(R.id.etatsCandidature);
        dateActionView = findViewById(R.id.dateAction);
        dateActionButton = findViewById(R.id.dateActionButton);

        //
        setupHeader(retourCandidaturesView, headerLabelView, R.string.candidature_edit_title, candidature, intituleView);

        //
        annulerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        //
        validerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // Enregistrement manuel (bouton Valider)
                updateCandidature(false);

            }
        });

        abandonView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // Demande une confirmation explicite avant l'action destructive.
                showDeleteConfirmationDialog();

            }
        });

        dateActionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDatePicker();
            }
        });

        // Create an ArrayAdapter using the string array and a default spinner layout
        List<EtatCandidatureEnum> etats = Arrays.asList(EtatCandidatureEnum.values());
        adapter = new ArrayAdapter<EtatCandidatureEnum>(this, android.R.layout.simple_spinner_item, etats);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        // Apply the adapter to the spinner
        etatsCandidatureView.setAdapter(adapter);
        // Enregistrement immédiat quand l'utilisateur change l'état via le Spinner
        etatsCandidatureView.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (!etatSpinnerInitialized) return; // ignore initial selection
                if (candidature == null) return;

                EtatCandidatureEnum selected = (EtatCandidatureEnum) parent.getItemAtPosition(position);
                if (selected == null) return;

                // Si l'état a réellement changé, enregistre immédiatement
                if (!selected.get_id().equals(candidature.etatCandidature)) {
                    updateCandidature(true);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        //
        refreshMesInformations();
    }

    private void refreshMesInformations() {
        if (candidature == null) {
            return;
        }

        for(EtatCandidatureEnum e : EtatCandidatureEnum.values()) {
            if (e.get_id().equals(candidature.etatCandidature)) {
                etatsCandidatureView.setSelection(e.ordinal());
                break;
            }
        }

        dateActionView.setText(formatDateForDisplay(candidature.dateAction));
        // Autorise maintenant les changements utilisateur du Spinner à déclencher un enregistrement
        etatSpinnerInitialized = true;
     }



    private void updateCandidature(boolean triggeredBySpinner) {
        if (candidature == null || candidature._id == null) {
            Toast.makeText(this, "Candidature introuvable", Toast.LENGTH_SHORT).show();
            return;
        }

        // Détermine si la date a été modifiée par l'utilisateur
        String currentDisplayedDate = formatDateForDisplay(candidature.dateAction);
        String newDisplayedDate = dateActionView.getText() != null ? dateActionView.getText().toString() : "";
        boolean dateChanged = newDisplayedDate != null && !newDisplayedDate.equals(currentDisplayedDate);

        CandidatureRequest candidatureReq = new CandidatureRequest();
        candidatureReq.compteEtudiant = getCompte_Id();
        candidatureReq.offre = candidature.offre;
        candidatureReq.dateAction = toApiDate(newDisplayedDate, candidature.dateAction);
        candidatureReq.typeAction = "Candidature à confirmer par envoi CV+lettre";
        candidatureReq.etatCandidature = ((EtatCandidatureEnum) etatsCandidatureView.getSelectedItem()).get_id();

        APIClient.updateCandidature(this, APIClient.getCandidatureId(candidature._id), candidatureReq, new ResultatAppel<Candidature>() {
            @Override
            public void traiterResultat(Candidature response) {
                // Met à jour l'état local et la vue
                boolean etatChanged = (response != null && response.etatCandidature != null && !response.etatCandidature.equals(candidature.etatCandidature))
                        || (response == null && !candidatureReq.etatCandidature.equals(candidature.etatCandidature));

                candidature.dateAction = candidatureReq.dateAction;
                candidature.etatCandidature = candidatureReq.etatCandidature;
                dateActionView.setText(formatDateForDisplay(candidature.dateAction));

                // Messages adaptés selon ce qui a réellement changé
                if (dateChanged && etatChanged) {
                    Toast.makeText(CandidatureEditActivity.this, "État et date de relance mis à jour", Toast.LENGTH_SHORT).show();
                } else if (etatChanged) {
                    Toast.makeText(CandidatureEditActivity.this, "État de la candidature mis à jour", Toast.LENGTH_SHORT).show();
                } else if (dateChanged) {
                    Toast.makeText(CandidatureEditActivity.this, "Date de relance mise à jour", Toast.LENGTH_SHORT).show();
                } else {
                    // Si rien de changé (cas improbable), fournir un feedback générique
                    if (triggeredBySpinner) {
                        Toast.makeText(CandidatureEditActivity.this, "Enregistré", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(CandidatureEditActivity.this, "Candidature mise à jour", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void traiterErreur() {
                Toast.makeText(CandidatureEditActivity.this, "Impossible de mettre à jour la candidature", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showDeleteConfirmationDialog() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.candidature_delete_confirm_title)
                .setMessage(R.string.candidature_delete_confirm_message)
                .setNegativeButton(R.string.action_cancel, null)
                .setPositiveButton(R.string.candidature_delete_confirm_action, (dialog, which) -> deleteCandidature())
                .show();
    }

    private void deleteCandidature() {
        if (candidature == null || candidature._id == null) {
            Toast.makeText(this, "Candidature introuvable", Toast.LENGTH_SHORT).show();
            return;
        }

        APIClient.removeCandidature(this, APIClient.getCandidatureId(candidature._id), new ResultatAppel<Candidature>() {
            @Override
            public void traiterResultat(Candidature response) {
                Toast.makeText(CandidatureEditActivity.this, "Candidature supprimée", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(CandidatureEditActivity.this, ListCandidaturesActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                startActivity(intent);
                finish();
            }

            @Override
            public void traiterErreur() {
                Toast.makeText(CandidatureEditActivity.this, "Impossible de supprimer la candidature", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showDatePicker() {
        MaterialDatePicker<Long> datePicker = MaterialDatePicker.Builder.datePicker()
                .build();

        datePicker.addOnPositiveButtonClickListener(new MaterialPickerOnPositiveButtonClickListener<Long>() {
            @Override
            public void onPositiveButtonClick(Long selection) {
                // Affichage simple en JJ/MM/AAAA sans information de fuseau.
                Instant instant = Instant.ofEpochMilli(selection);
                ZoneId zoneIdFrance = ZoneId.of("Europe/Paris");
                ZonedDateTime zonedDateTime = instant.atZone(zoneIdFrance);
                LocalDateTime localDateTime = zonedDateTime.toLocalDateTime();

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                String formattedDate = localDateTime.format(formatter);

                dateActionView.setText(formattedDate);
                Toast.makeText(CandidatureEditActivity.this, "Date de relance sélectionnée", Toast.LENGTH_SHORT).show();
            }
        });

        datePicker.show(getSupportFragmentManager(), "date_picker");
    }
}

