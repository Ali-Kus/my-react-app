package fr.iut2.saeprojet;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.EtatsCandidatures;
import fr.iut2.saeprojet.entity.Offre;

public class CandidatureActivity extends CandidatureBaseActivity {

    public static final String CANDIDATURE_KEY = CandidatureBaseActivity.EXTRA_CANDIDATURE;

    // Data
    private Candidature candidature;
    private Offre offre;

    // View
    private TextView retourCandidaturesView;
    private TextView headerLabelView;
    private TextView intituleView;
    private TextView etatView;
    private TextView dateActionView;
    private Button mettreAJourView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_candidature);

        // Data
        candidature = getCandidatureFromIntent();
        offre = getOffreFromIntent();

        // Init view
        retourCandidaturesView = findViewById(R.id.retourCandidatures);
        headerLabelView = findViewById(R.id.headerLabel);
        intituleView = findViewById(R.id.intitule);
        etatView = findViewById(R.id.etat);
        dateActionView = findViewById(R.id.dateAction);
        mettreAJourView = findViewById(R.id.mettreajour);

        //
        setupHeader(retourCandidaturesView, headerLabelView, R.string.candidature_view_title, candidature, intituleView);

        //
        mettreAJourView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(CandidatureActivity.this, CandidatureEditActivity.class);
                if (offre != null) {
                    intent.putExtra(CandidatureBaseActivity.EXTRA_OFFRE, offre);
                }
                intent.putExtra(CandidatureEditActivity.CANDIDATURE_KEY, candidature);
                startActivity(intent);
            }
        });

        //
        refreshMesInformations();
    }

    private void refreshMesInformations() {
        if (candidature == null) {
            return;
        }

        etatView.setText(EtatsCandidatures.etatsCandidatureInverse.get(candidature.getEtatCandidatureId()));
        dateActionView.setText(getString(R.string.candidature_action_date_prefix, formatDateForDisplay(candidature.dateAction)));
    }
}