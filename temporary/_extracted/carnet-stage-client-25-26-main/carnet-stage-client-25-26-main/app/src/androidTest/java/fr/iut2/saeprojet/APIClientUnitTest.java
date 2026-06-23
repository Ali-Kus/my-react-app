package fr.iut2.saeprojet;

import org.junit.Test;
import static org.junit.Assert.*;

import fr.iut2.saeprojet.api.APIClient;

public class APIClientUnitTest {

    @Test
    public void testExtractionCandidatureIdValide() {
        String urlSymfony = "/api/candidatures/153";
        long idExtrait = APIClient.getCandidatureId(urlSymfony);
        assertEquals(153L, idExtrait);
    }

    @Test
    public void testExtractionCandidatureIdUnSeulChiffre() {
        String urlSymfony = "/api/candidatures/7";
        long idExtrait = APIClient.getCandidatureId(urlSymfony);
        assertEquals(7L, idExtrait);
    }

    @Test
    public void testExtractionCandidatureIdGrandNombre() {
        String urlSymfony = "/api/candidatures/987654321";
        long idExtrait = APIClient.getCandidatureId(urlSymfony);
        assertEquals(987654321L, idExtrait);
    }
}