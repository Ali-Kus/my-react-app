<?php

namespace App\Controller\Etudiant;

use App\Repository\CompteEtudiantRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\OffreRepository;
use App\Entity\CompteEtudiant;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[Route('/etudiant/tableau_de_bord')]
class TableauDeBordController extends AbstractController
{
    private $offreRepository;

    // Constructeur du service : injection des dépendances
    public function __construct(OffreRepository $offreRepository) {
        $this->offreRepository = $offreRepository;
    }

    // Retourne la liste des offres avec pour chaque offre son statut pour $compteEtudiant
    public function getOffreByCompte(CompteEtudiant $compteEtudiant)
    {
        $offresByEtudiant = [];
        foreach ($this->offreRepository->findAll() as $offre) {
            $offresByEtudiant[$offre->getId()] = [
                "offre" => $offre,
                "ordre" => 4,
                "statut" => "Pas Consultée",
                "candidature" => null
            ];
        }
        foreach ($compteEtudiant->getCandidatures() as $candidature) {
            $offresByEtudiant[$candidature->getOffre()->getId()]["ordre"] = 1;
            $offresByEtudiant[$candidature->getOffre()->getId()]["statut"] = "Candidature";
            $offresByEtudiant[$candidature->getOffre()->getId()]["candidature"] = $candidature;
        }
        foreach ($compteEtudiant->getOffreRetenues() as $offreRetenue) {
            if ($offresByEtudiant[$offreRetenue->getOffre()->getId()]["ordre"] == 4) {
                $offresByEtudiant[$offreRetenue->getOffre()->getId()]["ordre"] = 2;
                $offresByEtudiant[$offreRetenue->getOffre()->getId()]["statut"] = "Retenue";
            }
        }
        foreach ($compteEtudiant->getOffreConsultees() as $offreConsultee) {
            if ($offresByEtudiant[$offreConsultee->getOffre()->getId()]["ordre"] == 4) {
                $offresByEtudiant[$offreConsultee->getOffre()->getId()]["ordre"] = 3;
                $offresByEtudiant[$offreConsultee->getOffre()->getId()]["statut"] = "Consultée";
            }
        }
        return $offresByEtudiant;
    }

    #[Route('/', name: 'app_etudiant_tableau_de_bord_index', methods: ['GET'])]
    public function index(Security $security): Response
    {
        return $this->render('Tableau_de_bord/index.html.twig', [
            'comptes' => [$security->getUser()],
        ]);
    }

    #[Route('/show', name: 'app_etudiant_tableau_de_bord_show', methods: ['GET'])]
    public function show(Security $security): Response
    {
        $compte = $security->getUser();
        return $this->render('Tableau_de_bord/show.html.twig', [
            'compte' => $compte,
            'offresByCompte' => $this->getOffreByCompte($compte),
        ]);
    }
}
