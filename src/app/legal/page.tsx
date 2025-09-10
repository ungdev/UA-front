import { Metadata } from 'next';
import styles from './style.module.scss';
import { Title } from '@/components/UI';

export const metadata: Metadata = {
  title: 'Mentions légales - UTT Arena 2025 - 28, 29 et 30 novembre 2025',
};

const Legal = () => (
  <div id="legal" className={styles.legal}>
    <div className={styles.container}>
      <Title level={1} type={1} align="center">
        Mentions légales
      </Title>
      <Title level={2} type={2} className={styles.articleTitle}>
        Propriétaire et hébergeur du site
      </Title>
      <p>
        UTT Net Group, association loi 1901
        <br />
        N° RNA : W103000699
        <br />
        N° d'immatriculation RCS : 500164249
        <br />
        12 rue Marie Curie, 10000 Troyes
        <br />
        03 25 71 85 50
        <br />
        ung@utt.fr
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Collecte des données
      </Title>
      <p>
        Le site collecte certaines données personnelles renseignées par l’utilisateur sur le site telles que le nom et
        le prénom. Ces données ne seront en aucun cas échangées, distribuées ou vendues à un tiers.
        <br />
        Ces données serviront à identifier l’utilisateur lors de son arrivée sur le lieu de l’évènement.
        <br />
        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit
        d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur peut
        exercer ce droit en effectuant une demande par mail à l’adresse arena@utt.fr
        <br />
        Le responsable du traitement des données est Matthieu Tourrette.
        <br />
        L’équipe technique et les administrateurs du site pourront accéder aux données.
        <br />
        Ces données seront conservées au maximum 10 mois après la collecte des informations.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Informations relatives aux cookies
      </Title>
      <p>
        Nous utilisons des cookies afin d'obtenir des statistiques sur notre site web. Ces informations ne seront en
        aucun cas vendues, échangées ou données. Ces cookies sont anonymisés. Afin d'assurer le fonctionnement du
        service à l'utilisateur authentifié, des cookies de session sont inscrits sur le navigateur lors de
        l'authentification sur le site. Ceux-ci ont pour seule fonction d'assurer la persistance de la session
        authentifiée de l'utilisateur. Ils sont détruits lors de la déconnexion ou à son expiration. Conformément à la
        directive européenne 2009/136/CE, ces cookies sont indispensables à la fourniture du service sollicité. En
        naviguant sur notre site web, vous acceptez l’utilisation de ces cookies.
      </p>
      <Title align="center" id="CGV" className={styles.cgv}>
        Conditions générales de vente
      </Title>
      <Title level={2} type={2} className={styles.articleTitle}>
        Préambule
      </Title>
      <p>
        Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues sur le site internet
        https://arena.utt.fr/ dont le propriétaire et l'hébergeur du site est :<br />
        UTT Net Group, association loi 1901
        <br />
        N° RNA : W103000699
        <br />
        12 rue Marie Curie, 10000 Troyes
        <br />
        03 25 71 85 50
        <br />
        ung@utt.fr
      </p>
      <p>
        Concernant la responsabilité du matériel, chaque participant à notre compétition d'e-sport l'UTT Arena 2025 est
        tenu d'amener son propre matériel, y compris tout équipement informatique, clavier, souris, casque, moniteur, et
        autres accessoires nécessaires à sa participation. En apportant leur propre matériel, les joueurs reconnaissent
        qu'ils en sont entièrement responsables, y compris la qualité, la performance, et l'état de leur équipement.
      </p>
      <p>
        L’UTT Arena 2025 ne peut être tenu responsable des problèmes techniques, défaillances matérielles, ou toute
        autre question liée à la qualité de l'équipement des participants.
      </p>
      <p>
        Le site https://arena.utt.fr commercialise les places pour la compétition sportive UTT Arena 2025 ainsi que du
        matériel en prévente.
        <br />
        Le client déclare avoir pris connaissance et avoir accepté les conditions générales de vente antérieurement à la
        passation de sa commande. La validation de la commande vaut donc acceptation les conditions générales de vente.
      </p>
      <p>
        Le paiement est assuré par le prestataire suivant :<br />
        Stripe Payments Europe, Ltd. (SPEL)
        <br />
        Directeur de la publication : StephenO’Callaghan
        <br />
        Téléphone (numéro vert) : +33 805 11 19 67 (numéro vert)
        <br />
        Adresse e-mail : heretohelp@stripe.com
        <br />
        Adresse (hors services juridiques) :<br />
        10 Boulevard Haussmann, 75009 Paris, France
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 1 - Principe
      </Title>
      <p>
        Les présentes conditions générales expriment l'intégralité des obligations des parties. En ce sens, l'acheteur
        est réputé les accepter sans réserve. Les présentes conditions générales sont accessibles sur le site de l'UTT
        Arena 2025 et prévaudront, le cas échéant, sur toute autre version ou tout autre document contradictoire. Le
        vendeur et l'acheteur conviennent que les présentes conditions générales régissent exclusivement leur relation.
        Le vendeur se réserve le droit de modifier ponctuellement ses conditions générales. Elles seront applicables dès
        leur mise en ligne. Si une condition de vente venait à faire défaut, elle serait considérée être régie par les
        usages en vigueur dans le secteur de la vente à distance dont les sociétés ont siège en France. Les présentes
        conditions générales de vente sont valables jusqu'au 31 janvier 2026 inclus.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 2 - Contenu
      </Title>
      Les présentes conditions générales ont pour objet de définir les droits et obligations des parties dans le cadre
      de la vente en ligne de biens proposés par le vendeur à l'acheteur, à partir du site internet de l'UTT Arena 2025.
      Les présentes conditions ne concernent que les achats effectués sur le site Internet de l'UTT Arena 2025. Ces
      achats concernent les produits suivants : place pour l’évènement UTT Arena 2025 et matériel en prévente.
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 3 - Informations précontractuelles
      </Title>
      L'acheteur reconnaît avoir eu communication, préalablement à la passation de sa commande et à la conclusion du
      contrat, d'une manière lisible et compréhensible, des présentes conditions générales de vente et de toutes les
      informations listées à l'article L.221-5 du code de la consommation. Sont transmises à l'acheteur, de manière
      claire et compréhensible, les informations suivantes : les caractéristiques essentielles du bien ; le prix du bien
      et/ou le mode de calcul du prix ; les informations relatives à l'identité du vendeur, à ses coordonnées postale,
      téléphonique et électronique, et à ses activités : celles relatives aux garanties légales, aux fonctionnalités du
      contenu numérique et à l'existence et aux modalités de mise en œuvre des garanties et autres conditions
      contractuelles. Les produits sont mis en vente selon la limite des stocks disponibles. Concernant la vente de
      place pour l’évènement UTT Arena 2025, l’UNG se réserve le droit de demander un justificatif pour les coachs et
      managers, et si le justificatif n’est pas suffisant, peut annuler l’achat de la place et procéder à son
      remboursement intégral sans dédommagement.
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 4 - Commande
      </Title>
      L'acheteur a la possibilité de passer sa commande en ligne au moyen du formulaire d'achat prévu lors de son
      inscription. L'acheteur sera informé de toute indisponibilité du produit ou du bien commandé. Pour que la commande
      soit validée, l'acheteur devra accepter, en cliquant à l'endroit indiqué, les présentes conditions générales de
      vente. Il devra également indiquer l'adresse email vers laquelle sera envoyé son justificatif et enfin valider le
      mode de paiement. La vente sera considérée comme acceptée après l'envoi à l'acheteur de la confirmation de la
      commande par le vendeur par courrier électronique et après encaissement par le vendeur de l'intégralité du
      montant. Toute commande vaut acceptation des prix et description des produits disponibles à la vente. Dans
      certains cas, notamment pour défaut de paiement, adresse erronée ou autre problème sur le compte de l'acheteur, le
      vendeur se réserve le droit de bloquer la commande de l'acheteur jusqu'à la résolution du problème. La validation
      de la commande ne signifie pas que le client pourra accéder à l’évènement UTT Arena 2025. Seul le statut “Inscrit”
      sur la page de l’équipe vaut validation de la place commandée. Dans le cas où le client a validé une commande de
      place pour l’évènement mais qu’il ne peut verrouiller son équipe et ainsi accéder au statut “Inscrit” par manque
      de disponibilité, un remboursement intégral sans dédommagement supplémentaire pourra être adressé par courriel à
      l'adresse : arena@utt.fr. Pour toute question relative au suivi d'une commande, l'acheteur doit appeler le numéro
      de téléphone suivant : 03 25 71 85 50 (coût d'un appel local), aux jours et horaires suivants : du lundi au
      vendredi, de 9h à 18h, ou envoyer un email au vendeur à l'adresse email suivante : arena@utt.fr.
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 5 - Signature électronique
      </Title>
      <p>
        La fourniture en ligne du numéro de carte bancaire de l'acheteur et la validation finale de la commande vaudront
        preuve de l'accord de l'acheteur : exigibilité des sommes dues au titre du bon de commande ; signature et
        acceptation expresse de toutes les opérations effectuées. En cas d'utilisation frauduleuse de la carte bancaire,
        l'acheteur est invité, dès le constat de cette utilisation, à contacter le vendeur à l'adresse email suivante :
        arena@utt.fr.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 6 - Confirmation de commande
      </Title>
      <p>
        Le vendeur fournit à l'acheteur un exemplaire du contrat dès que la commande a été validée par messagerie
        électronique à l’adresse indiquée par le client.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 7 - Preuve de la transaction
      </Title>
      <p>
        Les registres informatisés, conservés dans les systèmes informatiques du vendeur dans des conditions
        raisonnables de sécurité, seront considérés comme les preuves des communications, des commandes et des paiements
        intervenus entre les parties. L'archivage des bons de commande et des factures est effectué sur un support
        fiable et durable pouvant être produit à titre de preuve.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 8 - Informations sur les produits
      </Title>
      <p>
        Les produits sont décrits et présentés avec la plus grande exactitude possible. Toutefois, si des erreurs ou des
        commissions ont pu se produire quant à cette présentation, la responsabilité du vendeur ne pourrait être
        engagée. Les photographies des produits ne sont pas contractuelles.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 9 - Tarifs
      </Title>
      <p>
        Le vendeur s'engage à ce que les tarifs indiqués lors de la commande demeurent les mêmes jusqu'à confirmation
        par courrier électronique de la commande. Les prix sont indiqués en euros et tiennent compte de la TVA
        applicable au jour de la commande. Tout changement du taux applicable TVA sera automatiquement répercuté sur le
        prix des produits de la boutique en ligne.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 10 - Mode de paiement
      </Title>
      <p>
        Il s'agit d'une commande avec obligation de paiement, ce qui signifie que la passation de la commande implique
        un règlement de l'acheteur. Pour régler sa commande, l'acheteur dispose, à son choix, de l'ensemble des modes de
        paiements mis à sa disposition par le vendeur et listés sur le site du vendeur. L'acheteur garantit au vendeur
        qu'il dispose des autorisations éventuellement nécessaires pour utiliser le mode de paiement choisi par lui,
        lors de la validation du bon de commande. Le paiement du prix s'effectue en totalité au jour de la commande,
        selon les modalités suivantes : par carte de paiement. Il est possible de régler votre commande par Carte
        Bancaire de type « Carte Bleue », « VISA » ou « MASTERCARD ». Ledit paiement est traité par notre partenaire
        bancaire. Les coordonnées de ce dernier sont accessibles depuis la page « mentions légales » du site. Le
        paiement par carte peut avoir recours au système 3D Secure qui vise à identifier le porteur de la carte dans le
        but de limiter la fraude. Dans le cas où un paiement se révélerait invalidé par la banque après émission de
        votre billet ou de votre commande, celui-ci sera invalidé, ne vous permettant pas un accès à l’évènement.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 11 - Émission et condition d’utilisation des billets
      </Title>
      <Title level={3} type={3} className={styles.subArticleTitle}>
        Livraison
      </Title>
      <p>
        Les billets électroniques ou un lien permettant de les télécharger seront envoyés sur la messagerie électronique
        de l’acheteur après chaque commande.
      </p>
      <Title level={3} type={3} className={styles.subArticleTitle}>
        Support
      </Title>
      <p>
        Afin d’être accepté, le billet peut être imprimé en noir et blanc ou couleur sur du Papier A4 blanc et vierge ou
        présenté en format numérique. Ce dernier doit présenter un état total d’intégrité et de lisibilité correct : les
        billets endommagés ou illisibles seront considérés comme non valables. L’organisateur décline toute
        responsabilité concernant toute anomalie pouvant survenir au cours d’une commande, du téléchargement ou de
        l’impression d’un billet. Il ne sera remis aucun duplicata autre que le seul billet initial.
      </p>
      <Title level={3} type={3} className={styles.subArticleTitle}>
        Unicité
      </Title>
      <p>
        Un billet ne peut être utilisé qu’une seule fois pour accéder à l'évènement. Ainsi en cas de perte, vol,
        duplication, seule la première personne à présenter le billet sera admise à assister à la manifestation. Un
        détenteur de billet qui aurait déjà été utilisé ne pourra prétendre à aucun remboursement. Le billet est
        uniquement valable pour le lieu, la date et l'heure auquel il appartient. Le billet doit être conservé jusqu’à
        la fin de l’évènement.
      </p>
      <Title level={3} type={3} className={styles.subArticleTitle}>
        Contrôle
      </Title>
      <p>
        L’Organisateur est libre de contrôler la validité des billets lors de l’accès à l'évènement. Le participant doit
        veiller à la confidentialité de son billet. L’accès à l'évènement peut être refusé à un participant qui présente
        un billet déjà utilisé. L’Organisateur n’est pas tenu de vérifier l’authenticité du billet. Après la
        présentation du billet, un bracelet sera remis au participant. Ce bracelet sera valable pendant toute la durée
        de l’évènement. En cas de perte du bracelet, une nouvelle vérification d’identité sera effectuée.
      </p>
      <Title level={3} type={3} className={styles.subArticleTitle}>
        Justificatif
      </Title>
      <p>
        Pour garantir la sécurité et le bon déroulement de l'évènement, l’Organisateur est libre de contrôler l’identité
        des participants. Dans ce cas, le participant doit être en mesure de justifier de son identité à l’aide d'une
        pièce d'identité en cours de validité en complément du billet d'entrée nominatif. Un participant mineur doit
        présenter une pièce d’identité, une autorisation du ou des représentants légaux ainsi qu’une photocopie de la
        pièce d’identité d’un de ses responsables légaux. Cette mesure vise à assurer l'identification des participants
        et à renforcer la sûreté de l'évènement pour l'ensemble des visiteurs.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 12 - Droit de rétractation
      </Title>
      <p>
        Conformément à l'article L. 121-20-4 du code de la consommation, les inscriptions ne font pas l'objet d'un droit
        de rétractation. Toute commande est ferme et définitive. Toutefois, l'organisateur autorise tout inscrit à
        demander une annulation et un remboursement partiel ou total de son inscription, au plus tard 14 jours
        calendaires avant la date de l'évènement, soit le 14/11/2025 17:00 CET. Toute demande doit être formulée par
        courriel adressé à arena@utt.fr, précisant le nom d'utilisateur et l'adresse courriel utilisée pour
        l'inscription. Le remboursement sera exécuté sous quinzaine à dater de la fin de l'évènement, et interviendra
        sur la carte bancaire ayant servi au paiement. Tout remboursement fera l'objet d'une retenue de :
      </p>
      <ul>
        <li>
          25% (vingt-cinq pourcent) du montant payé si la demande est faite entre le 24/10/2025 17:00 CET et le
          31/10/2025 17:00 CET
        </li>
        <li>
          50% (cinquante pourcent) du montant payé si la demande est faite entre le 31/10/2025 17:00 CET et le
          07/11/2025 17:00 CET
        </li>
        <li>
          75% (soixante-quinze pourcent) du montant payé si la demande est faite entre le 07/11/2025 17:00 CET et le
          14/11/2025 17:00 CET
        </li>
        <li>Aucun remboursement ne sera accepté au-delà du 14/11/2025 17:00 CET.</li>
      </ul>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 13 - Force majeure
      </Title>
      <p>
        Toutes circonstances indépendantes de la volonté des parties empêchant l'exécution dans des conditions normales
        de leurs obligations sont considérées comme des causes d'exonération des obligations des parties et entraînent
        leur suspension. La partie qui invoque les circonstances visées ci-dessus doit avertir immédiatement l'autre
        partie de leur survenance, ainsi que de leur disparition. Seront considérés comme cas de force majeure tous
        faits ou circonstances irrésistibles, extérieurs aux parties, imprévisibles, inévitables, indépendants de la
        volonté des parties et qui ne pourront être empêchés par ces dernières, malgré tous les efforts retenus par la
        jurisprudence des cours et des tribunaux français : catastrophes naturelles, arrêt des réseaux de
        télécommunication ou difficultés propres aux réseaux de télécommunication externes aux clients. Les parties se
        rapprocheront pour examiner l'incidence de l'évènement et convenir des conditions dans lesquelles l'exécution du
        contrat sera poursuivie. Si le cas de force majeure a une durée supérieure à trois mois, les présentes
        conditions générales pourront être résiliées par la partie lésée.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 14 - Propriété intellectuelle
      </Title>
      <p>
        Le contenu du site internet reste la propriété du vendeur, seul titulaire des droits de propriété intellectuelle
        sur ce contenu. Les acheteurs s'engagent à ne faire aucun usage de ce contenu ; toute reproduction totale ou
        partielle de ce contenu est strictement interdite et est susceptible de constituer un délit de contrefaçon.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 15 - Vidéosurveillance
      </Title>
      <p>
        Pour des raisons de sécurité des personnes et des biens, le participant est informé et accepte que le lieu de
        déroulement de l'évènement de l'UTT Arena 2025 est susceptible d’être équipé de caméras de vidéosurveillance.
        Ces images sont susceptibles d’être utilisées pour les besoins résultant de poursuites judiciaires à l’encontre
        de tout individu.
        <br />
        Pour connaître vos droits concernant les données collectées, la durée de conservation des images, ainsi que les
        coordonnées de notre Délégué à la Protection des Données (DPO), veuillez vous référer à l'article 17 des
        Conditions Générales de Vente.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 16 - Interdiction de sortie de matériel de nuit
      </Title>
      <p>
        Pour des raisons de sécurité des personnes et des biens, le participant est informé et accepte que les sorties
        de matériel de nuit soient interdites. Les horaires précis de l’interdiction seront communiqués par les
        organisateurs de l’évènement aux participants d'une manière lisible et compréhensible avant et pendant
        l’évènement.
        <br />
        Si le participant souhaite sortir du matériel, il devra justifier son identité, et se conformer à enregistrement
        du matériel sorti par le participant. Les registres d’enregistrement sont susceptibles d’être utilisés pour les
        besoins résultant de poursuites judiciaires à l’encontre de tout individu.
        <br />
        Pour connaître vos droits concernant les données collectées lors de cet enregistrement, la durée de conservation
        des images, ainsi que les coordonnées de notre Délégué à la Protection des Données (DPO), veuillez vous référer
        à l'article 17 des Conditions Générales de Vente.
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 17 - Données personnelles
      </Title>
      <p>
        Chaque utilisateur du site web a un droit permanent d'accès et de rectification sur toutes les données le
        concernant, conformément aux textes européens et aux lois nationales en vigueur. Il vous suffit d'en faire la
        demande par courrier électronique (arena@utt.fr). Ce droit peut être exercé dans les conditions et selon les
        modalités définies sur le site de l'UTT Arena 2025. Les données nominatives fournies par l'acheteur sont
        nécessaires au traitement de sa commande et à l'établissement de ses factures. Elles peuvent être communiquées
        aux partenaires du vendeur chargés de l'exécution, du traitement, de la gestion et du paiement des commandes.
        Notre système héberge les données pour une durée de 1 à 3 ans suivant la fin de l’évènement. Nous conservons les
        autorisations parentales pour une durée de 1 an suivant la fin de l’évènement. Le registre d’enregistrement du
        matériel sorti de nuit par chaque participant sera conservé pour une durée de 1 mois.
        <br />
        Les images de vidéosurveillance captées durant l'évènement UTT Arena 2025 seront conservées pour une durée de 1
        mois suivant la fin de l'évènement. Ces données sont captées et conservées afin d'assurer la sécurité des
        personnes et des biens durant l'évènement. Conformément à l’article L.253-5 du Code de la sécurité intérieure,
        chaque participant intéressé dispose d’un droit d’accès aux images de vidéoprotection captées durant l'évènement
        et peut l’exercer pendant le délai de conservation des images par courrier à destination de l'association
        organisant l'évènement UTT Arena 2025, ou à la CNIL.
        <br />
        <br />
        L'adresse de l'association organisant l'évènement UTT Arena 2025 :
        <br />
        UTT Net Group
        <br />
        12 rue Marie Curie, 10004 Troyes
        <br />
        L'adresse de la CNIL :
        <br />
        CNIL – 3 place Fontenoy – TSA 80715 – 75334 PARIS CEDEX 07.
        <br />
        <br />
        En cas de question sur le traitement des données personnelles collectées dans le cadre de l'évènement UTT Arena
        2025, nous vous prions de <br /> contacter :
        <br />
        Matthieu Tourrette,
        <br />
        Président de l'association UTT Net Group organisant l'évènement UTT Arena 2025 et Délégué à la Protection des
        Données
        <br />
        Téléphone : 03 25 71 85 50
      </p>
      <Title level={2} type={2} className={styles.articleTitle}>
        Article 18 - Mentions Légales
      </Title>
      <p>
        L’évènement UTT Arena 2025 est organisé par :<br />
        <br />
        UTT Net Group, association loi 1901
        <br />
        N° RNA : W103000699
        <br />
        N° d'immatriculation RCS : 500164249
        <br />
        Adresse : 12 rue Marie Curie, 10004 Troyes
        <br />
        Téléphone : 03 25 71 85 50
        <br />
        Email : ung@utt.fr
        <br />
      </p>
    </div>
  </div>
);

export default Legal;
