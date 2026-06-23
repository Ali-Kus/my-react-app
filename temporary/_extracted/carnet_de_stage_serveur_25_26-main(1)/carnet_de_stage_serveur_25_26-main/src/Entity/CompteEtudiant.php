<?php

namespace App\Entity;

use App\Repository\CompteEtudiantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: CompteEtudiantRepository::class)]
#[ApiResource]
class CompteEtudiant implements UserInterface, PasswordAuthenticatedUserInterface {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $login = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 1)]
    private ?string $parcours = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $derniereConnexion = null;

    #[ORM\ManyToOne(inversedBy: 'comptesEtudiant')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EtatRecherche $etatRecherche = null;

    #[ORM\OneToOne(targetEntity: Etudiant::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Etudiant $etudiant = null;

    #[ORM\OneToMany(mappedBy: 'compteEtudiant', targetEntity: OffreConsultee::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $offreConsultees;

    #[ORM\OneToMany(mappedBy: 'compteEtudiant', targetEntity: OffreRetenue::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $offreRetenues;

    #[ORM\OneToMany(mappedBy: 'compteEtudiant', targetEntity: Candidature::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
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

    public function getLogin(): ?string {
        return $this->login;
    }

    public function setLogin(string $login): self {
        $this->login = $login;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string {
        return (string) $this->login;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string {
        return (string) $this->login;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string {
        return $this->password;
    }

    public function setPassword(string $password): self {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials() {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getParcours(): ?string {
        return $this->parcours;
    }

    public function setParcours(string $parcours): self {
        $this->parcours = $parcours;

        return $this;
    }

    public function getDerniereConnexion(): ?\DateTimeInterface {
        return $this->derniereConnexion;
    }

    public function setDerniereConnexion(?\DateTimeInterface $derniereConnexion): self {
        $this->derniereConnexion = $derniereConnexion;

        return $this;
    }

    public function getEtatRecherche(): ?EtatRecherche {
        return $this->etatRecherche;
    }

    public function setEtatRecherche(?EtatRecherche $etatRecherche): self {
        $this->etatRecherche = $etatRecherche;

        return $this;
    }

    public function getEtudiant(): ?Etudiant
    {
        return $this->etudiant;
    }

    public function setEtudiant(Etudiant $etudiant): self
    {
        $this->etudiant = $etudiant;

        return $this;
    }

    public function __toString(): string {
        return $this->getUserIdentifier() . " (" . $this->getEtudiant()->getNom() 
                . " " . $this->getEtudiant()->getPrenom() . ")";
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
            $offreConsultee->setCompteEtudiant($this);
        }

        return $this;
    }

    public function removeOffreConsultee(OffreConsultee $offreConsultee): self
    {
        if ($this->offreConsultees->removeElement($offreConsultee)) {
            // set the owning side to null (unless already changed)
            if ($offreConsultee->getCompteEtudiant() === $this) {
                $offreConsultee->setCompteEtudiant(null);
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
            $offreRetenue->setCompteEtudiant($this);
        }

        return $this;
    }

    public function removeOffreRetenue(OffreRetenue $offreRetenue): self
    {
        if ($this->offreRetenues->removeElement($offreRetenue)) {
            // set the owning side to null (unless already changed)
            if ($offreRetenue->getCompteEtudiant() === $this) {
                $offreRetenue->setCompteEtudiant(null);
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
            $candidature->setCompteEtudiant($this);
        }

        return $this;
    }

    public function removeCandidature(Candidature $candidature): self
    {
        if ($this->candidatures->removeElement($candidature)) {
            // set the owning side to null (unless already changed)
            if ($candidature->getCompteEtudiant() === $this) {
                $candidature->setCompteEtudiant(null);
            }
        }

        return $this;
    }
}
