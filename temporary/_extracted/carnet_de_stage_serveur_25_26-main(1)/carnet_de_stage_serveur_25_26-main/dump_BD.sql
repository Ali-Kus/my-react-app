--
-- PostgreSQL database dump
--

\restrict 8uhxtqluAz0fePwCRBuD3924yqLsz5ahGXgmK88OABeDbu6tWBWhm5Q7Tv4AB4f

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.0

-- Started on 2026-02-04 17:05:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "app-stages";
--
-- TOC entry 3579 (class 1262 OID 16384)
-- Name: app-stages; Type: DATABASE; Schema: -; Owner: app-stages
--

CREATE DATABASE "app-stages" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "app-stages" OWNER TO "app-stages";

\unrestrict 8uhxtqluAz0fePwCRBuD3924yqLsz5ahGXgmK88OABeDbu6tWBWhm5Q7Tv4AB4f
\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='app-stages'"
\restrict 8uhxtqluAz0fePwCRBuD3924yqLsz5ahGXgmK88OABeDbu6tWBWhm5Q7Tv4AB4f

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 242 (class 1255 OID 16389)
-- Name: notify_messenger_messages(); Type: FUNCTION; Schema: public; Owner: app-stages
--

CREATE FUNCTION public.notify_messenger_messages() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
            BEGIN
                PERFORM pg_notify('messenger_messages', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$;


ALTER FUNCTION public.notify_messenger_messages() OWNER TO "app-stages";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16390)
-- Name: candidature; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.candidature (
    id integer NOT NULL,
    compte_etudiant_id integer NOT NULL,
    offre_id integer NOT NULL,
    etat_candidature_id integer NOT NULL,
    type_action character varying(255) DEFAULT NULL::character varying,
    date_action timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.candidature OWNER TO "app-stages";

--
-- TOC entry 220 (class 1259 OID 16399)
-- Name: candidature_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.candidature_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candidature_id_seq OWNER TO "app-stages";

--
-- TOC entry 221 (class 1259 OID 16400)
-- Name: compte_etudiant; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.compte_etudiant (
    id integer NOT NULL,
    etat_recherche_id integer NOT NULL,
    login character varying(180) NOT NULL,
    roles json NOT NULL,
    password character varying(255) NOT NULL,
    parcours character varying(1) NOT NULL,
    derniere_connexion timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    etudiant_id integer NOT NULL
);


ALTER TABLE public.compte_etudiant OWNER TO "app-stages";

--
-- TOC entry 222 (class 1259 OID 16413)
-- Name: compte_etudiant_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.compte_etudiant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compte_etudiant_id_seq OWNER TO "app-stages";

--
-- TOC entry 223 (class 1259 OID 16414)
-- Name: doctrine_migration_versions; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.doctrine_migration_versions (
    version character varying(191) NOT NULL,
    executed_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    execution_time integer
);


ALTER TABLE public.doctrine_migration_versions OWNER TO "app-stages";

--
-- TOC entry 224 (class 1259 OID 16419)
-- Name: entreprise; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.entreprise (
    id integer NOT NULL,
    raison_sociale character varying(255) NOT NULL,
    ville character varying(255) NOT NULL,
    pays character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public.entreprise OWNER TO "app-stages";

--
-- TOC entry 225 (class 1259 OID 16428)
-- Name: entreprise_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.entreprise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entreprise_id_seq OWNER TO "app-stages";

--
-- TOC entry 226 (class 1259 OID 16429)
-- Name: etat_candidature; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.etat_candidature (
    id integer NOT NULL,
    etat character varying(255) NOT NULL,
    descriptif text
);


ALTER TABLE public.etat_candidature OWNER TO "app-stages";

--
-- TOC entry 227 (class 1259 OID 16436)
-- Name: etat_candidature_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.etat_candidature_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etat_candidature_id_seq OWNER TO "app-stages";

--
-- TOC entry 228 (class 1259 OID 16437)
-- Name: etat_offre; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.etat_offre (
    id integer NOT NULL,
    etat character varying(255) NOT NULL,
    descriptif text
);


ALTER TABLE public.etat_offre OWNER TO "app-stages";

--
-- TOC entry 229 (class 1259 OID 16444)
-- Name: etat_offre_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.etat_offre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etat_offre_id_seq OWNER TO "app-stages";

--
-- TOC entry 230 (class 1259 OID 16445)
-- Name: etat_recherche; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.etat_recherche (
    id integer NOT NULL,
    etat character varying(255) NOT NULL,
    descriptif text
);


ALTER TABLE public.etat_recherche OWNER TO "app-stages";

--
-- TOC entry 231 (class 1259 OID 16452)
-- Name: etat_recherche_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.etat_recherche_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etat_recherche_id_seq OWNER TO "app-stages";

--
-- TOC entry 232 (class 1259 OID 16453)
-- Name: etudiant; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.etudiant (
    id integer NOT NULL,
    numero_ine character varying(11) NOT NULL,
    nom character varying(255) NOT NULL,
    prenom character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.etudiant OWNER TO "app-stages";

--
-- TOC entry 233 (class 1259 OID 16463)
-- Name: etudiant_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.etudiant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etudiant_id_seq OWNER TO "app-stages";

--
-- TOC entry 234 (class 1259 OID 16464)
-- Name: messenger_messages; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.messenger_messages (
    id bigint NOT NULL,
    body text NOT NULL,
    headers text NOT NULL,
    queue_name character varying(190) NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    available_at timestamp(0) without time zone NOT NULL,
    delivered_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone
);


ALTER TABLE public.messenger_messages OWNER TO "app-stages";

--
-- TOC entry 235 (class 1259 OID 16476)
-- Name: messenger_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.messenger_messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messenger_messages_id_seq OWNER TO "app-stages";

--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 235
-- Name: messenger_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app-stages
--

ALTER SEQUENCE public.messenger_messages_id_seq OWNED BY public.messenger_messages.id;


--
-- TOC entry 236 (class 1259 OID 16477)
-- Name: offre; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.offre (
    id integer NOT NULL,
    etat_offre_id integer NOT NULL,
    entreprise_id integer NOT NULL,
    intitule character varying(255) NOT NULL,
    descriptif text,
    date_depot date NOT NULL,
    parcours character varying(1) DEFAULT NULL::character varying,
    mots_cles character varying(255) DEFAULT NULL::character varying,
    url_piece_jointe character varying(2000) DEFAULT NULL::character varying
);


ALTER TABLE public.offre OWNER TO "app-stages";

--
-- TOC entry 237 (class 1259 OID 16490)
-- Name: offre_consultee; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.offre_consultee (
    id integer NOT NULL,
    compte_etudiant_id integer NOT NULL,
    offre_id integer NOT NULL
);


ALTER TABLE public.offre_consultee OWNER TO "app-stages";

--
-- TOC entry 238 (class 1259 OID 16496)
-- Name: offre_consultee_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.offre_consultee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offre_consultee_id_seq OWNER TO "app-stages";

--
-- TOC entry 239 (class 1259 OID 16497)
-- Name: offre_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.offre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offre_id_seq OWNER TO "app-stages";

--
-- TOC entry 240 (class 1259 OID 16498)
-- Name: offre_retenue; Type: TABLE; Schema: public; Owner: app-stages
--

CREATE TABLE public.offre_retenue (
    id integer NOT NULL,
    compte_etudiant_id integer NOT NULL,
    offre_id integer NOT NULL
);


ALTER TABLE public.offre_retenue OWNER TO "app-stages";

--
-- TOC entry 241 (class 1259 OID 16504)
-- Name: offre_retenue_id_seq; Type: SEQUENCE; Schema: public; Owner: app-stages
--

CREATE SEQUENCE public.offre_retenue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.offre_retenue_id_seq OWNER TO "app-stages";

--
-- TOC entry 3348 (class 2604 OID 16601)
-- Name: messenger_messages id; Type: DEFAULT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.messenger_messages ALTER COLUMN id SET DEFAULT nextval('public.messenger_messages_id_seq'::regclass);

TRUNCATE public.compte_etudiant, public.entreprise, public.etat_candidature, public.etat_offre, public.etudiant, public.Candidature, public.offre, public.offre_consultee, public.offre_retenue ON CASCADE;

--
-- TOC entry 3551 (class 0 OID 16390)
-- Dependencies: 219
-- Data for Name: candidature; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.candidature VALUES (1, 2, 10, 6, 'Envoyé CV+LM par mail au responsable du stage', '2023-01-20 17:34:36');
INSERT INTO public.candidature VALUES (3, 3, 11, 2, 'Candidature envoyée par courrier (CV+LM)', '2023-01-22 10:46:09');
INSERT INTO public.candidature VALUES (5, 5, 12, 4, 'Envoi CV+LM, prise de contacte au tél.', '2023-01-25 11:02:23');


--
-- TOC entry 3553 (class 0 OID 16400)
-- Dependencies: 221
-- Data for Name: compte_etudiant; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.compte_etudiant VALUES (1, 1, 'fontenae', '["ROLE_ADMIN"]', '$2y$13$HQpMH5Kd0wsAzUQcBCOHu.kDUgunJliBA44tK/gNHAgoDQ.qAQx2i', '*', NULL, 1);
INSERT INTO public.compte_etudiant VALUES (2, 4, 'khonnual', '["ROLE_ETUDIANT"]', '$2y$13$DY37MaTjWxmJ3aYeA4qB3O2DXgUlLJgR4VzBXHNsTFRTQAcu.1Q6S', 'A', NULL, 2);
INSERT INTO public.compte_etudiant VALUES (3, 3, 'enfaitme', '["ROLE_ETUDIANT"]', '$2y$13$a3HbRV0XGnZveyTikYO5RO5EFTC.5dkBo6WkhHttgQ5jGYaVz7vB.', 'B', NULL, 3);
INSERT INTO public.compte_etudiant VALUES (4, 2, 'herbienj', '["ROLE_ETUDIANT"]', '$2y$13$VcZ6aBpYos81LWZFh0.F0Ovz9D6f3G1CvF5XONddV8y8oNPiJXmne', 'A', NULL, 4);
INSERT INTO public.compte_etudiant VALUES (5, 3, 'borealea', '["ROLE_ETUDIANT"]', '$2y$13$WGEjYD.WdJ6MdYYupl1qF.l0AguuY3hTQyg/3zAoVpM4.mbltqeYS', 'B', NULL, 5);
INSERT INTO public.compte_etudiant VALUES (11, 1, 'haplutaj', '["ROLE_ETUDIANT"]', '$2y$13$YjO.PIUqu79nkh0z38sItuxiWuSNv.9WAB1s0YgK1vqk6LzplFzCO', 'A', NULL, 10);
INSERT INTO public.compte_etudiant VALUES (12, 1, 'laraisop', '["ROLE_ETUDIANT"]', '$2y$13$bXQoC.1ZxRban492aM/PCuaAoYe/2skKDnfEkzsEdzvDcBVKoE8Wa', 'A', NULL, 11);


--
-- TOC entry 3555 (class 0 OID 16414)
-- Dependencies: 223
-- Data for Name: doctrine_migration_versions; Type: TABLE DATA; Schema: public; Owner: app-stages
--



--
-- TOC entry 3556 (class 0 OID 16419)
-- Dependencies: 224
-- Data for Name: entreprise; Type: TABLE DATA; Schema: public; Owner: app-stages

INSERT INTO public.entreprise VALUES (2, 'Reckonect SAS', 'Grenoble', 'France');
INSERT INTO public.entreprise VALUES (3, 'Khrone SAS', 'Romans', 'France');
INSERT INTO public.entreprise VALUES (4, 'Framatome', 'Ugine', 'France');
INSERT INTO public.entreprise VALUES (5, 'Association Championnet', 'Sallanches', 'France');
INSERT INTO public.entreprise VALUES (6, 'Creative VR3D', 'Cannes', 'France');
INSERT INTO public.entreprise VALUES (7, 'Parker Lord', 'Pont de l''Isère', 'France');
INSERT INTO public.entreprise VALUES (8, 'INCOM', 'Gières', 'France');
INSERT INTO public.entreprise VALUES (9, 'LIG', 'Saint Martin d''Hères', 'France');
INSERT INTO public.entreprise VALUES (10, 'LYNRED', 'Veurey-Voroize', 'France');
INSERT INTO public.entreprise VALUES (11, 'ELYXOFT', 'Gillonay', 'France');
INSERT INTO public.entreprise VALUES (12, 'INSIDIX SAS', 'Seyssins', 'France');
INSERT INTO public.entreprise VALUES (13, 'HARDIS', 'Seyssinet-Pariset', 'France');


--
-- TOC entry 3558 (class 0 OID 16429)
-- Dependencies: 226
-- Data for Name: etat_candidature; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.etat_candidature VALUES (2, 'Attente Réponse', 'L''étudiant·e a envoyé sa candidature mais n''a pas encore obtenu de réponse');
INSERT INTO public.etat_candidature VALUES (5, 'Attente Entretien', 'L''étudiant·e a obtenu une date de RDV et attend que celui-ci soit réalisé');
INSERT INTO public.etat_candidature VALUES (4, 'Attente RDV', 'L''étudiant·e a obtenu une réponse positive à sa candidature et attend une date de RDV');
INSERT INTO public.etat_candidature VALUES (6, 'Acceptée', 'L''étudiant·e a obtenu une réponse positive à sa candidature à l''issue du RDV');
INSERT INTO public.etat_candidature VALUES (1, 'A Envoyer', 'L''étudiant·e a retenu l''offre de stage mais n''y a pas encore candidaté');
INSERT INTO public.etat_candidature VALUES (3, 'Refusée', 'L''étudiant·e a obtenu une réponse négative à sa candidature');


--
-- TOC entry 3560 (class 0 OID 16437)
-- Dependencies: 228
-- Data for Name: etat_offre; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.etat_offre VALUES (1, 'Disponible', 'L''offre est disponible : il est possible d''y candidater');
INSERT INTO public.etat_offre VALUES (2, 'Pourvue', 'L''offre n''est plus disponible, un·e étudiant·e l''a déjà prise : inutile d''y candidater');
INSERT INTO public.etat_offre VALUES (3, 'Expirée', 'L''offre est ancienne et n''est plus disponible : inutile d''y candidater');


--
-- TOC entry 3562 (class 0 OID 16445)
-- Dependencies: 230
-- Data for Name: etat_recherche; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.etat_recherche VALUES (1, 'A Commencer', 'L''étudiant·e n''a pas encore consulté les offres de stage');
INSERT INTO public.etat_recherche VALUES (2, 'Consultation', 'L''étudiant·e a commencé à consulter les offres de stage mais n''a pas encore candidaté');
INSERT INTO public.etat_recherche VALUES (3, 'Candidature', 'L''étudiant·e a fait une ou plusieurs candidatures, il·elle attend encore des réponses');
INSERT INTO public.etat_recherche VALUES (4, 'Terminée', 'L''étudiant·e a trouvé un stage, sa recherche est terminée');


--
-- TOC entry 3564 (class 0 OID 16453)
-- Dependencies: 232
-- Data for Name: etudiant; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.etudiant VALUES (1, '0123456789A', 'FONTENAS', 'Eric', 'eric.fontenas@univ-grenoble-alpes.fr');
INSERT INTO public.etudiant VALUES (2, '9876543210B', 'KHONNU', 'Alain', 'alain.khonnu@iut2.fr');
INSERT INTO public.etudiant VALUES (4, '3456789012D', 'HERBIEN', 'Jean-Philippe', 'jean-philippe.herbien@iut2.fr');
INSERT INTO public.etudiant VALUES (5, '4567890123E', 'BOREALE', 'Aurore', 'aurore.boreale@iut2.fr');
INSERT INTO public.etudiant VALUES (3, '2345678901C', 'ENFAÏTE', 'Mélusine', 'melusine.enfaite@iut2.fr');
INSERT INTO public.etudiant VALUES (10, '5678901234F', 'HAPLUTARD', 'Jérémy', 'jeremy.haplutard@iut2.fr');
INSERT INTO public.etudiant VALUES (11, '6789012345T', 'LARAISON', 'Jean-Pierre', 'jean-pierre.laraison@iut2.fr');


--
-- TOC entry 3566 (class 0 OID 16464)
-- Dependencies: 234
-- Data for Name: messenger_messages; Type: TABLE DATA; Schema: public; Owner: app-stages
--



--
-- TOC entry 3568 (class 0 OID 16477)
-- Dependencies: 236
-- Data for Name: offre; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.offre VALUES (1, 1, 2, 'Développement web, full stack, Python, Javascript, Framework ReactJS, Angular, Symphony, D3JS, cytoscapeJS, ajax/flask, mongoDB', NULL, '2022-10-03', 'A', 'full stack; Python; JS; ReactJS; Angular; Symphony; D3JS; cytoscapeJS; ajax; flask; mongoDB', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/rekonnect.pdf');
INSERT INTO public.offre VALUES (2, 1, 3, 'JS/PHP/Windows/Linux/Git, ERP', NULL, '2023-01-17', 'A', 'JS; PHP; Windows; Linux; Git; ERP', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/khrone.pdf');
INSERT INTO public.offre VALUES (3, 1, 4, 'C# et VB, tests de non-régression', NULL, '2022-10-19', '*', 'C#; VB; tests; non-régression', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/framatome.pdf');
INSERT INTO public.offre VALUES (4, 1, 5, 'Architecture Sharepoint, migration, conception', NULL, '2023-01-10', 'B', 'sharepoint; migration', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/association-championnet.pdf');
INSERT INTO public.offre VALUES (5, 1, 6, 'CSHarp Jeux UNITY 3D, développement', NULL, '2023-01-15', 'A', 'C#; UNITY; 3D', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/creative-vr3d.pdf');
INSERT INTO public.offre VALUES (9, 1, 10, 'SQL / PYTHON SQL*serveur, SSRS/ POWER BI, analyse de données', NULL, '2023-01-13', '*', 'SQL; PYTHON; SQL server; SSRS; POWER BI; analyse de données', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/lynred.pdf');
INSERT INTO public.offre VALUES (10, 2, 11, 'Développement d’application Android, GIT, Kotlin', NULL, '2023-01-10', 'A', 'Android; GIT; Kotlin', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/elyxoft.pdf');
INSERT INTO public.offre VALUES (11, 1, 12, 'Administration des Systèmes et Réseaux, configuation serveur Linux', NULL, '2023-01-10', 'B', 'administration; système; réseaux; linux', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/insidix.pdf');
INSERT INTO public.offre VALUES (12, 1, 13, 'Développement d’outils internes, Python, SQL', NULL, '2022-10-25', 'B', 'python; sql', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/hardis.pdf');
INSERT INTO public.offre VALUES (6, 1, 7, 'Tests fonctionnels, Panther, PHP8, Mysql', NULL, '2023-01-12', 'A', 'tests; Panther; PHP8; MySql', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/parker-lord.pdf');
INSERT INTO public.offre VALUES (7, 1, 8, 'Linux debian/centos, scripting bash, office, zabbix, logiciel de monitoring', NULL, '2023-01-17', 'B', 'Linux; debian; centos; scripting; bash; office; zabbix; monitoring', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/incom.pdf');
INSERT INTO public.offre VALUES (8, 1, 9, 'Site web', NULL, '2023-01-13', 'A', 'web', 'https://iut2-dg-scolarite.univ-grenoble-alpes.fr/dwnld/lig.pdf');


--
-- TOC entry 3569 (class 0 OID 16490)
-- Dependencies: 237
-- Data for Name: offre_consultee; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.offre_consultee VALUES (1, 2, 10);
INSERT INTO public.offre_consultee VALUES (2, 2, 5);
INSERT INTO public.offre_consultee VALUES (3, 3, 11);
INSERT INTO public.offre_consultee VALUES (5, 5, 4);
INSERT INTO public.offre_consultee VALUES (6, 5, 12);
INSERT INTO public.offre_consultee VALUES (8, 2, 2);
INSERT INTO public.offre_consultee VALUES (9, 2, 8);
INSERT INTO public.offre_consultee VALUES (10, 2, 6);
INSERT INTO public.offre_consultee VALUES (11, 3, 4);
INSERT INTO public.offre_consultee VALUES (12, 4, 1);


--
-- TOC entry 3572 (class 0 OID 16498)
-- Dependencies: 240
-- Data for Name: offre_retenue; Type: TABLE DATA; Schema: public; Owner: app-stages
--

INSERT INTO public.offre_retenue VALUES (1, 2, 10);
INSERT INTO public.offre_retenue VALUES (2, 3, 11);
INSERT INTO public.offre_retenue VALUES (4, 5, 12);


--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 220
-- Name: candidature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.candidature_id_seq', 5, true);


--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 222
-- Name: compte_etudiant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.compte_etudiant_id_seq', 12, true);


--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 225
-- Name: entreprise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.entreprise_id_seq', 14, true);


--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 227
-- Name: etat_candidature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.etat_candidature_id_seq', 6, true);


--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 229
-- Name: etat_offre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.etat_offre_id_seq', 3, true);


--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 231
-- Name: etat_recherche_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.etat_recherche_id_seq', 4, true);


--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 233
-- Name: etudiant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.etudiant_id_seq', 11, true);


--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 235
-- Name: messenger_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.messenger_messages_id_seq', 1, false);


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 238
-- Name: offre_consultee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.offre_consultee_id_seq', 12, true);


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 239
-- Name: offre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.offre_id_seq', 14, true);


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 241
-- Name: offre_retenue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app-stages
--

SELECT pg_catalog.setval('public.offre_retenue_id_seq', 4, true);


--
-- TOC entry 3354 (class 2606 OID 16507)
-- Name: candidature candidature_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.candidature
    ADD CONSTRAINT candidature_pkey PRIMARY KEY (id);


--
-- TOC entry 3359 (class 2606 OID 16509)
-- Name: compte_etudiant compte_etudiant_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.compte_etudiant
    ADD CONSTRAINT compte_etudiant_pkey PRIMARY KEY (id);


--
-- TOC entry 3364 (class 2606 OID 16511)
-- Name: doctrine_migration_versions doctrine_migration_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.doctrine_migration_versions
    ADD CONSTRAINT doctrine_migration_versions_pkey PRIMARY KEY (version);


--
-- TOC entry 3366 (class 2606 OID 16513)
-- Name: entreprise entreprise_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.entreprise
    ADD CONSTRAINT entreprise_pkey PRIMARY KEY (id);


--
-- TOC entry 3368 (class 2606 OID 16515)
-- Name: etat_candidature etat_candidature_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.etat_candidature
    ADD CONSTRAINT etat_candidature_pkey PRIMARY KEY (id);


--
-- TOC entry 3370 (class 2606 OID 16517)
-- Name: etat_offre etat_offre_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.etat_offre
    ADD CONSTRAINT etat_offre_pkey PRIMARY KEY (id);


--
-- TOC entry 3372 (class 2606 OID 16519)
-- Name: etat_recherche etat_recherche_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.etat_recherche
    ADD CONSTRAINT etat_recherche_pkey PRIMARY KEY (id);


--
-- TOC entry 3374 (class 2606 OID 16521)
-- Name: etudiant etudiant_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.etudiant
    ADD CONSTRAINT etudiant_pkey PRIMARY KEY (id);


--
-- TOC entry 3379 (class 2606 OID 16523)
-- Name: messenger_messages messenger_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.messenger_messages
    ADD CONSTRAINT messenger_messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3387 (class 2606 OID 16525)
-- Name: offre_consultee offre_consultee_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre_consultee
    ADD CONSTRAINT offre_consultee_pkey PRIMARY KEY (id);


--
-- TOC entry 3383 (class 2606 OID 16527)
-- Name: offre offre_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre
    ADD CONSTRAINT offre_pkey PRIMARY KEY (id);


--
-- TOC entry 3391 (class 2606 OID 16529)
-- Name: offre_retenue offre_retenue_pkey; Type: CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre_retenue
    ADD CONSTRAINT offre_retenue_pkey PRIMARY KEY (id);


--
-- TOC entry 3388 (class 1259 OID 16530)
-- Name: idx_3f0a4cc54cc8505a; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_3f0a4cc54cc8505a ON public.offre_retenue USING btree (offre_id);


--
-- TOC entry 3389 (class 1259 OID 16531)
-- Name: idx_3f0a4cc5f1fb3bf7; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_3f0a4cc5f1fb3bf7 ON public.offre_retenue USING btree (compte_etudiant_id);


--
-- TOC entry 3375 (class 1259 OID 16532)
-- Name: idx_75ea56e016ba31db; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_75ea56e016ba31db ON public.messenger_messages USING btree (delivered_at);


--
-- TOC entry 3376 (class 1259 OID 16533)
-- Name: idx_75ea56e0e3bd61ce; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_75ea56e0e3bd61ce ON public.messenger_messages USING btree (available_at);


--
-- TOC entry 3377 (class 1259 OID 16534)
-- Name: idx_75ea56e0fb7336f0; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_75ea56e0fb7336f0 ON public.messenger_messages USING btree (queue_name);


--
-- TOC entry 3380 (class 1259 OID 16535)
-- Name: idx_af86866fa4aeafea; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_af86866fa4aeafea ON public.offre USING btree (entreprise_id);


--
-- TOC entry 3381 (class 1259 OID 16536)
-- Name: idx_af86866fd11df8ca; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_af86866fd11df8ca ON public.offre USING btree (etat_offre_id);


--
-- TOC entry 3384 (class 1259 OID 16537)
-- Name: idx_b6f3164d4cc8505a; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_b6f3164d4cc8505a ON public.offre_consultee USING btree (offre_id);


--
-- TOC entry 3385 (class 1259 OID 16538)
-- Name: idx_b6f3164df1fb3bf7; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_b6f3164df1fb3bf7 ON public.offre_consultee USING btree (compte_etudiant_id);


--
-- TOC entry 3355 (class 1259 OID 16539)
-- Name: idx_e33bd3b84cc8505a; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_e33bd3b84cc8505a ON public.candidature USING btree (offre_id);


--
-- TOC entry 3356 (class 1259 OID 16540)
-- Name: idx_e33bd3b8f1fb3bf7; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_e33bd3b8f1fb3bf7 ON public.candidature USING btree (compte_etudiant_id);


--
-- TOC entry 3357 (class 1259 OID 16541)
-- Name: idx_e33bd3b8f62b59f; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_e33bd3b8f62b59f ON public.candidature USING btree (etat_candidature_id);


--
-- TOC entry 3360 (class 1259 OID 16542)
-- Name: idx_f3ceb11e6b079d8; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE INDEX idx_f3ceb11e6b079d8 ON public.compte_etudiant USING btree (etat_recherche_id);


--
-- TOC entry 3361 (class 1259 OID 16543)
-- Name: uniq_f3ceb11eaa08cb10; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE UNIQUE INDEX uniq_f3ceb11eaa08cb10 ON public.compte_etudiant USING btree (login);


--
-- TOC entry 3362 (class 1259 OID 16544)
-- Name: uniq_f3ceb11eddeab1a3; Type: INDEX; Schema: public; Owner: app-stages
--

CREATE UNIQUE INDEX uniq_f3ceb11eddeab1a3 ON public.compte_etudiant USING btree (etudiant_id);


--
-- TOC entry 3403 (class 2620 OID 16545)
-- Name: messenger_messages notify_trigger; Type: TRIGGER; Schema: public; Owner: app-stages
--

CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON public.messenger_messages FOR EACH ROW EXECUTE FUNCTION public.notify_messenger_messages();


--
-- TOC entry 3401 (class 2606 OID 16546)
-- Name: offre_retenue fk_3f0a4cc54cc8505a; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre_retenue
    ADD CONSTRAINT fk_3f0a4cc54cc8505a FOREIGN KEY (offre_id) REFERENCES public.offre(id);


--
-- TOC entry 3402 (class 2606 OID 16551)
-- Name: offre_retenue fk_3f0a4cc5f1fb3bf7; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre_retenue
    ADD CONSTRAINT fk_3f0a4cc5f1fb3bf7 FOREIGN KEY (compte_etudiant_id) REFERENCES public.compte_etudiant(id);


--
-- TOC entry 3397 (class 2606 OID 16556)
-- Name: offre fk_af86866fa4aeafea; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre
    ADD CONSTRAINT fk_af86866fa4aeafea FOREIGN KEY (entreprise_id) REFERENCES public.entreprise(id);


--
-- TOC entry 3398 (class 2606 OID 16561)
-- Name: offre fk_af86866fd11df8ca; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre
    ADD CONSTRAINT fk_af86866fd11df8ca FOREIGN KEY (etat_offre_id) REFERENCES public.etat_offre(id);


--
-- TOC entry 3399 (class 2606 OID 16566)
-- Name: offre_consultee fk_b6f3164d4cc8505a; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre_consultee
    ADD CONSTRAINT fk_b6f3164d4cc8505a FOREIGN KEY (offre_id) REFERENCES public.offre(id);


--
-- TOC entry 3400 (class 2606 OID 16571)
-- Name: offre_consultee fk_b6f3164df1fb3bf7; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.offre_consultee
    ADD CONSTRAINT fk_b6f3164df1fb3bf7 FOREIGN KEY (compte_etudiant_id) REFERENCES public.compte_etudiant(id);


--
-- TOC entry 3392 (class 2606 OID 16576)
-- Name: candidature fk_e33bd3b84cc8505a; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.candidature
    ADD CONSTRAINT fk_e33bd3b84cc8505a FOREIGN KEY (offre_id) REFERENCES public.offre(id);


--
-- TOC entry 3393 (class 2606 OID 16581)
-- Name: candidature fk_e33bd3b8f1fb3bf7; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.candidature
    ADD CONSTRAINT fk_e33bd3b8f1fb3bf7 FOREIGN KEY (compte_etudiant_id) REFERENCES public.compte_etudiant(id);


--
-- TOC entry 3394 (class 2606 OID 16586)
-- Name: candidature fk_e33bd3b8f62b59f; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.candidature
    ADD CONSTRAINT fk_e33bd3b8f62b59f FOREIGN KEY (etat_candidature_id) REFERENCES public.etat_candidature(id);


--
-- TOC entry 3395 (class 2606 OID 16591)
-- Name: compte_etudiant fk_f3ceb11e6b079d8; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.compte_etudiant
    ADD CONSTRAINT fk_f3ceb11e6b079d8 FOREIGN KEY (etat_recherche_id) REFERENCES public.etat_recherche(id);


--
-- TOC entry 3396 (class 2606 OID 16596)
-- Name: compte_etudiant fk_f3ceb11eddeab1a3; Type: FK CONSTRAINT; Schema: public; Owner: app-stages
--

ALTER TABLE ONLY public.compte_etudiant
    ADD CONSTRAINT fk_f3ceb11eddeab1a3 FOREIGN KEY (etudiant_id) REFERENCES public.etudiant(id);


-- Completed on 2026-02-04 17:05:07

--
-- PostgreSQL database dump complete
--

\unrestrict 8uhxtqluAz0fePwCRBuD3924yqLsz5ahGXgmK88OABeDbu6tWBWhm5Q7Tv4AB4f

