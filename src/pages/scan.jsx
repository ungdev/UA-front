import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { cssTransition, toast } from 'react-toastify';
import { Button, Modal } from '../components/UI';
import { scan } from '../modules/userEntry';

const Scan = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [order, setOrder] = useState();
  const [checkedUsers, setCheckedUsers] = useState([]);
  const { items } = useSelector((state) => state.items);
  const login = useSelector((state) => state.login);
  const [isModalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchItems());
  // }, [dispatch]);

  // useEffect(() => {
  //   checkPermission('orga', login, router, '/scan');
  // }, [router, login]);

  useEffect(() => {
    window.onmessage = async (e) => {
      // If the message is from the QR code scanner page
      if (window.location.hostname === e.source.location.hostname && e.source.location.pathname === '/scanner.html') {
        // If the user is not checking an order currently
        if (order || checkedUsers.indexOf(e.data) !== -1) {
          return;
        }

        const res = await scan(e.data);

        if (!res) {
          return;
        }

        setOrder(res.data);
        setCheckedUsers([...checkedUsers, e.data]);
      }
    };
  });

  useEffect(() => {
    if (order) {
    }
  }, [order]);

  // const toggleUser = (id) => {
  //   const index = checkedUsers.indexOf(id);

  //   if (index === -1) {
  //     // Add user
  //     setCheckedUsers([...checkedUsers, id]);
  //   } else {
  //     // Remove user
  //     const users = checkedUsers.slice();
  //     users.splice(index, 1);
  //     setCheckedUsers(users);
  //   }
  // };

  const closeValidation = () => {
    setOrder(null);
    setCheckedUsers([]);
  };

  // const scanCheckedUsers = async () => {
  //   await scanUsers(checkedUsers);

  //   toast.success(`Les places ont bien été scannées`);

  //   closeValidation();
  // };

  return (
    <div id="scan">
      <div className="scanner">
        <div className="scanner-placeholder">
          <i className="fas fa-video scanner-placeholder-icon" />
          Veuillez activer votre caméra
        </div>
        <iframe src="/scanner.html" className="scanner-preview" />
      </div>
      {order && (
        <Modal
          title="Place"
          buttons={
            <Button primary onClick={() => setOrder(undefined)} className="entry-info-ok">
              Ok
            </Button>
          }
          visible
          closable
          onCancel={() => setOrder(undefined)}
          onOk={() => setOrder(undefined)}
          className="entry-info">
          <p>
            Prénom : {order.firstname} <br />
            Nom : {order.lastname} <br />
            Nom d'utilisateur : {order.username} <br />
            Type : {order.type} <br />
            Permissions : {order.permissions} <br />
            Âge : {order.age} <br />
            Adresse mail : {order.email} <br />
            Payé : {order.hasPaid ? 'oui' : 'non'}
          </p>
        </Modal>
      )}
      {false && (
        <>
          <div className="scan-info">
            <strong>Représentation :</strong>
            <br />
            {order.hasPaid ? (
              <strong>Billet offert</strong>
            ) : (
              <>
                <strong>Paiement :</strong>
              </>
            )}
            {
              <Button
                noStyle
                onClick={() => {
                  closeValidation();
                  toast.warn("Aucune place n'a été scannée");
                }}
                leftIcon="fas fa-times"
                className="validation-close-button"
              />
            }
          </div>

          <div className="validation-users">
            {(() => {
              const checked = checkedUsers.indexOf(order.id) !== -1;

              return (
                <div
                  className={`validation-user ${order.isScanned ? 'scanned' : ''} ${order ? 'checked' : ''}`}
                  key={order.id}
                  onClick={() => {
                    if (!order.isScanned) {
                      toggleUser(order.id);
                    }
                  }}>
                  <span className="validation-user-name">
                    {order.firstname} {order.lastname}
                  </span>
                  {order.isScanned ? <span className="light-text"> (déjà scanné)</span> : ''}
                  <div className="validation-user-type">
                    {order.itemId !== 1 ? (
                      <i className="fas fa-exclamation-triangle validation-user-type-attention" />
                    ) : (
                      ''
                    )}
                    {/*getItemName(order.itemId, items)*/}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* <Button
              primary
              leftIcon="fas fa-check"
              className="validation-button"
              onClick={scanCheckedUsers}
              disabled={!checkedUsers.length}>
              Valider les entrées
            </Button> */}
        </>
      )}
    </div>
  );
};

export default Scan;
