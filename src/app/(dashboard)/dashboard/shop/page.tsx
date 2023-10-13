'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

import { fetchItems } from '@/modules/items';
import { cartPay, deleteCart, loadCart, saveCart } from '@/modules/cart';
import { fetchCurrentTeam } from '@/modules/team';
import { Button, Title, Modal, Checkbox, Icon } from '@/components/UI';
import AddPlaceModal from '@/components/dashboard/AddPlaceModal';
import { toast } from 'react-toastify';
import SupplementList from '@/components/dashboard/SupplementList';
import Cart from '@/components/dashboard/Cart';
import { getTicketPrice } from '@/modules/users';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { AttendantInfo, CartItem, Item, User, UserAge, UserType } from '@/types';
import type { Action } from '@reduxjs/toolkit';
import { IconName } from '@/components/UI/Icon';

// Hello there ! This is a big file (and it's not the only one :P), I commented it as well as I could, I hope you'll understand :)

const Shop = () => {
  const dispatch = useAppDispatch();
  // Informations about the user
  const {
    id: userId,
    hasPaid,
    username,
    age,
    attendant,
    type: userType,
  } = useAppSelector((state) => state.login.user) as User;
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
  // If the user already paid for his attendant, or the place is in the current cart. If the user is an adult, this value should not be used.
  const [hasAttendant, setHasAttendant] = useState(!!attendant);
  // The structure of the cart is the same as the one we pass to the route POST /users/current/carts
  //const cartInitialValue = { tickets: { userIds: [], attendant: undefined }, supplements: [] };
  // The content of the current cart. The API doesn't know about this before the player clicks on the pay button
  const [cart, setCart] = useState(loadCart());
  // Wheather or not the ticket is already paid or in the cart. This is used to make sure users don't buy 2 tickets.
  const [isPlaceInCart, setIsPlaceInCart] = useState(hasPaid);
  // The item that is beeing previewed. This is a string containing the relative path to the image, starting from public/
  // If itemPreview is null, then there is nothing to preview, and thus the modal for the preview is not displayed
  const [itemPreview, setItemPreview] = useState<{
    image: string;
    visible: boolean;
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

  // Fetch items, team and checks if user already have an attendant
  useEffect(() => {
    if (userType !== UserType.spectator) dispatch(fetchCurrentTeam() as unknown as Action);
    else
      setTeamMembers([
        {
          id: userId,
          hasPaid,
          username,
          age,
          attendant,
          type: userType,
        } as User,
      ]);

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
  // Checks if the user already have an attendant
  // Initializes teamMembersWithoutTicket
  // Fills tickets
  useEffect(() => {
    if (!cart || !teamMembers || !items) return;
    // Checking if place is in cart
    if (cart.tickets.userIds.find((id) => id === userId)) {
      setIsPlaceInCart(true);
    }
    // Checking if user has an attendant in the cart
    if (cart.tickets.attendant) {
      setHasAttendant(true);
    }
    // Initializing teamMembersWithoutTicket
    setTeamMembersWithoutTicket(
      teamMembers.filter(
        (member) => !cart.tickets.userIds.includes(member.id) && member.id !== userId && !member.hasPaid,
      ),
    );
    if (tickets) return;

    (async () => {
      // Fill the tickets state
      // First, we make all the requests
      const ticketsArray = (
        await Promise.allSettled(
          cart.tickets.userIds.map((user) =>
            user === userId ? items.find((item) => item.id === `ticket-${userType}`) : getTicketPrice(user),
          ),
        )
      )
        .filter((val): val is PromiseFulfilledResult<any> => val.status === 'fulfilled')
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

  // When the user removes a ticket.
  // 'user' is either a user object, or undefined if it is the ticket of an attendant
  // 'ticketIndex' is the index of the ticket in the cart if user is not undefined
  const onRemoveTicket = (user: User | undefined, ticketIndex: number | undefined) => {
    if (user === undefined) {
      setHasAttendant(false);
      setCart({ ...cart, tickets: { ...cart.tickets, attendant: undefined } });
    } else {
      // Modify the states
      if (user.id === userId) {
        setIsPlaceInCart(false);
      } else {
        const newMembersWithoutTicket = [...teamMembersWithoutTicket];
        newMembersWithoutTicket.push(user);
        setTeamMembersWithoutTicket(newMembersWithoutTicket);
      }
      // Modify the cart
      const updatedCartTickets = cart.tickets.userIds;
      updatedCartTickets.splice(ticketIndex!, 1);
      setCart({ ...cart, tickets: { ...cart.tickets, userIds: updatedCartTickets } });
      // Remove the item from the tickets
      const newTickets = { ...tickets } as typeof tickets;
      delete newTickets[user.id];
      setTickets(newTickets);
    }
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
  // It is computed in 3 parts : player tickets, the attendant ticket, and supplements
  const totalPrice =
    Object.values(tickets).reduce((acc, ticket) => {
      return acc + (ticket.reducedPrice || ticket.price);
    }, 0) +
    (cart.tickets.attendant ? items.find((item) => item.id === 'ticket-attendant')!.price : 0) +
    cart.supplements.reduce((acc, cartSupplement) => {
      const item = items.find((item) => item.id == cartSupplement.itemId);
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
  // If it was exited by adding a ticket, then placeFor is either 'me', 'other' or 'attendant', and placeId is the id of the user
  // (or an object containing the firstname and the lastname of the person if the ticket is for an attendant)
  const onAddPlaceModalQuit = async (placeFor: string, placeId: AttendantInfo | string) => {
    setAddPlaceVisible(false);
    if (placeFor === undefined || (placeFor === '' && placeId === '')) return;
    if (placeFor === 'attendant') {
      setCart({ ...cart, tickets: { ...cart.tickets, attendant: placeId as AttendantInfo } });
      setHasAttendant(true);
    } else {
      setCart({ ...cart, tickets: { ...cart.tickets, userIds: [...cart.tickets.userIds, placeId as string] } });
      const newTickets = { ...tickets };
      newTickets[placeId as string] =
        placeFor === 'me'
          ? items.find((item) => item.id === `ticket-${userType}`)
          : await getTicketPrice(placeId as string);
      setTickets(newTickets);
      if (placeFor === 'me') {
        setIsPlaceInCart(true);
      } else {
        setTeamMembersWithoutTicket(teamMembersWithoutTicket.filter((member) => member.id !== placeId));
      }
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
      if (ticket === userId) {
        setIsPlaceInCart(false);
      }
      return teamMembers.find((member) => member.id === ticket);
    }) as User[];
    setTeamMembersWithoutTicket(teamMembersWithoutTicket.concat(membersOfTickets));
    if (cart.tickets.attendant) {
      setHasAttendant(false);
    }
    setCart(deleteCart());
    setTickets({});
  };

  // Callback of SupplementList. It is called when the user wants to preview an item
  // newItemPreview is the new value of itemPreview.
  const onItemPreview = (newItemPreview: string) => {
    setItemPreview({ image: newItemPreview, visible: true });
  };

  // Called when the user clicks on the pay button
  // Sets hasRequestedPayment to true to disable the pay button, and requests the payment to the API
  const onPay = () => {
    setHasRequestedPayment(true);
    deleteCart();
    dispatch(cartPay(cart) as unknown as Action);
  };

  return (
    <div id="dashboard-shop" className={styles.dashboardShop}>
      <Title level={1} align="center" className={styles.primaryTitle}>
        Boutique
      </Title>
      <div className={styles.shopAndBill}>
        <div className={styles.shop}>
          <div className={styles.shopSection}>
            <Title level={2} type={2} className={styles.secondaryTitle}>
              Places
            </Title>
            <div className={styles.buttonRow}>
              <Button primary onClick={() => setAddPlaceVisible(true)}>
                Ajouter une place
              </Button>
            </div>
          </div>
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
              shopSectionName="Location de matériel"
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
              {cart.tickets.attendant && (
                <>
                  <div className={styles.attendantWarning}>
                    <span className="fas fa-exclamation-triangle"></span> Si tu cliques sur payer, tu ne pourras plus
                    modifier ton accompagnateur.
                  </div>
                </>
              )}
              <strong>Total : {(totalPrice / 100).toFixed(2)}€</strong>
              <br />
              <div className={styles.cgv}>
                <Checkbox
                  className={styles.cgvCheckbox}
                  label={
                    <>
                      J'accepte les{' '}
                      <a href="/legal#CGV" target="_blank">
                        Conditions Générales de Vente
                      </a>
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
                disabled={!totalPrice || !isCgvAccepted || hasRequestedPayment}>
                <Icon name={IconName.ShoppingCart} />
                Payer
              </Button>
            </div>
          </div>
        </div>
      </div>
      {addPlaceVisible && (
        <AddPlaceModal
          userId={userId}
          username={username}
          hasTicket={isPlaceInCart}
          teamMembersWithoutTicket={teamMembersWithoutTicket}
          needsAttendant={age === UserAge.child && !hasAttendant}
          onQuit={onAddPlaceModalQuit}
        />
      )}
      <Modal
        visible={!!itemPreview && !!itemPreview?.visible}
        onCancel={() => setItemPreview(itemPreview ? { ...itemPreview, visible: false } : null)}
        buttons={null}
        containerClassName={styles.itemPreviewModalContainer}>
        {itemPreview && (
          <img alt="Preview image" src={`/images/${itemPreview.image}`} className={styles.itemPreviewImage} />
        )}
      </Modal>
    </div>
  );
};

export default Shop;
