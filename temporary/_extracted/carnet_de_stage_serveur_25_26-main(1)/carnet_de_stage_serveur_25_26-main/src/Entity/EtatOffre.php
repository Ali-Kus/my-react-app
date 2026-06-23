<?php

namespace App\Entity;

use App\Repository\EtatOffreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: EtatOffreRepository::class)]
#[ApiResource]
class EtatOffre {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descriptif = null;

    #[ORM\OneToMany(mappedBy: 'etatOffre', targetEntity: Offre::class)]
    private Collection $offres;

    public function __construct() {
        $this->offres = new ArrayCollection();
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
     * @return Collection<int, Offre>
     */
    public function getOffres(): Collection {
        return $this->offres;
    }

    public function addOffre(Offre $offre): self {
        if (!$this->offres->contains($offre)) {
            $this->offres->add($offre);
            $offre->setEtatOffre($this);
        }

        return $this;
    }

    public function removeOffre(Offre $offre): self {
        if ($this->offres->removeElement($offre)) {
            // set the owning side to null (unless already changed)
            if ($offre->getEtatOffre() === $this) {
                $offre->setEtatOffre(null);
            }
        }

        return $this;
    }

    public function __toString(): string {
        return $this->getEtat();
    }

}
