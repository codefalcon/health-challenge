import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { fetchData } from './LoansActions';
const LineChart = require('react-chartjs').Line;

import styles from './Loans.css';

// Import Selectors
import { getLoans } from './LoansReducer';

const chartOptions = {
  scaleBeginAtZero: true,
  scaleOverride: true,
  scaleStartValue: 0,
  scaleSteps: 4,
  scaleStepWidth: 25,
};

class LoansPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData(1));
  }

  getChartInfo(health) {
    return {
      labels: health.map((h, i) => i + 1),
      datasets: [
        {
          label: 'Health',
          fillColor: 'rgba(105,51,147, 0.3)',
          strokeColor: 'rgba(105,51,147, 0.75)',
          pointColor: 'rgba(105,51,147, 1)',
          data: health,
        },
      ],
    };
  }

  getColor(val) {
    if (val > 80) return 'green';
    if (val > 50) return 'yellow';
    return 'red';
  }

  render() {
    const { loans } = this.props;
    let list;
    if (loans && loans.loans && loans.loans.length) {
      list = loans.loans.map((loan, i) => {
        return (
          <div key={i} className={styles.loan}>
            <div className={styles.info}>
              <h2>{loan.name}</h2>
              <p>
                Current Health:
                <b style={{ color: this.getColor(loan.currentHealth) }}>
                  &nbsp; {loan.currentHealth}
                </b>
              </p>
            </div>
            <div className={styles.graph}>
              <LineChart data={this.getChartInfo(loan.health)} options={chartOptions} width="300" height="100" />
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div>
            <ul className={styles.pagination}>
              <li className={Number(loans.currentPage) === 1 ? styles.disabled : ''} >
                  <a onClick={() => this.props.dispatch(fetchData(1))}>First</a>
              </li>
              <li className={Number(loans.currentPage) === 1 ? styles.disabled : ''}>
                  <a onClick={() => this.props.dispatch(fetchData(Number(loans.currentPage) - 1))}>Previous</a>
              </li>
              <li className={Number(loans.currentPage) === Number(loans.totalPages) ? styles.disabled : ''}>
                  <a onClick={() => this.props.dispatch(fetchData(Number(loans.currentPage) + 1))}>Next</a>
              </li>
              <li className={Number(loans.currentPage) === Number(loans.totalPages) ? styles.disabled : ''}>
                  <a onClick={() => this.props.dispatch(fetchData(Number(loans.totalPages)))}>Last</a>
              </li>
            </ul>
        </div>
      <div>
        <p>This is a really fancy list of loans</p>
        <hr />
        {list}
      </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LoansPage.need = [() => { return fetchData(1); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loans: getLoans(state),
  };
}

LoansPage.propTypes = {
  loans: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoansPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoansPage);
