package fr.iut2.saeprojet;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.TextView;

import com.google.android.material.button.MaterialButton;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.CompteEtudiant;
import fr.iut2.saeprojet.entity.Offre;
import fr.iut2.saeprojet.entity.OffresResponse;

public class ListOffresActivity extends StageAppActivity {

    private class ClickableEntry implements View.OnClickListener {
        public Offre offre;

        public ClickableEntry() {
        }

        @Override
        public void onClick(View view) {
            if (view.isEnabled() && (offre != null)) {
                Intent intent = new Intent(ListOffresActivity.this, OffreActivity.class);
                intent.putExtra(CandidatureBaseActivity.EXTRA_OFFRE, offre);
                startActivity(intent);
            }
        }
    }

    private TextView nb_offres;
    private TextView[] offres = new TextView[5];
    private TextView[] badges = new TextView[5];
    private ClickableEntry[] entries = new ClickableEntry[5];
    private View[] rows = new View[5];

    private AutoCompleteTextView rechercheOffre;
    private ArrayAdapter<String> rechercheAdapter;

    private ArrayList<Offre> listeOffres = new ArrayList<>();
    private ArrayList<Offre> listeOffresFiltrees = new ArrayList<>();
    private Set<String> offresRetenuesIds = new HashSet<>();
    private int no_page = 0, nb_pages = 0;

    private MaterialButton precedent;
    private MaterialButton suivant;
    private TextView retour;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_offres);

        nb_offres = findViewById(R.id.nb_offres);
        rechercheOffre = findViewById(R.id.searchOffreInput);
        rows[0] = findViewById(R.id.offreRow1);
        offres[0] = findViewById(R.id.offre1);
        badges[0] = findViewById(R.id.offreBadge1);
        rows[1] = findViewById(R.id.offreRow2);
        offres[1] = findViewById(R.id.offre2);
        badges[1] = findViewById(R.id.offreBadge2);
        rows[2] = findViewById(R.id.offreRow3);
        offres[2] = findViewById(R.id.offre3);
        badges[2] = findViewById(R.id.offreBadge3);
        rows[3] = findViewById(R.id.offreRow4);
        offres[3] = findViewById(R.id.offre4);
        badges[3] = findViewById(R.id.offreBadge4);
        rows[4] = findViewById(R.id.offreRow5);
        offres[4] = findViewById(R.id.offre5);
        badges[4] = findViewById(R.id.offreBadge5);
        precedent = findViewById(R.id.buttonPrec);
        suivant = findViewById(R.id.buttonNext);
        retour = findViewById(R.id.backSynthese);

        rechercheAdapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, new ArrayList<>());
        rechercheOffre.setAdapter(rechercheAdapter);
        rechercheOffre.setThreshold(1);
        rechercheOffre.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                applyFilterAndRefresh(s == null ? "" : s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        });
        rechercheOffre.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Object value = parent.getItemAtPosition(position);
                if (value != null) {
                    applyFilterAndRefresh(value.toString());
                }
            }
        });

        for(int i = 0; i < 5; i++) {
            if (rows[i] != null) {
                entries[i] = new ClickableEntry();
                rows[i].setOnClickListener(entries[i]);
            }
        }

        retour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        suivant.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (no_page < nb_pages - 1) {
                    no_page += 1;
                    updatePaginationButtons();
                    setIntituleOffres(no_page);
                }
            }
        });

        precedent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (no_page > 0) {
                    no_page -= 1;
                    updatePaginationButtons();
                    setIntituleOffres(no_page);
                }
            }
        });

        doGetOffreList();
    }

    @Override
    protected void onResume() {
        super.onResume();
        syncRetenuesFromLocal();
        applyFilterAndRefresh(rechercheOffre.getText() == null ? "" : rechercheOffre.getText().toString());
    }

    private void updatePaginationButtons() {
        if (no_page > 0) {
            precedent.setVisibility(View.VISIBLE);
            precedent.setEnabled(true);
        } else {
            precedent.setVisibility(View.INVISIBLE);
            precedent.setEnabled(false);
        }

        if (no_page < nb_pages - 1) {
            suivant.setVisibility(View.VISIBLE);
            suivant.setEnabled(true);
        } else {
            suivant.setVisibility(View.INVISIBLE);
            suivant.setEnabled(false);
        }
    }

    private void setIntituleOffres(int page) {
        String intitule;
        for(int i = 0; i < 5; i++) {
            int index = i + 5 * page;

            if (index < listeOffresFiltrees.size()) {
                Offre offre = listeOffresFiltrees.get(index);

                boolean isRetenue = offresRetenuesIds.contains(offre._id);
                String prefix = isRetenue ? "⭐ " : "";

                if (offre.intitule.length() < 32) {
                    intitule = offre.intitule;
                } else {
                    intitule = offre.intitule.substring(0, 28) + " ...";
                }

                offres[i].setEnabled(true);
                if (rows[i] != null) {
                    rows[i].setEnabled(true);
                    rows[i].setVisibility(View.VISIBLE);
                }
                entries[i].offre = offre;
                if (badges[i] != null) {
                    badges[i].setVisibility(View.VISIBLE);
                    bindBadge(badges[i], getOfferStateLabel(offre.etatOffre), getOfferStateColor(offre.etatOffre));
                }

                offres[i].setText(prefix + intitule);

            } else {
                offres[i].setText("");
                offres[i].setEnabled(false);
                if (rows[i] != null) {
                    rows[i].setEnabled(false);
                    rows[i].setVisibility(View.GONE);
                }
                entries[i].offre = null;
                if (badges[i] != null) {
                    badges[i].setVisibility(View.GONE);
                    badges[i].setText("");
                }
            }
        }
    }

    private void doGetOffreList() {
        APIClient.getCompteEtudiant(this, getCompteId(), new ResultatAppel<CompteEtudiant>() {
            @Override
            public void traiterResultat(CompteEtudiant compteEtudiant) {
                Set<String> mesCandidaturesIds = new HashSet<>();
                if (compteEtudiant != null && compteEtudiant.candidatures != null) {
                    mesCandidaturesIds.addAll(compteEtudiant.candidatures);
                }

                offresRetenuesIds.clear();
                if (compteEtudiant != null && compteEtudiant.offreRetenues != null) {
                    offresRetenuesIds.addAll(compteEtudiant.offreRetenues);
                }
                syncRetenuesFromLocal();

                loadOffresSansCandidatures(mesCandidaturesIds);
            }

            @Override
            public void traiterErreur() {
                syncRetenuesFromLocal();
                loadOffresSansCandidatures(new HashSet<>());
            }
        });
    }

    private void loadOffresSansCandidatures(Set<String> mesCandidaturesIds) {
        APIClient.getOffres(this, new ResultatAppel<OffresResponse>() {
            @Override
            public void traiterResultat(OffresResponse offresResponse) {
                listeOffres.clear();
                if (offresResponse != null && offresResponse.offres != null) {
                    for (Offre offre : offresResponse.offres) {
                        if (offre == null) {
                            continue;
                        }
                        if (!hasMyCandidature(offre, mesCandidaturesIds)) {
                            listeOffres.add(offre);
                        }
                    }
                }

                updateSearchSuggestions();
                applyFilterAndRefresh(rechercheOffre.getText() == null ? "" : rechercheOffre.getText().toString());
            }

            @Override
            public void traiterErreur() {

            }
        });
    }

    private void updateSearchSuggestions() {
        TreeSet<String> intitules = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        for (Offre offre : listeOffres) {
            if (offre != null && offre.intitule != null && !offre.intitule.trim().isEmpty()) {
                intitules.add(offre.intitule.trim());
            }
        }

        rechercheAdapter.clear();
        rechercheAdapter.addAll(intitules);
        rechercheAdapter.notifyDataSetChanged();
    }

    private void applyFilterAndRefresh(String query) {
        String normalizedQuery = normalizeForSearch(query);

        listeOffresFiltrees.clear();
        if (normalizedQuery.isEmpty()) {
            listeOffresFiltrees.addAll(listeOffres);
        } else {
            for (Offre offre : listeOffres) {
                if (offre == null) continue;

                String intitule = offre.intitule == null ? "" : offre.intitule;
                if (normalizeForSearch(intitule).contains(normalizedQuery)) {
                    listeOffresFiltrees.add(offre);
                }
            }
        }

        java.util.Collections.sort(listeOffresFiltrees, new java.util.Comparator<Offre>() {
            @Override
            public int compare(Offre o1, Offre o2) {
                boolean o1Retenue = offresRetenuesIds.contains(o1._id);
                boolean o2Retenue = offresRetenuesIds.contains(o2._id);

                if (o1Retenue != o2Retenue) {
                    return o1Retenue ? -1 : 1;
                }
                return o1.intitule.compareToIgnoreCase(o2.intitule);
            }
        });

        no_page = 0;
        nb_offres.setText(getString(R.string.home_offers_count, listeOffresFiltrees.size()));
        nb_pages = listeOffresFiltrees.size() / 5 + ((listeOffresFiltrees.size() % 5) > 0 ? 1 : 0);

        updatePaginationButtons();
        setIntituleOffres(0);
    }

    private String normalizeForSearch(String text) {
        if (text == null) {
            return "";
        }

        String normalized = Normalizer.normalize(text, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return normalized.toLowerCase().trim();
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

    private void syncRetenuesFromLocal() {
        offresRetenuesIds.clear();
        offresRetenuesIds.addAll(getLocalOffresRetenues());
    }
}