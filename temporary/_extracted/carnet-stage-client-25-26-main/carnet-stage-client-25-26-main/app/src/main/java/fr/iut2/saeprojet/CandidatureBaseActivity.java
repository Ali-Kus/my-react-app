package fr.iut2.saeprojet;

import android.view.View;
import android.widget.TextView;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Locale;

import fr.iut2.saeprojet.api.APIClient;
import fr.iut2.saeprojet.api.ResultatAppel;
import fr.iut2.saeprojet.entity.Candidature;
import fr.iut2.saeprojet.entity.Offre;

public abstract class CandidatureBaseActivity extends StageAppActivity {

    public static final String EXTRA_CANDIDATURE = "candidature_key";
    public static final String EXTRA_OFFRE = "offre";
    private static final DateTimeFormatter DISPLAY_DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.FRANCE);
    private static final DateTimeFormatter API_DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'00:00:00.000'Z'", Locale.ROOT);

    protected Candidature getCandidatureFromIntent() {
        return getIntent().getParcelableExtra(EXTRA_CANDIDATURE);
    }

    protected Offre getOffreFromIntent() {
        return getIntent().getParcelableExtra(EXTRA_OFFRE);
    }

    protected void setupHeader(TextView retourView, TextView headerLabelView, int headerLabelResId,
                               Candidature candidature, TextView intituleView) {
        if (retourView != null) {
            retourView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    finish();
                }
            });
        }

        if (headerLabelView != null) {
            headerLabelView.setText(headerLabelResId);
        }

        refreshOffreTitle(candidature, intituleView);
    }

    protected void refreshOffreTitle(Candidature candidature, TextView intituleView) {
        if (candidature == null || intituleView == null) {
            return;
        }

        APIClient.getOffre(this, candidature.getOffreId(), new ResultatAppel<Offre>() {
            @Override
            public void traiterResultat(Offre offre) {
                if (offre != null && offre.intitule != null) {
                    intituleView.setText(offre.intitule);
                }
            }

            @Override
            public void traiterErreur() {

            }
        });
    }

    protected String formatDateForDisplay(String apiDate) {
        if (apiDate == null || apiDate.trim().isEmpty()) {
            return "";
        }

        try {
            return LocalDate.parse(apiDate).format(DISPLAY_DATE_FORMATTER);
        } catch (DateTimeParseException ignored) {
        }

        try {
            return OffsetDateTime.parse(apiDate).toLocalDate().format(DISPLAY_DATE_FORMATTER);
        } catch (DateTimeParseException ignored) {
        }

        try {
            String dateOnly = apiDate.length() >= 10 ? apiDate.substring(0, 10) : apiDate;
            return LocalDate.parse(dateOnly).format(DISPLAY_DATE_FORMATTER);
        } catch (DateTimeParseException ignored) {
            return apiDate;
        }
    }

    protected String toApiDate(String displayDate, String fallbackApiDate) {
        if (displayDate != null && !displayDate.trim().isEmpty()) {
            try {
                LocalDate date = LocalDate.parse(displayDate.trim(), DISPLAY_DATE_FORMATTER);
                return date.format(API_DATE_FORMATTER);
            } catch (DateTimeParseException ignored) {
            }
        }

        if (fallbackApiDate != null && !fallbackApiDate.trim().isEmpty()) {
            return fallbackApiDate;
        }

        return LocalDate.now().format(API_DATE_FORMATTER);
    }
}
