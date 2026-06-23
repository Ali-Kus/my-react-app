package fr.iut2.saeprojet;

import android.content.res.ColorStateList;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.APIService;

public class StageAppActivity extends AppCompatActivity {
    private static final String NO_TOKEN = "no token";
    private static final String PREF_OFFRES_CONSULTEES_PREFIX = "offres_consultees_local_";
    private static final String PREF_OFFRES_RETENUES_PREFIX = "offres_retenues_local_";
    protected APIService apiInterface = null;

    public APIService getApiInterface() {
        return apiInterface;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Chargement de l'API
        apiInterface = APIClient.getAPIService();
    }

    private SharedPreferences getSharedPreferences() {
        return getApplicationContext().getSharedPreferences("MyPref", Context.MODE_PRIVATE);
    }

    public String getToken() {
        return getSharedPreferences().getString(getString(R.string.token_key), NO_TOKEN);
    }

    public String getLogin() {
        return getSharedPreferences().getString(getString(R.string.login_key), "no login");
    }

    public long getCompteId() {
        return getSharedPreferences().getLong(getString(R.string.login_id_key), 0);
    }

    public String getCompte_Id() {
        return getSharedPreferences().getString(getString(R.string.login_id_path), "");
    }

    protected void setCompteId(long id, String _id) {
        SharedPreferences.Editor editor = getSharedPreferences().edit();
        editor.putLong(getString(R.string.login_id_key), id);
        editor.putString(getString(R.string.login_id_path), _id);
        editor.apply();
    }
    protected void setAuthData(String login, String token) {
        SharedPreferences.Editor editor = getSharedPreferences().edit();
        editor.putString(getString(R.string.token_key), token);
        editor.putString(getString(R.string.login_key), login);
        editor.apply();
    }

    protected void setEnumValues(HashMap<String, String> entries) {
        SharedPreferences.Editor editor = getSharedPreferences().edit();

        for(String key : entries.keySet()) {
            editor.putString(key, entries.get(key));
        }

        editor.apply();
    }

    protected String getEnumValue(String key) {
        SharedPreferences prefs = getSharedPreferences();

        return prefs.getString(key, "");
    }

    private String getLocalOffresConsulteesKey() {
        return PREF_OFFRES_CONSULTEES_PREFIX + getCompteId();
    }

    private String getLocalOffresRetenuesKey() {
        return PREF_OFFRES_RETENUES_PREFIX + getCompteId();
    }

    protected Set<String> getLocalOffresConsultees() {
        return getLocalSet(getLocalOffresConsulteesKey());
    }

    protected Set<String> getLocalOffresRetenues() {
        return getLocalSet(getLocalOffresRetenuesKey());
    }

    protected void markOffreConsultee(String offreId) {
        addToLocalSet(getLocalOffresConsulteesKey(), offreId);
    }

    protected void markOffreRetenue(String offreId) {
        addToLocalSet(getLocalOffresRetenuesKey(), offreId);
    }
    protected void unmarkOffreRetenue(String offreId) {
        removeFromLocalSet(getLocalOffresRetenuesKey(), offreId);
    }

    private void removeFromLocalSet(String key, String value) {
        if (TextUtils.isEmpty(value)) {
            return;
        }

        Set<String> ids = getLocalSet(key);
        if (ids.remove(value)) {
            getSharedPreferences().edit().putStringSet(key, ids).apply();
        }
    }

    private Set<String> getLocalSet(String key) {
        Set<String> values = getSharedPreferences().getStringSet(key, Collections.<String>emptySet());
        return new HashSet<>(values);
    }

    private void addToLocalSet(String key, String value) {
        if (TextUtils.isEmpty(value)) {
            return;
        }

        Set<String> ids = getLocalSet(key);
        if (ids.add(value)) {
            getSharedPreferences().edit().putStringSet(key, ids).apply();
        }
    }

    protected String getOfferStateLabel(String etatOffre) {
        // Priorité aux enums simples, pas aux valeurs en cache
        if (fr.iut2.saeprojet.api.EtatOffreEnum.DISPO.get_id().equals(etatOffre)) {
            return "Disponible";
        }
        if (fr.iut2.saeprojet.api.EtatOffreEnum.INDISPO.get_id().equals(etatOffre)) {
            return "Indisponible";
        }
        if (fr.iut2.saeprojet.api.EtatOffreEnum.EXPIREE.get_id().equals(etatOffre)) {
            return "Expirée";
        }

        // Fallback sur la valeur en cache si elle existe
        String value = getEnumValue(etatOffre);
        if (!value.isEmpty()) {
            return value;
        }

        return etatOffre == null ? "" : etatOffre;
    }

    protected int getOfferStateColor(String etatOffre) {
        if (fr.iut2.saeprojet.api.EtatOffreEnum.DISPO.get_id().equals(etatOffre)) {
            return ContextCompat.getColor(this, R.color.brand_secondary);
        }
        if (fr.iut2.saeprojet.api.EtatOffreEnum.INDISPO.get_id().equals(etatOffre)) {
            return ContextCompat.getColor(this, R.color.errorColor);
        }
        if (fr.iut2.saeprojet.api.EtatOffreEnum.EXPIREE.get_id().equals(etatOffre)) {
            return ContextCompat.getColor(this, R.color.textColorSecondary);
        }

        return ContextCompat.getColor(this, R.color.primaryColor);
    }

    protected void bindBadge(TextView badge, String label, int color) {
        if (badge == null) {
            return;
        }

        badge.setText(label);
        badge.setBackgroundTintList(ColorStateList.valueOf(color));
        badge.setTextColor(ContextCompat.getColor(this, R.color.white));
    }

    protected void logout() {
        getSharedPreferences().edit().clear().apply();
        openLoginAndClearTask();
    }

    /**
     * Efface uniquement les données d'authentification (token, login, ids)
     * sans effectuer de navigation. Utile pour forcer l'affichage de
     * l'écran de login au démarrage.
     */
    protected void clearAuthData() {
        SharedPreferences.Editor editor = getSharedPreferences().edit();
        editor.remove(getString(R.string.token_key));
        editor.remove(getString(R.string.login_key));
        editor.remove(getString(R.string.login_id_key));
        editor.remove(getString(R.string.login_id_path));
        editor.apply();
    }

    protected boolean hasActiveSession() {
        String token = getToken();
        return token != null && !NO_TOKEN.equals(token) && !token.trim().isEmpty() && getCompteId() > 0;
    }

    protected void openMainAndClearTask() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    protected void openLoginAndClearTask() {
        Intent intent = new Intent(this, LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
