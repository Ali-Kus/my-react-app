package fr.iut2.saeprojet;

import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;
import android.widget.TextView;

import androidx.core.content.ContextCompat;

import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.List;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.CandidaturesResponse;

public class ListCandidaturesActivity extends StageAppActivity {
    // View
    private TextView retourSyntheseView;
    private ListView candidaturesView;

    // Remplacement par MaterialButton pour gérer le design dynamiquement
    private MaterialButton btnEnCours;
    private MaterialButton btnRefusees;

    // data
    private CandidatureAdapter adapter;
    private final ArrayList<Candidature> allCandidatures = new ArrayList<>();
    private boolean showRefusedOnly = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_candidatures);

        // Init view
        retourSyntheseView = findViewById(R.id.retourSynthese);
        candidaturesView = findViewById(R.id.candidatures);
        btnEnCours = findViewById(R.id.btnEnCours);
        btnRefusees = findViewById(R.id.btnRefusees);

        // Lier l'adapter au listView
        adapter = new CandidatureAdapter(this, new ArrayList<Candidature>());
        candidaturesView.setAdapter(adapter);

        retourSyntheseView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        if (btnEnCours != null) {
            btnEnCours.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    showRefusedOnly = false;
                    updateTabVisuals(); // Met à jour l'apparence des boutons
                    refreshFilteredCandidatures();
                }
            });
        }

        if (btnRefusees != null) {
            btnRefusees.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    showRefusedOnly = true;
                    updateTabVisuals(); // Met à jour l'apparence des boutons
                    refreshFilteredCandidatures();
                }
            });
        }

        refreshMesInformations();
        updateTabVisuals(); // Initialise l'apparence au lancement
    }

    // --- NOUVELLE MÉTHODE POUR L'UI DES BOUTONS ---
    // --- METHODE CORRIGEE POUR L'UI DES BOUTONS ---
    private void updateTabVisuals() {
        int colorPrimary = ContextCompat.getColor(this, R.color.primaryColor);
        int colorError = ContextCompat.getColor(this, R.color.errorColor);
        int colorSecondaryText = ContextCompat.getColor(this, R.color.textColorSecondary);
        int colorWhite = ContextCompat.getColor(this, android.R.color.white);

        if (!showRefusedOnly) {
            // Onglet "En cours" ACTIF (Bleu, texte blanc, pas de contour)
            btnEnCours.setBackgroundColor(colorPrimary);
            btnEnCours.setTextColor(colorWhite);
            btnEnCours.setStrokeWidth(0);

            // Onglet "Refusées" INACTIF (Transparent, texte gris, contour gris)
            btnRefusees.setBackgroundColor(Color.TRANSPARENT);
            btnRefusees.setTextColor(colorSecondaryText);
            btnRefusees.setStrokeColor(ColorStateList.valueOf(colorSecondaryText));
            btnRefusees.setStrokeWidth(3); // 3 pixels = environ 1dp
        } else {
            // Onglet "En cours" INACTIF (Transparent, texte gris, contour gris)
            btnEnCours.setBackgroundColor(Color.TRANSPARENT);
            btnEnCours.setTextColor(colorSecondaryText);
            btnEnCours.setStrokeColor(ColorStateList.valueOf(colorSecondaryText));
            btnEnCours.setStrokeWidth(3);

            // Onglet "Refusées" ACTIF (Rouge, texte blanc, pas de contour)
            btnRefusees.setBackgroundColor(colorError);
            btnRefusees.setTextColor(colorWhite);
            btnRefusees.setStrokeWidth(0);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        refreshMesInformations();
    }

    private void refreshMesInformations() {
        APIClient.getCandidatures(this, new ResultatAppel<CandidaturesResponse>() {
            @Override
            public void traiterResultat(CandidaturesResponse candidatures) {
                allCandidatures.clear();
                if (candidatures != null && candidatures.candidatures != null) {
                    allCandidatures.addAll(candidatures.candidatures);
                }
                refreshFilteredCandidatures();
            }

            @Override
            public void traiterErreur() {

            }
        });
    }

    private void refreshFilteredCandidatures() {
        List<Candidature> filtered = new ArrayList<>();
        String myCompteId = getCompte_Id();

        for (Candidature candidature : allCandidatures) {
            if (candidature == null) {
                continue;
            }

            if (myCompteId == null || !myCompteId.equals(candidature.compteEtudiant)) {
                continue;
            }

            boolean isRefused = isRefusedCandidature(candidature.etatCandidature);
            if (showRefusedOnly ? isRefused : !isRefused) {
                filtered.add(candidature);
            }
        }

        adapter.replaceItems(filtered);
    }

    private boolean isRefusedCandidature(String etatCandidature) {
        return "/api/etat_candidature/3".equals(etatCandidature)
                || "/api/etat_candidatures/3".equals(etatCandidature);
    }
}