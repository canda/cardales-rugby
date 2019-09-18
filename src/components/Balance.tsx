import React from 'react';
import styled from 'styled-components';
import { Radio, RadioGroup } from 'react-radio-group';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

import { Account, Movement } from '../types/Account';
import { getAccountsRef } from '../services/firebase';

const MOBILE_MAX_WIDTH = '700px';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    flex-direction: row;
  }
  margin: 10px 0;
`;

const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    flex-direction: column;
  }
`;

const StyledRadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFieldGroup = styled.div`
  margin: 0 10px;
`;

const StyledRadio = styled(Radio)`
  margin: 0 5px;
`;

const emptyMovement: () => Movement = () => ({
  multiplier: 1,
  value: 0,
  date: new Date().valueOf()
});

const StyledTable = styled.table`
  text-align: left;
  margin: auto;
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    margin: 0;
  }
`;

const StyledCell = styled.td`
  padding-right: 5px;
`;

const BalanceTotal = styled.span`
  font-weight: bold;
  font-size: 22px;
`;

const getBalanceTotal = (account: Account) =>
  account.movements.reduce((sum, movement) => (sum += movement.multiplier * movement.value), 0);

const sortMovements = (account: Account) => account.movements.sort((m1, m2) => m2.date - m1.date);

class Balance extends React.Component<
  { account: Account },
  { newMovement: Movement; loading: Boolean }
> {
  state = { newMovement: emptyMovement(), loading: false };
  submit = async () => {
    const { account } = this.props;
    const { newMovement } = this.state;

    const firebase = await import('firebase/app');

    const accountsRef = await getAccountsRef();

    this.setState({ loading: true });
    await accountsRef.doc(account.id).update({
      movements: firebase.firestore.FieldValue.arrayUnion(newMovement)
    });
    this.setState({ loading: true, newMovement: emptyMovement() });
  };
  handleDateChange = date => {
    this.setState(({ newMovement }) => ({ newMovement: { ...newMovement, date: date.valueOf() } }));
  };
  handleRadioChange = multiplier => {
    this.setState(({ newMovement }) => ({ newMovement: { ...newMovement, multiplier } }));
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(({ newMovement }) => ({ newMovement: { ...newMovement, [name]: value } }));
  };
  render() {
    const { account } = this.props;
    const { newMovement } = this.state;

    const sortedMovements = sortMovements(account);
    const balanceTotal = getBalanceTotal(account);

    return (
      <React.Fragment>
        <FormContainer>
          <StyledRadioGroup
            name="multiplier"
            selectedValue={newMovement.multiplier}
            onChange={this.handleRadioChange}
          >
            <StyledRadioContainer>
              <StyledRadio value={1} /> Pago
            </StyledRadioContainer>
            <StyledRadioContainer>
              <StyledRadio value={-1} /> Deuda
            </StyledRadioContainer>
          </StyledRadioGroup>
          <StyledFieldGroup>
            <label>$</label>
            <input
              type="number"
              name="value"
              value={newMovement.value}
              onChange={this.handleInputChange}
            />
          </StyledFieldGroup>

          <StyledFieldGroup>
            <DayPickerInput
              format="LL"
              formatDate={date => moment(date).format('LL')}
              value={new Date(newMovement.date)}
              onDayChange={this.handleDateChange}
            />
          </StyledFieldGroup>

          <button onClick={this.submit} className="button">
            Cargar Movimiento
          </button>
        </FormContainer>
        <BalanceTotal>
          {balanceTotal < 0 ? 'Deuda' : 'A favor'} ${Intl.NumberFormat().format(balanceTotal)}
        </BalanceTotal>
        <StyledTable className="table">
          <tbody>
            {sortedMovements.map((movement: Movement) => (
              <tr key={movement.date}>
                <StyledCell>{moment(movement.date).format('LL')}</StyledCell>
                <StyledCell>{movement.multiplier === -1 ? 'Deuda' : 'Pago'}</StyledCell>
                <StyledCell>${Intl.NumberFormat().format(movement.value)}</StyledCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </React.Fragment>
    );
  }
}

export default Balance;
