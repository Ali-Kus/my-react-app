<?php

namespace App\Controller\Admin;

use App\Entity\OffreConsultee;
use App\Form\OffreConsulteeType;
use App\Repository\OffreConsulteeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/offre_consultee')]
class OffreConsulteeController extends AbstractController
{
    #[Route('/', name: 'app_offre_consultee_index', methods: ['GET'])]
    public function index(OffreConsulteeRepository $offreConsulteeRepository): Response
    {
        return $this->render('Admin/offre_consultee/index.html.twig', [
            'offre_consultees' => $offreConsulteeRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_offre_consultee_new', methods: ['GET', 'POST'])]
    public function new(Request $request, OffreConsulteeRepository $offreConsulteeRepository): Response
    {
        $offreConsultee = new OffreConsultee();
        $form = $this->createForm(OffreConsulteeType::class, $offreConsultee);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $offreConsulteeRepository->save($offreConsultee, true);

            return $this->redirectToRoute('app_offre_consultee_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/offre_consultee/new.html.twig', [
            'offre_consultee' => $offreConsultee,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_offre_consultee_show', methods: ['GET'])]
    public function show(OffreConsultee $offreConsultee): Response
    {
        return $this->render('Admin/offre_consultee/show.html.twig', [
            'offre_consultee' => $offreConsultee,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_offre_consultee_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, OffreConsultee $offreConsultee, OffreConsulteeRepository $offreConsulteeRepository): Response
    {
        $form = $this->createForm(OffreConsulteeType::class, $offreConsultee);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $offreConsulteeRepository->save($offreConsultee, true);

            return $this->redirectToRoute('app_offre_consultee_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('Admin/offre_consultee/edit.html.twig', [
            'offre_consultee' => $offreConsultee,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_offre_consultee_delete', methods: ['POST'])]
    public function delete(Request $request, OffreConsultee $offreConsultee, OffreConsulteeRepository $offreConsulteeRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$offreConsultee->getId(), $request->request->get('_token'))) {
            $offreConsulteeRepository->remove($offreConsultee, true);
        }

        return $this->redirectToRoute('app_offre_consultee_index', [], Response::HTTP_SEE_OTHER);
    }
}
