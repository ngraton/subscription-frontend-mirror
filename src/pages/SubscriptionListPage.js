import React from 'react';
import SingleSubscription from '../components/SingleSubscription/SingleSubscription.js';
import UsersAPI from '../api/UsersAPI'

function SubscriptionListPage({username}) {

  const [ subscriptions, setSubscriptions ] = React.useState([])

  React.useEffect(() => {
    UsersAPI.getUserByUsername(username)
        .then(response => response[0].subscriptions)
            .then(subscriptions => subscriptions.map((subscriptionObj, index) => {
              return <SingleSubscription key={index} subscription={subscriptionObj} />
            })).then(
              subArray => setSubscriptions(subArray))
    }, [ username ] )

  return (
    <div>
      <h2>Subscriptions</h2>
      {subscriptions}
    </div>
  )
}

export default SubscriptionListPage;