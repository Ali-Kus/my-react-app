<?php

namespace App\Controller\Admin;

use App\Entity\EtatOffre;
use App\Form\EtatOffreType;
use App\Repository\EtatOffreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/etat_offre')]
class EtatOffreController extends AbstractController
{
    #[Route('/', name: 'app_etat_offre_index', methods: ['GET'])]
    public function index(EtatOffreRepository $etatOffreRepository): Response
    {
        return $this->render('Admin/etat_offre/index.html.twig', [
            'etat_offres' => $etatOffreRepository->findBy([],["id"=>"ASC"]),
        ]);
    }

    #[Route('/new', name: 'app_etat_offre_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EtatOffreRepository $etatOffreRepository): Response
    {
        $etatOffre = new EtatOffre();
        $form = $this->createForm(EtatOffreType::class, $etatOffre);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $etatOffreRepository->save($etatOffre, true);

            return $this->redirectToRoute('app_etat_offre_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/etat_offre/new.html.twig', [
            'etat_offre' => $etatOffre,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_etat_offre_show', methods: ['GET'])]
    public function show(EtatOffre $etatOffre): Response
    {
        return $this->render('Admin/etat_offre/show.html.twig', [
            'etat_offre' => $etatOffre,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_etat_offre_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, EtatOffre $etatOffre, EtatOffreRepository $etatOffreRepository): Response
    {
        $form = $this->createForm(EtatOffreType::class, $etatOffre);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $etatOffreRepository->save($etatOffre, true);

            return $this->redirectToRoute('app_etat_offre_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/etat_offre/edit.html.twig', [
            'etat_offre' => $etatOffre,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_etat_offre_delete', methods: ['POST'])]
    public function delete(Request $request, EtatOffre $etatOffre, EtatOffreRepository $etatOffreRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$etatOffre->getId(), $request->request->get('_token'))) {
            $etatOffreRepository->remove($etatOffre, true);
        }

        return $this->redirectToRoute('app_etat_offre_index', [], Response::HTTP_SEE_OTHER);
    }
}
