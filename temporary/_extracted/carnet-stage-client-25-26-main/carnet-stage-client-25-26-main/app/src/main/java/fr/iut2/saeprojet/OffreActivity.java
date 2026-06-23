package fr.iut2.saeprojet;

import androidx.appcompat.app.AlertDialog;
import androidx.core.content.ContextCompat;

import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.EtatCandidatureEnum;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.CandidatureRequest;
import fr.iut2.saeprojet.entity.CompteEtudiant;
import fr.iut2.saeprojet.entity.Entreprise;
import fr.iut2.saeprojet.entity.EntreprisesResponse;
import fr.iut2.saeprojet.entity.Offre;

public class OffreActivity extends StageAppActivity {
    private TextView retour;
    private MaterialButton candidater;
    private MaterialButton btnRetenir;
    private TextView intituleOffre;
    private TextView statutOffre;
    private TextView nomEntreprise;
    private TextView nomVille;
    private TextView url;

    private Offre offre = null;
    private Entreprise entreprise = null;
    private Candidature candidature = null;
    private boolean isActionInProgress = false;
    private boolean isRetenue = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_offre);

        retour = findViewById(R.id.backOffres);
        candidater = findViewById(R.id.buttonCandidature);
        btnRetenir = findViewById(R.id.buttonRetenirOffre);
        intituleOffre = findViewById(R.id.titreOffre);
        statutOffre = findViewById(R.id.statutOffre);
        nomEntreprise = findViewById(R.id.nomEntreprise);
        nomVille = findViewById(R.id.nomVille);
        url = findViewById(R.id.offreUrl);

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            offre = getIntent().getParcelableExtra(CandidatureBaseActivity.EXTRA_OFFRE);
            refreshOffre();
        }
        if (offre == null) {
            Toast.makeText(this, "Offre introuvable", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }

        markOffreConsultee(offre._id);

        candidater.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (isActionInProgress || offre == null) {
                    return;
                }

                if (candidature != null) {
                    showDeleteConfirmationDialog();
                } else {
                    creerCandidature();
                }
            }
        });

        btnRetenir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (offre == null) return;

                if (!isRetenue) {
                    markOffreRetenue(offre._id);
                    isRetenue = true;
                    Toast.makeText(OffreActivity.this, "Offre retenue ⭐", Toast.LENGTH_SHORT).show();
                } else {
                    unmarkOffreRetenue(offre._id); // Cette fois ça va marcher !
                    isRetenue = false;
                    Toast.makeText(OffreActivity.this, "Offre retirée des retenues", Toast.LENGTH_SHORT).show();
                }
                updateRetenirButtonVisuals();
            }
        });

        retour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (offre != null) {
            try {
                Set<String> retenues = getLocalOffresRetenues();
                isRetenue = (retenues != null && retenues.contains(offre._id));
            } catch (Exception e) {}
            updateRetenirButtonVisuals();
        }
    }

    private void updateRetenirButtonVisuals() {
        if (btnRetenir == null) return;

        if (isRetenue) {
            btnRetenir.setText(R.string.offre_unretain_action);
            btnRetenir.setIconResource(android.R.drawable.btn_star_big_on);
            btnRetenir.setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.secondaryColor)));
            btnRetenir.setTextColor(Color.WHITE);
            btnRetenir.setIconTint(ColorStateList.valueOf(Color.WHITE));
            btnRetenir.setStrokeWidth(0);
        } else {
            btnRetenir.setText(R.string.offre_retain_action);
            btnRetenir.setIconResource(android.R.drawable.btn_star_big_off);
            btnRetenir.setBackgroundTintList(ColorStateList.valueOf(Color.TRANSPARENT));
            btnRetenir.setTextColor(ContextCompat.getColor(this, R.color.primaryColor));
            btnRetenir.setIconTint(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.primaryColor)));
            btnRetenir.setStrokeWidth(3);
        }
    }

    private void refreshOffre() {
        if (offre == null) {
            return;
        }

        intituleOffre.setText(offre.intitule);
        if (offre.urlPieceJointe != null) {
            url.setText(offre.urlPieceJointe);
        } else {
            url.setText("Pas de descriptif");
        }

        bindBadge(statutOffre, getOfferStateLabel(offre.etatOffre), getOfferStateColor(offre.etatOffre));
        refreshEntreprise(offre.entreprise);

        candidature = null;
        if ("/api/etat_offres/1".equals(offre.etatOffre)) {
            if (offre.candidatures != null && offre.candidatures.size() > 0) {
                checkCandidature(offre.candidatures);
            } else {
                refreshCandidatureButton();
            }
        } else {
            refreshCandidatureButton();
        }
    }

    private void refreshEntreprise(String entreprise_id) {
        APIClient.getEntreprises(this, new ResultatAppel<EntreprisesResponse>() {
            @Override
            public void traiterResultat(EntreprisesResponse liste) {
                for(Entreprise e : liste.entreprises) {
                    if (e._id.equals(entreprise_id)) {
                        OffreActivity.this.entreprise = e;
                        nomEntreprise.setText(entreprise.raisonSociale);
                        nomVille.setText(entreprise.ville);
                    }
                }
            }

            @Override
            public void traiterErreur() {

            }
        });
    }

    private void checkCandidature(List<String> candidatures) {
        if (candidatures == null || candidatures.isEmpty()) {
            refreshCandidatureButton();
            return;
        }

        APIClient.getCompteEtudiant(this, getCompteId(), new ResultatAppel<CompteEtudiant>() {
            @Override
            public void traiterResultat(CompteEtudiant compte) {
                if (compte == null || compte.candidatures == null) {
                    refreshCandidatureButton();
                    return;
                }

                boolean found = false;
                for(String id : compte.candidatures) {
                    if (candidatures.contains(id)) {
                        found = true;
                        refreshCandidature(id);
                        break;
                    }
                }
                if (!found) {
                    refreshCandidatureButton();
                }
            }

            @Override
            public void traiterErreur() {
                refreshCandidatureButton();
            }
        });
    }

    private void refreshCandidature(String _id) {
        APIClient.getCandidature(this, APIClient.getCandidatureId(_id), new ResultatAppel<Candidature>() {
            @Override
            public void traiterResultat(Candidature candid) {
                candidature = candid;
                refreshCandidatureButton();
            }

            @Override
            public void traiterErreur() {
                refreshCandidatureButton();
            }
        });
    }

    private void creerCandidature() {
        setActionInProgress(true);

        CandidatureRequest candidatureReq = new CandidatureRequest();
        candidatureReq.compteEtudiant = getCompte_Id();
        candidatureReq.offre = offre._id;
        candidatureReq.dateAction = String.format("%1$tY-%1$tm-%1$tdT%1$tH:%1$tM:00.000Z",Calendar.getInstance().getTime());
        candidatureReq.typeAction = "Candidature à confirmer par envoi CV+lettre";
        candidatureReq.etatCandidature = EtatCandidatureEnum.OFFRE_RETENUE.get_id();
        APIClient.createCandidature(this, candidatureReq, new ResultatAppel<Candidature>() {
            @Override
            public void traiterResultat(Candidature candid) {
                candidature = candid;
                if (offre.candidatures == null) {
                    offre.candidatures = new ArrayList<>();
                }
                if (candid != null && candid._id != null && !offre.candidatures.contains(candid._id)) {
                    offre.candidatures.add(candid._id);
                }

                markOffreRetenue(offre._id);
                Toast.makeText(OffreActivity.this, "Candidature envoyée", Toast.LENGTH_SHORT).show();
                setActionInProgress(false);
                refreshCandidatureButton();
            }

            @Override
            public void traiterErreur() {
                Toast.makeText(OffreActivity.this, "Impossible d'envoyer la candidature", Toast.LENGTH_SHORT).show();
                setActionInProgress(false);
                refreshCandidatureButton();
            }
        });
    }

    private void showDeleteConfirmationDialog() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.candidature_delete_confirm_title)
                .setMessage(R.string.candidature_delete_confirm_message)
                .setNegativeButton(R.string.action_cancel, null)
                .setPositiveButton(R.string.candidature_delete_confirm_action, (dialog, which) -> supprimerCandidature())
                .show();
    }

    private void supprimerCandidature() {
        if (candidature == null || candidature._id == null) {
            return;
        }

        setActionInProgress(true);
        final String candidatureId = candidature._id;
        APIClient.removeCandidature(this, APIClient.getCandidatureId(candidature._id), new ResultatAppel<Candidature>() {
            @Override
            public void traiterResultat(Candidature response) {
                candidature = null;
                if (offre != null && offre.candidatures != null) {
                    offre.candidatures.remove(candidatureId);
                }

                Toast.makeText(OffreActivity.this, "Candidature annulée", Toast.LENGTH_SHORT).show();
                setActionInProgress(false);
                refreshCandidatureButton();
            }

            @Override
            public void traiterErreur() {
                Toast.makeText(OffreActivity.this, "Impossible d'annuler la candidature", Toast.LENGTH_SHORT).show();
                setActionInProgress(false);
                refreshCandidatureButton();
            }
        });
    }

    private void setActionInProgress(boolean inProgress) {
        isActionInProgress = inProgress;
        candidater.setEnabled(!inProgress);
    }

    private void refreshCandidatureButton() {
        if (offre == null) {
            candidater.setEnabled(false);
            return;
        }

        if (!"/api/etat_offres/1".equals(offre.etatOffre)) {
            candidater.setText("Offre indisponible");
            candidater.setEnabled(false);
            candidater.setBackgroundTintList(ColorStateList.valueOf(Color.GRAY));
            return;
        }

        if (candidature == null) {
            candidater.setText("Candidater");
            candidater.setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.primaryColor)));
            candidater.setIconResource(android.R.drawable.ic_menu_send);
        } else {
            candidater.setText("Annuler la candidature");
            candidater.setBackgroundTintList(ColorStateList.valueOf(ContextCompat.getColor(this, R.color.errorColor)));
            candidater.setIconResource(android.R.drawable.ic_menu_close_clear_cancel);
        }

        candidater.setEnabled(!isActionInProgress);
    }
}