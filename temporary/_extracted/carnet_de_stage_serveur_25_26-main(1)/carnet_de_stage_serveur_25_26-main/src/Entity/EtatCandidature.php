<?php

namespace App\Entity;

use App\Repository\EtatCandidatureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: EtatCandidatureRepository::class)]
#[ApiResource]
class EtatCandidature {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $etat = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descriptif = null;

    #[ORM\OneToMany(mappedBy: 'etatCandidature', targetEntity: Candidature::class)]
    private Collection $candidatures;

    public function __construct() {
        $this->candidatures = new ArrayCollection();
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

    public function __toString(): string {
        return $this->getEtat();
    }

    /**
     * @return Collection<int, Candidature>
     */
    public function getCandidatures(): Collection
    {
        return $this->candidatures;
    }

    public function addCandidature(Candidature $candidature): self
    {
        if (!$this->candidatures->contains($candidature)) {
            $this->candidatures->add($candidature);
            $candidature->setEtatCandidature($this);
        }

        return $this;
    }

    public function removeCandidature(Candidature $candidature): self
    {
        if ($this->candidatures->removeElement($candidature)) {
            // set the owning side to null (unless already changed)
            if ($candidature->getEtatCandidature() === $this) {
                $candidature->setEtatCandidature(null);
            }
        }

        return $this;
    }

}
