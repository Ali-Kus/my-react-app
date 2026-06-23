package fr.iut2.saeprojet;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.HashMap;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.Auth;
import fr.iut2.saeprojet.entity.CompteEtudiant;
import fr.iut2.saeprojet.entity.ComptesEtudiantsResponse;
import fr.iut2.saeprojet.entity.EtatCandidature;
import fr.iut2.saeprojet.entity.EtatCandidaturesResponse;
import fr.iut2.saeprojet.entity.EtatOffre;
import fr.iut2.saeprojet.entity.EtatOffresResponse;
import fr.iut2.saeprojet.entity.EtatRecherche;
import fr.iut2.saeprojet.entity.EtatRecherchesResponse;
import fr.iut2.saeprojet.entity.LoginResponse;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends StageAppActivity {

    // View
    private EditText usernameView;
    private EditText passwordView;
    private Button loginView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        

        // Init view
        usernameView = findViewById(R.id.username);
        passwordView = findViewById(R.id.password);
        loginView = findViewById(R.id.login);

        //
        loginView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                login();
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        // Effacer les données d'authentification à chaque démarrage de l'activité
        // afin d'empêcher la reconnexion automatique.
        clearAuthData();
        if (hasActiveSession()) {
            openMainAndClearTask();
        }
    }

    private void login() {

        String login = usernameView.getText().toString();
        String password = passwordView.getText().toString();

        if (TextUtils.isEmpty(login) || TextUtils.isEmpty(password)) {
            Toast.makeText(LoginActivity.this, "Veuillez saisir login et mot de passe", Toast.LENGTH_SHORT).show();
            return;
        }

        Auth auth = new Auth(login, password);

        Call<LoginResponse> call = apiInterface.login(auth);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                if (response.isSuccessful() && response.body() != null && !TextUtils.isEmpty(response.body().token)) {
                    setAuthData(login, response.body().token);
                    getInformationEtudiant(login);
                } else {
                    Toast.makeText(LoginActivity.this, "Identifiants invalides", Toast.LENGTH_SHORT).show();
                    Log.e("TAG", "Echec login HTTP=" + response.code());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Failure", Toast.LENGTH_SHORT).show();
                call.cancel();
                Log.e("TAG",t.getMessage());
            }
        });
    }

    private void getInformationEtudiant(String login) {
        String token = getToken();

        //
        Call<ComptesEtudiantsResponse> call = apiInterface.doGetCompteEtudiants("Bearer " + token);
        call.enqueue(new Callback<ComptesEtudiantsResponse>() {
            @Override
            public void onResponse(Call<ComptesEtudiantsResponse> call, Response<ComptesEtudiantsResponse> response) {

                if (response.isSuccessful() && response.body() != null && response.body().compteEtudiants != null) {
                    boolean compteTrouve = false;

                    for (CompteEtudiant compteEtudiant : response.body().compteEtudiants) {

                        if (compteEtudiant != null && login.equals(compteEtudiant.login)) {
                            setCompteId(compteEtudiant.id, compteEtudiant._id);
                            compteTrouve = true;
                            break;
                        }
                    }

                    if (compteTrouve) {
                        openMainAndClearTask();
                    } else {
                        Toast.makeText(LoginActivity.this, "Compte etudiant introuvable", Toast.LENGTH_SHORT).show();
                        Log.e("TAG", "Compte etudiant non trouve pour login=" + login);
                    }

                } else {
                    Toast.makeText(LoginActivity.this, "Erreur chargement compte", Toast.LENGTH_SHORT).show();
                    Log.e("TAG", "Echec compte_etudiants HTTP=" + response.code());
                }
            }

            @Override
            public void onFailure(Call<ComptesEtudiantsResponse> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Failure", Toast.LENGTH_SHORT).show();
                call.cancel();
                Log.e("TAG",t.getMessage());

            }
        });

        APIClient.getEtatRecherches(this, new ResultatAppel<EtatRecherchesResponse>() {
            @Override
            public void traiterResultat(EtatRecherchesResponse liste) {
                if (liste == null || liste.etatRecherches == null) {
                    return;
                }
                HashMap<String, String> entries = new HashMap<>();
                for(EtatRecherche etat : liste.etatRecherches) {
                    if (etat != null && etat._id != null) {
                        entries.put(etat._id, etat.descriptif);
                    }
                }
                LoginActivity.this.setEnumValues(entries);
            }

            @Override
            public void traiterErreur() {

            }
        });

        APIClient.getEtatOffres(this, new ResultatAppel<EtatOffresResponse>() {
            @Override
            public void traiterResultat(EtatOffresResponse liste) {
                if (liste == null || liste.etatOffres == null) {
                    return;
                }
                HashMap<String, String> entries = new HashMap<>();
                for(EtatOffre etat : liste.etatOffres) {
                    if (etat != null && etat._id != null) {
                        entries.put(etat._id, etat.descriptif);
                    }
                }
                LoginActivity.this.setEnumValues(entries);
            }

            @Override
            public void traiterErreur() {

            }
        });

        APIClient.getEtatCandidatures(this, new ResultatAppel<EtatCandidaturesResponse>() {
            @Override
            public void traiterResultat(EtatCandidaturesResponse liste) {
                if (liste == null || liste.etatCandidatures == null) {
                    return;
                }
                HashMap<String, String> entries = new HashMap<>();
                for(EtatCandidature etat : liste.etatCandidatures) {
                    if (etat != null && etat._id != null) {
                        entries.put(etat._id, etat.descriptif);
                    }
                }
                LoginActivity.this.setEnumValues(entries);
            }

            @Override
            public void traiterErreur() {

            }
        });
    }
}