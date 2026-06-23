<?php

namespace App\Controller\Admin;

use App\Entity\EtatCandidature;
use App\Form\EtatCandidatureType;
use App\Repository\EtatCandidatureRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/etat_candidature')]
class EtatCandidatureController extends AbstractController
{
    #[Route('/', name: 'app_etat_candidature_index', methods: ['GET'])]
    public function index(EtatCandidatureRepository $etatCandidatureRepository): Response
    {
        return $this->render('Admin/etat_candidature/index.html.twig', [
            'etat_candidatures' => $etatCandidatureRepository->findBy([],["id"=>"ASC"]),
        ]);
    }

    #[Route('/new', name: 'app_etat_candidature_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EtatCandidatureRepository $etatCandidatureRepository): Response
    {
        $etatCandidature = new EtatCandidature();
        $form = $this->createForm(EtatCandidatureType::class, $etatCandidature);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $etatCandidatureRepository->save($etatCandidature, true);

            return $this->redirectToRoute('app_etat_candidature_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/etat_candidature/new.html.twig', [
            'etat_candidature' => $etatCandidature,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_etat_candidature_show', methods: ['GET'])]
    public function show(EtatCandidature $etatCandidature): Response
    {
        return $this->render('Admin/etat_candidature/show.html.twig', [
            'etat_candidature' => $etatCandidature,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_etat_candidature_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EtatCandidature $etatCandidature, EtatCandidatureRepository $etatCandidatureRepository): Response
    {
        $form = $this->createForm(EtatCandidatureType::class, $etatCandidature);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $etatCandidatureRepository->save($etatCandidature, true);

            return $this->redirectToRoute('app_etat_candidature_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/etat_candidature/edit.html.twig', [
            'etat_candidature' => $etatCandidature,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_etat_candidature_delete', methods: ['POST'])]
    public function delete(Request $request, EtatCandidature $etatCandidature, EtatCandidatureRepository $etatCandidatureRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$etatCandidature->getId(), $request->request->get('_token'))) {
            $etatCandidatureRepository->remove($etatCandidature, true);
        }

        return $this->redirectToRoute('app_etat_candidature_index', [], Response::HTTP_SEE_OTHER);
    }
}
