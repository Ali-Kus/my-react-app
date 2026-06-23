<?php

namespace App\Repository;

use App\Entity\OffreRetenue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OffreRetenue>
 *
 * @method OffreRetenue|null find($id, $lockMode = null, $lockVersion = null)
 * @method OffreRetenue|null findOneBy(array $criteria, array $orderBy = null)
 * @method OffreRetenue[]    findAll()
 * @method OffreRetenue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OffreRetenueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OffreRetenue::class);
    }

    public function save(OffreRetenue $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(OffreRetenue $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
    
    /**
     * @return OffreRetenue[] Returns an array of OffreConsultee objects
     */
    public function findAll(): array {
        return $this->getEntityManager()->createQuery(
            'SELECT oret
            FROM App\Entity\OffreRetenue oret, App\Entity\Etudiant e, App\Entity\Offre o,
                 App\Entity\CompteEtudiant ce, App\Entity\Entreprise en
            WHERE oret.compteEtudiant=ce and ce.etudiant=e and oret.offre=o and o.entreprise=en
            ORDER BY e.nom ASC, e.prenom ASC, en.raisonSociale ASC, o.dateDepot ASC'
        )->getResult();
    }

//    /**
//     * @return OffreRetenue[] Returns an array of OffreRetenue objects
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

//    public function findOneBySomeField($value): ?OffreRetenue
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
