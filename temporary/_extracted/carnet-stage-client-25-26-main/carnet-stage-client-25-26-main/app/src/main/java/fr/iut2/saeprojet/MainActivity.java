package fr.iut2.saeprojet;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.CandidaturesResponse;
import fr.iut2.saeprojet.entity.CompteEtudiant;
import fr.iut2.saeprojet.entity.Offre;
import fr.iut2.saeprojet.entity.OffresResponse;

public class MainActivity extends StageAppActivity {

    // View
    private View offresView;
    private View candidaturesView;
    private View logoutView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // init View
        offresView = findViewById(R.id.offres);
        candidaturesView = findViewById(R.id.candidatures);
        logoutView = findViewById(R.id.logoutButton);

        //
        if (offresView != null) {
            offresView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(MainActivity.this, ListOffresActivity.class);
                    startActivity(intent);
                }
            });
        }

        if (candidaturesView != null) {
            candidaturesView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(MainActivity.this, ListCandidaturesActivity.class);
                    startActivity(intent);
                }
            });
        }

        if (logoutView != null) {
            logoutView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    logout();
                }
            });
        }

        //
        refreshLogin();
        refreshNBOffres();
        refreshCandidatures();
    }

    @Override
    protected void onResume() {
        super.onResume();
        refreshNBOffres();
        refreshMesInformations();
        refreshCandidatures();
    }

    private void refreshLogin() {
        TextView loginView = findViewById(R.id.login);
        if (loginView != null) {
            loginView.setText(getLogin());
        }
        refreshMesInformations();
    }

    private void refreshNBOffres() {
        APIClient.getCompteEtudiant(this, getCompteId(), new ResultatAppel<CompteEtudiant>() {
            @Override
            public void traiterResultat(CompteEtudiant compteEtudiant) {
                Set<String> mesCandidaturesIds = new HashSet<>();
                if (compteEtudiant != null && compteEtudiant.candidatures != null) {
                    mesCandidaturesIds.addAll(compteEtudiant.candidatures);
                }

                refreshNBOffresDisponibles(mesCandidaturesIds);
            }

            @Override
            public void traiterErreur() {
                refreshNBOffresDisponibles(new HashSet<>());
            }
        });
    }

    private void refreshNBOffresDisponibles(Set<String> mesCandidaturesIds) {
        APIClient.getOffres(this, new ResultatAppel<OffresResponse>() {
            @Override
            public void traiterResultat(OffresResponse offres) {
                int total = 0;
                if (offres != null && offres.offres != null) {
                    for (Offre offre : offres.offres) {
                        if (offre == null) {
                            continue;
                        }
                        if (!hasMyCandidature(offre, mesCandidaturesIds)) {
                            total++;
                        }
                    }
                }
                updateHomeOffresCount(total);
            }

            @Override
            public void traiterErreur() {
                updateHomeOffresCount(0);
            }
        });
    }

    private void refreshMesInformations() {
        long compteId = getCompteId();
        if (compteId <= 0) {
            Log.e("TAG", "compteId invalide: " + compteId);
            return;
        }

        APIClient.getCompteEtudiant(this, compteId, new ResultatAppel<CompteEtudiant>() {
            @Override
            public void traiterResultat(CompteEtudiant compteEtudiant) {
                TextView mesOffresConsulteesView = findViewById(R.id.textView10);
                TextView mesOffresRetenuesView = findViewById(R.id.textView11);
                TextView mesCandidaturesView = findViewById(R.id.textView12);
                TextView derniereConnexionView = findViewById(R.id.textView6);
                if (compteEtudiant == null || mesOffresConsulteesView == null || mesOffresRetenuesView == null || mesCandidaturesView == null || derniereConnexionView == null) {
                    Log.e("TAG", "Donnees compteEtudiant/vues invalides");
                    return;
                }

                int nbConsultees = countDistinct(compteEtudiant.offreConsultees, getLocalOffresConsultees());
                int nbRetenues = countDistinct(compteEtudiant.offreRetenues, getLocalOffresRetenues());
                int nbCandidatures = compteEtudiant.candidatures != null ? compteEtudiant.candidatures.size() : 0;

                mesOffresConsulteesView.setText(getString(R.string.home_offers_consulted_count, nbConsultees));
                mesOffresRetenuesView.setText(getString(R.string.home_offers_retained_count, nbRetenues));
                mesCandidaturesView.setText(getString(R.string.home_candidatures_count, nbCandidatures));
                derniereConnexionView.setText(TextUtils.isEmpty(compteEtudiant.derniereConnexion) ? "-" : compteEtudiant.derniereConnexion);
            }

            @Override
            public void traiterErreur() {
            }
        });
    }

    private int countDistinct(List<String> fromApi, Set<String> fromLocal) {
        Set<String> values = new HashSet<>();
        if (fromApi != null) {
            values.addAll(fromApi);
        }
        if (fromLocal != null) {
            values.addAll(fromLocal);
        }
        return values.size();
    }

    private void refreshCandidatures() {
        APIClient.getCandidatures(this, new ResultatAppel<CandidaturesResponse>() {
            @Override
            public void traiterResultat(CandidaturesResponse candidatures) {
                TextView nbCandidaturesView = findViewById(R.id.textView13);
                TextView nbCandidaturesRefuseesView = findViewById(R.id.textView14);

                if (nbCandidaturesView == null || nbCandidaturesRefuseesView == null) {
                    return;
                }

                if (candidatures == null || candidatures.candidatures == null) {
                    nbCandidaturesRefuseesView.setText(getString(R.string.home_candidatures_refused_count, 0));
                    nbCandidaturesView.setText(getString(R.string.home_candidatures_in_progress_count, 0));
                    return;
                }

                int count = 0;
                for(Candidature c : candidatures.candidatures) {
                    if (c != null && ("/api/etat_candidature/3".equals(c.etatCandidature) || "/api/etat_candidatures/3".equals(c.etatCandidature))) {
                        count ++;
                    }
                }
                nbCandidaturesRefuseesView.setText(getString(R.string.home_candidatures_refused_count, count));
                nbCandidaturesView.setText(getString(R.string.home_candidatures_in_progress_count, candidatures.candidatures.size() - count));
            }

            @Override
            public void traiterErreur() {

            }
        });
    }

    private void updateHomeOffresCount(int total) {
        TextView nbOffresView = findViewById(R.id.textView8);
        if (nbOffresView == null) {
            return;
        }
        nbOffresView.setText(getString(R.string.home_offers_count, total));
    }

    private boolean hasMyCandidature(Offre offre, Set<String> mesCandidaturesIds) {
        if (offre.candidatures == null || offre.candidatures.isEmpty() || mesCandidaturesIds == null || mesCandidaturesIds.isEmpty()) {
            return false;
        }

        for (String candidatureId : offre.candidatures) {
            if (mesCandidaturesIds.contains(candidatureId)) {
                return true;
            }
        }
        return false;
    }
}