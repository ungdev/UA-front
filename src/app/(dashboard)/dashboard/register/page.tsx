'use client';
import styles from './style.module.scss';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/named
import { animated, useTransition } from '@react-spring/web';

import { editUserFfsu, setType } from '@/modules/login';

import { Input, Button, Table, Icon, Title, Checkbox } from '@/components/UI';
import { createTeam as cT, joinTeam, cancelJoin } from '@/modules/team';
import { API } from '@/utils/api';
import { uploadsUrl } from '@/utils/environment';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Team, Tournament, UserType } from '@/types';
import { IconName } from '@/components/UI/Icon';
import { getTournamentBackgroundLink } from '@/utils/uploadLink';
import playerImg from '@/../public/images/register/player.webp';
import coachImg from '@/../public/images/register/coach.webp';
import spectatorImg from '@/../public/images/register/spectator.webp';
import joinImg from '@/../public/images/register/join.webp';
import createImg from '@/../public/images/register/create.webp';
import Modal from '@/components/UI/Modal';
import { toast } from 'react-toastify';

const columns = [
  { title: 'Équipe', key: 'team' },
  { title: 'Joueurs', key: 'players' },
  { title: '', key: 'action' },
];

const Register = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.login.user)!;
  const [discordLink, setDiscordLink] = useState('');
  const [userType, setUserType] = useState<UserType>();
  const [step, setStep] = useState(1);
  const soloTeamName = `${user.username}-solo-team`;
  const [teamName, setTeamName] = useState('');
  const [pokemonPlayerId, setPokemonPlayerId] = useState('');
  const [ffsuLicense, setFfsuLicense] = useState<string | null>(user.ffsuLicense || null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournament, setTournament] = useState('');
  const [tournamentSolo, setTournamentSolo] = useState(false);
  const [tournamentFfsu, setTournamentFfsu] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [certifyFfsu, setCertifyFfsu] = useState(false);
  // Contains the team the user is trying to join. This is used to remember the team, so it will be filled only when the confirmation modal will be on.
  const [confirmationForTeam, setConfirmationForTeam] = useState<Team>();

  // Split multiplayer and solo tournaments
  const tournamentsList = tournaments.filter((tournament) => tournament.playersPerTeam > 1 && !tournament.ffsu);
  const tournamentsSoloList = tournaments.filter((tournament) => tournament.playersPerTeam === 1 && !tournament.ffsu);

  // Get Ffsu tournaments
  const tournamentsFfsuList = tournaments.filter((tournament) => tournament.ffsu === true);

  // Get tournaments category select options
  const tournamentsOptions = tournamentsList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const tournamentsSoloOptions = tournamentsSoloList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const tournamentsFfsuOptions = tournamentsFfsuList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const transitions = useTransition(step, {
    from: { opacity: 0, transform: `translate3d(100%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { position: 'absolute', display: 'none' },
    config: {
      duration: 250,
    },
  });

  useEffect(() => {
    API.get('discord/connect').then((res) => {
      setDiscordLink(res.link);
    });

    (async () => {
      setTournaments(await API.get('tournaments'));
    })();

    if (user.discordId) setStep(2);

    if (user.askingTeamId) {
      (async () => {
        setUserType(user.type);
        setTournament((await API.get('teams/' + user.askingTeamId)).tournamentId);
        setStep(5);
      })();
    }
  }, []);

  if (!tournaments.length) return null;

  const Step1 = (
    <>
      <a href={discordLink}>
        <Button primary>
          <div className={styles.discordBtn}>
            <Icon name={IconName.Discord} fill={true} />
            {'Connecte-toi à ton compte Discord'}
          </div>
        </Button>
      </a>
      <div>Nous utilisons ton compte Discord pour t'assigner tes rôles sur notre serveur Discord</div>
    </>
  );

  // Create a card component
  const RegisterCard = ({ title, onClick, imgSrc }: { title: string; onClick: () => void; imgSrc: string }) => {
    return (
      <div className={styles.card} onClick={onClick}>
        <img src={imgSrc} alt={title + '  background'} loading="lazy" />
        <p>{title}</p>
      </div>
    );
  };

  const Step2 = (
    <>
      <div className={styles.cardContainer}>
        <RegisterCard
          title="Joueur"
          onClick={() => {
            setUserType(UserType.player);
            setStep(step + 1);
            setTournamentSolo(false);
          }}
          imgSrc={playerImg.src}
        />

        <RegisterCard
          title="Coach / Manager"
          onClick={() => {
            setUserType(UserType.coach);
            setStep(step + 1);
            setTournamentSolo(false);
          }}
          imgSrc={coachImg.src}
        />

        <RegisterCard
          title="Spectateur"
          onClick={() => {
            setUserType(UserType.spectator);
            setStep(step + 4);
            setTournamentSolo(true);
          }}
          imgSrc={spectatorImg.src}
        />
      </div>
    </>
  );

  const loadTournaments = () => {
    const list = tournamentsOptions.map((element, i) => {
      return (
        <RegisterCard
          key={'tournament-' + i}
          title={element.label}
          imgSrc={getTournamentBackgroundLink(element.value)}
          onClick={() => {
            setTournament(element.value);
            setStep(step + 2);
            setTournamentSolo(false);
          }}
        />
      );
    });

    tournamentsFfsuOptions.forEach((element, i) => {
      list.push(
        <RegisterCard
          key={'tournament-ffsu-' + i}
          title={element.label}
          imgSrc={getTournamentBackgroundLink(element.value)}
          onClick={() => {
            setTournament(element.value);
            setStep(step + 1);
            setTournamentFfsu(true);
          }}
        />
      );
    });

    if (userType === UserType.player || userType === UserType.coach) {
      // You can disable solo tournaments for coaches here
      tournamentsSoloOptions.forEach((element, i) => {
        list.push(
          <RegisterCard
            key={'tournament-solo-' + i}
            title={element.label}
            imgSrc={getTournamentBackgroundLink(element.value)}
            onClick={() => {
              setTournament(element.value);
              setCreateTeam(userType === UserType.player);
              setStep(step + 3);
              setTournamentSolo(true);
            }}
          />,
        );
      });
    }
    return list;
  };

  const Step3 = (
    <>
      <div className={styles.cardContainer}>{loadTournaments()}</div>
    </>
  );

  const Step4 = (
    <>
      <div className={styles.checkboxRules}>
        <Input label="Numéro de license FFSU" value={ffsuLicense || ''} onChange={setFfsuLicense} />
        <Checkbox
          label={
            <>
              En cochant cette case je certifie que le numéro de licence FFSU que j'ai renseigné est valide et que je suis bien licencié(e) 
              à la FFSU pour la saison en cours. Ce tournoi sera par conséquent gratuit mais ne disposera pas de cashprize.
            </>
          }
          value={certifyFfsu}
          onChange={setCertifyFfsu}
        />
      </div>
      <Button
        primary
        onClick={() => {
          const license = ffsuLicense?.length === 0 ? null : ffsuLicense;
          if (!license) {
            toast.error("Tu dois renseigner ta licence FFSU pour t'inscrire à ce tournoi.");
            return;
          }
          if (license.length !== 7) {
            toast.error('Le numéro de licence FFSU doit contenir 10 caractères.');
            return;
          }
          const res = dispatch(editUserFfsu({ ffsuLicense: license }));
          setStep(step + 1);
        }}
        disabled={!user.discordId || !certifyFfsu}>
        {'Valider'}
      </Button>
    </>
  );

  const Step5 = (
    <>
      <div className={styles.cardContainer}>
        <RegisterCard
          title="Créer une équipe"
          onClick={() => {
            setCreateTeam(true);
            setStep(step + 1);
          }}
          imgSrc={createImg.src}
        />

        <RegisterCard
          title="Rejoindre une équipe"
          onClick={() => {
            setCreateTeam(false);
            setStep(step + 1);
          }}
          imgSrc={joinImg.src}
        />
      </div>
    </>
  );

  const tournamentTable = () => {
    const tournamentOption = tournaments.filter((tr) => tr.id === tournament)[0];
    const tournamentTeamsRender = (tournamentOption.teams === undefined ? [] : tournamentOption.teams)
      .filter((team) => (userType === 'coach' ? true : !team.lockedAt))
      .map((team) => ({
        team: user.askingTeamId === team.id ? `${team.name} (demande en attente)` : team.name,
        players: team.players.map(({ username }) => username).join(', '),
        action:
          user.askingTeamId === team.id ? (
            <Button onClick={() => dispatch(cancelJoin(team.name))}>Annuler</Button>
          ) : (
            <Button
              primary
              onClick={() => {
                const tournamentObject = tournaments.find((t) => t.id === tournament)!;
                if (
                  (userType === 'player' && team.players.length >= tournamentObject.playersPerTeam) ||
                  (userType === 'coach' && team.coaches.length >= tournamentObject.coachesPerTeam)
                ) {
                  setConfirmationForTeam(team);
                } else {
                  dispatch(
                    joinTeam(team.id, team.name, userType === UserType.player ? UserType.player : UserType.coach),
                  );
                }
              }}
              disabled={!user.discordId}>
              Rejoindre
            </Button>
          ),
      }));
    return {
      title: undefined,
      key: undefined,
      content: <Table columns={columns} dataSource={tournamentTeamsRender} alignRight />,
    };
  };

  const Step6 = (
    <>
      {createTeam || userType === UserType.spectator ? (
        <>
          {!tournamentSolo ? <Input label="Nom d'équipe" value={teamName} onChange={setTeamName} /> : null}
          {tournament === 'pokemon' ? (
            <Input label="ID de Joueur Pokémon" value={pokemonPlayerId} onChange={setPokemonPlayerId} />
          ) : null}
          {tournament === 'osu' && userType !== UserType.spectator ? (
            <>
              <div className={styles.warning}>Il est nécessaire d'être qualifié pour s'inscrire à ce tournoi.</div>
            </>
          ) : null}
          <div className={styles.checkboxRules}>
            <Checkbox
              label={
                <>
                  En cochant cette case je certifie avoir lu et accepté{' '}
                  {userType !== UserType.spectator && 'le règlement du tournoi (disponible sur la page du tournoi), '}{' '}
                  le{' '}
                  <a href={`${uploadsUrl()}/rules/ua.pdf`} target="_blank">
                    règlement de l'UTT Arena
                  </a>{' '}
                  et autorise la prise de vue comme indiqué dans celui-ci
                </>
              }
              value={acceptedRules}
              onChange={setAcceptedRules}
            />
          </div>
          <Button
            primary
            onClick={() =>
              dispatch(
                userType === UserType.spectator
                  ? setType(UserType.spectator)
                  : cT({
                      name: tournamentSolo ? soloTeamName : teamName,
                      tournamentId: tournament,
                      pokemonPlayerId: tournament === 'pokemon' ? pokemonPlayerId : undefined,
                      userType: userType as UserType,
                    }),
              )
            }
            disabled={!user.discordId || !acceptedRules}>
            {tournamentSolo ? 'Valider' : 'Créer mon équipe'}
          </Button>
        </>
      ) : (
        <div>{tournament ? tournamentTable().content : ''}</div>
      )}
    </>
  );

  const renderSwitch = (param: number) => {
    switch (param) {
      case 1:
        return Step1;
      case 2:
        return Step2;
      case 3:
        return Step3;
      case 4:
        return Step4;
      case 5:
        return Step5;
      case 6:
        return Step6;
      default:
        break;
    }
  };

  const backButton = () => {
    if (((step === 2 && !user.discordId) || step > 2) && !user.askingTeamId) {
      return (
        <Button
          primary
          onClick={() =>
            setStep(userType === UserType.spectator ? step - 4 : tournamentSolo && step === 6 ? step - 3 : step === 5 ? step - 2 : step - 1)
          }>
          {'Retour'}
        </Button>
      );
    }
  };

  const Stepper = () => {
    return (
      <>
        <div className={styles.stepsHeader}>
          <Title level={2} type={1} align="center">
            FINALISE TON INSCRIPTION
          </Title>
          <ul className={styles.steps}>
            <li className={styles.active}></li>
            <li className={step > 1 ? styles.active : ``}></li>
            <li className={step > 2 ? styles.active : ``}></li>
            <li className={step > 3 ? styles.active : ``}></li>
            <li className={step > 4 ? styles.active : ``}></li>
            <li className={step > 5 ? styles.active : ``}></li>
          </ul>
        </div>

        {transitions(
          (style, item) =>
            item && (
              <animated.div style={style}>
                <div className={styles.stepContainer}>{renderSwitch(step)}</div>
              </animated.div>
            ),
        )}

        {backButton()}
      </>
    );
  };

  return (
    <div id="dashboard-register" className={styles.dashboardRegister}>
      {Stepper()}
      <Modal
        visible={!!confirmationForTeam}
        onCancel={() => setConfirmationForTeam(undefined)}
        onOk={() => {
          setConfirmationForTeam(undefined);
          dispatch(
            joinTeam(
              confirmationForTeam!.id,
              confirmationForTeam!.name,
              userType === UserType.player ? UserType.player : UserType.coach,
            ),
          );
        }}>
        Cette équipe a déjà atteint son nombre maximal de {userType === 'player' ? 'joueurs' : 'coachs'}. Tu ne pourras
        donc être accepté que si l'un d'eux quitte l'équipe ou est expulsé.
      </Modal>
    </div>
  );
};

export default Register;
