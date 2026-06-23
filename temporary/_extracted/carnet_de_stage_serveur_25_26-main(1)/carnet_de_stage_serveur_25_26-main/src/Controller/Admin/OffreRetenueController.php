<?php

namespace App\Controller\Admin;

use App\Entity\OffreRetenue;
use App\Form\OffreRetenueType;
use App\Repository\OffreRetenueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/offre_retenue')]
class OffreRetenueController extends AbstractController
{
    #[Route('/', name: 'app_offre_retenue_index', methods: ['GET'])]
    public function index(OffreRetenueRepository $offreRetenueRepository): Response
    {
        return $this->render('Admin/offre_retenue/index.html.twig', [
            'offre_retenues' => $offreRetenueRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_offre_retenue_new', methods: ['GET', 'POST'])]
    public function new(Request $request, OffreRetenueRepository $offreRetenueRepository): Response
    {
        $offreRetenue = new OffreRetenue();
        $form = $this->createForm(OffreRetenueType::class, $offreRetenue);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $offreRetenueRepository->save($offreRetenue, true);

            return $this->redirectToRoute('app_offre_retenue_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/offre_retenue/new.html.twig', [
            'offre_retenue' => $offreRetenue,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_offre_retenue_show', methods: ['GET'])]
    public function show(OffreRetenue $offreRetenue): Response
    {
        return $this->render('Admin/offre_retenue/show.html.twig', [
            'offre_retenue' => $offreRetenue,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_offre_retenue_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, OffreRetenue $offreRetenue, OffreRetenueRepository $offreRetenueRepository): Response
    {
        $form = $this->createForm(OffreRetenueType::class, $offreRetenue);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $offreRetenueRepository->save($offreRetenue, true);

            return $this->redirectToRoute('app_offre_retenue_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/offre_retenue/edit.html.twig', [
            'offre_retenue' => $offreRetenue,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_offre_retenue_delete', methods: ['POST'])]
    public function delete(Request $request, OffreRetenue $offreRetenue, OffreRetenueRepository $offreRetenueRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$offreRetenue->getId(), $request->request->get('_token'))) {
            $offreRetenueRepository->remove($offreRetenue, true);
        }

        return $this->redirectToRoute('app_offre_retenue_index', [], Response::HTTP_SEE_OTHER);
    }
}
