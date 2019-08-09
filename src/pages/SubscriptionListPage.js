import React from 'react';
import SingleSubscriptionInList from '../components/SingleSubscription/SingleSubscriptionInList';
import UsersAPI from '../api/UsersAPI'
import { Container } from 'react-bootstrap'

function SubscriptionListPage({username}) {
  const styleObjH2 = {
    paddingBottom: '2%'
  }

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
    <Container className='border border-primary'>
      <div>
      <h2 style={styleObjH2}>Subscriptions</h2>
      </div>
      <Container>
        {subscriptions}
      </Container>
    </Container>
  )
}

export default SubscriptionListPage;