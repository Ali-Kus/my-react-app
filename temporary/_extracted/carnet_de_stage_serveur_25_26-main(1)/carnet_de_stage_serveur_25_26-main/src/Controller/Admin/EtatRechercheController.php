<?php

namespace App\Controller\Admin;

use App\Entity\EtatRecherche;
use App\Form\EtatRechercheType;
use App\Repository\EtatRechercheRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/etat_recherche')]
class EtatRechercheController extends AbstractController
{
    #[Route('/', name: 'app_etat_recherche_index', methods: ['GET'])]
    public function index(EtatRechercheRepository $etatRechercheRepository): Response
    {
        return $this->render('Admin/etat_recherche/index.html.twig', [
            'etat_recherches' => $etatRechercheRepository->findBy([],["id"=>"ASC"]),
        ]);
    }

    #[Route('/new', name: 'app_etat_recherche_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EtatRechercheRepository $etatRechercheRepository): Response
    {
        $etatRecherche = new EtatRecherche();
        $form = $this->createForm(EtatRechercheType::class, $etatRecherche);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $etatRechercheRepository->save($etatRecherche, true);

            return $this->redirectToRoute('app_etat_recherche_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/etat_recherche/new.html.twig', [
            'etat_recherche' => $etatRecherche,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_etat_recherche_show', methods: ['GET'])]
    public function show(EtatRecherche $etatRecherche): Response
    {
        return $this->render('Admin/etat_recherche/show.html.twig', [
            'etat_recherche' => $etatRecherche,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_etat_recherche_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EtatRecherche $etatRecherche, EtatRechercheRepository $etatRechercheRepository): Response
    {
        $form = $this->createForm(EtatRechercheType::class, $etatRecherche);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $etatRechercheRepository->save($etatRecherche, true);

            return $this->redirectToRoute('app_etat_recherche_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/etat_recherche/edit.html.twig', [
            'etat_recherche' => $etatRecherche,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_etat_recherche_delete', methods: ['POST'])]
    public function delete(Request $request, EtatRecherche $etatRecherche, EtatRechercheRepository $etatRechercheRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$etatRecherche->getId(), $request->request->get('_token'))) {
            $etatRechercheRepository->remove($etatRecherche, true);
        }

        return $this->redirectToRoute('app_etat_recherche_index', [], Response::HTTP_SEE_OTHER);
    }
}
