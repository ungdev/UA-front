import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../components/UI';

const Scan = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [order, setOrder] = useState();
  const [checkedUsers, setCheckedUsers] = useState([]);
  const { items } = useSelector((state) => state.items);
  const login = useSelector((state) => state.login);

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
        if (order) {
          return;
        }

        const res = await fetchOrder(e.data);

        if (!res) {
          return;
        }

        setOrder(res.data);
      }
    };
  });

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

  // const closeValidation = () => {
  //   setOrder(null);
  //   setCheckedUsers([]);
  // };

  // const scanCheckedUsers = async () => {
  //   await scanUsers(checkedUsers);

  //   toast.success(`Les places ont bien été scannées`);

  //   closeValidation();
  // };

  return (
    <div id="scan">
      {true ? (
        <>
          <div className="scanner">
            <div className="scanner-placeholder">
              <i className="fas fa-video scanner-placeholder-icon" />
              Veuillez activer votre caméra
            </div>
            <iframe src="/scanner.html" className="scanner-preview" />
          </div>

          {false && (
            <div className="validation">
              <div className="validation-info">
                <strong>Représentation :</strong>
                <br />
                {true ? (
                  <strong>Billet offert</strong>
                ) : (
                  <>
                    <strong>Paiement :</strong>
                  </>
                )}
                {/* <Button
                  noStyle
                  onClick={() => {
                    closeValidation();
                    toast.warn("Aucune place n'a été scannée");
                  }}
                  leftIcon="fas fa-times"
                  className="validation-close-button"
                /> */}
              </div>

              <div className="validation-users">
                {/* {order.users.map((user) => {
                  const checked = checkedUsers.indexOf(user.id) !== -1;

                  return (
                    <div
                      className={`validation-user ${user.isScanned ? 'scanned' : ''} ${checked ? 'checked' : ''}`}
                      key={user.id}
                      onClick={() => {
                        if (!user.isScanned) {
                          toggleUser(user.id);
                        }
                      }}>
                      <span className="validation-user-name">
                        {user.firstname} {user.lastname}
                      </span>
                      {user.isScanned ? <span className="light-text"> (déjà scanné)</span> : ''}
                      <div className="validation-user-type">
                        {user.itemId !== 1 ? (
                          <i className="fas fa-exclamation-triangle validation-user-type-attention" />
                        ) : (
                          ''
                        )}
                        {getItemName(user.itemId, items)}
                      </div>
                    </div>
                  );
                })} */}
              </div>

              {/* <Button
                primary
                leftIcon="fas fa-check"
                className="validation-button"
                onClick={scanCheckedUsers}
                disabled={!checkedUsers.length}>
                Valider les entrées
              </Button> */}
            </div>
          )}
        </>
      ) : undefined}
    </div>
  );
};

export default Scan;
