import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import getDateAndTime from '../helpers';

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_local
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

class Launch extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);

        return (
            <Fragment>
                <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);

                        const {
                            mission_name,
                            flight_number,
                            launch_year,
                            launch_date_local,
                            launch_success,
                            rocket: { rocket_id, rocket_name, rocket_type }
                        } = data.launch;

                        const isPending = launch_date_local > getDateAndTime();

                        const getLaunchStatus = () => {
                            if (isPending) return 'Pending';
                            if (!launch_success && !isPending) return 'Failure';

                            return 'Success';
                        };

                        return (
                            <div>
                                <h1 className="display-4 my-4">
                                    <span className="text-dark"> Mission:</span>{' '}
                                    {mission_name}
                                </h1>

                                <h4 className="mb-4">Launch Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <span className="text-dark">
                                            Flight Number:
                                        </span>{' '}
                                        {flight_number}
                                    </li>

                                    <li className="list-group-item">
                                        <span className="text-dark">Year:</span>{' '}
                                        {launch_year}
                                    </li>

                                    <li className="list-group-item">
                                        <span className="text-dark">
                                            Status:
                                        </span>{' '}
                                        <span
                                            className={classNames({
                                                'text-success': launch_success,
                                                'text-danger':
                                                    !launch_success &&
                                                    !isPending,
                                                'text-warning': isPending
                                            })}
                                        >
                                            {getLaunchStatus()}
                                        </span>
                                    </li>
                                </ul>

                                <h4 className="my-4">Rocket Details</h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <span className="text-dark">ID:</span>{' '}
                                        {rocket_id}
                                    </li>

                                    <li className="list-group-item">
                                        <span className="text-dark">Name:</span>{' '}
                                        {rocket_name}
                                    </li>

                                    <li className="list-group-item">
                                        <span className="text-dark">Type:</span>{' '}
                                        {rocket_type}
                                    </li>
                                </ul>
                                <hr />
                                <Link to="/" className="btn btn-secondary">
                                    Back
                                </Link>
                            </div>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default Launch;
