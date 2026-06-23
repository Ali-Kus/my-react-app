<?php

namespace App\Entity;

use App\Repository\EtatRechercheRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: EtatRechercheRepository::class)]
#[ApiResource]
class EtatRecherche {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descriptif = null;

    #[ORM\OneToMany(mappedBy: 'etatRecherche', targetEntity: CompteEtudiant::class)]
    private Collection $comptesEtudiant;

    public function __construct() {
        $this->comptesEtudiant = new ArrayCollection();
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getEtat(): ?string {
        return $this->etat;
    }

    public function setEtat(string $etat): self {
        $this->etat = $etat;

        return $this;
    }

    public function getDescriptif(): ?string {
        return $this->descriptif;
    }

    public function setDescriptif(?string $descriptif): self {
        $this->descriptif = $descriptif;

        return $this;
    }

    /**
     * @return Collection<int, CompteEtudiant>
     */
    public function getComptesEtudiant(): Collection {
        return $this->comptesEtudiant;
    }

    public function addComptesEtudiant(CompteEtudiant $comptesEtudiant): self {
        if (!$this->comptesEtudiant->contains($comptesEtudiant)) {
            $this->comptesEtudiant->add($comptesEtudiant);
            $comptesEtudiant->setEtatRecherche($this);
        }

        return $this;
    }

    public function removeComptesEtudiant(CompteEtudiant $comptesEtudiant): self {
        if ($this->comptesEtudiant->removeElement($comptesEtudiant)) {
            // set the owning side to null (unless already changed)
            if ($comptesEtudiant->getEtatRecherche() === $this) {
                $comptesEtudiant->setEtatRecherche(null);
            }
        }

        return $this;
    }

    public function __toString(): string {
        return $this->getEtat();
    }

}
