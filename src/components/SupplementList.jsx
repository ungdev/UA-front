import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Select, Table, Title } from './UI';

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

// This represents the supplement list in the shop
// It takes to arguments, which are both callback functions :
// * onSupplementCartChanges : is called each time the user adds, remove or modify a supplement.
//   It takes one parameter : the supplement cart, which is an array containing supplements that are in the cart.
//   The format is the same as in the route POST users/current/carts
// * onItemPreview : is called when the user wants to preview an item.
//   It takes one parameter : the relative path to the image file, starting in the public/ directory
const SupplementList = ({ initialSupplementCart, onSupplementCartChanges, onItemPreview }) => {
  const items = useSelector((state) => state.items);

  // The supplements sorted by type. In this array, there are ONLY supplements, there aren't any tickets.
  // If two items have the name {something}-{attribute_item_1} and {something}-{attribute_item_2}, then they are of the same type
  const [supplementTypes, setSupplementTypes] = useState([]);
  // The currently selected attribute for each item that has attributes.
  // This is an object. Keys are the item ids, and values are the current attributes.
  const [selectedAttributes, setSelectedAttributes] = useState(undefined);
  const [supplementCart, setSupplementCart] = useState(initialSupplementCart);

  // Fills supplementTypes
  useEffect(() => {
    if (!items) return;
    const newSupplementTypes = [];
    items.forEach((item) => {
      if (item.category === 'supplement') {
        // Every item that contains an attribute has an id that matches the syntax ${itemId}-${attribute}.
        // So to get the item type id, we just remove the end of the id, by replacing it with an empty string.
        // If the item has no attribute, then the regex `-${item.attribute}$` will not match, so nothing will be replaced, we will keep the item id
        const itemId = item.id.replace(new RegExp(`-${item.attribute}$`), '');
        const supplementType = newSupplementTypes.find((supplement) => supplement.id === itemId);
        if (!supplementType) {
          const newSupplementType = { ...item, id: itemId, attributes: [] };
          delete newSupplementType.attribute;
          delete newSupplementType.category;
          if (item.attribute) {
            newSupplementType.attributes = [item.attribute];
          }
          newSupplementTypes.push(newSupplementType);
        } else {
          supplementType.attributes.push(item.attribute);
        }
      }
    });
    setSupplementTypes(newSupplementTypes);
  }, [items]);

  // Fills selectedAttributes
  useEffect(() => {
    if (!supplementTypes.length) return;
    let newSelectedAttributes = {};
    supplementTypes.forEach((supplement) => {
      if (supplement.attributes.length) {
        // First we find if there is already a supplement of this type in the cart
        if (
          !supplement.attributes.find((attr) => {
            if (supplementCart.find((cartSupplement) => cartSupplement.itemId === supplement.id + '-' + attr)) {
              // If there is one, then this attribute is selected
              newSelectedAttributes[supplement.id] = attr;
              return true;
            }
            return false;
          })
        ) {
          // If there is not, we default the value to the first attribute
          newSelectedAttributes[supplement.id] = supplement.attributes[0];
        }
      }
    });
    setSelectedAttributes(newSelectedAttributes);
  }, [supplementTypes]);

  // When the cart is changed, we send this to the shop
  useEffect(() => {
    onSupplementCartChanges(supplementCart);
  }, [supplementCart]);

  if (!selectedAttributes) {
    return null;
  }

  // Returns a supplement id according to the supplement and the attribute given to the function.
  // Supplement.id should be the id of the supplement type of the item. You should call this with a supplementType, not an item
  // If attribute is undefined, then it simply returns supplement.id
  // If it isn't, it returns `${supplement.id}-${attribute}`
  const getSupplementId = (supplement, attribute) => {
    return `${supplement.id}` + (attribute ? `-${attribute}` : '');
  };

  // We display the supplementTypes
  const supplementRows = supplementTypes.map((supplement) => {
    // The id we have to find in the cart
    let supplementFullId = getSupplementId(supplement, selectedAttributes[supplement.id]);
    // Get cart supplement we are managing
    let cartSupplement = supplementCart.find((cartSupplement) => cartSupplement.itemId === supplementFullId);
    if (!cartSupplement) {
      cartSupplement = {
        item: supplementFullId,
        quantity: 0,
      };
    }
    // Get attributes
    const availableAttributes = [];
    supplement.attributes.forEach((attribute) => {
      availableAttributes.push({ value: attribute, label: attribute.toUpperCase() });
    });

    // Return the row
    return {
      name: (
        <>
          {supplement.name}
          {supplement.image && (
            <Button
              className="item-preview-button"
              onClick={() => onItemPreview(supplement.image)}
              leftIcon="far fa-image"
              noStyle>
              Voir le design
            </Button>
          )}
          <div className="item-description">{supplement.infos}</div>
        </>
      ),
      price: `${(supplement.price / 100).toFixed(2)}€`,
      attributes: supplement.attributes.length ? (
        <Select
          options={availableAttributes}
          onChange={(value) => {
            /*const previousSupplementId = getSupplementId(supplement, selectedAttributes[supplement.id]);
            const newSupplementId = getSupplementId(supplement, value);
            let newCartSupplements = supplementCart.map((cartSupplement) => {
              let newCartSupplement = { ...cartSupplement };
              if (newCartSupplement.itemId === previousSupplementId) {
                newCartSupplement.itemId = newSupplementId;
              }
              return newCartSupplement;
            });
            setSupplementCart(newCartSupplements);*/
            let newSelectedAttributes = { ...selectedAttributes };
            newSelectedAttributes[supplement.id] = value;
            setSelectedAttributes(newSelectedAttributes);
          }}
          value={selectedAttributes[supplement.id]}
          className="shop-input"
        />
      ) : (
        ''
      ),
      add_to_cart: (
        <Button
          onClick={() => {
            let newCartSupplements = [...supplementCart];
            if (cartSupplement.quantity) {
              newCartSupplements.forEach(
                (cartSupplement) =>
                  (cartSupplement.quantity =
                    cartSupplement.itemId === supplementFullId ? cartSupplement.quantity + 1 : cartSupplement.quantity),
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
      /*<Input
          type="number"
          placeholder="0"
          value={cartSupplement.quantity}
          onChange={(strQuantity) => {
            // If the parse result is NaN, then quantity defaults to 0
            let quantity = parseInt(strQuantity, 10) || 0;
            let newCartSupplements = [...supplementCart];
            if (cartSupplement.quantity) {
              if (quantity) {
                newCartSupplements.forEach(
                  (cartSupplement) =>
                    (cartSupplement.quantity =
                      cartSupplement.itemId === supplementFullId ? quantity : cartSupplement.quantity),
                );
              } else {
                newCartSupplements = supplementCart.filter(
                  (cartSupplement) => cartSupplement.itemId !== supplementFullId,
                );
              }
              setSupplementCart(newCartSupplements);
            } else if (quantity !== 0) {
              const newSupplement = {
                itemId: supplementFullId,
                quantity: quantity,
              };
              setSupplementCart([...supplementCart, newSupplement]);
            }
          }}
          min={0}
          max={supplementFullId === 'discount-switch-ssbu' ? 1 : supplement.left ? supplement.left : 30}
          className="shop-input"
        />
      ),*/
    };
  });

  return (
    <>
      <Title level={4}>Accessoires</Title>
      <Table columns={supplementColumns} dataSource={supplementRows} className="shop-table" />
    </>
  );
};

export default SupplementList;
