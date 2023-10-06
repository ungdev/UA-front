import styles from './SupplementList.module.scss';
import { ReactNode, useEffect, useState } from 'react';

import { Button, Select, Table, Title } from './../UI';
import { toast } from 'react-toastify';
import { Item } from '@/types';

const supplementColumns = [
  {
    title: '',
    key: 'name',
  },
  {
    title: 'Prix unitaire',
    key: 'price',
  },
  {
    title: '',
    key: 'attributes',
  },
  {
    title: '',
    key: 'add_to_cart',
  },
];

/** This represents the supplement list in the shop */
const SupplementList = ({
  items,
  supplementCart,
  hasTicket,
  onSupplementCartChanges,
  onItemPreview,
  itemType,
  shopSectionName,
}: {
  /** The items */
  items: Item[] | undefined;
  /** The supplement cart */
  supplementCart: { itemId: string; quantity: number }[];
  /** If the user has a ticket */
  hasTicket: boolean;
  /** The function to call when the supplement cart changes */
  onSupplementCartChanges: (newSupplementCart: typeof supplementCart) => void;
  /** The function to call when the user wants to preview an item */
  onItemPreview: (image: string) => void;
  /** The item type */
  itemType: string;
  /** The shop section name */
  shopSectionName: string;
}) => {
  // The supplements sorted by type. In this array, there are ONLY supplements, there aren't any tickets.
  // If two items have the name {something}-{attribute_item_1} and {something}-{attribute_item_2}, then they are of the same type
  const [supplementTypes, setSupplementTypes] = useState<Item[]>([]);
  // The currently selected attribute for each item that has attributes.
  // This is an object. Keys are the item ids, and values are the current attributes.
  const [selectedAttributes, setSelectedAttributes] = useState<{ [itemId: string]: string } | undefined>(undefined);

  // Modifies the cart, and sends the new value to the shop
  const setSupplementCart = (newSupplementCart: typeof supplementCart) => {
    supplementCart = newSupplementCart;
    onSupplementCartChanges(supplementCart);
  };

  // Fills supplementTypes
  useEffect(() => {
    if (!items) return;
    const newSupplementTypes = [] as Item[];
    items.forEach((item) => {
      if (item.category === itemType) {
        // Every item that contains an attribute has an id that matches the syntax ${itemId}-${attribute}.
        // So to get the item type id, we just remove the end of the id, by replacing it with an empty string.
        // If the item has no attribute, then the regex `-${item.attribute}$` will not match, so nothing will be replaced, we will keep the item id
        const itemId = item.id.replace(new RegExp(`-${item.attribute}$`), '');
        const supplementType = newSupplementTypes.find((supplement) => supplement.id === itemId);
        if (!supplementType) {
          const newSupplementType = { ...item, id: itemId, attributes: [] as string[] };
          delete newSupplementType.attribute;
          delete newSupplementType.category;
          if (item.attribute) {
            newSupplementType.attributes = [item.attribute];
          }
          newSupplementTypes.push(newSupplementType);
        } else {
          supplementType.attributes = supplementType.attributes || [];
          supplementType.attributes.push(item.attribute as string);
        }
      }
    });
    setSupplementTypes(newSupplementTypes);
  }, [items]);

  // Fills selectedAttributes
  useEffect(() => {
    if (!supplementTypes.length) return;
    const newSelectedAttributes = {} as { [itemId: string]: string };
    supplementTypes.forEach((supplement) => {
      if (supplement.attributes!.length) {
        // First we find if there is already a supplement of this type in the cart
        if (
          !supplement.attributes!.find((attr) => {
            if (supplementCart.find((cartSupplement) => cartSupplement.itemId === supplement.id + '-' + attr)) {
              // If there is one, then this attribute is selected
              newSelectedAttributes[supplement.id] = attr;
              return true;
            }
            return false;
          })
        ) {
          // If there is not, we default the value to the first attribute
          newSelectedAttributes[supplement.id] = supplement.attributes![0];
        }
      }
    });
    setSelectedAttributes(newSelectedAttributes);
  }, [supplementTypes]);

  if (!selectedAttributes) {
    return null;
  }

  // Returns a supplement id according to the supplement and the attribute given to the function.
  // Supplement.id should be the id of the supplement type of the item. You should call this with a supplementType, not an item
  // If attribute is undefined, then it simply returns supplement.id
  // If it isn't, it returns `${supplement.id}-${attribute}`
  const getSupplementId = (supplement: Item, attribute?: string) => {
    return `${supplement.id}` + (attribute ? `-${attribute}` : '');
  };

  // We display the supplementTypes
  const supplementRows = supplementTypes
    .filter((supplementType) => supplementType.price > 0 || hasTicket)
    .map((supplement) => {
      // The id we have to find in the cart
      const supplementFullId = getSupplementId(supplement, selectedAttributes[supplement.id]);
      // Get cart supplement we are managing
      let cartSupplement = supplementCart.find((cartSupplement) => cartSupplement.itemId === supplementFullId);
      if (!cartSupplement) {
        cartSupplement = {
          itemId: supplementFullId,
          quantity: 0,
        };
      }
      // Get attributes
      const availableAttributes = [] as { value: string; label: string }[];
      supplement.attributes!.forEach((attribute) => {
        availableAttributes.push({ value: attribute, label: attribute.toUpperCase() });
      });

      let description = supplement.infos!.split('->') as ReactNode[];
      if (description.length > 1)
        description = [
          description.shift(),
          <ul key="description_list">
            {description.map((content, ind) => (
              <li key={ind}>{content}</li>
            ))}
          </ul>,
        ];

      // Return the row
      return {
        name: (
          <>
            {supplement.name}
            {supplement.image && (
              <Button className={styles.itemPreviewButton} onClick={() => onItemPreview(supplement.image!)}>
                Voir le design
              </Button>
            )}
            <div className={styles.itemDescription}>{description}</div>
          </>
        ),
        price: `${(supplement.price / 100).toFixed(2)}€`,
        attributes: supplement.attributes!.length ? (
          <Select
            options={availableAttributes}
            onChange={(value) => {
              const newSelectedAttributes = { ...selectedAttributes };
              newSelectedAttributes[supplement.id] = value;
              setSelectedAttributes(newSelectedAttributes);
            }}
            value={selectedAttributes[supplement.id]}
            className={styles.shopInput}
          />
        ) : (
          ''
        ),
        add_to_cart: (
          <Button
            onClick={() => {
              if (supplement.left! <= cartSupplement!.quantity) {
                toast.warn('Le stock de cet item est épuisé');
                return;
              }
              if (supplement.price < 0 && cartSupplement!.quantity >= 1) {
                toast.warn("Tu ne peux prendre qu'un seul exemplaire de cet item");
                return;
              }
              const newCartSupplements = [...supplementCart];
              if (cartSupplement!.quantity) {
                newCartSupplements.forEach(
                  (cartSupplement) =>
                    (cartSupplement.quantity =
                      cartSupplement.itemId === supplementFullId
                        ? cartSupplement.quantity + 1
                        : cartSupplement.quantity),
                );
                setSupplementCart(newCartSupplements);
              } else {
                const newSupplement = {
                  itemId: supplementFullId,
                  quantity: 1,
                };
                setSupplementCart([...supplementCart, newSupplement]);
              }
            }}>
            Ajouter au panier
          </Button>
        ),
      };
    });

  return (
    supplementRows.length && (
      <div className={styles.supplementList}>
        <Title level={2} type={2} className={styles.secondaryTitle}>
          {shopSectionName}
        </Title>
        <Table columns={supplementColumns} dataSource={supplementRows} className={styles.shopTable} />
      </div>
    )
  );
};
export default SupplementList;
