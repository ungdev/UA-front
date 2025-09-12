'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

import { fetchItems } from '@/modules/items';
import { cartPay, deleteCart, loadCart, saveCart } from '@/modules/cart';
import { fetchCurrentTeam } from '@/modules/team';
import { Button, Checkbox, Icon, Modal, Title } from '@/components/UI';
import AddPlaceModal from '@/components/dashboard/AddPlaceModal';
import { toast } from 'react-toastify';
import SupplementList from '@/components/dashboard/SupplementList';
import Cart from '@/components/dashboard/Cart';
import { getTicketPrice } from '@/modules/users';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CartItem, Item, User, UserType } from '@/types';
import { IconName } from '@/components/UI/Icon';
import { setRedirect } from '@/modules/redirect';
import { getItemImageLink } from '@/utils/uploadLink';
import { API } from '@/utils/api';

// Hello there ! This is a big file (and it's not the only one :P), I commented it as well as I could, I hope you'll understand :)

const Shop = () => {
  const dispatch = useAppDispatch();
  // Informations about the user
  const user = useAppSelector((state) => state.login.user) as User;
  // The list of all items available
  const [items, setItems] = useState<Item[] | null>(null);
  // The team the player is in
  const team = useAppSelector((state) => state.team.team);
  // The members of the team are the players and the coaches
  const [teamMembers, setTeamMembers] = useState<User[] | null>(null);
  // If the CGV case is checked or not
  const [isCgvAccepted, setIsCgvAccepted] = useState(false);
  // If the modal to add a place is visible
  const [addPlaceVisible, setAddPlaceVisible] = useState(false);
  // The structure of the cart is the same as the one we pass to the route POST /users/current/carts
  // The content of the current cart. The API doesn't know about this before the player clicks on the pay button
  const [cart, setCart] = useState(loadCart());
  // Wheather or not the ticket is already paid or in the cart. This is used to make sure users don't buy 2 tickets.
  const [isPlaceInCart, setIsPlaceInCart] = useState(user.hasPaid);
  // The item that is beeing previewed. This is a string containing the relative path to the image, starting from public/
  // If itemPreview is null, then there is nothing to preview, and thus the modal for the preview is not displayed
  const [itemPreview, setItemPreview] = useState<{
    visible: boolean;
    id: string;
  } | null>(null);
  // The members of the team who didn't buy a ticket
  const [teamMembersWithoutTicket, setTeamMembersWithoutTicket] = useState<User[]>([]);
  // This is used to avoid users to be able to send multiple requests when paying :
  // if they click multiple times, they could send multiple requests
  const [hasRequestedPayment, setHasRequestedPayment] = useState(false);
  // If the user wants to delete all the quantity of an item, this is the id of the item
  const [isDeleteAllQuantity, setIsDeleteAllQuantity] = useState(false);
  // Contains the ticket items for each ticket in the cart. This is an object, keys are userIds and values are the items
  const [tickets, setTickets] = useState<
    | {
        [userId: string]: CartItem;
      }
    | undefined
  >(undefined);

  // Fetch items, team
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

    window.addEventListener('keydown', (e) => {
      // if shift is pressed, we set isDeleteAllQuantity to true
      if (e.key === 'Shift') {
        setIsDeleteAllQuantity(true);
      }
    });

    // On key release, we set isDeleteAllQuantity to false
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        setIsDeleteAllQuantity(false);
      }
    });
  }, []);

  // Initializing teamMembers
  useEffect(() => {
    if (!team) {
      return;
    }
    setTeamMembers(team.players.concat(team.coaches));
  }, [team]);

  // Save the cart everytime it is modified
  useEffect(() => {
    if (cart && items) {
      // Check supplements are still there or remove them
      cart.supplements = cart.supplements.filter(({ itemId }) => items.some((item) => item.id === itemId));
      saveCart(cart);
    }
  }, [cart, items]);

  // Checks if the place of the user is already in the cart
  // Initializes teamMembersWithoutTicket
  // Fills tickets
  useEffect(() => {
    if (!cart || !teamMembers || !items) return;
    // Checking if place is in cart
    if (cart.tickets.userIds.find((id) => id === user.id)) {
      setIsPlaceInCart(true);
    }
    // Initializing teamMembersWithoutTicket
    setTeamMembersWithoutTicket(
      teamMembers.filter(
        (member) => !cart.tickets.userIds.includes(member.id) && member.id !== user.id && !member.hasPaid,
      ),
    );
    if (tickets) return;

    (async () => {
      // Fill the tickets state
      // First, we make all the requests
      const ticketsArray = (
        await Promise.allSettled(
          cart.tickets.userIds.map((userId) =>
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
            toast.error(
              `Une erreur est survenue en cherchant le prix du ticket de l'utilisateur avec l'identifiant ${cart.tickets.userIds[i]}. Si ce problème persiste, contacte le support`,
            );
            const newCart = { ...cart };
            newCart.tickets.userIds.splice(i, 1);
            saveCart(newCart);
            return false;
          }
          return true;
        });
      setTickets(ticketsArray.reduce((prev, curr, i) => ({ ...prev, [cart.tickets.userIds[i]]: curr }), {}));
    })();
  }, [items, cart, teamMembers]);

  if (!items || !teamMembers || !tickets) {
    return null;
  }

  // When the user removes a ticket.t
  // 'ticketIndex' is the index of the ticket in the cart if user is not undefined
  const onRemoveTicket = (userOfTicket: User | undefined, ticketIndex: number | undefined) => {
    if (!userOfTicket) return;
    // Modify the states
    if (userOfTicket.id === user.id) {
      setIsPlaceInCart(false);
    } else {
      const newMembersWithoutTicket = [...teamMembersWithoutTicket];
      newMembersWithoutTicket.push(userOfTicket);
      setTeamMembersWithoutTicket(newMembersWithoutTicket);
    }
    // Modify the cart
    const updatedCartTickets = cart.tickets.userIds;
    updatedCartTickets.splice(ticketIndex!, 1);
    setCart({ ...cart, tickets: { ...cart.tickets, userIds: updatedCartTickets } });
    // Remove the item from the tickets
    const newTickets = { ...tickets } as typeof tickets;
    delete newTickets[userOfTicket.id];
    setTickets(newTickets);
  };

  // Removes 1 of the item with id itemId. This is a callback from the Cart node.
  const onRemoveItem = (itemId: string) => {
    const cartSupplementIndex = cart.supplements.findIndex((supplement) => supplement.itemId === itemId);
    const newCartSupplements = [...cart.supplements];

    if (newCartSupplements[cartSupplementIndex].quantity <= 1 || isDeleteAllQuantity) {
      newCartSupplements.splice(cartSupplementIndex, 1);
    } else {
      newCartSupplements[cartSupplementIndex].quantity--;
    }
    onSupplementCartChanges(newCartSupplements);
  };

  // Compute total price
  // It is computed in 2 parts : player tickets and supplements
  const totalPrice =
    Object.values(tickets).reduce((acc, ticket) => {
      return acc + (ticket.reducedPrice || ticket.price);
    }, 0) +
    cart.supplements.reduce((acc, cartSupplement) => {
      const item = items.find((item) => item.id === cartSupplement.itemId);
      if (!item) {
        toast.warn(
          "Une erreur s'est produite lors du calcul du prix. Le prix affiché n'est peut-être pas exact. Si ce problème se reproduit, contacte le support",
        );
        return acc;
      }
      return acc + cartSupplement.quantity * item.price;
    }, 0);

  // When the AddPlaceModal is exited.
  // If it was exited by clicking out of the window or by quiting, then placeFor is undefined.
  // If it was exited by adding a ticket, then placeFor is either 'me', 'other' , and placeId is the id of the user LALALALALALALALA
  const onAddPlaceModalQuit = async (placeFor: string, placeId: string) => {
    setAddPlaceVisible(false);
    if (placeFor === undefined || (placeFor === '' && placeId === '')) return;
    setCart({ ...cart, tickets: { ...cart.tickets, userIds: [...cart.tickets.userIds, placeId as string] } });
    const newTickets = { ...tickets };
    newTickets[placeId as string] =
      placeFor === 'me'
        ? items.find((item) => item.id === `ticket-${user.type}`)
        : await getTicketPrice(placeId as string);
    setTickets(newTickets);
    if (placeFor === 'me') {
      setIsPlaceInCart(true);
    } else {
      setTeamMembersWithoutTicket(teamMembersWithoutTicket.filter((member) => member.id !== placeId));
    }
  };

  // Callback of SupplementList. It is called when the user changes its cart (the supplement part)
  // supplementCart is the new value of cart.supplements
  // This is also used to update the supplement list of the cart when we remove an element
  const onSupplementCartChanges = (supplementCart: typeof cart.supplements) => {
    setCart({ ...cart, supplements: supplementCart });
  };

  // Resets the cart. It removes the cart from the local storage, and resets the "cart" and "tickets" states.
  // Callback of <Cart /> when the user decides to reset the entire cart
  const onCartReset = () => {
    const membersOfTickets = cart.tickets.userIds.map((ticket) => {
      if (ticket === user.id) {
        setIsPlaceInCart(false);
      }
      return teamMembers.find((member) => member.id === ticket);
    }) as User[];
    setTeamMembersWithoutTicket(teamMembersWithoutTicket.concat(membersOfTickets));

    setCart(deleteCart());
    setTickets({});
  };

  // Callback of SupplementList. It is called when the user wants to preview an item
  // newItemPreview is the new value of itemPreview.
  const onItemPreview = (id: string) => {
    setItemPreview({ id, visible: true });
  };

  // Called when the user clicks on the pay button
  // Sets hasRequestedPayment to true to disable the pay button, and requests the payment to the API
  const onPay = async () => {
    setHasRequestedPayment(true);
    deleteCart();
    if (totalPrice) {
      const token = await cartPay(cart);
      dispatch(setRedirect(`/dashboard/payment?stripeToken=${token}&cart=${JSON.stringify(cart)}`));
    } else {
      API.post('carts/ffsu').then(() => {
        dispatch(setRedirect('/dashboard/team'));
      });
    }
  };

  // Hide the places section if user can't buy any places
  const placesSectionVisible = !isPlaceInCart || (teamMembersWithoutTicket.length && team?.tournamentId !== 'lol-ffsu');

  return (
    <div id="dashboard-shop" className={styles.dashboardShop}>
      <Title level={1} align="center" className={styles.primaryTitle}>
        Boutique
      </Title>
      <div className={styles.shopAndBill}>
        <div className={styles.shop}>
          {placesSectionVisible ? (
            <div className={styles.shopSection}>
              <Title level={2} type={2} className={styles.secondaryTitle}>
                Places
              </Title>
              <div className={styles.buttonRow}>
                <Button
                  primary
                  onClick={() => {
                    if (!user.hasPaid && (teamMembersWithoutTicket.length === 0 || team?.tournamentId === 'lol-ffsu')) {
                      onAddPlaceModalQuit('me', user.id);
                      return;
                    }
                    setAddPlaceVisible(true);
                  }}>
                  Ajouter une place
                </Button>
              </div>
            </div>
          ) : (
            false
          )}
          <div className={styles.shopSection}>
            <SupplementList
              items={items}
              supplementCart={cart.supplements}
              hasTicket={isPlaceInCart}
              onSupplementCartChanges={onSupplementCartChanges}
              onItemPreview={onItemPreview}
              itemType="supplement"
              shopSectionName="Accessoires"
            />
          </div>
          <div className={styles.shopSection}>
            <SupplementList
              items={items}
              supplementCart={cart.supplements}
              hasTicket={isPlaceInCart}
              onSupplementCartChanges={onSupplementCartChanges}
              onItemPreview={onItemPreview}
              itemType="rent"
              shopSectionName="Location"
              disabled={
                team?.lockedAt === null
                  ? "L'équipe n'est pas verrouillée, tu ne peux plus louer de matériel."
                  : undefined
              }
            />
          </div>
        </div>
        <div className={styles.billWrapper}>
          <div className={styles.bill}>
            <div>
              <Cart
                cart={cart}
                tickets={tickets}
                items={items}
                teamMembers={teamMembers}
                onItemRemoved={onRemoveItem}
                onTicketRemoved={onRemoveTicket}
                onCartReset={onCartReset}
              />
            </div>
            <div className={styles.shopFooter}>
              <strong>Total : {(totalPrice / 100).toFixed(2)}€</strong>
              <br />
              <div className={styles.cgv}>
                <Checkbox
                  className={styles.cgvCheckbox}
                  label={
                    <>
                      J'accepte les{' '}
                      <a href="/legal#CGV" target="_blank" className={styles.darkBackground}>
                        Conditions Générales de Vente
                      </a>
                      &nbsp;(Attention aux conditions de remboursement !)
                    </>
                  }
                  value={isCgvAccepted}
                  onChange={setIsCgvAccepted}
                />
              </div>
              <br />
              <Button
                primary
                veryLong
                className={styles.shopButton}
                onClick={onPay}
                disabled={(!totalPrice && cart.tickets.userIds.length === 0) || !isCgvAccepted || hasRequestedPayment}>
                <Icon name={IconName.ShoppingCart} />
                Payer
              </Button>
            </div>
          </div>
        </div>
      </div>
      {addPlaceVisible && (
        <AddPlaceModal
          userId={user.id}
          username={user.username}
          hasTicket={isPlaceInCart}
          teamMembersWithoutTicket={team?.tournamentId === 'lol-ffsu' ? [] : teamMembersWithoutTicket}
          onQuit={onAddPlaceModalQuit}
        />
      )}
      <Modal
        visible={!!itemPreview && !!itemPreview?.visible}
        onCancel={() => setItemPreview(itemPreview ? { ...itemPreview, visible: false } : null)}
        buttons={null}
        containerClassName={styles.itemPreviewModalContainer}>
        {itemPreview && (
          <img
            alt="Preview image"
            src={getItemImageLink(itemPreview.id)}
            className={styles.itemPreviewImage}
            loading="lazy"
          />
        )}
      </Modal>
    </div>
  );
};

export default Shop;
