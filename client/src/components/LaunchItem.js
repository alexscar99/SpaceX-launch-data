import React, { Component } from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import getDateAndTime from '../helpers';

class LaunchItem extends Component {
    render() {
        // launch details
        const {
            flight_number,
            mission_name,
            launch_date_local,
            launch_success
        } = this.props.launch;

        // get current date and time to see if launch is pending
        // const today = new Date();
        // const currentDate = `${today.getFullYear()}-${today.getMonth() +
        //     1}-${today.getDate()}`;
        // const currentTime = `${today.getHours()}:${today.getMinutes()}`;
        // const currentDateAndTime = `${currentDate} ${currentTime}`;
        // const isPending = launch_date_local > currentDateAndTime;
        const isPending = launch_date_local > getDateAndTime();

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-9">
                        <h4>
                            Mission:{' '}
                            <span
                                className={classNames({
                                    'text-success': launch_success,
                                    'text-danger':
                                        !launch_success && !isPending,
                                    'text-warning': isPending
                                })}
                            >
                                {mission_name}
                            </span>
                        </h4>
                        <p>
                            Date:{' '}
                            <Moment format="YYYY-MM-DD HH:mm">
                                {launch_date_local}
                            </Moment>
                        </p>
                    </div>

                    <div className="col-md-3">
                        <Link
                            to={`/launch/${flight_number}`}
                            className="btn btn-secondary"
                        >
                            Launch Details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default LaunchItem;
