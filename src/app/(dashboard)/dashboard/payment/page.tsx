'use client';

import { Button, Loader, Title } from '@/components/UI';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useEffect, useState, useMemo } from 'react';
import styles from './style.module.scss';
import Cart from '@/components/dashboard/Cart';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CartItem, Item, User, UserType } from '@/types';
import { fetchItems } from '@/modules/items';
import { getTicketPrice } from '@/modules/users';
import { fetchCurrentTeam } from '@/modules/team';
import { useSearchParams } from 'next/navigation';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.login.user) as User;

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartStr = useSearchParams().get('cart');
  const cart = useMemo(() => (cartStr ? JSON.parse(cartStr) : null), [cartStr]);

  const [items, setItems] = useState<Item[] | null>(null);
  // The team the player is in
  const team = useAppSelector((state) => state.team.team);
  // The members of the team are the players and the coaches
  const [teamMembers, setTeamMembers] = useState<User[] | null>(null);

  // Contains the ticket items for each ticket in the cart. This is an object, keys are userIds and values are the items
  const [tickets, setTickets] = useState<
    | {
        [userId: string]: CartItem;
      }
    | undefined
  >(undefined);

  // Fetch items and team members
  useEffect(() => {
    if (user.teamId) {
      dispatch(fetchCurrentTeam());
    } else if (user.type === UserType.spectator) {
      // Organizers should not be able to buy tickets if they are not in a team
      setTeamMembers([
        {
          id: user.id,
          hasPaid: user.hasPaid,
          username: user.username,
          age: user.age,
          type: user.type,
        } as User,
      ]);
    } else {
      setTeamMembers([]);
    }

    (async () => {
      setItems(await fetchItems());
    })();
  }, []);

  // Initializing teamMembers
  useEffect(() => {
    if (!team) {
      return;
    }
    setTeamMembers(team.players.concat(team.coaches));
  }, [team]);

  // Checks if the place of the user is already in the cart
  // Initializes teamMembersWithoutTicket
  // Fills tickets
  useEffect(() => {
    if (!cart || !teamMembers || !items) return;

    (async () => {
      // First, we make all the requests
      const ticketsArray = (
        await Promise.allSettled(
          cart.tickets.userIds.map((userId: string) =>
            userId === user.id ? items.find((item) => item.id === `ticket-${user.type}`) : getTicketPrice(userId),
          ),
        )
      )
        .filter((val): val is PromiseFulfilledResult<Item> => val.status === 'fulfilled')
        // Then, we only keep the return value of the Promises
        .map((result) => result.value)
        // And finally, we remove failed Promises
        .filter((ticket, i) => {
          if (!ticket) {
            // toast.error(
            //   `Une erreur est survenue en cherchant le prix du ticket de l'utilisateur avec l'identifiant ${cart.tickets.userIds[i]}. Si ce problème persiste, contacte le support`,
            // );
            const newCart = { ...cart };
            newCart.tickets.userIds.splice(i, 1);
            return false;
          }
          return true;
        });
      setTickets(ticketsArray.reduce((prev, curr, i) => ({ ...prev, [cart.tickets.userIds[i]]: curr }), {}));
    })();
  }, [items, cart, teamMembers]);

  if (!items || !teamMembers || !tickets || !cart) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_URL + '/dashboard/payment/callback',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, the customer will be redirected to
    // `/payment/callback`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!.toString());
    } else {
      setMessage("Une erreur inconnue s'est produite");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  } as StripePaymentElementOptions;

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.stripePaymentContainer}>
        <form id="payment-form" onSubmit={handleSubmit} className={styles.stripeForm}>
          <Title level={2} align="center">
            Paiement
          </Title>
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <Button primary type="submit" disabled={isLoading || !stripe || !elements}>
            <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Payer'}</span>
          </Button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
        <div className={styles.bill}>
          <Cart
            cart={cart}
            tickets={tickets!}
            items={items!}
            teamMembers={teamMembers!}
            onItemRemoved={null}
            onTicketRemoved={null}
            onCartReset={null}
          />
        </div>
      </div>
      <p>
        Paiement géré par <a href="https://stripe.com/fr">Stripe Payments Europe, Ltd.</a>
      </p>
    </div>
  );
};

export default Payment;
