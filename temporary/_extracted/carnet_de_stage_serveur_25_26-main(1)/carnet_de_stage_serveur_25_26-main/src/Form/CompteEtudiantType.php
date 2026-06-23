<?php

namespace App\Form;

use App\Entity\CompteEtudiant;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class CompteEtudiantType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $options): void {
        $builder
                ->add('etudiant')
                ->add('login')
                ->add('role', ChoiceType::class, ["mapped" => false, "choices" => ["Etudiant·e" => "ROLE_ETUDIANT", "Administrateur" => "ROLE_ADMIN"]])
                ->add('password', PasswordType::class)
                ->add('parcours', ChoiceType::class, ["choices" => ["Indéfini" => "*", "Parcours A" => "A", "Parcours B" => "B"]])
                ->add('etatRecherche')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void {
        $resolver->setDefaults([
            'data_class' => CompteEtudiant::class,
        ]);
    }

}
