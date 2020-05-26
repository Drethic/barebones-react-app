import React from 'react';
import { useHistory } from 'react-router-dom';
import AxiosWithAuth from '../../utils/AxiosWithAuth';

function Header(props) {
  const {
    isAuth,
    setAuth,
    user,
    setUser,
  } = props;
  const history = useHistory();
  const publicUrl = process.env.PUBLIC_URL;
  const logout = (e) => {
    e.preventDefault();
    AxiosWithAuth()
      .post('auth/logout', { id: user.id })
      .then(() => {
        setAuth(null);
        setUser({});
        window.location.reload(false);
        history.push(`${publicUrl}`);
      })
      .catch((err) => {
        console.log('Err is: ', err);
      });
  };

  return (
    <div className="nav-bar">
      {isAuth ? (
        <section className="private-nav">
          <h2>Welcome to Secret Family Recipes</h2>
          <section className="links">
            <a href={`${publicUrl}/recipes-home`}>All Recipes</a>
            <button type="submit" onClick={logout}>Log Out</button>
          </section>
        </section>
      ) : (
        <section className="public-nav">
          <h2>Welcome to Secret Family Recipes</h2>
        </section>
      )}
    </div>
  );
}
export default Header;
