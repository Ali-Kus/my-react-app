<?php

namespace App\Entity;

use App\Repository\OffreRetenueRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: OffreRetenueRepository::class)]
#[UniqueEntity(
    fields: ['compteEtudiant', 'offre'],
    errorPath: 'offre',
    message: 'Cette offre a déjà été retenue par cet·te étudiant·e.',
)]
#[ApiResource]
class OffreRetenue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'offreRetenues')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CompteEtudiant $compteEtudiant = null;

    #[ORM\ManyToOne(inversedBy: 'offreRetenues')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Offre $offre = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCompteEtudiant(): ?CompteEtudiant
    {
        return $this->compteEtudiant;
    }

    public function setCompteEtudiant(?CompteEtudiant $compteEtudiant): self
    {
        $this->compteEtudiant = $compteEtudiant;

        return $this;
    }

    public function getOffre(): ?Offre
    {
        return $this->offre;
    }

    public function setOffre(?Offre $offre): self
    {
        $this->offre = $offre;

        return $this;
    }
}
