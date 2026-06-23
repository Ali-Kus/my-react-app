<?php

namespace App\Repository;

use App\Entity\OffreConsultee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OffreConsultee>
 *
 * @method OffreConsultee|null find($id, $lockMode = null, $lockVersion = null)
 * @method OffreConsultee|null findOneBy(array $criteria, array $orderBy = null)
 * @method OffreConsultee[]    findAll()
 * @method OffreConsultee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OffreConsulteeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OffreConsultee::class);
    }

    public function save(OffreConsultee $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(OffreConsultee $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    
    /**
     * @return OffreConsultee[] Returns an array of OffreConsultee objects
     */
    public function findAll(): array {
        return $this->getEntityManager()->createQuery(
            'SELECT oc
            FROM App\Entity\OffreConsultee oc, App\Entity\Etudiant e, App\Entity\Offre o,
                 App\Entity\CompteEtudiant ce, App\Entity\Entreprise en
            WHERE oc.compteEtudiant=ce and ce.etudiant=e and oc.offre=o and o.entreprise=en
            ORDER BY e.nom ASC, e.prenom ASC, en.raisonSociale ASC, o.dateDepot ASC'
        )->getResult();
    }

//    /**
//     * @return OffreConsultee[] Returns an array of OffreConsultee objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?OffreConsultee
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
