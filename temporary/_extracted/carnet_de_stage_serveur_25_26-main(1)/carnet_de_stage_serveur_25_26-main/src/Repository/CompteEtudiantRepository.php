<?php

namespace App\Repository;

use App\Entity\CompteEtudiant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<CompteEtudiant>
 *
 * @method CompteEtudiant|null find($id, $lockMode = null, $lockVersion = null)
 * @method CompteEtudiant|null findOneBy(array $criteria, array $orderBy = null)
 * @method CompteEtudiant[]    findAll()
 * @method CompteEtudiant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompteEtudiantRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CompteEtudiant::class);
    }

    public function save(CompteEtudiant $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CompteEtudiant $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof CompteEtudiant) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);

        $this->save($user, true);
    }
    
    /**
     * @return CompteEtudiant[] Returns an array of Etudiant objects
     */
    public function findAll(): array {
        return $this->getEntityManager()->createQuery(
            'SELECT c
            FROM App\Entity\Etudiant e, App\Entity\CompteEtudiant c
            WHERE c.etudiant=e
            ORDER BY e.nom, e.prenom ASC'
        )->getResult();
    }
    
//    /**
//     * @return CompteEtudiant[] Returns an array of CompteEtudiant objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CompteEtudiant
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
