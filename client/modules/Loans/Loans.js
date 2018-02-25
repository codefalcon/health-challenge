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
    this.props.dispatch(fetchData());
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
    if (loans && loans.length) {
      list = loans.map((loan, i) => {
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
        <p>This is a really fancy list of loans</p>
        <hr />
        {list}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LoansPage.need = [() => { return fetchData(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loans: getLoans(state),
  };
}

LoansPage.propTypes = {
  loans: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoansPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoansPage);
