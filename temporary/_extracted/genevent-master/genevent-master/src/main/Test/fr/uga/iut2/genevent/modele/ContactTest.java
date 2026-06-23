package fr.uga.iut2.genevent.modele;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContactTest {

    @Test
    void setTelephone() {
        assertThrows(TelephoneInvalideException.class, () -> {
            Contact contact = new Contact("a","eMail");
        }, "Le TelephoneInvalideException ne marche pas.");

                assertThrows(TelephoneInvalideException.class, () -> {
            Contact contact = new Contact("123456789","eMail");
        }, "Le TelephoneInvalideException ne marche pas.");

        assertThrows(TelephoneInvalideException.class, () -> {
            Contact contact = new Contact("12345678901","eMail");
        }, "Le TelephoneInvalideException ne marche pas.");

        assertThrows(TelephoneInvalideException.class, () -> {
            Contact contact = new Contact("1234567892a","eMail");
        }, "Le TelephoneInvalideException ne marche pas.");

        assertThrows(TelephoneInvalideException.class, () -> {
            Contact contact = new Contact("123456789a","eMail");
        }, "Le TelephoneInvalideException ne marche pas.");

        assertThrows(TelephoneInvalideException.class, () -> {
            Contact contact = new Contact("1234 56 78 90","eMail");
        }, "Le TelephoneInvalideException ne marche pas.");

        assertDoesNotThrow(() -> {
            Contact contact = new Contact("1234567890","eMail");
        }, "Le TelephoneInvalideException est levé quand il ne devrait pas.");
    }
}