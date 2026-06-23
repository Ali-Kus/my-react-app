<?php

namespace App\Entity;

use App\Repository\OffreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: OffreRepository::class)]
#[ApiResource]
class Offre {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $intitule = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descriptif = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateDepot = null;

    #[ORM\Column(length: 1, nullable: true)]
    private ?string $parcours = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $motsCles = null;

    #[ORM\Column(length: 2000, nullable: true)]
    private ?string $urlPieceJointe = null;

    #[ORM\ManyToOne(inversedBy: 'offres')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EtatOffre $etatOffre = null;

    #[ORM\ManyToOne(inversedBy: 'offres')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Entreprise $entreprise = null;

    #[ORM\OneToMany(mappedBy: 'offre', targetEntity: OffreConsultee::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $offreConsultees;

    #[ORM\OneToMany(mappedBy: 'offre', targetEntity: OffreRetenue::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $offreRetenues;

    #[ORM\OneToMany(mappedBy: 'offre', targetEntity: Candidature::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $candidatures;

    public function __construct() {
        $this->offresConsultees = new ArrayCollection();
        $this->offresRetenues = new ArrayCollection();
        $this->candidatures = new ArrayCollection();
        $this->offreConsultees = new ArrayCollection();
        $this->offreRetenues = new ArrayCollection();
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getIntitule(): ?string {
        return $this->intitule;
    }

    public function setIntitule(string $intitule): self {
        $this->intitule = $intitule;

        return $this;
    }

    public function getDescriptif(): ?string {
        return $this->descriptif;
    }

    public function setDescriptif(?string $descriptif): self {
        $this->descriptif = $descriptif;

        return $this;
    }

    public function getDateDepot(): ?\DateTimeInterface {
        return $this->dateDepot;
    }

    public function setDateDepot(\DateTimeInterface $dateDepot): self {
        $this->dateDepot = $dateDepot;

        return $this;
    }

    public function getParcours(): ?string {
        return $this->parcours;
    }

    public function setParcours(?string $parcours): self {
        $this->parcours = $parcours;

        return $this;
    }

    public function getMotsCles(): ?string {
        return $this->motsCles;
    }

    public function setMotsCles(?string $motsCles): self {
        $this->motsCles = $motsCles;

        return $this;
    }

    public function getUrlPieceJointe(): ?string {
        return $this->urlPieceJointe;
    }

    public function setUrlPieceJointe(?string $urlPieceJointe): self {
        $this->urlPieceJointe = $urlPieceJointe;

        return $this;
    }

    public function getEtatOffre(): ?EtatOffre {
        return $this->etatOffre;
    }

    public function setEtatOffre(?EtatOffre $etatOffre): self {
        $this->etatOffre = $etatOffre;

        return $this;
    }

    public function getEntreprise(): ?Entreprise {
        return $this->entreprise;
    }

    public function setEntreprise(?Entreprise $entreprise): self {
        $this->entreprise = $entreprise;

        return $this;
    }

    public function __toString(): string {
        return $this->parcours.' - '.$this->getEntreprise()->getRaisonSociale() . " : " . $this->getIntitule()
                . " (N° " . $this->getId() . ")";
    }

    /**
     * @return Collection<int, OffreConsultee>
     */
    public function getOffreConsultees(): Collection
    {
        return $this->offreConsultees;
    }

    public function addOffreConsultee(OffreConsultee $offreConsultee): self
    {
        if (!$this->offreConsultees->contains($offreConsultee)) {
            $this->offreConsultees->add($offreConsultee);
            $offreConsultee->setOffre($this);
        }

        return $this;
    }

    public function removeOffreConsultee(OffreConsultee $offreConsultee): self
    {
        if ($this->offreConsultees->removeElement($offreConsultee)) {
            // set the owning side to null (unless already changed)
            if ($offreConsultee->getOffre() === $this) {
                $offreConsultee->setOffre(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, OffreRetenue>
     */
    public function getOffreRetenues(): Collection
    {
        return $this->offreRetenues;
    }

    public function addOffreRetenue(OffreRetenue $offreRetenue): self
    {
        if (!$this->offreRetenues->contains($offreRetenue)) {
            $this->offreRetenues->add($offreRetenue);
            $offreRetenue->setOffre($this);
        }

        return $this;
    }

    public function removeOffreRetenue(OffreRetenue $offreRetenue): self
    {
        if ($this->offreRetenues->removeElement($offreRetenue)) {
            // set the owning side to null (unless already changed)
            if ($offreRetenue->getOffre() === $this) {
                $offreRetenue->setOffre(null);
            }
        }

        return $this;
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
            $candidature->setOffre($this);
        }

        return $this;
    }

    public function removeCandidature(Candidature $candidature): self
    {
        if ($this->candidatures->removeElement($candidature)) {
            // set the owning side to null (unless already changed)
            if ($candidature->getOffre() === $this) {
                $candidature->setOffre(null);
            }
        }

        return $this;
    }

}
