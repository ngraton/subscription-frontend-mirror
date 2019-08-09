import React from 'react';
import SingleSubscriptionInList from '../components/SingleSubscription/SingleSubscriptionInList';
import UsersAPI from '../api/UsersAPI'
import { Container } from 'react-bootstrap'

function SubscriptionListPage({username}) {

  const [ subscriptions, setSubscriptions ] = React.useState([])

  React.useEffect(() => {
    UsersAPI.getUserByUsername(username)
        .then(response => response[0].subscriptions)
            .then(subscriptions => subscriptions.map((subscriptionObj, index) => {
              return <SingleSubscriptionInList key={index} subscription={subscriptionObj} edit={true}/>
            })).then(
              subArray => setSubscriptions(subArray))
    }, [ username ] )

  return (
    <Container>
      <h2>Subscriptions</h2>
      <Container>
        {subscriptions}
      </Container>
    </Container>
  )
}

export default SubscriptionListPage;