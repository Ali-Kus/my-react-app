<?php

namespace App\Api;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use App\Entity\CompteEtudiant;
use App\Entity\Etudiant;
use App\Entity\OffreConsultee;
use App\Entity\OffreRetenue;
use App\Entity\Candidature;

class FilterCompteEtudiantQueryExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface {

    private int $idCompte;   // id du compte de l'étudiant connecté
    private int $idEtudiant; // id de l'étudiant connecté
    private bool $isAdmin;   // l'étudiant connecté a-t-il le ROLE_ADMIN

    // On récupère le compte de l'utilisateur 
    //   pour n'afficher que les données qui le concernent
    public function __construct(Security $security) {
        $this->idCompte = $security->getUser()->getId();
        $this->idEtudiant = $security->getUser()->getEtudiant()->getId();
        $this->isAdmin = $security->isGranted('ROLE_ADMIN');
    }

    public function applyToCollection(QueryBuilder $qb, QueryNameGeneratorInterface $queryNameGenerator,
            string $resourceClass, $operationName = null) {
        if (!$this->isAdmin) {
            if (Etudiant::class === $resourceClass) {
                $qb->andWhere(sprintf("%s.id = %d", $qb->getRootAliases()[0], $this->idEtudiant));
            } elseif (CompteEtudiant::class === $resourceClass) {
                $qb->andWhere(sprintf("%s.id = %d", $qb->getRootAliases()[0], $this->idCompte));
            } elseif (OffreConsultee::class === $resourceClass ||
                    OffreRetenue::class === $resourceClass ||
                    Candidature::class === $resourceClass) {
                $qb->andWhere(sprintf("%s.compteEtudiant = %d", $qb->getRootAliases()[0], $this->idCompte));
            }
        }
    }

    public function applyToItem(QueryBuilder $qb, QueryNameGeneratorInterface $queryNameGenerator,
            string $resourceClass, array $identifiers, $operationName = null,
            array $context = []) {
        if (!$this->isAdmin) {
            if (Etudiant::class === $resourceClass) {
                $qb->andWhere(sprintf("%s.id = %d", $qb->getRootAliases()[0], $this->idEtudiant));
            } elseif (CompteEtudiant::class === $resourceClass) {
                $qb->andWhere(sprintf("%s.id = %d", $qb->getRootAliases()[0], $this->idCompte));
            } elseif (OffreConsultee::class === $resourceClass ||
                    OffreRetenue::class === $resourceClass ||
                    Candidature::class === $resourceClass) {
                $qb->andWhere(sprintf("%s.compteEtudiant = %d", $qb->getRootAliases()[0], $this->idCompte));
            }
        }
    }

}
