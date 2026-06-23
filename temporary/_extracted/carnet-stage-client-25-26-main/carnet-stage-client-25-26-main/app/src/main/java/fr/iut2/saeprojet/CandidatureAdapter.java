package fr.iut2.saeprojet;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.ColorStateList;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

import androidx.core.content.ContextCompat;
import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.APIService;
import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.EtatsCandidatures;
import fr.iut2.saeprojet.entity.Offre;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class CandidatureAdapter extends ArrayAdapter<Candidature> {

    // API
    private APIService apiInterface;

    public CandidatureAdapter(Context mCtx, List<Candidature> candidatures) {
        super(mCtx, R.layout.template_candidature, candidatures);

        // Chargement de l'API
        apiInterface = APIClient.getAPIService();
    }

    public void replaceItems(List<Candidature> candidatures) {
        clear();
        if (candidatures != null) {
            addAll(candidatures);
        }
        notifyDataSetChanged();
    }

    /**
     * Remplit une ligne de la listView avec les informations de la multiplication associée
     *
     * @param position
     * @param convertView
     * @param parent
     * @return
     */
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        // Récupération de la multiplication
        final Candidature candidature = getItem(position);

        // Charge le template XML
        LayoutInflater inflater = (LayoutInflater) getContext()
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        final View rowView = inflater.inflate(R.layout.template_candidature, parent, false);

        // Récupération des objets graphiques dans le template
        TextView intituleView = rowView.findViewById(R.id.intitule);
        TextView etatBadgeView = rowView.findViewById(R.id.etatBadge);

        if (candidature == null) {
            return rowView;
        }

        rowView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getContext(), CandidatureActivity.class);
                intent.putExtra(CandidatureActivity.CANDIDATURE_KEY, candidature);
                getContext().startActivity(intent);
            }
        });

        String etatLabel = EtatsCandidatures.etatsCandidatureInverse.get(candidature.getEtatCandidatureId());
        int badgeColor = getContext().getResources().getColor(R.color.primaryColor);
        if (candidature.getEtatCandidatureId() == 3L) {
            badgeColor = getContext().getResources().getColor(R.color.errorColor);
        } else if (candidature.getEtatCandidatureId() == 6L) {
            badgeColor = getContext().getResources().getColor(R.color.brand_secondary);
        }
        if (etatBadgeView != null) {
            etatBadgeView.setText(etatLabel);
            etatBadgeView.setBackgroundTintList(ColorStateList.valueOf(badgeColor));
            etatBadgeView.setTextColor(ContextCompat.getColor(getContext(), R.color.white));
        }

        refreshMesInformations(candidature, intituleView);

        //
        return rowView;
    }

    private void refreshMesInformations(Candidature candidature, TextView intituleView) {

        //
        SharedPreferences sharedPref = getContext().getSharedPreferences("MyPref", Context.MODE_PRIVATE);
        String token = sharedPref.getString(getContext().getString(R.string.token_key), "no token");

        //
        Call<Offre> call = apiInterface.doGetOffre("Bearer " + token, candidature.getOffreId());
        call.enqueue(new Callback<Offre>() {
            @Override
            public void onResponse(Call<Offre> call, Response<Offre> response) {
                if (response.body() == null || response.body().intitule == null) {
                    return;
                }

                String intitule = response.body().intitule;
                if (intitule.length() > 10) {
                    intitule = response.body().intitule.substring(0, 9) + "...";
                }

                intituleView.setText(intitule);
            }

            @Override
            public void onFailure(Call<Offre> call, Throwable t) {
                call.cancel();
                Log.e("TAG",t.getMessage());

            }
        });
    }

}