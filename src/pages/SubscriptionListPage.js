import React from 'react';
import SingleSubscription from '../components/SingleSubscription/SingleSubscription.js';
import UsersAPI from '../api/UsersAPI'
import { Container } from 'react-bootstrap'

function SubscriptionListPage({username}) {

  const [ subscriptions, setSubscriptions ] = React.useState([])

  React.useEffect(() => {
    UsersAPI.getUserByUsername(username)
        .then(response => response[0].subscriptions)
            .then(subscriptions => subscriptions.map((subscriptionObj, index) => {
              return <SingleSubscription key={index} subscription={subscriptionObj} edit={true}/>
            })).then(
              subArray => setSubscriptions(subArray))
    }, [ username ] )

  return (
    <Container>
      <h2>Subscriptions</h2>
      {subscriptions}
    </Container>
  )
}

export default SubscriptionListPage;