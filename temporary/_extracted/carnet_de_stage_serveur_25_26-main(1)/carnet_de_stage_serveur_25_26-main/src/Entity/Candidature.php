<?php

namespace App\Entity;

use App\Repository\CandidatureRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: CandidatureRepository::class)]
#[UniqueEntity(
    fields: ['compteEtudiant', 'offre'],
    errorPath: 'offre',
    message: 'Cet·te étudiant·e a déjà candidaté sur cette offre.',
)]
#[ApiResource]
class Candidature
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'candidatures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CompteEtudiant $compteEtudiant = null;

    #[ORM\ManyToOne(inversedBy: 'candidatures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Offre $offre = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $typeAction = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateAction = null;

    #[ORM\ManyToOne(inversedBy: 'candidatures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EtatCandidature $etatCandidature = null;

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

    public function getTypeAction(): ?string
    {
        return $this->typeAction;
    }

    public function setTypeAction(?string $typeAction): self
    {
        $this->typeAction = $typeAction;

        return $this;
    }

    public function getDateAction(): ?\DateTimeInterface
    {
        return $this->dateAction;
    }

    public function setDateAction(\DateTimeInterface $dateAction): self
    {
        $this->dateAction = $dateAction;

        return $this;
    }

    public function getEtatCandidature(): ?EtatCandidature
    {
        return $this->etatCandidature;
    }

    public function setEtatCandidature(?EtatCandidature $etatCandidature): self
    {
        $this->etatCandidature = $etatCandidature;

        return $this;
    }
}
