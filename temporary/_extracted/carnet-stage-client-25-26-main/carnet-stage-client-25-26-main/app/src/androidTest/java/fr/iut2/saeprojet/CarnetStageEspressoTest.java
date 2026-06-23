package fr.iut2.saeprojet;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.intent.Intents.intended;
import static androidx.test.espresso.intent.matcher.IntentMatchers.hasComponent;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withText;

import androidx.test.core.app.ActivityScenario;
import androidx.test.espresso.Espresso;
import androidx.test.espresso.intent.Intents;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class CarnetStageEspressoTest {

    @Before
    public void setUp() {
        Intents.init();
    }

    @After
    public void tearDown() {
        Intents.release();
    }

    @Test
    public void testAffichageChampsLogin() {
        ActivityScenario.launch(LoginActivity.class);
        onView(withId(R.id.username)).check(matches(isDisplayed()));
        onView(withId(R.id.password)).check(matches(isDisplayed()));
        onView(withId(R.id.login)).check(matches(isDisplayed()));
    }

    @Test
    public void testSaisieTexteLogin() {
        ActivityScenario.launch(LoginActivity.class);
        onView(withId(R.id.username)).perform(typeText("borealea"), closeSoftKeyboard());
        onView(withId(R.id.username)).check(matches(withText("borealea")));
        onView(withId(R.id.password)).perform(typeText("aurore"), closeSoftKeyboard());
        onView(withId(R.id.password)).check(matches(withText("aurore")));
    }

    @Test
    public void testAffichageAccueil() {
        ActivityScenario.launch(MainActivity.class);
        onView(withId(R.id.offres)).check(matches(isDisplayed()));
        onView(withId(R.id.candidatures)).check(matches(isDisplayed()));
        onView(withId(R.id.logoutButton)).check(matches(isDisplayed()));
    }

    @Test
    public void testNavigationVersOffres() {
        ActivityScenario.launch(MainActivity.class);
        onView(withId(R.id.offres)).perform(click());
        intended(hasComponent(ListOffresActivity.class.getName()));
    }

    @Test
    public void testNavigationVersCandidatures() {
        ActivityScenario.launch(MainActivity.class);
        onView(withId(R.id.candidatures)).perform(click());
        intended(hasComponent(ListCandidaturesActivity.class.getName()));
    }

    @Test
    public void testDeconnexionUtilisateur() {
        ActivityScenario.launch(MainActivity.class);
        onView(withId(R.id.logoutButton)).perform(click());
        intended(hasComponent(LoginActivity.class.getName()));
    }

    @Test
    public void testBoutonRetourSysteme() {
        ActivityScenario.launch(MainActivity.class);
        onView(withId(R.id.candidatures)).perform(click());
        intended(hasComponent(ListCandidaturesActivity.class.getName()));
        Espresso.pressBack();
        onView(withId(R.id.offres)).check(matches(isDisplayed()));
    }
}