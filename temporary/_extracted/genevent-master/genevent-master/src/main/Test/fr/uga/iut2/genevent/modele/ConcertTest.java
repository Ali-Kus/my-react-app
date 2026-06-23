package fr.uga.iut2.genevent.modele;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ConcertTest {

    @Test
    void addSousTraitance() throws NonPositifException, MinuteInvalideException, HeureInvalideException, TelephoneInvalideException {

        //
        assertDoesNotThrow(() -> {
            Concert concert = new Concert();
            concert.addSousTraitance("sécurité", new SousTraitance(1000, "police", "0002030405", "police@gouv.fr"));
        }, "Problème de fonctionnement de l'ajout d'une sous-traitance.");

        //
        Concert concert = new Concert();
        concert.addSousTraitance("sécurité", new SousTraitance(1000, "police", "0002030405", "police@gouv.fr"));
        assertEquals(1, concert.getSousTraitances().size(), "La méthode addSousTraitance ne modifie pas correctement l'attribut. ");
    }

    @Test
    void removeSousTraitance() throws NonPositifException, TelephoneInvalideException {

        //
        Concert concert = new Concert();
        concert.addSousTraitance("sécurité", new SousTraitance(1000, "police", "0002030405", "police@gouv.fr"));

        //
        concert.removeSousTraitance("sécurité");
        assertEquals(0, concert.getSousTraitances().size(), "La méthode removeSousTraitance() ne marche pas.");
    }

    @Test
    void getHeureComplete() throws MinuteInvalideException, HeureInvalideException {

        //
        Concert concert = new Concert();
        assertEquals("Heure inconnue", concert.getHeureComplete(), "La méthode n'affiche pas " +
                "le bon message quand rien n'a été initialisé.");

        //
        concert.setMinuteDebut(30);
        assertEquals("Heure inconnue", concert.getHeureComplete(), "La méthode n'affiche pas " +
                "le bon message seules les minutes ont été initialisées.");

        //
        concert = new Concert();
        concert.setHeureDebut(24);
        assertEquals("0 heure 00", concert.getHeureComplete(), "La méthode n'affiche pas " +
                "le bon message seule l'heure a été initialisées.");

        //
        concert.setHeureDebut(2);
        assertEquals("2 heures 00", concert.getHeureComplete(), "La méthode n'affiche pas " +
                "le bon message seule l'heure a été initialisées.");

        //
        concert.setMinuteDebut(15);
        assertEquals("2 heures 15", concert.getHeureComplete(), "La méthode n'affiche pas " +
                "le bon message seule l'heure a été initialisées.");
    }

    @Test
    void setHeureDebut() throws HeureInvalideException {

        //
        Concert concert = new Concert();
        concert.setHeureDebut(24);
        assertEquals(0, concert.getHeureDebut(), "La méthode doit initialiser à 0 quand on entre la valeur 24.");

        //
        assertThrows(HeureInvalideException.class, () -> {
            concert.setHeureDebut(25);
        }, "La méthode doit lever une HeureInvalideException quand on essaie d'initialiser avec une valeur > 24.");
    }

    @Test
    void setDuree() throws NonPositifException {

        //
        Concert concert = new Concert();
        concert.setDuree(24);
        assertEquals(24, concert.getDuree(), "La méthode doit mettre à jour la durée.");

        //
        assertThrows(NonPositifException.class, () -> {
            concert.setDuree(0);
        }, "La méthode doit lever une NonPositifException quand on essaie d'initialiser avec une valeur <= 0.");
    }

    @Test
    void setMinuteDebut() throws MinuteInvalideException {

        //
        Concert concert = new Concert();
        concert.setMinuteDebut(0);
        assertEquals(0, concert.getMinuteDebut(), "La méthode doit mettre à jour les minutes");

        //
        assertThrows(MinuteInvalideException.class, () -> {
            concert.setMinuteDebut(60);
        }, "La méthode doit lever une MinuteInvalideException quand on essaie d'initialiser avec une valeur >= 60.");
    }

    @Test
    void setDate() throws DateInvalideException {

        //
        Concert concert = new Concert();
        concert.setDate(3, 4, 25);
        assertEquals("03/04/25", concert.getDate(), "La méthode doit initialiser la date " +
                "et rajouter des 0 aux bons endroits.");

        //
        assertThrows(DateInvalideException.class, () -> {
            concert.setDate(2, 0, 24);
        }, "La méthode doit lever une DateInvalideException quand on essaie d'initialiser avec une valeur <= 0.");

        //
        assertThrows(DateInvalideException.class, () -> {
            concert.setDate(29, 2, 25);
        }, "La méthode doit lever une DateInvalideException quand on essaie d'initialiser un 29/02 d'une année non bissextile.");

        //
        assertDoesNotThrow(() -> {
            concert.setDate(29, 2, 24);
        }, "La méthode ne doit pas lever de DateInvalideException quand on essaie d'initialiser un 29/02 d'une année bissextile.");

        //
        assertThrows(DateInvalideException.class, () -> {
            concert.setDate(2, 13, 24);
        }, "La méthode doit lever une DateInvalideException quand on essaie d'initialiser avec un mois > 12.");

        //
        assertThrows(DateInvalideException.class, () -> {
            concert.setDate(2, 0, 23);
        }, "La méthode doit lever une DateInvalideException quand on essaie d'initialiser avec une année < 24.");
    }

    @Test
    void setArtiste() throws NonPositifException, MinuteInvalideException, HeureInvalideException, TelephoneInvalideException {

        //
        Concert concert = new Concert();
        assertDoesNotThrow(() -> {
                    concert.setArtiste("Joe", 50000, "0102030405", "chanteur@eMail.org", "Gateau", "Jean");
                }, "La méthode setArtiste() ne fonctionne pas du tout");

        //
        concert.setArtiste("Joe", 50000, "0102030405", "chanteur@eMail.org", "Gateau", "Jean");
        assertEquals(50000, concert.getArtiste().getCout(), "Le cout a été mal initialisé");
    }

    @Test
    void getDateComplete() throws MinuteInvalideException, DateInvalideException, HeureInvalideException, NonPositifException {

        //
        Concert concert = new Concert();
        concert.setMinuteDebut(45);
        assertEquals("Date inconnue", concert.getDateComplete(), "La date complète doit valoir 'Date inconnue' " +
                "si les attributs de date et d'heures n'ont pas été initialisés.");

        //
        concert.setDate(23, 02, 25);
        assertEquals("Début le 23/02/25", concert.getDateComplete(), "getDateComplete() " +
                "ne marche pas en ayant seulement la date.");

        //
        concert.setHeureDebut(23);
        assertEquals("Début le 23/02/25 à 23 heures 45", concert.getDateComplete(), "getDateComplete() " +
                "ne marche pas en ayant la date et l'heure.");

        //
        concert.setDuree(100);
        assertEquals("Début le 23/02/25 à 23 heures 45, fin à 1 heure 25", concert.getDateComplete(),
                "getDateComplete() ne marche pas en ayant la date, l'heure et la durée.");
    }
}